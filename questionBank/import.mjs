import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {execFileSync} from 'node:child_process';
import {isDeepStrictEqual} from 'node:util';
import {questionId} from './identity.mjs';

const bankRoot = path.dirname(fileURLToPath(import.meta.url));
const repositoryRoot = path.dirname(bankRoot);
const flowFields = new Set(['show_if', 'required', 'prefill_from']);
execFileSync(process.execPath, [path.join(bankRoot, 'build.mjs'), '--check'],
  {cwd: repositoryRoot, encoding: 'utf8'});
const sourceFile = process.argv[2] && path.resolve(process.argv[2]);
const checkOnly = process.argv.includes('--check');
if (!sourceFile || !fs.existsSync(sourceFile)) throw Error('Usage: node questionBank/import.mjs <standalone-questionnaire.json> [--check]');
const incoming = JSON.parse(fs.readFileSync(sourceFile, 'utf8'));
const questionnaireId = incoming.questionnaire?.questionnaire_id;
const project = incoming.questionnaire?.project;
if (!/^[A-Za-z0-9_]+$/.test(questionnaireId ?? '') || !project) throw Error('The imported questionnaire needs a valid id and project');
const index = JSON.parse(fs.readFileSync(path.join(bankRoot, 'index.json'), 'utf8'));
const flowRelative = index.flows.find(relative => {
  const flow = JSON.parse(fs.readFileSync(path.join(bankRoot, relative), 'utf8'));
  return flow.form.questionnaire.questionnaire_id === questionnaireId;
});
if (!flowRelative) throw Error(`Questionnaire ${questionnaireId} is not in the question bank`);
const currentFlow = JSON.parse(fs.readFileSync(path.join(bankRoot, flowRelative), 'utf8'));
if (project !== currentFlow.form.questionnaire.project) throw Error('Imported questionnaire project differs from its flow');
const currentOutput = path.resolve(repositoryRoot, currentFlow.output);
const current = JSON.parse(fs.readFileSync(currentOutput, 'utf8'));
if (equal(incoming, current)) {
  console.log(`${questionnaireId}: standalone JSON already matches the question bank; no changes.`);
  process.exit(0);
}

const stageRoot = fs.mkdtempSync(path.join(repositoryRoot, '.question-bank-import-'));
if (path.dirname(stageRoot) !== repositoryRoot) throw Error('Unsafe staging directory');
try {
  const stageBank = path.join(stageRoot, 'questionBank');
  fs.cpSync(bankRoot, stageBank, {recursive: true});
  const stageIndex = JSON.parse(fs.readFileSync(path.join(stageBank, 'index.json'), 'utf8'));
  for (const relative of stageIndex.flows) {
    const flow = JSON.parse(fs.readFileSync(path.join(stageBank, relative), 'utf8'));
    const staged = path.resolve(stageRoot, flow.output);
    if (!staged.startsWith(path.join(stageRoot, 'forms') + path.sep)) throw Error(`Unsafe output: ${flow.output}`);
    fs.mkdirSync(path.dirname(staged), {recursive: true});
    fs.copyFileSync(path.resolve(repositoryRoot, flow.output), staged);
  }
  const questions = new Map(stageIndex.questions.map(relative => {
    const entry = JSON.parse(fs.readFileSync(path.join(stageBank, relative), 'utf8'));
    return [entry.question_id, entry];
  }));
  const originalQuestions = new Map([...questions].map(([id, entry]) => [id, structuredClone(entry)]));
  const flow = JSON.parse(fs.readFileSync(path.join(stageBank, flowRelative), 'utf8'));
  const oldNodes = new Map();
  for (const section of flow.form.questionnaire.sections ?? []) {
    for (const node of section.questions ?? []) {
      const entry = questions.get(node.question_ref);
      oldNodes.set(entry.key, node);
    }
  }
  const nextForm = structuredClone(incoming);
  const selectedTranslationKeys = new Set();
  const seenKeys = new Set();
  for (const section of nextForm.questionnaire.sections ?? []) {
    section.questions = (section.questions ?? []).map(question => {
      const key = question.answer_key;
      if (!key || seenKeys.has(key)) throw Error(`Missing or repeated answer_key: ${key}`);
      seenKeys.add(key);
      const oldNode = oldNodes.get(key);
      const id = oldNode?.question_ref ?? questionId(project, key);
      const overrides = Object.fromEntries(Object.entries(question).filter(([name]) => flowFields.has(name)));
      const schema = Object.fromEntries(Object.entries(question).filter(([name]) => !flowFields.has(name)));
      const translations = questionTranslations(schema, incoming.languages ?? {});
      for (const entries of Object.values(translations)) Object.keys(entries).forEach(token => selectedTranslationKeys.add(token));
      let entry = questions.get(id);
      if (!entry) {
        entry = {question_id: id, project, key, version: 1,
          origin_questionnaire: questionnaireId, origin_basis: 'only_source_in_current_inventory',
          source_questionnaires: [], review_required: false,
          variants: {default: {schema, translations, source_questionnaires: []}}};
        questions.set(id, entry);
        stageIndex.questions.push(`questions/${id}.json`);
      }
      if (entry.key !== key) throw Error(`Question identity conflicts with answer key: ${id}`);
      let variantId = Object.entries(entry.variants).find(([, value]) =>
        equal(value.schema, schema) && equal(value.translations ?? {}, translations))?.[0];
      if (!variantId) {
        const priorVariant = oldNode?.variant;
        const prior = priorVariant && entry.variants[priorVariant];
        if (prior && prior.source_questionnaires.length === 1 && prior.source_questionnaires[0] === questionnaireId) {
          variantId = priorVariant;
          entry.variants[variantId] = {...prior, schema, translations};
        } else {
          variantId = questionnaireId;
          let suffix = 2;
          while (Object.hasOwn(entry.variants, variantId)) variantId = `${questionnaireId}_${suffix++}`;
          entry.variants[variantId] = {schema, translations, source_questionnaires: []};
        }
      }
      return {question_ref: id, question_version: entry.version, variant: variantId,
        ...(Object.keys(overrides).length ? {overrides} : {})};
    });
  }
  for (const entries of Object.values(nextForm.languages ?? {})) {
    for (const token of selectedTranslationKeys) delete entries[token];
  }
  flow.form = nextForm;
  fs.writeFileSync(path.join(stageBank, flowRelative), JSON.stringify(flow, null, 2) + '\n');
  stageIndex.questions.sort();
  fs.writeFileSync(path.join(stageBank, 'index.json'), JSON.stringify(stageIndex, null, 2) + '\n');

  const uses = new Map([...questions.keys()].map(id => [id, {forms: new Set(), variants: new Map()}]));
  for (const relative of stageIndex.flows) {
    const item = JSON.parse(fs.readFileSync(path.join(stageBank, relative), 'utf8'));
    const formId = item.form.questionnaire.questionnaire_id;
    for (const section of item.form.questionnaire.sections ?? []) {
      for (const node of section.questions ?? []) {
        const use = uses.get(node.question_ref);
        if (!use) throw Error(`Flow references missing question: ${node.question_ref}`);
        use.forms.add(formId);
        if (!use.variants.has(node.variant)) use.variants.set(node.variant, new Set());
        use.variants.get(node.variant).add(formId);
      }
    }
  }
  for (const [id, entry] of questions) {
    const before = originalQuestions.get(id);
    if (before && !equal(variantContents(before), variantContents(entry))) entry.version = before.version + 1;
    const use = uses.get(id);
    entry.source_questionnaires = [...use.forms];
    for (const [variantId, variant] of Object.entries(entry.variants)) {
      variant.source_questionnaires = [...(use.variants.get(variantId) ?? [])];
    }
    entry.review_required = Object.keys(entry.variants).length > 1;
    if (!use.forms.size) entry.retired = true;
    else delete entry.retired;
    fs.writeFileSync(path.join(stageBank, `questions/${id}.json`), JSON.stringify(entry, null, 2) + '\n');
  }
  for (const relative of stageIndex.flows) {
    const file = path.join(stageBank, relative);
    const item = JSON.parse(fs.readFileSync(file, 'utf8'));
    for (const section of item.form.questionnaire.sections ?? []) {
      for (const node of section.questions ?? []) node.question_version = questions.get(node.question_ref).version;
    }
    fs.writeFileSync(file, JSON.stringify(item, null, 2) + '\n');
  }
  fs.copyFileSync(sourceFile, path.resolve(stageRoot, flow.output));
  const verified = execFileSync(process.execPath, [path.join(stageBank, 'build.mjs'), '--check'],
    {cwd: stageRoot, encoding: 'utf8'}).trim();
  const changed = [];
  for (const relative of ['index.json', ...stageIndex.questions, ...stageIndex.flows]) {
    const staged = path.join(stageBank, relative);
    const live = path.join(bankRoot, relative);
    if (!fs.existsSync(live) || !fs.readFileSync(staged).equals(fs.readFileSync(live))) changed.push(relative);
  }
  if (checkOnly) {
    console.log(`${questionnaireId}: import would change ${changed.length} bank files and its standalone JSON. ${verified}`);
  } else {
    for (const relative of changed) {
      const target = path.join(bankRoot, relative);
      fs.mkdirSync(path.dirname(target), {recursive: true});
      fs.copyFileSync(path.join(stageBank, relative), target);
    }
    fs.copyFileSync(sourceFile, currentOutput);
    const finalCheck = execFileSync(process.execPath, [path.join(bankRoot, 'build.mjs'), '--check'],
      {cwd: repositoryRoot, encoding: 'utf8'}).trim();
    console.log(`${questionnaireId}: imported ${changed.length} bank files and its standalone JSON. ${finalCheck}`);
  }
} finally {
  if (path.dirname(stageRoot) !== repositoryRoot || !path.basename(stageRoot).startsWith('.question-bank-import-')) {
    throw Error(`Refusing unsafe staging cleanup: ${stageRoot}`);
  }
  fs.rmSync(stageRoot, {recursive: true, force: true});
}

function questionTranslations(schema, languages) {
  const values = new Set();
  collectStrings(schema, values);
  if (schema.add_other) values.add('Other');
  if (schema.add_prefer_not_to_say) values.add('Prefer not to say');
  if (schema.add_i_dont_know) values.add("I don't know");
  const tokens = [...values].map(value => `#${value}`);
  const result = {};
  for (const [language, dictionary] of Object.entries(languages)) {
    const entries = Object.fromEntries(tokens.filter(token => Object.hasOwn(dictionary, token))
      .map(token => [token, dictionary[token]]));
    if (Object.keys(entries).length) result[language] = entries;
  }
  return result;
}
function collectStrings(value, found) {
  if (typeof value === 'string') found.add(value);
  else if (Array.isArray(value)) value.forEach(item => collectStrings(item, found));
  else if (value && typeof value === 'object') Object.values(value).forEach(item => collectStrings(item, found));
}
function variantContents(entry) {
  return Object.fromEntries(Object.entries(entry.variants).map(([id, variant]) =>
    [id, {schema: variant.schema, translations: variant.translations, app_translations: variant.app_translations}]));
}
function equal(left, right) { return isDeepStrictEqual(sort(left), sort(right)); }
function sort(value) {
  if (Array.isArray(value)) return value.map(sort);
  if (value && typeof value === 'object') return Object.fromEntries(Object.keys(value).sort().map(key => [key, sort(value[key])]));
  return value;
}

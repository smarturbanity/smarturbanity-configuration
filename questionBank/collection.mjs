import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {execFileSync} from 'node:child_process';
import {isDeepStrictEqual} from 'node:util';
import {questionId} from './identity.mjs';

const bankRoot = path.dirname(fileURLToPath(import.meta.url));
const repositoryRoot = path.dirname(bankRoot);
const [command, argument, ...options] = process.argv.slice(2);
if (!['export', 'import'].includes(command) || !argument) {
  throw Error('Usage: collection.mjs export <file.json> [questionnaire_id ...] | import <file.json> [--check]');
}
const index = readJson(path.join(bankRoot, 'index.json'));
if (command === 'export') {
  const collection = pack(bankRoot, index, options);
  const target = path.resolve(argument);
  fs.mkdirSync(path.dirname(target), {recursive: true});
  fs.writeFileSync(target, JSON.stringify(collection, null, 2) + '\n');
  console.log(`Exported one collection: ${collection.questions.length} questions, ${collection.flows.length} flows -> ${target}`);
} else {
  if (options.some(option => option !== '--check')) throw Error(`Unknown import option: ${options.join(' ')}`);
  const incoming = readJson(path.resolve(argument));
  validateCollection(incoming);
  execFileSync(process.execPath, [path.join(bankRoot, 'build.mjs'), '--check'], {cwd: repositoryRoot, encoding: 'utf8'});
  importCollection(incoming, options.includes('--check'));
}

function pack(root, catalog, selectedIds) {
  const allFlows = catalog.flows.map(relative => readJson(path.join(root, relative)));
  const requested = new Set(selectedIds);
  const byId = new Map(allFlows.map(flow => [flow.form.questionnaire.questionnaire_id, flow]));
  const flows = selectedIds.length ? selectedIds.map(id => byId.get(id)).filter(Boolean) : allFlows;
  if (flows.length !== (selectedIds.length ? requested.size : allFlows.length)) {
    throw Error('Unknown or repeated questionnaire_id in collection selection');
  }
  const referenced = new Set(flows.flatMap(flow => (flow.form.questionnaire.sections ?? [])
    .flatMap(section => (section.questions ?? []).map(node => node.question_ref))));
  const questions = catalog.questions.map(relative => readJson(path.join(root, relative)))
    .filter(entry => referenced.has(entry.question_id));
  if (questions.length !== referenced.size) throw Error('Selected flows reference a missing question');
  return {question_bank_collection_version: 1, questions, flows};
}

function validateCollection(collection) {
  if (collection?.question_bank_collection_version !== 1 || !Array.isArray(collection.questions) || !Array.isArray(collection.flows)) {
    throw Error('Unsupported question bank collection');
  }
  const questions = new Map();
  const questionPaths = new Set();
  for (const entry of collection.questions) {
    if (entry.question_id !== questionId(entry.project, entry.key) || !Number.isInteger(entry.version) || entry.version < 1) {
      throw Error(`Invalid question identity or version: ${entry.question_id}`);
    }
    if (questions.has(entry.question_id)) throw Error(`Repeated question ID: ${entry.question_id}`);
    const questionPath = `questions/${entry.question_id}.json`.toLowerCase();
    if (questionPaths.has(questionPath)) throw Error(`Question filename collision: ${entry.question_id}`);
    questionPaths.add(questionPath);
    if (!entry.origin_questionnaire || !entry.variants || !Object.keys(entry.variants).length) {
      throw Error(`Incomplete question: ${entry.question_id}`);
    }
    questions.set(entry.question_id, entry);
  }
  const formIds = new Set();
  const outputs = new Set();
  for (const flow of collection.flows) {
    if (flow?.flow_schema_version !== 1 || !flow.form?.questionnaire) throw Error('Invalid flow');
    const formId = flow.form.questionnaire.questionnaire_id;
    const formIdKey = String(formId ?? '').toLowerCase();
    if (!/^[A-Za-z0-9_]+$/.test(formId ?? '') || formIds.has(formIdKey)) throw Error(`Invalid or repeated questionnaire: ${formId}`);
    formIds.add(formIdKey);
    if (!safeOutput(flow.output)) throw Error(`Invalid form output: ${flow.output}`);
    const output = outputKey(flow.output);
    if (outputs.has(output)) throw Error(`Repeated form output: ${flow.output}`);
    outputs.add(output);
    const answerKeys = new Set();
    for (const section of flow.form.questionnaire.sections ?? []) {
      for (const node of section.questions ?? []) {
        const entry = questions.get(node.question_ref);
        if (!entry) throw Error(`Collection is not self-contained: ${node.question_ref}`);
        const variant = entry.variants[node.variant];
        if (!variant || node.question_version !== entry.version || variant.schema.answer_key !== entry.key) {
          throw Error(`Invalid reference, version or variant: ${node.question_ref}`);
        }
        if (answerKeys.has(entry.key)) throw Error(`Repeated answer_key ${entry.key} in ${formId}`);
        answerKeys.add(entry.key);
      }
    }
  }
}

function importCollection(collection, checkOnly) {
  const stageRoot = fs.mkdtempSync(path.join(repositoryRoot, '.question-bank-collection-'));
  if (path.dirname(stageRoot) !== repositoryRoot) throw Error('Unsafe collection staging directory');
  try {
    const stageBank = path.join(stageRoot, 'questionBank');
    fs.cpSync(bankRoot, stageBank, {recursive: true});
    const stageIndex = readJson(path.join(stageBank, 'index.json'));
    const localFlows = new Map(stageIndex.flows.map(relative => {
      const flow = readJson(path.join(stageBank, relative));
      return [flow.form.questionnaire.questionnaire_id, {relative, flow}];
    }));
    const localFlowIds = new Map([...localFlows.keys()].map(id => [id.toLowerCase(), id]));
    const localOutputs = new Map([...localFlows].map(([id, item]) => [outputKey(item.flow.output), id]));
    const localQuestions = new Map(stageIndex.questions.map(relative => {
      const entry = readJson(path.join(stageBank, relative));
      return [entry.question_id, entry];
    }));
    const localQuestionPaths = new Map([...localQuestions.keys()]
      .map(id => [`questions/${id}.json`.toLowerCase(), id]));
    if (localFlowIds.size !== localFlows.size || localOutputs.size !== localFlows.size
      || localQuestionPaths.size !== localQuestions.size) {
      throw Error('The local bank contains case-insensitive ID or output collisions');
    }
    for (const {flow} of localFlows.values()) {
      const target = path.resolve(stageRoot, flow.output);
      fs.mkdirSync(path.dirname(target), {recursive: true});
      fs.copyFileSync(path.resolve(repositoryRoot, flow.output), target);
    }
    for (const entry of collection.questions) {
      const current = localQuestions.get(entry.question_id);
      if (current) {
        if (entry.version < current.version) throw Error(`Question version regresses: ${entry.question_id}`);
        if (entry.version === current.version && !equal(questionPayload(entry), questionPayload(current))) {
          throw Error(`Question ID/version collision: ${entry.question_id} v${entry.version}`);
        }
        if (entry.version === current.version) continue;
      } else {
        const alias = localQuestionPaths.get(`questions/${entry.question_id}.json`.toLowerCase());
        if (alias) throw Error(`Question filename collides with ${alias}: ${entry.question_id}`);
        stageIndex.questions.push(`questions/${entry.question_id}.json`);
        localQuestionPaths.set(`questions/${entry.question_id}.json`.toLowerCase(), entry.question_id);
      }
      localQuestions.set(entry.question_id, structuredClone(entry));
    }
    for (const flow of collection.flows) {
      const id = flow.form.questionnaire.questionnaire_id;
      const current = localFlows.get(id);
      if (current) {
        const delta = compareVersions(flow.form.questionnaire.questionnaire_version,
          current.flow.form.questionnaire.questionnaire_version);
        if (delta < 0) throw Error(`Questionnaire version regresses: ${id}`);
        if (delta === 0 && !equal(flow, current.flow)) throw Error(`Questionnaire ID/version collision: ${id}`);
        if (delta === 0) continue;
        if (flow.output !== current.flow.output) throw Error(`Questionnaire output path changed: ${id}`);
        localFlows.set(id, {relative: current.relative, flow: structuredClone(flow)});
      } else {
        const aliasId = localFlowIds.get(id.toLowerCase());
        if (aliasId) throw Error(`Questionnaire ID collides with ${aliasId}: ${id}`);
        const aliasOutput = localOutputs.get(outputKey(flow.output));
        if (aliasOutput) throw Error(`Output path collides with ${aliasOutput}: ${flow.output}`);
        const relative = `flows/${path.dirname(flow.output).replace(/^forms[\\/]/, '').replaceAll('\\', '/')}/${id}.json`;
        localFlows.set(id, {relative, flow: structuredClone(flow)});
        localFlowIds.set(id.toLowerCase(), id);
        localOutputs.set(outputKey(flow.output), id);
        stageIndex.flows.push(relative);
      }
    }
    const uses = new Map([...localQuestions.keys()].map(id => [id, {forms: new Set(), variants: new Map()}]));
    for (const [formId, {flow}] of localFlows) {
      for (const section of flow.form.questionnaire.sections ?? []) {
        for (const node of section.questions ?? []) {
          const entry = localQuestions.get(node.question_ref);
          if (!entry || node.question_version !== entry.version || !entry.variants[node.variant]) {
            throw Error(`Merged flows have an invalid reference: ${formId}/${node.question_ref}`);
          }
          const use = uses.get(node.question_ref);
          use.forms.add(formId);
          if (!use.variants.has(node.variant)) use.variants.set(node.variant, new Set());
          use.variants.get(node.variant).add(formId);
        }
      }
    }
    for (const [id, entry] of localQuestions) {
      const use = uses.get(id);
      entry.source_questionnaires = [...use.forms];
      for (const [variantId, variant] of Object.entries(entry.variants)) {
        variant.source_questionnaires = [...(use.variants.get(variantId) ?? [])];
      }
      entry.review_required = Object.keys(entry.variants).length > 1;
      if (use.forms.size) {
        delete entry.retired;
        delete entry.available_for_future;
      } else if (entry.retired !== true) {
        entry.available_for_future = true;
      }
      fs.writeFileSync(path.join(stageBank, `questions/${id}.json`), JSON.stringify(entry, null, 2) + '\n');
    }
    for (const {relative, flow} of localFlows.values()) {
      const target = path.join(stageBank, relative);
      fs.mkdirSync(path.dirname(target), {recursive: true});
      fs.writeFileSync(target, JSON.stringify(flow, null, 2) + '\n');
    }
    stageIndex.questions.sort();
    stageIndex.flows.sort();
    fs.writeFileSync(path.join(stageBank, 'index.json'), JSON.stringify(stageIndex, null, 2) + '\n');
    const generated = execFileSync(process.execPath, [path.join(stageBank, 'build.mjs')], {cwd: stageRoot, encoding: 'utf8'}).trim();
    execFileSync(process.execPath, [path.join(stageBank, 'build.mjs'), '--check'], {cwd: stageRoot, encoding: 'utf8'});
    const bankPaths = ['index.json', 'feed.json', ...stageIndex.questions, ...stageIndex.flows];
    const outputPaths = [...new Set([...localFlows.values()].map(item => item.flow.output))];
    const changedBank = bankPaths.filter(relative => differs(path.join(stageBank, relative), path.join(bankRoot, relative)));
    const changedForms = outputPaths.filter(relative => differs(path.join(stageRoot, relative), path.join(repositoryRoot, relative)));
    if (checkOnly) {
      console.log(`Collection import would change ${changedBank.length} bank files and ${changedForms.length} forms. ${generated}`);
      return;
    }
    for (const relative of changedBank) copyInto(path.join(stageBank, relative), path.join(bankRoot, relative));
    for (const relative of changedForms) copyInto(path.join(stageRoot, relative), path.join(repositoryRoot, relative));
    execFileSync(process.execPath, [path.join(bankRoot, 'build.mjs'), '--check'], {cwd: repositoryRoot, encoding: 'utf8'});
    console.log(`Imported collection: ${changedBank.length} bank files and ${changedForms.length} forms. ${generated}`);
  } finally {
    if (path.dirname(stageRoot) !== repositoryRoot || !path.basename(stageRoot).startsWith('.question-bank-collection-')) {
      throw Error(`Refusing unsafe staging cleanup: ${stageRoot}`);
    }
    fs.rmSync(stageRoot, {recursive: true, force: true});
  }
}

function readJson(file) { return JSON.parse(fs.readFileSync(file, 'utf8')); }
function differs(left, right) { return !fs.existsSync(right) || !fs.readFileSync(left).equals(fs.readFileSync(right)); }
function copyInto(source, target) { fs.mkdirSync(path.dirname(target), {recursive: true}); fs.copyFileSync(source, target); }
function safeOutput(relative) {
  return typeof relative === 'string'
    && /^forms\/(?:[A-Za-z0-9_-]+\/)*[A-Za-z0-9_-]+\.json$/.test(relative)
    && path.resolve(repositoryRoot, relative).startsWith(path.join(repositoryRoot, 'forms') + path.sep);
}
function outputKey(relative) { return path.resolve(repositoryRoot, relative).toLowerCase(); }
function questionPayload(entry) {
  return {project: entry.project, key: entry.key, origin_questionnaire: entry.origin_questionnaire,
    origin_basis: entry.origin_basis, variants: Object.fromEntries(Object.entries(entry.variants)
      .map(([id, variant]) => [id, {schema: variant.schema, translations: variant.translations,
        app_translations: variant.app_translations}]))};
}
function compareVersions(left, right) {
  const parse = value => /^\d+(?:\.\d+)*$/.test(String(value)) ? String(value).split('.').map(Number) : null;
  const a = parse(left), b = parse(right);
  if (!a || !b) throw Error(`Uncomparable questionnaire versions: ${left}/${right}`);
  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    if ((a[i] ?? 0) !== (b[i] ?? 0)) return (a[i] ?? 0) < (b[i] ?? 0) ? -1 : 1;
  }
  return 0;
}
function equal(left, right) { return isDeepStrictEqual(sort(left), sort(right)); }
function sort(value) {
  if (Array.isArray(value)) return value.map(sort);
  if (value && typeof value === 'object') return Object.fromEntries(Object.keys(value).sort().map(key => [key, sort(value[key])]));
  return value;
}

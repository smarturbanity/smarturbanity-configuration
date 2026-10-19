import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {isDeepStrictEqual} from 'node:util';
import {questionId} from './identity.mjs';

const bankRoot = path.dirname(fileURLToPath(import.meta.url));
const repositoryRoot = path.dirname(bankRoot);
const catalog = JSON.parse(fs.readFileSync(path.join(bankRoot, 'index.json'), 'utf8'));
if (catalog.schema_version !== 1) throw Error('Unsupported question bank schema');
const checkOnly = process.argv.includes('--check');
const exportArg = process.argv.indexOf('--export-dir');
const exportDir = exportArg >= 0 ? path.resolve(process.argv[exportArg + 1] ?? '') : null;
if (checkOnly && exportDir) throw Error('--check and --export-dir cannot be combined');
if (exportArg >= 0 && !process.argv[exportArg + 1]) throw Error('--export-dir requires a directory');
if (exportDir) fs.mkdirSync(exportDir, {recursive: true});
const questions = new Map();
const uses = new Map();

if (new Set(catalog.questions).size !== catalog.questions.length || new Set(catalog.flows).size !== catalog.flows.length) {
  throw Error('Question bank index contains duplicate paths');
}

for (const relative of catalog.questions) {
  const file = path.join(bankRoot, relative);
  const entry = JSON.parse(fs.readFileSync(file, 'utf8'));
  if (entry.question_id !== questionId(entry.project, entry.key)) throw Error(`Question id disagrees with project and key: ${relative}`);
  if (!entry.origin_questionnaire || !Array.isArray(entry.source_questionnaires)) throw Error(`Question origin or sources missing: ${relative}`);
  if (questions.has(entry.question_id)) throw Error(`Duplicate question_id: ${entry.question_id}`);
  if (path.basename(file) !== `${entry.question_id}.json` || path.dirname(file) !== path.join(bankRoot, 'questions')) {
    throw Error(`Question path disagrees with project and key: ${relative}`);
  }
  questions.set(entry.question_id, entry);
  uses.set(entry.question_id, {forms: new Set(), variants: new Map()});
}

let count = 0;
let written = 0;
for (const relative of catalog.flows) {
  const flow = JSON.parse(fs.readFileSync(path.join(bankRoot, relative), 'utf8'));
  if (flow.flow_schema_version !== 1) throw Error(`Unsupported flow schema: ${relative}`);
  if (!flow.output || !flow.form) throw Error(`Incomplete flow: ${relative}`);
  const target = path.resolve(repositoryRoot, flow.output);
  if (!target.startsWith(path.join(repositoryRoot, 'forms') + path.sep)) {
    throw Error(`Flow output escapes forms/: ${relative}`);
  }
  const form = structuredClone(flow.form);
  const translations = structuredClone(form.languages ?? {});
  const answerKeys = new Set();
  for (const section of form.questionnaire.sections ?? []) {
    section.questions = (section.questions ?? []).map(node => {
      const entry = questions.get(node.question_ref);
      if (!entry) throw Error(`Unknown question ${node.question_ref} in ${relative}`);
      if (node.question_version !== entry.version) throw Error(`Question version differs for ${node.question_ref} in ${relative}`);
      const variant = entry.variants?.[node.variant];
      if (!variant) throw Error(`Unknown variant ${node.variant} for ${node.question_ref} in ${relative}`);
      if (variant.schema.answer_key !== entry.key) {
        throw Error(`Question key disagrees with flow: ${relative} -> ${node.question_ref}`);
      }
      const question = {...structuredClone(variant.schema), ...structuredClone(node.overrides ?? {})};
      const usage = uses.get(node.question_ref);
      usage.forms.add(form.questionnaire.questionnaire_id);
      if (!usage.variants.has(node.variant)) usage.variants.set(node.variant, new Set());
      usage.variants.get(node.variant).add(form.questionnaire.questionnaire_id);
      const key = question.answer_key;
      if (!key || answerKeys.has(key)) throw Error(`Missing or repeated answer_key ${key} in ${relative}`);
      answerKeys.add(key);
      for (const [language, entries] of Object.entries(variant.translations ?? {})) {
        translations[language] ??= {};
        for (const [source, translated] of Object.entries(entries)) {
          if (source in translations[language] && translations[language][source] !== translated) {
            throw Error(`Conflicting ${language} translation for ${source} in ${relative}`);
          }
          translations[language][source] = translated;
        }
      }
      return question;
    });
  }
  form.languages = translations;
  const current = fs.existsSync(target) ? JSON.parse(fs.readFileSync(target, 'utf8')) : null;
  const unchanged = current !== null && isDeepStrictEqual(sortDeep(form), sortDeep(current));
  if (exportDir) {
    const questionnaireId = form.questionnaire.questionnaire_id;
    if (!/^[A-Za-z0-9_]+$/.test(questionnaireId)) throw Error(`Unsafe questionnaire id: ${questionnaireId}`);
    fs.writeFileSync(path.join(exportDir, `${questionnaireId}.json`), unchanged
      ? fs.readFileSync(target)
      : JSON.stringify(form, null, 2) + '\n');
    written++;
  } else if (checkOnly) {
    if (!unchanged) throw Error(`Generated form differs: ${flow.output}`);
  } else if (!unchanged) {
    fs.writeFileSync(target, JSON.stringify(form, null, 2) + '\n');
    written++;
  }
  count++;
}
for (const [id, entry] of questions) {
  const usage = uses.get(id);
  if (!sameSet(usage.forms, entry.source_questionnaires)) throw Error(`Source questionnaires disagree for ${id}`);
  if (entry.retired === true && usage.forms.size) throw Error(`Retired question is still used: ${id}`);
  if (entry.retired !== true && entry.available_for_future !== true && !usage.forms.size) {
    throw Error(`Unused question must be marked retired or available_for_future: ${id}`);
  }
  if (entry.review_required !== (Object.keys(entry.variants).length > 1)) throw Error(`Review flag disagrees for ${id}`);
  for (const [variantId, variant] of Object.entries(entry.variants)) {
    if (!sameSet(usage.variants.get(variantId) ?? new Set(), variant.source_questionnaires)) {
      throw Error(`Variant sources disagree for ${id}/${variantId}`);
    }
  }
}
console.log(checkOnly
  ? `Verified ${count} questionnaire forms from ${questions.size} question files.`
  : exportDir
    ? `Exported ${written} standalone questionnaires from ${questions.size} question files to ${exportDir}.`
    : `Checked ${count} questionnaire forms from ${questions.size} question files; wrote ${written} changed forms.`);

function sameSet(actual, expected) {
  return actual.size === expected.length && expected.every(value => actual.has(value));
}

function sortDeep(value) {
  if (Array.isArray(value)) return value.map(sortDeep);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.keys(value).sort().map(key => [key, sortDeep(value[key])]));
  }
  return value;
}

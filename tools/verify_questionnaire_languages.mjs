import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const revisionFile = process.argv[2];
assert.ok(revisionFile, 'Pass the actual QuestionnaireRevision.js consumer');
const context = vm.createContext({});
vm.runInContext(fs.readFileSync(revisionFile, 'utf8'), context);
const shared = new Set(['#Other', '#None of these', "#I don't know", '#Prefer not to say']);
let questionnaires = 0;
for (const name of fs.readdirSync(path.join(root, 'forms/surveys'), {recursive: true}).filter(file => file.endsWith('.json'))) {
  const data = JSON.parse(fs.readFileSync(path.join(root, 'forms/surveys', name), 'utf8'));
  if (!data.questionnaire) continue;
  const authored = context.questionnaireTextTags(data.questionnaire);
  for (const tag of authored) {
    if (shared.has(tag)) continue;
    assert.ok(data.languages.en[tag], name + '/en: missing questionnaire text ' + tag);
  }
  for (const [language, table] of Object.entries(data.languages)) {
    const framework = JSON.parse(fs.readFileSync(path.join(path.dirname(revisionFile), 'Configuration/languages', language + '.json'), 'utf8'));
    for (const tag of shared) {
      assert.ok(!Object.hasOwn(table, tag), name + '/' + language + ': framework label duplicated ' + tag);
      assert.ok(framework[tag], language + ': missing framework label ' + tag);
    }
  }
  questionnaires++;
}
assert.equal(questionnaires, 20);
console.log(JSON.stringify({result: 'PASS', questionnaires, checks: ['actual app text tags', 'standard choices owned by framework dictionaries']}));

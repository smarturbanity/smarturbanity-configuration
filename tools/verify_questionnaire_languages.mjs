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
let questionnaires = 0;
const flags = ['add_none', 'add_other', 'add_i_dont_know', 'add_prefer_not_to_say'];
for (const name of fs.readdirSync(path.join(root, 'forms/surveys'), {recursive: true}).filter(file => file.endsWith('.json'))) {
  const file = JSON.parse(fs.readFileSync(path.join(root, 'forms/surveys', name), 'utf8'));
  if (!file.questionnaire) continue;
  for (const tag of context.questionnaireTextTags(file.questionnaire)) {
    assert.ok(file.languages.en[tag], name + '/en: missing text ' + tag);
  }
  const generated = new Set();
  for (const question of file.questionnaire.sections.flatMap(section => section.questions)) {
    const options = {};
    for (const flag of flags) options[flag] = question[flag];
    for (const tag of context.questionnaireRevisionTranslationTokens(options)) {
      if (tag.startsWith('#')) generated.add(tag);
    }
    if (question.question_type === 'matrix' && question.add_other) generated.add('#Please specify');
  }
  for (const [language, table] of Object.entries(file.languages)) {
    for (const tag of generated) assert.ok(table[tag], name + '/' + language + ': missing generated label ' + tag);
  }
  questionnaires++;
}
assert.equal(questionnaires, 20);
console.log(JSON.stringify({result: 'PASS', questionnaires, checks: ['actual questionnaireTextTags coverage', 'generated labels in every questionnaire language']}));

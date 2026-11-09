import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const consumer = process.argv[2];
assert.ok(consumer, 'Pass the actual QuestionnaireConditions.js consumer');
const sandbox = fs.mkdtempSync(path.join(os.tmpdir(), 'sectioned-surveys-'));
fs.cpSync(path.join(root, 'forms'), path.join(sandbox, 'forms'), {recursive: true});
fs.mkdirSync(path.join(sandbox, 'tools'));
fs.mkdirSync(path.join(sandbox, 'pilots/rome'), {recursive: true});
for (const file of ['tools/verify_survey_bundles.mjs', 'tools/sectioned-surveys.json', 'pilots/rome/survey_campaigns.json']) {
  fs.copyFileSync(path.join(root, file), path.join(sandbox, file));
}
const verify = () => spawnSync(process.execPath, [path.join(sandbox, 'tools/verify_survey_bundles.mjs'), consumer], {encoding: 'utf8'});
const inventory = JSON.parse(fs.readFileSync(path.join(sandbox, 'tools/sectioned-surveys.json'), 'utf8'));
const file = path.join(sandbox, 'forms/surveys', inventory.questionnaires[0].id + '.json');
const original = fs.readFileSync(file, 'utf8');

test('current questionnaires validate without retired sources', () => {
  const result = verify();
  assert.equal(result.status, 0, result.stderr);
});
test('rejects reintroduced small mode questionnaires', () => {
  const extra = path.join(sandbox, 'forms/surveys/smarturbanity_walking_habits.json');
  fs.writeFileSync(extra, original);
  assert.notEqual(verify().status, 0);
  fs.unlinkSync(extra);
});
test('rejects a lost question', () => {
  const form = JSON.parse(original);
  form.questionnaire.sections[0].questions.pop();
  fs.writeFileSync(file, JSON.stringify(form));
  assert.notEqual(verify().status, 0);
  fs.writeFileSync(file, original);
});
test('rejects a broken non-user section gate', () => {
  const form = JSON.parse(original);
  delete form.questionnaire.sections[1].show_if;
  fs.writeFileSync(file, JSON.stringify(form));
  assert.notEqual(verify().status, 0);
  fs.writeFileSync(file, original);
});

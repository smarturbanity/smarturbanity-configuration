import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = name => JSON.parse(fs.readFileSync(path.join(root, name), 'utf8'));
const conditionsFile = process.argv[2];
assert.ok(conditionsFile, 'Pass the actual QuestionnaireConditions.js consumer');
const context = vm.createContext({});
vm.runInContext(fs.readFileSync(path.join(path.dirname(conditionsFile), 'QuestionnaireModel.js'), 'utf8'), context);
vm.runInContext(fs.readFileSync(conditionsFile, 'utf8'), context);
const match = (schema, answers) => context.questionnaireMatchesShowIf(schema, answers);
const inventory = read('tools/sectioned-surveys.json').questionnaires;
const index = read('forms/index.json');
const campaigns = read('pilots/rome/survey_campaigns.json');
const catalogue = new Map(index.questionnaires.map(p => {
  const data = read('forms/' + p);
  return [data.questionnaire.questionnaire_id, data];
}));
assert.equal(catalogue.size, index.questionnaires.length);
const modeIds = new Set(inventory.map(item => item.id));
assert.equal(modeIds.size, 16);
const modes = ['walking', 'cycling', 'e_scooter', 'public_transport', 'car', 'motorcycle'];
const modeFiles = fs.readdirSync(path.join(root, 'forms/surveys')).filter(file =>
  modes.some(mode => file.startsWith('smarturbanity_' + mode + '_')) && file.endsWith('.json'));
assert.deepEqual(modeFiles.sort(), [...modeIds].map(id => id + '.json').sort(), 'Only current mode surveys may remain');
let questions = 0;
let screens = 0;
for (const report of inventory) {
  const bundle = catalogue.get(report.id);
  assert.ok(bundle, report.id);
  const qn = bundle.questionnaire;
  assert.ok(qn.estimated_minutes <= 6);
  assert.deepEqual(qn.sections.map(section => ({title: section.title,
    question_ids: section.questions.map(question => question.question_id)})), report.sections,
  report.id + ': question coverage and order');
  assert.equal(context.questionnaireShowIfOrderErrors(qn).length, 0, report.id);
  const allQuestions = qn.sections.flatMap(section => section.questions);
  assert.equal(new Set(allQuestions.map(question => question.question_id)).size, allQuestions.length);
  const stop = campaigns.surveys_gallery.follow_up_stop_when[report.id];
  const gate = stop ? Object.keys(stop)[0] : null;
  if (gate) assert.equal(allQuestions[0].answer_key, gate);
  for (const [si, section] of qn.sections.entries()) {
    for (const [qi, question] of section.questions.entries()) {
      if (gate && si === 0 && qi >= 2) assert.equal(match(question, {[gate]: 'no'}), false);
      for (const lang of ['en', 'it', 'fr', 'de', 'tr', 'fa', 'hu', 'ar']) {
        const labels = (question.options ?? []).map(option => option.text).filter(text => typeof text === 'string');
        const translated = labels.map(text => bundle.languages[lang][text.startsWith('#') ? text : '#' + text] ?? text);
        assert.equal(new Set(translated).size, translated.length, report.id + '/' + question.question_id + '/' + lang + ': duplicate option labels');
      }
      questions++;
    }
    if (gate && si > 0) {
      assert.equal(match(section, {[gate]: 'no'}), false);
      assert.equal(match(section, {[gate]: 'yes'}), true);
    }
    for (const lang of ['en', 'it', 'fr', 'de', 'tr', 'fa', 'hu', 'ar']) {
      const table = bundle.languages[lang];
      assert.ok(table['#' + qn.title]);
      const welcome = table['#' + qn.welcome_page.description];
      assert.ok(welcome);
      const numericWelcome = welcome.replace(/[۰-۹٠-٩]/g, n => String(n.charCodeAt(0) % 16));
      assert.ok(numericWelcome.includes('36'), report.id + '/' + lang + ' retention');
      assert.equal((welcome.match(/<li>/g) ?? []).length, report.sections.length);
    }
    screens++;
  }
  if (gate) assert.deepEqual(campaigns.surveys_gallery.follow_up_stop_when[report.id], {[gate]: ['no']});
}
assert.equal(screens, 51);
assert.equal(questions, 258);
assert.equal(inventory.length, 16);
for (const c of Object.values(campaigns.campaigns)) {
  for (const id of c.questionnaires) assert.ok(catalogue.has(id), 'Missing campaign target ' + id);
  if (c.questionnaires.some(id => inventory.some(b => b.id === id))) assert.equal(c.enabled, false);
}
for (const [from, to] of Object.entries(campaigns.surveys_gallery.follow_ups)) {
  assert.ok(catalogue.has(from) && catalogue.has(to));
  const seen = new Set([from]);
  let current = to;
  while (current) {
    assert.ok(!seen.has(current), 'Follow-up cycle');
    seen.add(current);
    current = campaigns.surveys_gallery.follow_ups[current];
  }
}
console.log(JSON.stringify({result: 'PASS', questionnaires: inventory.length, sections: screens, questions, catalogueForms: catalogue.size, languages: 8, consumer: 'actual QuestionnaireConditions.js'}));

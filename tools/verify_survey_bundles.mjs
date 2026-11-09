import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = name => JSON.parse(fs.readFileSync(path.join(root, name), 'utf8'));
const conditionsFile = process.argv[2];
assert.ok(conditionsFile, 'Pass the actual QuestionnaireConditions.js consumer');
const context = vm.createContext({});
vm.runInContext(fs.readFileSync(path.join(path.dirname(conditionsFile), 'QuestionnaireModel.js'), 'utf8'), context);
vm.runInContext(fs.readFileSync(conditionsFile, 'utf8'), context);
const match = (schema, answers) => context.questionnaireMatchesShowIf(schema, answers);
const manifest = read('tools/survey-bundles/manifest.json');
const index = read('forms/index.json');
const campaigns = read('pilots/rome/survey_campaigns.json');
const catalogue = new Map(index.questionnaires.map(p => {
  const data = read('forms/' + p);
  return [data.questionnaire.questionnaire_id, data];
}));
assert.equal(catalogue.size, index.questionnaires.length);
const sourceIds = new Set();
let questions = 0;
let screens = 0;
for (const report of manifest.bundles) {
  const bundle = catalogue.get(report.id);
  assert.ok(bundle, report.id);
  const qn = bundle.questionnaire;
  assert.ok(qn.estimated_minutes <= 6);
  assert.equal(qn.sections.length, report.sources.length);
  assert.equal(context.questionnaireShowIfOrderErrors(qn).length, 0, report.id);
  const spec = fs.readdirSync(path.join(root, 'tools/survey-bundles')).filter(p => p !== 'manifest.json').map(p => read('tools/survey-bundles/' + p)).flatMap(s => s.bundles).find(b => report.id.endsWith('_' + b.suffix));
  assert.ok(spec);
  const sourceForms = report.sources.map(source => {
    const bytes = fs.readFileSync(path.join(root, source.path));
    assert.equal(createHash('sha256').update(bytes.toString('utf8').replace(/\r\n/g, '\n')).digest('hex'), source.sha256);
    const data = JSON.parse(bytes);
    assert.ok(!sourceIds.has(data.questionnaire.questionnaire_id));
    sourceIds.add(data.questionnaire.questionnaire_id);
    assert.ok(!catalogue.has(data.questionnaire.questionnaire_id));
    return data;
  });
  const screening = sourceForms[0].questionnaire.questionnaire_id.endsWith('_habits');
  const gate = screening ? qn.sections[0].questions[0].answer_key : null;
  for (const [si, section] of qn.sections.entries()) {
    const original = sourceForms[si];
    const before = original.questionnaire.sections.flatMap(s => s.questions ?? []);
    assert.equal(section.questions.length, before.length);
    assert.equal(new Set(section.questions.map(q => q.text)).size, section.questions.length, 'Duplicate answer text in section');
    for (const [qi, question] of section.questions.entries()) {
      const actual = structuredClone(question);
      const expected = structuredClone(before[qi]);
      if (si === 0 && screening && qi >= 2) {
        delete actual.show_if;
        delete expected.show_if;
        assert.equal(match(question, {[gate]: 'no'}), false);
        const yes = {[gate]: 'yes'};
        assert.equal(match(question, yes), match(before[qi], yes));
      }
      assert.deepEqual(actual, expected, report.id + '/' + question.question_id);
      questions++;
    }
    if (gate && si > 0) {
      assert.equal(match(section, {[gate]: 'no'}), false);
      assert.equal(match(section, {[gate]: 'yes'}), true);
    }
    for (const lang of ['en', 'it', 'fr', 'de', 'tr', 'fa', 'hu', 'ar']) {
      const table = bundle.languages[lang];
      assert.ok(table['#' + qn.title]);
      for (const [key, translated] of Object.entries(original.languages[lang])) {
        if (!Object.hasOwn(table, key)) continue;
        const approved = spec.translationOverrides?.[lang]?.[key];
        assert.equal(table[key], approved ?? translated, report.id + '/' + lang + '/' + key);
      }
      const welcome = table['#' + qn.welcome_page.description];
      const sourceWelcome = sourceForms[0].questionnaire.welcome_page.description;
      assert.ok(welcome.startsWith(sourceForms[0].languages[lang]['#' + sourceWelcome] ?? sourceWelcome));
      const numericWelcome = welcome.replace(/[۰-۹٠-٩]/g, n => String(n.charCodeAt(0) % 16));
      assert.ok(numericWelcome.includes('36'), report.id + '/' + lang + ' retention');
      assert.equal((welcome.match(/<li>/g) ?? []).length, report.sources.length);
    }
    screens++;
  }
  if (gate) assert.deepEqual(campaigns.surveys_gallery.follow_up_stop_when[report.id], {[gate]: ['no']});
}
assert.equal(sourceIds.size, 51);
assert.equal(manifest.bundles.length, 16);
for (const c of Object.values(campaigns.campaigns)) {
  for (const id of c.questionnaires) assert.ok(catalogue.has(id), 'Missing campaign target ' + id);
  if (c.questionnaires.some(id => manifest.bundles.some(b => b.id === id))) assert.equal(c.enabled, false);
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
console.log(JSON.stringify({result: 'PASS', sourceForms: sourceIds.size, bundles: manifest.bundles.length, sections: screens, preservedQuestions: questions, catalogueForms: catalogue.size, languages: 8, consumer: 'actual QuestionnaireConditions.js'}));

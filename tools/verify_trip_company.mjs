import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const app = process.argv[2];
assert.ok(app, 'Pass the CityMaaS checkout');
const context = vm.createContext({questionnaireGetSelectableOptions: question => question.options});
for (const [file, name] of [
  ['Questionnaires/QuestionnaireModel.js', 'questionnaireIsExclusiveMultipleOption'],
  ['Questionnaires/GuidedFlow/GuidedFlowForms.js', 'guidedFlowToggleOption'],
  ['Questionnaires/Viewing/QuestionnaireVisualizator.js', 'questionnaireApplyExclusiveCheckSelection']
]) {
  const source = fs.readFileSync(app + '/CityMaasRoot/' + file, 'utf8');
  const declaration = source.match(new RegExp('^function ' + name + '\\([^]*?^}', 'm'));
  assert.ok(declaration, 'Missing actual app function: ' + name);
  vm.runInContext(declaration[0], context);
}
const data = JSON.parse(fs.readFileSync(new URL('../forms/tripSurveys/smarturbanity_pre_trip.json', import.meta.url), 'utf8'));
const questions = data.questionnaire.sections.flatMap(section => section.questions);
const company = questions.find(question => question.answer_key === 'trip_company');
const load = questions.find(question => question.answer_key === 'trip_load_and_pet');
const alone = company.options.find(option => option.value === 'alone');
assert.equal(alone.exclusive, true);
for (const option of company.options.filter(option => option !== alone)) {
  assert.deepEqual([...context.guidedFlowToggleOption(company, [alone.text], option.text).selected], [option.text]);
  assert.deepEqual([...context.guidedFlowToggleOption(company, [option.text], alone.text).selected], [alone.text]);
}
assert.equal(context.guidedFlowToggleOption(company, ['With other adults'], 'With children or teenagers (on foot or in the car)').selected.length, 2);
assert.deepEqual(load.options.map(option => option.value), ['heavy_bags', 'pet']);
assert.equal(load.required, false);
for (const selected of company.options) {
 const checks = company.options.map(schema => ({schema, input: {checked: true}, setInput(value) {this.input.checked = value;}}));
 const target = checks.find(check => check.schema === selected);
 context.questionnaireApplyExclusiveCheckSelection({group: {checks}}, target.input);
 assert.equal(checks.find(check => check.schema === alone).input.checked, selected === alone);
 if (selected === alone) assert.equal(checks.filter(check => check.input.checked).length, 1);
}
console.log('PASS: actual guided and form controls reject alone with companions in both orders; adults and children can coexist; bags and pets remain independent');

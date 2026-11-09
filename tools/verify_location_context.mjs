import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const consumer = process.argv[2];
assert.ok(consumer, 'Pass the actual QuestionnaireConditions.js consumer');
const context = vm.createContext({});
for (const name of ['QuestionnaireModel.js', 'QuestionnaireConditions.js']) {
  vm.runInContext(fs.readFileSync(path.join(path.dirname(consumer), name), 'utf8'), context);
}
for (const name of ['street_connection_assessment', 'street_segment_assessment']) {
  const data = JSON.parse(fs.readFileSync(path.join(root, 'forms/locationReports', name + '.json'), 'utf8'));
  const questions = data.questionnaire.sections.flatMap(s => s.questions);
  const byId = Object.fromEntries(questions.map(q => [q.question_id, q]));
  assert.equal(new Set(questions.map(q => q.question_id)).size, questions.length);
  assert.equal(context.questionnaireShowIfOrderErrors(data.questionnaire).length, 0);
  const trip = byId.journey_context, support = byId.trip_mobility_support;
  assert.equal(trip.privacy_classification, 'heightened_personal');
  assert.equal(support.required, false);
  assert.equal(support.privacy_classification, 'special_category_health');
  assert.deepEqual(support.options.map(o => o.value), ['mobility_aid', 'stroller']);
  assert.ok(!trip.options.some(o => ['mobility_aid', 'stroller'].includes(o.value)));
  assert.equal(Object.keys(support.show_if).length, 0, 'Optional support cannot gate the report');
  for (const q of [trip, support]) {
    assert.equal(q.add_none, true);
    assert.equal(q.add_prefer_not_to_say, true);
    const refusal = context.questionnaireGetTechnicalOptions(q).find(o => o.value === 'Prefer not to say');
    assert.ok(refusal);
    assert.ok(!q.options.some(o => o.value === refusal.value));
  }
  for (const table of Object.values(data.languages)) assert.ok(table['#' + support.text]?.trim());
  if (name === 'street_connection_assessment') {
    const answers = {continue_audit:'yes_audit',connection_form:'street_level',crossing_kind:'signal'};
    for (const traffic_control of ['protected_signal','permissive_signal_with_turning_conflict','unclear_signal_priority']) {
      assert.equal(context.questionnaireMatchesShowIf(byId.signal_call, {...answers,traffic_control}), true);
    }
    assert.equal(context.questionnaireMatchesShowIf(byId.signal_call, {...answers,traffic_control:'signal_broken'}), false);
    assert.equal(context.questionnaireMatchesShowIf(byId.signal_call, {...answers,continue_audit:'no',traffic_control:'protected_signal'}), false);
  }
}
console.log(JSON.stringify({result:'PASS',forms:2,languages:8,checks:['optional separate support','refusal distinct from none','actual consumer conditional paths','question ordering'],limitations:['Source and actual model/condition checks; browser submission and native-language acceptance not exercised.']}));

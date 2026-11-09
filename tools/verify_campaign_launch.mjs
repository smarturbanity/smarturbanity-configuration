import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = file => JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'));
assert.ok(process.argv[2], 'Pass the CityMaaS checkout');
const source = fs.readFileSync(path.join(process.argv[2], 'CityMaasRoot/Questionnaires/QuestionnaireCampaigns.js'), 'utf8');
const schedule = read('pilots/rome/survey_campaigns.json');
assert.equal(Object.hasOwn(schedule.rules, 'show_all_in_debug'), false, 'Debug policy belongs to application code');
const forms = read('forms/index.json').questionnaires.map(file => read('forms/' + file).questionnaire.questionnaire_id);
const open = ['smarturbanity_walking_trips_and_safety', 'smarturbanity_your_profile'].sort();
const assigned = new Set();
for (const campaign of Object.values(schedule.campaigns)) {
  for (const id of campaign.questionnaires) {
    assert.ok(forms.includes(id), id);
    assert.ok(!assigned.has(id), 'Duplicate campaign membership: ' + id);
    assigned.add(id);
  }
  if (!campaign.enabled) {
    assert.equal(campaign.publication_state, 'coming-soon');
    assert.ok(!campaign.window.valid_from && !campaign.window.from_week, 'No invented opening date');
  }
}
let cases = 0;
for (const debug of [false, true]) for (const review of [false, true]) {
  const context = vm.createContext({app: {config: {debug: {review_mode: review}}}, isDebug: debug});
  vm.runInContext(source, context);
  for (const day of ['2026-11-09', '2026-11-14', '2027-05-01']) {
    const offered = forms.filter(id => context.questionnaireGetScheduleOffer(schedule, id, new Date(day + 'T12:00:00Z')).offered).sort();
    assert.deepEqual(offered, open, day);
    cases += forms.length;
  }
  assert.equal(context.questionnaireGetScheduleOffer(schedule, open[0], new Date('2026-11-08T12:00:00Z')).offered, false);
  for (const id of open) {
    const next = schedule.surveys_gallery.follow_ups[id];
    assert.ok(next, 'Existing follow-up relation retained');
    assert.equal(context.questionnaireGetScheduleOffer(schedule, next, new Date('2026-11-14T12:00:00Z')).offered, false);
  }
}
assert.deepEqual(read('pilots/rome/application.json').settings.applications.smart_urbanity_access_together.accessTogether.contentsAvailability,
  {services: true, connections: true, experiences: false, streets: false});
console.log(JSON.stringify({result: 'PASS', forms: forms.length, calendarCases: cases, open, blocks: 4, consumer: 'actual QuestionnaireCampaigns.js'}));

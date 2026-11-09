const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {createRequire} = require('node:module');

const appRoot = path.resolve(process.argv[2]);
const appRequire = createRequire(path.join(appRoot, 'package.json'));
const {chromium, expect} = appRequire('@playwright/test');
const {createFixtureServer, openQuestionnaire, loadQuestionnaire} = require(path.join(appRoot, 'tests/e2e/questionnaires/consent-gate.test.js'));
const root = path.resolve(__dirname, '..');
const form = JSON.parse(fs.readFileSync(path.join(root, 'forms/surveys/smarturbanity_your_profile.json'), 'utf8'));
const questions = form.questionnaire.sections.flatMap(section => section.questions);
const cases = [
  {name: 'resident-worker', expected: 21, answers: {residence: 'live', household_vehicles: ['car'], driving_licence: 'yes', employment: ['employed_full_time']}},
  {name: 'commuter-platform-worker', expected: 18, answers: {residence: 'travel', household_vehicles: ['bicycle_e_bike'], driving_licence: 'no', employment: ['platform_work']}},
  {name: 'visitor-not-working', expected: 16, answers: {residence: 'services', household_vehicles: ['no_vehicle_available'], driving_licence: 'no', employment: ['unemployed_looking']}}
];

async function main() {
  const fixture = createFixtureServer();
  await new Promise(resolve => fixture.server.listen(0, '127.0.0.1', resolve));
  let browser;
  const results = [];
  try {
    const launch = {headless: true};
    if (process.env.CHROME_PATH) launch.executablePath = process.env.CHROME_PATH;
    browser = await chromium.launch(launch);
    for (const language of ['en', 'it']) for (const scenario of cases) {
      const page = await browser.newPage({viewport: language === 'it' ? {width: 390, height: 844} : {width: 1100, height: 850}, serviceWorkers: 'block'});
      page.gateReloaded = true;
      const {errors} = await openQuestionnaire(browser, 'http://127.0.0.1:' + fixture.server.address().port, fixture.root, fixture.fixtures, {enabled: false}, page, form);
      await page.evaluate(language => {app.user.questionnaire_language = language; app.user.app_language = language;}, language);
      await loadQuestionnaire(page, form);
      const button = async text => page.getByRole('button', {name: await page.evaluate(text => getTextLang('#' + text), text), exact: true}).filter({visible: true});
      await (await button('Start')).click();
      const seen = new Set();
      for (let step = 0; step < 40; step++) {
        for (const question of questions) {
          const block = page.locator('.questionnaire-response-question').filter({visible: true}).and(page.locator('[id=' + JSON.stringify(question.text) + ']'));
          if (!(await block.count())) continue;
          seen.add(question.answer_key);
          if (question.answer_key === 'mobility_support_used') {
            await expect(block.getByLabel(language === 'it' ? 'Nessuna di queste' : 'None of these', {exact: true})).toBeVisible();
          }
          let values = scenario.answers[question.answer_key];
          if (question.answer_key === 'age_group') values = ['35_44'];
          if (question.answer_key === 'gender') {
            const label = language === 'it' ? 'Preferisco non rispondere' : 'Prefer not to say';
            await block.getByLabel(label, {exact: true}).check();
          }
          if (values === undefined) continue;
          if (!Array.isArray(values)) values = [values];
          for (const value of values) {
            const option = question.options.find(option => option.value === value);
            const label = form.languages[language]['#' + option.text] ?? option.text;
            await block.getByLabel(label, {exact: true}).check();
          }
        }
        const submit = await button('Submit');
        if (await submit.count()) {await submit.click();break;}
        const next = await button('Next');
        assert.equal(await next.count(), 1, 'Expected a way to continue');
        await next.click();
      }
      assert.equal(seen.size, scenario.expected, scenario.name + ': visible question count');
      await expect.poll(() => page.evaluate(() => gateSubmissions.length)).toBe(1);
      const submission = await page.evaluate(() => gateSubmissions[0]);
      assert.ok(JSON.stringify(submission).includes('smarturbanity_your_profile'));
      assert.ok(JSON.stringify(submission).includes('2.1.0'));
      assert.ok(JSON.stringify(submission).includes('employment'));
      assert.deepEqual(errors, []);
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), 'No horizontal overflow');
      results.push({scenario: scenario.name, language, visibleQuestions: seen.size, submissions: 1});
      await page.close();
    }
    console.log(JSON.stringify({result: 'PASS', appRoot, cases: results}));
  } finally {
    if (browser) await browser.close();
    await new Promise(resolve => fixture.server.close(resolve));
  }
}
main().catch(error => {console.error(error); process.exitCode = 1;});

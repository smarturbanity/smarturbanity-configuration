const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {createRequire} = require('node:module');
const appRoot = path.resolve(process.argv[2]);
const output = path.resolve(process.argv[3]);
const appRequire = createRequire(path.join(appRoot, 'package.json'));
const {chromium, expect} = appRequire('@playwright/test');
const {createFixtureServer, openQuestionnaire, loadQuestionnaire} = require(path.join(appRoot, 'tests/e2e/questionnaires/consent-gate.test.js'));
const root = path.resolve(__dirname, '..');
const forms = ['surveys/smarturbanity_your_profile', 'locationReports/street_connection_assessment', 'locationReports/street_segment_assessment'];

async function main() {
  fs.mkdirSync(output, {recursive: true});
  const fixture = createFixtureServer();
  await new Promise(resolve => fixture.server.listen(0, '127.0.0.1', resolve));
  const browser = await chromium.launch();
  const results = [];
  try {
    for (const name of forms) for (const choice of ['none', 'refusal', 'skip', 'positive']) {
      const form = JSON.parse(fs.readFileSync(path.join(root, 'forms', name + '.json')));
      const id = form.questionnaire.questionnaire_id;
      const questions = form.questionnaire.sections.flatMap(section => section.questions);
      const targets = id === 'smarturbanity_your_profile' ? ['mobility_support_used'] : ['journey_context', 'trip_mobility_support', 'personal_day_unsafe', 'personal_evening_unsafe'];
      const page = await browser.newPage({viewport: {width: 430, height: 932}, serviceWorkers: 'block'});
      page.gateReloaded = true;
      const {errors} = await openQuestionnaire(browser, 'http://127.0.0.1:' + fixture.server.address().port, fixture.root, fixture.fixtures, {enabled: false}, page, form);
      await page.evaluate(() => {app.user.questionnaire_language = 'it'; app.user.app_language = 'it';});
      await loadQuestionnaire(page, form);
      let step = 0;
      const prefix = id + '-' + choice;
      async function click(locator) {
        await locator.scrollIntoViewIfNeeded();
        const n = String(++step).padStart(3, '0');
        await page.screenshot({path: path.join(output, prefix + '-' + n + '-before.png'), fullPage: true});
        await locator.evaluate(element => element.style.outline = '4px solid orange');
        await page.screenshot({path: path.join(output, prefix + '-' + n + '-target.png'), fullPage: true});
        await locator.evaluate(element => element.style.removeProperty('outline'));
        await locator.click();
      }
      const button = text => page.getByRole('button', {name: text, exact: true}).filter({visible: true});
      await click(button('Inizia'));
      const seen = new Set();
      for (let iteration = 0; iteration < 50; iteration++) {
        for (const question of questions) {
          const block = page.locator('.questionnaire-response-question').filter({visible: true}).and(page.locator('[id=' + JSON.stringify(question.text) + ']'));
          if (!await block.count()) continue;
          const key = question.question_id || question.answer_key;
          if (seen.has(key)) continue;
          seen.add(key);
          if (targets.includes(key)) {
            if (key === 'mobility_support_used') {
              await expect(block.getByLabel('Sedia a rotelle motorizzata o scooter per la mobilità', {exact: true})).toBeVisible();
              await expect(block.getByLabel('Sedia a rotelle manuale', {exact: true})).toBeVisible();
            }
            let label;
            if (choice === 'refusal') label = 'Preferisco non rispondere';
            if (choice === 'none' && question.add_none) label = 'Nessuna di queste';
            if (choice === 'none' && key.startsWith('personal_')) label = 'No';
            if (choice === 'positive') {
              const option = question.options.find(option => option.value === 'powered_wheelchair') || question.options[0];
              label = form.languages.it['#' + option.text] || option.text;
            }
            if (label) await click(block.getByLabel(label, {exact: true}));
            else if (question.required) await click(block.getByLabel('Preferisco non rispondere', {exact: true}));
          } else if (key === 'age_group') {
            await click(block.getByLabel('35-44 anni', {exact: true}));
          } else if (question.required) {
            const option = question.options[0];
            await click(block.getByLabel(form.languages.it['#' + option.text] || option.text, {exact: true}));
          }
        }
        if (await button('Invia').count()) {await click(button('Invia')); break;}
        assert.equal(await button('Avanti').count(), 1, prefix + ': missing continuation');
        await click(button('Avanti'));
      }
      await expect.poll(() => page.evaluate(() => gateSubmissions.length)).toBe(1);
      const submission = await page.evaluate(() => gateSubmissions[0]);
      fs.writeFileSync(path.join(output, prefix + '-submission.json'), JSON.stringify(submission, null, 2));
      fs.writeFileSync(path.join(output, prefix + '-seen.json'), JSON.stringify([...seen]));
      await page.screenshot({path: path.join(output, prefix + '-after.png'), fullPage: true});
      assert.deepEqual(errors, []);
      for (const target of targets) {
        assert(seen.has(target), prefix + ': target not seen: ' + target);
        const question = questions.find(question => question.question_id === target);
        const answer = Object.values(submission.questionnaireAnswers).map(section => section[question.text]).find(Boolean);
        const selected = Object.entries(answer || {}).filter(([, value]) => value === true).map(([key]) => key);
        let expected = [];
        if (choice === 'refusal' || (choice === 'skip' && question.required)) expected = ['Prefer not to say'];
        if (choice === 'none') expected = [question.add_none ? 'None of these' : 'No'];
        if (choice === 'positive') expected = [(question.options.find(option => option.value === 'powered_wheelchair') || question.options[0]).text];
        assert.deepEqual(selected, expected, prefix + ': serialized answer for ' + target);
      }
      results.push({id, choice, targets, submitted: true, errors});
      await page.close();
    }
    fs.writeFileSync(path.join(output, 'browser-results.json'), JSON.stringify(results, null, 2));
    console.log(JSON.stringify({result: 'PASS', cases: results.length, output, limitation: 'Actual questionnaire editor in a browser fixture; not the guided location-selection journey or remote backend.'}));
  } finally {
    await browser.close();
    await new Promise(resolve => fixture.server.close(resolve));
  }
}
main().catch(error => {console.error(error); process.exitCode = 1;});

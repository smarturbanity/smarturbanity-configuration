const fs = require('node:fs');
const assert = require('node:assert/strict');
const path = require('node:path');
const {createRequire} = require('node:module');
const appRoot = path.resolve(process.argv[2]);
const appRequire = createRequire(path.join(appRoot, 'package.json'));
const {chromium} = appRequire('@playwright/test');
const {stubFirebase} = require(appRoot + '/tests/e2e/shared/firebase-stub');
const {startFromLanding} = require(appRoot + '/tests/e2e/smarturbanity/configuration-fixture');
const config = path.resolve(__dirname, '..');
(async () => {
 const launch = {headless: true};
 if (process.env.CHROME_PATH) launch.executablePath = process.env.CHROME_PATH;
 const browser = await chromium.launch(launch);
 try {
 const context = await browser.newContext({viewport:{width:390,height:844},serviceWorkers:'block'});
 await context.route('**/*', r => ['GET','HEAD','OPTIONS'].includes(r.request().method()) ? r.fallback() : r.abort());
 const page = await context.newPage();
 await stubFirebase(page);
 await page.route(url => url.pathname.includes('/forms/') || url.pathname.endsWith('/survey_campaigns.json'), route => {
   const url = new URL(route.request().url());
   const relative = url.pathname.includes('/forms/') ? 'forms/' + url.pathname.split('/forms/')[1] : 'pilots/rome/survey_campaigns.json';
   let file = path.join(config,relative);
   if(fs.existsSync(file) && fs.statSync(file).isDirectory()) file=path.join(file,'index.json');
   if(fs.existsSync(file)) return route.fulfill({path:file});
   return route.fallback();
 });
 await page.goto(process.argv[3]);
 await startFromLanding(page);
 assert.equal(await page.evaluate(()=>app.colls.questionnaires.smarturbanity_your_profile?.questionnaire?.questionnaire_version), '2.0.0');
 await page.evaluate(async () => {
   const sheet=getGuidedFlowPage();
   const base=createAccessTogetherFlowDeps(ACCESS_TOGETHER_CONTAINERS.webApp);
   window.profileProbe={sends:[]};
   sheet.flow=createGuidedFlow({...base,storage:createGuidedFlowMemoryStorage(),account:null,contributor:null,profileForms:()=>null,profileBeforeTopics:false,
     consent:{config:()=>({enabled:false})},
     send:async item=>{profileProbe.sends.push(item);return {status:'sent'};}});
   await applyGuidedFlowActions(sheet,sheet.flow.start());
   await sendAnswerSheetCallback(sheet,'form:smarturbanity_your_profile');
 });
 const selected=new Set();
 const answers={age_group:'35_44',residence:'live',household_vehicles:'car',driving_licence:'yes',employment:'employed_full_time'};
 fs.mkdirSync(path.join(config,'.tmp'),{recursive:true});
 for(let i=0;i<60;i++) {
   const s=await page.evaluate(()=>{const p=getGuidedFlowPage();return {state:p.flow.getState(),action:p.sheetMessages.get(p.sheetCurrentId)?.action};});
   if(s.state.mode==='summary')break;
   const buttons=s.action?.reply_markup?.inline_keyboard?.flat()??[];
   let b=buttons.find(b=>/^(lang:en|accountoffer:skip|intro:start|sconsent:yes|consents:accept_yes|data:identity|age:yes)$/.test(b.callback_data??''));
   if(s.state.mode==='question') {
     const q=await page.evaluate(()=>{const f=getGuidedFlowPage().flow.getState().form;return guidedFlowQuestionAt(app.colls.questionnaires[f.questionnaireId],f.current);});
     if(q.answer_key==='household_adults')await page.screenshot({path:path.join(config,'.tmp/profile-app-phone-section2.png')});
     if(Object.hasOwn(answers,q.answer_key)) {
       if(selected.has(q.answer_key))b=buttons.find(b=>b.callback_data==='done:');
       else {
         const option=q.options.find(o=>o.value===answers[q.answer_key]);
         b=buttons.find(b=>b.text==='#'+option.text || b.text===option.text);
         assert.ok(b,'Expected option '+q.answer_key);
         selected.add(q.answer_key);
       }
     }
   }
   b??=buttons.find(b=>/^skip:/.test(b.callback_data??''));
   b??=buttons.find(b=>b.role==='primary');
   b??=buttons.find(b=>/^(answer|toggle|pill|intro):/.test(b.callback_data??''));
   if(!b)break;
   await page.evaluate(data=>sendAnswerSheetCallback(getGuidedFlowPage(),data),b.callback_data);
 }
 await page.screenshot({path:path.join(config,'.tmp/profile-app-phone.png')});
 assert.equal(await page.evaluate(()=>getGuidedFlowPage().flow.getState().mode),'summary');
 await page.getByRole('button',{name:'Send',exact:true}).click();
 assert.equal(await page.evaluate(()=>profileProbe.sends.length),1);
 assert.equal(await page.evaluate(()=>Boolean(app.colls.questionnaires.smarturbanity_your_household)),false);
 assert.equal(await page.evaluate(()=>app.colls.questionnaires.smarturbanity_your_profile.questionnaire.sections.length),2);
 console.log('PASS full Access Together page: candidate catalogue, two-section profile, conditional follow-ups, optional pet, summary and one in-memory send; external writes blocked.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});

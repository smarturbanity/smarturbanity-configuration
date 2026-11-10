import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const app = process.argv[2];
assert.ok(app, 'Pass the CityMaaS checkout that owns the defaults and loader');
const read = file => JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'));
const context = vm.createContext({URL, window: {location: {href: 'https://configuration.test/'}}});
vm.runInContext(fs.readFileSync(path.join(app, 'CityMaasRoot/Utilities/DataSources/ConfigurationDataSource.js'), 'utf8'), context);
const defaults = JSON.parse(fs.readFileSync(path.join(app, 'CityMaasRoot/Projects/SmartUrbanity/Configuration/defaults.json'), 'utf8'));
const pilot = read('pilots/rome/rome.json');
const application = read('pilots/rome/application.json');
const effective = JSON.parse(JSON.stringify(context.mergePilotConfigurationDocuments(defaults, pilot, application)));
const original = JSON.parse(execFileSync('git', ['show', '5a04c0c:pilots/rome/rome.json'], {cwd: root, encoding: 'utf8'}));
function preserves(previous, current, prefix = '') {
  for (const [key, value] of Object.entries(previous)) {
    if (!prefix && key === 'version') continue;
    const label = prefix + '/' + key;
    if (value && typeof value === 'object' && !Array.isArray(value)) preserves(value, current?.[key], label);
    else assert.deepEqual(current?.[key], value, 'Lost current pilot setting: ' + label);
  }
}
delete original.datasets.service_subtypes.config_type;
delete original.datasets.service_subtypes.pilot_id;
preserves(original, effective);
const oldServices = original.datasets.service_subtypes;
delete oldServices.config_type;
delete oldServices.pilot_id;
assert.deepEqual(pilot.datasets.service_subtypes, oldServices);
assert.equal(application.settings.default_language, read('index.json').pilots[0].language);
assert.equal(pilot.application_config, './pilots/rome/application.json');
assert.deepEqual(pilot.content.dataset_files, ['./pilots/rome/survey_campaigns.json']);
assert.deepEqual(pilot.content.form_workflows, original.content.form_workflows);
const originalApplication = JSON.parse(execFileSync('git', ['show', '5a04c0c:pilots/rome/application.json'], {cwd: root, encoding: 'utf8'}));
const unchangedApplication = structuredClone(application);
delete unchangedApplication.settings.applications.smart_urbanity_access_together.accessTogether.contentsAvailability;
// Rome profile questions and report menu moved here from the code defaults, which no longer name pilot questionnaires.
const romeFlow = unchangedApplication.settings.applications.smart_urbanity_access_together.flow;
assert.equal(romeFlow.profile.questions.length, 3);
assert.equal(romeFlow.reports.routes.length, 6);
delete romeFlow.profile;
romeFlow.reports = {officeLanguage: romeFlow.reports.officeLanguage};
// Rome campaign groups, suggested place and study area moved here from the Access Together installation.
assert.deepEqual(romeFlow.flow.campaignGroups.map(group => group.id), ['walk', 'bike', 'transit', 'e_scooter', 'car', 'motorcycle', 'other']);
delete romeFlow.flow;
const romePlace = unchangedApplication.settings.applications.smart_urbanity_access_together.accessTogether.place;
assert.ok(romePlace.suggestedPlaces.length && romePlace.studyArea);
delete romePlace.suggestedPlaces;
delete romePlace.studyArea;
// The consent names the published notice version; the former Flowi choices fall back to the default avatar.
assert.equal(application.settings.questionnaires.consent.version, '1.0.0');
unchangedApplication.settings.questionnaires.consent.version = originalApplication.settings.questionnaires.consent.version;
// The external service addresses moved from the application code into the pilot, one per runtime environment.
for (const key of ['smarturbanity_spatial_address', 'smarturbanity_participant_code_address']) {
  for (const environment of ['prod', 'test', 'dev']) assert.match(application.settings.servers[key][environment], /^https:\/\//);
}
assert.equal(application.settings.servers.smarturbanity_spatial_address.test, 'https://su-spatialdb.ctlup.com');
delete unchangedApplication.settings.servers;
// The Rome model preparation values moved from the application settings into the pilot.
const preparation = pilot.data_model.preparation;
assert.equal(preparation.parameters.model_id, 'smarturbanity_rome');
assert.equal(preparation.parameters.study_areas.sources, 'municipio_12');
assert.equal(preparation.parameters.report_conversion.pilot_campaign, 'pre_test');
assert.equal(pilot.pilot_identity.service_campaign, 'rome_urban_services_accessibility_mapping');
assert.equal(effective.data_model.preparation.procedure_sources, '/Models/smarturbanity_rome/procedure-sources.json');
(function dropLegacy(node) {
  if (!node || typeof node !== 'object') return;
  if (!Array.isArray(node) && ('legacySources' in node || 'legacyIndices' in node)) { delete node.legacySources; delete node.legacyIndices; }
  Object.values(node).forEach(dropLegacy);
})(originalApplication);
assert.deepEqual(unchangedApplication, originalApplication, 'Technical settings preserved apart from explicit block availability');
assert.deepEqual(effective.applications.smart_urbanity_access_together.accessTogether.contentsAvailability,
  {services: true, connections: true, experiences: false, streets: false}, 'Block availability survives actual merge');
assert.equal(application.settings.applications.smart_urbanity_access_together.flow.landing.avatars.length, 14);
const schedule = read('pilots/rome/survey_campaigns.json');
for (const container of Object.values(schedule.containers)) {
  for (const id of container.campaignIds) assert.ok(schedule.campaigns[id], 'Unknown campaign: ' + id);
}
const changedForms = execFileSync('git', ['diff', '5a04c0c', '--name-only', '--', 'forms', 'definitions'], {cwd: root, encoding: 'utf8'}).trim();
assert.ok(changedForms === '' || changedForms === 'forms/tripSurveys/smarturbanity_pre_trip.json', 'Only the separately requested pre-trip company correction may change a form');
for (const obsolete of ['base.json', 'manifests', 'pilots/rome/index.json', 'pilots/rome/service_subtypes.json']) {
  assert.equal(fs.existsSync(path.join(root, obsolete)), false, 'Retired source still present: ' + obsolete);
}
console.log('PASS: actual app merge; current pilot values and services preserved; form changes confined to requested pre-trip fix; technical ownership; campaign references; retired sources absent');

const registry = [];
context.getDataSourceLocations = source => [typeof source === 'string' ? source : source.url];
context.getRequestedConfigurationPilotId = () => null;
context.resolveConfigurationSourcePath = (source, pilotId) => typeof source === 'string'
  ? source.replaceAll('{pilot}', pilotId) : {url: source.url.replaceAll('{pilot}', pilotId)};
context.registerConfigurationRegistryEntry = (dataset, id) => registry.push({dataset, id});
context.loadConfigurationSourceJson = async (source, options = {}) => {
  const selected = Array.isArray(source) ? source[0] : source;
  const url = new URL(typeof selected === 'string' ? selected : selected.url);
  const file = url.hostname === 'app.test' ? path.join(app, url.pathname) : path.join(root, url.pathname);
  if (!fs.existsSync(file)) return null;
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  return options.snapshot ? {data, source} : data;
};
const loaded = await context.preloadConfigurationDataSource({
  defaultsPath: 'https://app.test/CityMaasRoot/Projects/SmartUrbanity/Configuration/defaults.json',
  pilotPath: 'https://configuration.test/pilots/{pilot}/{pilot}.json',
  rootPath: 'https://configuration.test', pilotId: 'rome', applicationConfigRequired: true
});
assert.equal(loaded.loaded, true, loaded.error);
assert.ok(registry.some(entry => entry.dataset.config_type === 'service_subtypes'));
assert.ok(registry.some(entry => entry.dataset.config_type === 'smarturbanity_survey_campaigns'));
assert.equal(loaded.file.application_config, 'https://configuration.test/pilots/rome/application.json');
const invalid = structuredClone(pilot);
invalid.movesion = {};
assert.throws(() => context.mergePilotConfigurationDocuments(defaults, invalid, application), /technical file/);
assert.throws(() => context.mergePilotConfigurationDocuments(defaults, pilot, {...application, pilot_id: 'other'}), /Invalid pilot/);
console.log('PASS: actual preload resolves technical document and registers both datasets; invalid ownership and identity rejected');

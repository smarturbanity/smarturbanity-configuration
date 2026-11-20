import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const app = process.argv[2];
assert.ok(app, 'Pass the CityMaaS checkout that owns the defaults and loader');
const read = file => JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'));
const context = vm.createContext({URL, structuredClone, window: {location: {href: 'https://configuration.test/'}}});
vm.runInContext(fs.readFileSync(path.join(app, 'CityMaasRoot/Utilities/DataSources/ConfigurationDataSource.js'), 'utf8'), context);
const defaults = JSON.parse(fs.readFileSync(path.join(app, 'CityMaasRoot/Projects/SmartUrbanity/Configuration/defaults.json'), 'utf8'));
// Each document is read as the app reads it: the file joined with the topic files its "parts" list.
const readWhole = file => {
  const document = read(file);
  return context.composeConfigurationParts(document, (document.parts ?? []).map(part => read(part.replace(/^\.\//, ''))));
};
const pilotFile = read('pilots/rome/rome.json');
const applicationFile = read('pilots/rome/application.json');
assert.deepEqual(pilotFile.parts, ['./pilots/rome/map.json', './pilots/rome/data_model.json', './pilots/rome/services.json', './pilots/rome/contribution_forms.json', './definitions/perception_publication.json']);
assert.deepEqual(applicationFile.parts, ['./pilots/rome/app_look.json', './pilots/rome/reports.json', './definitions/research_consent.json']);
const pilot = JSON.parse(JSON.stringify(readWhole('pilots/rome/rome.json')));
const application = JSON.parse(JSON.stringify(readWhole('pilots/rome/application.json')));
assert.throws(() => context.composeConfigurationParts(pilotFile, [{map: {}}, {map: {initial_view: null}}, {map: {initial_view: {}}}]), /set in two files: map.initial_view/);
// The applications read the technical file with its declared type, as the installation names it.
const applicationType = 'smarturbanity_application';
assert.equal(application.config_type, applicationType);
const effective = JSON.parse(JSON.stringify(context.mergePilotConfigurationDocuments(defaults, pilot, application, applicationType)));
assert.equal(effective.pilot_id, 'rome');
const shippedPilots = JSON.parse(fs.readFileSync(path.join(app, 'CityMaasRoot/Projects/SmartUrbanity/Configuration/pilots.json'), 'utf8')).pilots;
assert.equal(read('index.json').pilots, undefined, 'The pilot list ships with the CityMaaS code');
assert.equal(application.settings.default_language, shippedPilots.find(entry => entry.id === 'rome').language);
assert.deepEqual(application.settings.languages, ['en', 'it']);
assert.equal(pilot.application_config, './pilots/rome/application.json');
assert.deepEqual(pilot.content.dataset_files, ['./pilots/rome/survey_campaigns.json']);
assert.ok(Object.keys(pilot.datasets.service_subtypes).length, 'Rome lists its service subtypes');
// The pilot's connections (Movesion client, answers database) ship with the applications' code; this repository
// holds only content and interface.
for (const key of ['movesion', 'answers_firestore']) assert.equal(application.settings[key], undefined, 'Connection still configured here: ' + key);
assert.equal(effective.movesion, undefined);
assert.equal(effective.answers_firestore, undefined);
const preparation = pilot.data_model.preparation;
assert.equal(preparation.parameters.model_id, 'smarturbanity_rome');
assert.equal(effective.data_model.preparation.procedure_sources, '/Models/smarturbanity_rome/procedure-sources.json');
assert.ok(effective.applications.smart_urbanity_access_together.accessTogether.contentsAvailability, 'Block availability survives the merge');
const schedule = read('pilots/rome/survey_campaigns.json');
for (const container of Object.values(schedule.containers)) {
  for (const id of container.campaignIds) assert.ok(schedule.campaigns[id], 'Unknown campaign: ' + id);
}
for (const obsolete of ['base.json', 'manifests', 'pilots/rome/index.json', 'pilots/rome/service_subtypes.json']) {
  assert.equal(fs.existsSync(path.join(root, obsolete)), false, 'Retired source still present: ' + obsolete);
}
console.log('PASS: actual app merge; technical ownership without connections; campaign references; retired sources absent');

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
  return options.snapshot ? {data, source: url.href} : data;
};
const loaded = await context.preloadConfigurationDataSource({
  defaultsPath: 'https://app.test/CityMaasRoot/Projects/SmartUrbanity/Configuration/defaults.json',
  pilotPath: 'https://configuration.test/pilots/{pilot}/{pilot}.json',
  rootPath: 'https://configuration.test', pilotId: 'rome', applicationConfigRequired: true, applicationConfigType: applicationType
});
assert.equal(loaded.loaded, true, loaded.error);
assert.ok(registry.some(entry => entry.dataset.config_type === 'service_subtypes'));
assert.ok(registry.some(entry => entry.dataset.config_type === 'smarturbanity_survey_campaigns'));
assert.equal(loaded.snapshots.pilot.parts.length, pilotFile.parts.length);
assert.equal(loaded.snapshots.application.parts.length, applicationFile.parts.length);
assert.deepEqual(JSON.parse(JSON.stringify(loaded.snapshots.pilot.data)), pilot, 'The app joins the pilot parts as this check does');
assert.deepEqual(JSON.parse(JSON.stringify(loaded.snapshots.application.data)), application, 'The app joins the technical parts as this check does');
assert.equal(loaded.file.application_config, 'https://configuration.test/pilots/rome/application.json');
const invalid = structuredClone(pilot);
invalid.movesion = {};
assert.throws(() => context.mergePilotConfigurationDocuments(defaults, invalid, application, applicationType), /technical file/);
assert.throws(() => context.mergePilotConfigurationDocuments(defaults, pilot, {...application, pilot_id: 'other'}, applicationType), /Invalid pilot/);
console.log('PASS: actual preload resolves technical document and registers both datasets; topic files joined; invalid ownership and identity rejected');

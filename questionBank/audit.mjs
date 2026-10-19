import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const index = JSON.parse(fs.readFileSync(path.join(root, 'index.json'), 'utf8'));
const questions = index.questions.map(relative => JSON.parse(fs.readFileSync(path.join(root, relative), 'utf8')));
const normalize = value => String(value ?? '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim().toLowerCase();
const exact = new Map();
const samePrompt = new Map();

for (const question of questions) {
  for (const [variantId, variant] of Object.entries(question.variants)) {
    const schema = variant.schema;
    const prompt = normalize(schema.text);
    const fingerprint = JSON.stringify({prompt, type: schema.question_type,
      optionValues: (schema.options ?? []).map(option => option.value)});
    for (const [map, key] of [[exact, fingerprint], [samePrompt, prompt]]) {
      const items = map.get(key) ?? [];
      items.push(`${question.question_id}/${variantId}`);
      map.set(key, items);
    }
  }
}

const distinctIds = values => new Set(values.map(value => value.split('/')[0])).size > 1;
const crossIdExact = [...exact.values()].filter(distinctIds);
const crossIdPrompt = [...samePrompt.values()].filter(distinctIds);
const variantReview = questions.filter(question => question.review_required).map(question => question.question_id);
console.log(JSON.stringify({
  questionFiles: questions.length,
  flows: index.flows.length,
  variantReview,
  samePromptDifferentIds: crossIdPrompt,
  exactPromptTypeOptionsDifferentIds: crossIdExact,
}, null, 2));

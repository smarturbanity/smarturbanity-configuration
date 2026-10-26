/** Select a self-contained questionnaire from the generated question feed. */
export function selectQuestionnaire(feed, questionnaireId) {
  if (feed?.question_bank_collection_version !== 1 || !Array.isArray(feed.questions) || !Array.isArray(feed.flows)) {
    throw Error('Unsupported question feed');
  }
  const matches = feed.flows.filter(flow => flow?.form?.questionnaire?.questionnaire_id === questionnaireId);
  if (matches.length !== 1) throw Error(`Expected one questionnaire: ${questionnaireId}`);
  const flow = matches[0];
  const referenced = new Set((flow.form.questionnaire.sections ?? [])
    .flatMap(section => (section.questions ?? []).map(node => node.question_ref)));
  const questions = feed.questions.filter(question => referenced.has(question.question_id));
  if (questions.length !== referenced.size || new Set(questions.map(question => question.question_id)).size !== questions.length) {
    throw Error(`Missing or repeated question in feed: ${questionnaireId}`);
  }
  for (const node of (flow.form.questionnaire.sections ?? []).flatMap(section => section.questions ?? [])) {
    const question = questions.find(entry => entry.question_id === node.question_ref);
    if (question.version !== node.question_version || !question.variants?.[node.variant]) {
      throw Error(`Invalid question reference in feed: ${node.question_ref}`);
    }
  }
  return {question_bank_collection_version: 1, questions, flows: [flow]};
}

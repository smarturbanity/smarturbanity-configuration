// The dot keeps the project/key composite ID usable as a filename on Windows.
export function questionId(project, key) {
  if (!/^[A-Za-z][A-Za-z0-9]*$/.test(project) || !/^[A-Za-z0-9_]+$/.test(key)) {
    throw Error(`Unsupported question project or key: ${project}/${key}`);
  }
  return `${project.toLowerCase()}.${key}`;
}

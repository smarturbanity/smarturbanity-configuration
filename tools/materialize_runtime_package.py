"""Export pinned runtime and questionnaire Git objects for bundled app delivery."""
import argparse
import hashlib
import io
import json
import pathlib
import subprocess
import zipfile


def git(repo, *arguments):
    return subprocess.check_output(['git', '-C', str(repo), *arguments])


def digest(data):
    return hashlib.sha256(data).hexdigest()


def materialize(repo, runtime, source, parent):
    for revision in (runtime, source):
        resolved = git(repo, 'rev-parse', '--verify', revision + '^{commit}').decode().strip()
        if revision != resolved:
            raise ValueError('Use a full immutable commit hash')
    name = 'access-together-configuration-' + runtime
    destination = parent / name
    destination.mkdir(parents=True, exist_ok=False)
    records = []
    transformations = []
    for revision, paths in [(runtime, ['base.json', 'index.json', 'definitions', 'manifests', 'pilots']), (source, ['forms'])]:
        archive = zipfile.ZipFile(io.BytesIO(git(repo, 'archive', '--format=zip', revision, *paths)))
        for item in archive.infolist():
            if item.is_dir():
                continue
            if '..' in pathlib.PurePosixPath(item.filename).parts:
                raise ValueError('Unsafe archive path')
            data = archive.read(item)
            blob = git(repo, 'rev-parse', revision + ':' + item.filename).decode().strip()
            actual_blob = hashlib.sha1(b'blob ' + str(len(data)).encode() + b'\0' + data).hexdigest()
            if blob != actual_blob:
                raise ValueError('Archive differs from its Git blob')
            path = destination / item.filename
            if path.exists():
                raise ValueError('Overlapping runtime and questionnaire files')
            path.parent.mkdir(parents=True, exist_ok=True)
            path.write_bytes(data)
            records.append({'path': item.filename, 'sourceRevision': revision, 'sourceBlob': blob, 'sourceSha256': digest(data), 'sha256': digest(data)})
    prefix = 'https://raw.githubusercontent.com/smarturbanity/smarturbanity-configuration/'
    for record in records:
        path = destination / record['path']
        if path.suffix != '.json':
            continue
        changes = []

        def convert(value, trail=()):
            if isinstance(value, dict):
                return {key: convert(child, trail + (key,)) for key, child in value.items()}
            if isinstance(value, list):
                return [convert(child, trail + (str(index),)) for index, child in enumerate(value)]
            if not isinstance(value, str):
                return value
            updated = value
            for revision in (runtime, source):
                if value.startswith(prefix + revision + '/'):
                    if not (trail[-1:] == ('path',) or trail[-2:] == ('path', 'url')):
                        raise ValueError('Pinned URL outside a supported path field')
                    updated = './' + value[len(prefix + revision + '/'):]
            if trail[-1:] == ('image',) and value.startswith(prefix + 'main/forms/'):
                relative = 'forms/' + value[len(prefix + 'main/forms/'):]
                if not (destination / relative).is_file():
                    raise ValueError('Image missing from the pinned source')
                updated = 'Datafiles/' + name + '/' + relative
            if updated != value:
                changes.append({'field': '.'.join(trail), 'from': value, 'to': updated})
            return updated

        document = convert(json.loads(path.read_text(encoding='utf-8')))
        if changes:
            path.write_text(json.dumps(document, ensure_ascii=False, indent=2) + '\n', encoding='utf-8', newline='\n')
            record['sha256'] = digest(path.read_bytes())
            transformations.append({'path': record['path'], 'changes': changes})
    release = {'runtimeRevision': runtime, 'questionnaireRevision': source, 'bundleDirectory': name,
               'method': 'Pinned Git archives with explicitly recorded delivery path/image substitutions; no schema, option or text transformation.',
               'files': records, 'transformations': transformations}
    manifest = destination / 'release.json'
    manifest.write_text(json.dumps(release, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    return {'bundle': str(destination), 'files': len(records), 'releaseSha256': digest(manifest.read_bytes())}


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--runtime', required=True)
    parser.add_argument('--source', required=True)
    parser.add_argument('--output-parent', type=pathlib.Path, required=True)
    options = parser.parse_args()
    repository = pathlib.Path(__file__).resolve().parents[1]
    print(json.dumps(materialize(repository, options.runtime, options.source, options.output_parent)))

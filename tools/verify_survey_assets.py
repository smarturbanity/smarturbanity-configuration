"""Check that each current survey has a distinct, accessible, self-contained SVG."""
import hashlib
import json
from pathlib import Path
from urllib.parse import urlparse
import xml.etree.ElementTree as ET

root = Path(__file__).resolve().parents[1]
assets = root / 'forms/surveys/assets'
namespace = '{http://www.w3.org/2000/svg}'
used = set()
drawings = set()
for file in (root / 'forms/surveys').rglob('*.json'):
    data = json.loads(file.read_text(encoding='utf-8'))
    if 'questionnaire' not in data:
        continue
    form = data['questionnaire']
    welcome = form['welcome_page']
    name = form['questionnaire_id'] + '.svg'
    assert Path(urlparse(welcome['image']).path).name == name, file
    assert name not in used, name
    used.add(name)
    svg = ET.parse(assets / name).getroot()
    assert svg.tag == namespace + 'svg'
    assert svg.attrib.get('viewBox') == '0 0 800 450', name
    ids = {element.attrib.get('id'): element for element in svg.iter() if element.attrib.get('id')}
    assert svg.attrib.get('role') == 'img', name
    for label in svg.attrib['aria-labelledby'].split():
        assert label in ids and ids[label].text, name
    geometry = []
    for element in svg.iter():
        tag = element.tag.removeprefix(namespace)
        assert tag not in {'script', 'foreignObject', 'image', 'use', 'animate', 'animateTransform', 'set'}, name
        assert all(not key.lower().startswith('on') and 'href' not in key.lower() for key in element.attrib), name
        if tag not in {'title', 'desc'}:
            geometry.append((tag, sorted(element.attrib.items())))
    digest = hashlib.sha256(repr(geometry).encode('utf-8')).hexdigest()
    assert digest not in drawings, 'Repeated illustration: ' + name
    drawings.add(digest)
    alternative = welcome['image_alt']
    assert alternative == '#' + form['title'], name
    assert all(table.get(alternative) for table in data['languages'].values()), name
assert len(used) == 20
assert used == {file.name for file in assets.glob('*.svg')}, 'Unreferenced survey SVG assets'
print('PASS: 20 distinct SVGs, valid XML, translated alternatives, no external resources or animation.')

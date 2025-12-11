const fs = require('fs');
const path = require('path');
const topojson = require('topojson-client');

const INPUT_TOPOJSON = path.join(__dirname, '../../static/heatmap/canada_cd.json');

const topoData = JSON.parse(fs.readFileSync(INPUT_TOPOJSON, 'utf8'));
const objectName = Object.keys(topoData.objects)[0];
const geometries = topoData.objects[objectName].geometries;

const names = geometries.map(g => g.properties.CDNAME).sort();
console.log(names.join('\n'));

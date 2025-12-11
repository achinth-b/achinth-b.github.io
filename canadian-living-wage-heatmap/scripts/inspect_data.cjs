const fs = require('fs');
const path = require('path');
const topojson = require('topojson-client');

const INPUT_TOPOJSON = path.join(__dirname, '../../static/heatmap/canada_cd.json');

try {
    const topoData = JSON.parse(fs.readFileSync(INPUT_TOPOJSON, 'utf8'));
    const objectName = Object.keys(topoData.objects)[0];
    const geometries = topoData.objects[objectName].geometries;

    const targets = ["Toronto", "Rainy River", "Peel", "Greater Vancouver", "Squamish-Lillooet", "Montreal", "Gaspesie"];

    console.log("--- INSPECTION RESULTS ---");
    targets.forEach(target => {
        // Partial match check
        const found = geometries.find(g => g.properties.CDNAME.includes(target));
        if (found) {
            console.log(`${found.properties.CDNAME}: $${found.properties.data.livingAnnual}`);
        } else {
            console.log(`${target}: NOT FOUND`);
        }
    });
} catch (e) {
    console.error("Error reading file:", e);
}

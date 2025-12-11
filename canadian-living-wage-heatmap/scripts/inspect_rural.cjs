const fs = require('fs');
const path = require('path');
const topojson = require('topojson-client');

const INPUT_TOPOJSON = path.join(__dirname, '../../static/heatmap/canada_cd.json');

try {
    const topoData = JSON.parse(fs.readFileSync(INPUT_TOPOJSON, 'utf8'));
    const objectName = Object.keys(topoData.objects)[0];
    const geometries = topoData.objects[objectName].geometries;

    const targets = [
        "District Municipality of Muskoka", // Exact CD name usually
        "Muskoka",
        "Division No. 15" // AB (Banff) and SK (Prince Albert)
    ];

    console.log("--- EXPENSIVE RURAL INSPECTION ---");
    geometries.forEach(g => {
        const name = g.properties.CDNAME;
        const prov = g.properties.CDUID.substring(0, 2);

        if (name.includes("Muskoka")) {
            console.log(`[ON] ${name}: Single=$${g.properties.data.singleAnnual}`);
        }
        if (name === "Division No. 15") {
            const provLabel = prov === '48' ? "AB (Banff)" : (prov === '47' ? "SK (Prince Albert)" : prov);
            console.log(`[${provLabel}] ${name}: Single=$${g.properties.data.singleAnnual}`);
        }
    });

} catch (e) {
    console.error("Error reading file:", e);
}

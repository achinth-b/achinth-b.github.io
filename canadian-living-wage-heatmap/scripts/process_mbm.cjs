const fs = require('fs');
const path = require('path');
const topojson = require('topojson-client');

// --- Configuration ---
const INPUT_MBM_CSV = path.join(__dirname, '../mbm_data/11100066.csv');
const INPUT_TOPOJSON = path.join(__dirname, '../../static/heatmap/canada_cd.json');
const OUTPUT_FILE = path.join(__dirname, '../../static/heatmap/canada_cd.json');

// MBM 2022 -> 2025 Projection
const INFLATION_FACTOR = 1.08;
const LIVABILITY_BUFFER = 1.10; // +10% for "Living" beyond "Poverty"
const TAX_GROSS_UP_FACTOR = 1.30;

// --- MANUAL MAPPING OVERRIDES ---
// Map CDNAME -> MBM Region Keyword
// Ensures cities get City rates, not Rural fallbacks
const MANUAL_MAPPING = {
    // NT/NU/YT (Territories) - Often have specific capital data
    "Region 6": "Yellowknife",
    "Yukon": "Whitehorse",
    "Baffin": "Iqaluit",

    // BC
    "Greater Vancouver": "Vancouver",
    "Fraser Valley": "Abbotsford",
    "Capital": "Victoria",
    "Nanaimo": "Nanaimo",
    "Central Okanagan": "Kelowna",
    "Thompson-Nicola": "Kamloops",
    "Squamish-Lillooet": "Vancouver", // Whistler/Squamish costs are comparable to Vancouver
    "District Municipality of Muskoka": "Barrie", // Cottage country expenses matches Simcoe/Barrie more than Rural

    // Alberta (CDs are numbered)
    "Division No. 6": "Calgary",
    "Division No. 11": "Edmonton",
    "Division No. 2": "Lethbridge",
    "Division No. 19": "Grande Prairie", // Proxy if exists, else Rural
    "Division No. 16": "Wood Buffalo", // Fort McMurray
    "Division No. 10": "Camrose", // Lloydminster?

    // Saskatchewan
    "Division No. 11": "Saskatoon",
    "Division No. 6": "Regina",
    "Division No. 15": "Prince Albert",
    "Division No. 8": "Swift Current",

    // Manitoba
    "Division No. 11": "Winnipeg",
    "Division No. 7": "Brandon",
    "Division No. 10": "Portage la Prairie", // Check if exists

    // Ontario
    "Peel": "Toronto",
    "York": "Toronto",
    "Durham": "Toronto",
    "Halton": "Toronto",
    "Hamilton": "Hamilton",
    "Waterloo": "Kitchener",
    "Niagara": "St. Catharines",
    "Middlesex": "London",
    "Essex": "Windsor",
    "Simcoe": "Barrie",
    "Frontenac": "Kingston",
    "Ottawa": "Ottawa",
    "Thunder Bay": "Thunder Bay",
    "Greater Sudbury": "Sudbury",
    "Nipissing": "North Bay",

    // Quebec
    "Montréal": "Montreal",
    "Montreal": "Montreal",
    "Laval": "Montreal",
    "Longueuil": "Montreal",
    "Roussillon": "Montreal",
    "Thérèse-De Blainville": "Montreal",
    "Vaudreuil-Soulanges": "Montreal",
    "La Vallée-du-Richelieu": "Montreal",
    "Québec": "Quebec",
    "Gatineau": "Ottawa",
    "Francheville": "Trois-Rivières",
    "Sherbrooke": "Sherbrooke",
    "Le Saguenay-et-son-Fjord": "Saguenay",

    // Atlantic
    "Saint John": "Saint John",
    "Westmorland": "Moncton",
    "York": "Fredericton", // NB York County
    "Halifax": "Halifax",
    "Cape Breton": "Cape Breton",
    "Queens": "Charlottetown", // PEI
    "Division No. 1": "St. John's", // NL - Check CD logic for NL
    "Division No. 6": "Corner Brook" // NL? NL CDs are numbered 1-11
};

function parseCSV(filePath) {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const lines = fileContent.split('\n');
    const data = [];

    for (let i = 1; i < lines.length; i++) {
        // Simple regex splitter for "quoted, strings", or numeric
        const cols = lines[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
        if (cols.length < 5) continue;

        let geo = (cols[1] || '').replace(/"/g, '');
        let baseYear = (cols[3] || '').replace(/"/g, '');
        let component = (cols[5] || '').replace(/"/g, '');
        let value = parseFloat((cols[12] || '').replace(/"/g, ''));

        if ((cols[0] || '').replace(/"/g, '') === '2022' &&
            component === 'Total threshold' &&
            baseYear === '2018 base' &&
            !isNaN(value)) {
            data.push({ geo, value });
        }
    }
    return data;
}

function getMBMRegionForCD(cdName, provId, mbmData) {
    const ProvNameMap = {
        '10': 'Newfoundland and Labrador', '11': 'Prince Edward Island', '12': 'Nova Scotia',
        '13': 'New Brunswick', '24': 'Quebec', '35': 'Ontario',
        '46': 'Manitoba', '47': 'Saskatchewan', '48': 'Alberta',
        '59': 'British Columbia', '60': 'Yukon', '61': 'Northwest Territories', '62': 'Nunavut'
    };
    const provName = ProvNameMap[provId];
    if (!provName) return 40000;

    // 0. Manual Override
    if (MANUAL_MAPPING[cdName]) {
        let useManual = true;
        // Collision Check: "Division No. X" exists in multiple provinces
        if (cdName.includes("Division No.")) {
            // Only apply if it makes sense for THIS province
            // AB=48, MB=46, SK=47, NL=10
            const isPrairieOrNL = ['48', '46', '47', '10'].includes(provId);
            if (!isPrairieOrNL) useManual = false;

            // Refine: Div 11 in MB (Winnipeg) vs Div 11 in AB (Edmonton) vs Div 11 in SK (Saskatoon)
            // Fortunately they all map to major cities in this list, but "Division No. 6" is Calgary (AB) AND Regina (SK).
            // This collision needs explicit handling if the map key is just "Division No. 6".

            // FIX: The key in MANUAL_MAPPING is unique. We can't have duplicate keys.
            // We need a specific check here.
            if (cdName === "Division No. 6") {
                if (provId === '48') { const val = getValue("Calgary"); if (val) return val; }
                if (provId === '47') { const val = getValue("Regina"); if (val) return val; }
            }
            if (cdName === "Division No. 11") {
                if (provId === '48') { const val = getValue("Edmonton"); if (val) return val; }
                if (provId === '47') { const val = getValue("Saskatoon"); if (val) return val; }
                if (provId === '46') { const val = getValue("Winnipeg"); if (val) return val; }
            }
            if (cdName === "Division No. 15") {
                if (provId === '48') { const val = getValue("Calgary"); if (val) return val; } // Banff/Canmore -> Calgary Pricing
                if (provId === '47') { const val = getValue("Prince Albert"); if (val) return val; } // SK Div 15 -> Prince Albert
            }
            if (cdName === "Division No. 1") {
                if (provId === '10') { const val = getValue("St. John's", false); if (val) return val; } // St John's might not be exactly Div 1 bound but close
            }
        }

        if (useManual) {
            const target = MANUAL_MAPPING[cdName];
            // Helper to fetch value
            const val = getValue(target);
            if (val) return val;
        }
    }

    function getValue(target, strict = false) {
        let m = mbmData.find(d => d.geo === target || d.geo === `${target}, ${provName}`);
        if (m) return m.value;
        if (!strict) {
            m = mbmData.find(d => d.geo.includes(target) && d.geo.includes(provName));
            if (m) return m.value;
            // Cross-province exception (Ottawa)
            if (target === 'Ottawa') {
                const ottawaMatch = mbmData.find(d => d.geo.includes('Ottawa'));
                if (ottawaMatch) return ottawaMatch.value;
            }
        }
        return null;
    }

    // 1. Exact Match
    let match = mbmData.find(d => d.geo === cdName);
    if (match) return match.value;

    // 2. City + Province
    let cityMatch = mbmData.find(d => d.geo === `${cdName}, ${provName}`);
    if (cityMatch) return cityMatch.value;

    // 3. Partial
    if (cdName.length > 3) {
        match = mbmData.find(d => d.geo.includes(cdName) && d.geo.includes(provName));
        if (match) return match.value;
    }

    // 4. Fallbacks
    // Special handling for Numeric Divisions (AB, SK, MB, NL)
    // If it's a numeric division (e.g. "Division No. 1") and we didn't map it manually to a city, 
    // it IS likely Rural.

    // Priority 1: Population under 30k
    const small = mbmData.find(d => d.geo.includes(provName) && d.geo.includes('population under 30,000'));
    if (small) return small.value;

    // Priority 2: Rural
    const rural = mbmData.find(d => d.geo.includes(`Rural`) && d.geo.includes(provName));
    if (rural) return rural.value;

    return 40000; // Ultimate fallback
}

function run() {
    console.log("Reading MBM...");
    const mbmData = parseCSV(INPUT_MBM_CSV); // ~132 regions

    console.log("Reading Map...");
    const topoData = JSON.parse(fs.readFileSync(INPUT_TOPOJSON, 'utf8'));
    const objectName = Object.keys(topoData.objects)[0];
    const geometries = topoData.objects[objectName].geometries;

    geometries.forEach(geo => {
        const props = geo.properties;
        const provId = props.CDUID.substring(0, 2);
        const baseMBM = getMBMRegionForCD(props.CDNAME, provId, mbmData);

        // CONVERT TO SINGLE ADULT LIVING WAGE
        // MBM is for Family of 4. Equivalence Scale for Single Person is ~0.5 (Square Root of 4 = 2, 1/2 = 0.5)
        const singleAdultMBM = baseMBM / 2.0;

        const grossFamily = baseMBM * INFLATION_FACTOR * LIVABILITY_BUFFER * TAX_GROSS_UP_FACTOR;
        const grossSingle = singleAdultMBM * INFLATION_FACTOR * LIVABILITY_BUFFER * TAX_GROSS_UP_FACTOR;

        const MIN_WAGES = {
            '10': 15.60, '11': 15.40, '12': 15.30, '13': 15.30, '24': 15.75,
            '35': 17.20, '46': 15.30, '47': 15.00, '48': 15.00, '59': 17.40,
            '60': 16.77, '61': 16.05, '62': 19.00
        };
        const minWage = MIN_WAGES[provId] || 15.00;

        // 2023 Proportion of Employees on Min Wage
        const PROPORTION_ON_MIN_WAGE = {
            '10': 6.3, '11': 6.3, '12': 6.3, '13': 6.3, '24': 4.8,
            '35': 7.0, '46': 5.2, '47': 5.0, '48': 6.0, '59': 5.5,
            '60': 4.0, '61': 4.0, '62': 4.0
        };

        geo.properties.data = {
            // Dual Data Points
            singleAnnual: Math.round(grossSingle),
            singleHourly: parseFloat((grossSingle / 2080).toFixed(2)),

            familyAnnual: Math.round(grossFamily),
            familyHourly: parseFloat((grossFamily / 2080).toFixed(2)),

            // Common Stats
            minWageHourly: minWage,
            minWageAnnual: Math.round(minWage * 2080),
            minWageProportion: PROPORTION_ON_MIN_WAGE[provId] || 6.3
        };
    });

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(topoData));
    console.log("Done. Updated with Manual Mappings.");
}

run();

#!/bin/bash

# Ensure mapshaper is installed or use npx
# Process the Shapefile to TopoJSON

echo "Processing Shapefile..."

# Check if file exists
if [ ! -f "shapefiles/lcd_000b21a_e.shp" ]; then
    echo "Error: Shapefile not found at shapefiles/lcd_000b21a_e.shp"
    echo "Please ensure the zip is downloaded and unzipped."
    exit 1
fi

mkdir -p ../static/heatmap

# Convert to TopoJSON, reproject to WGS84, simplify to 5% to reduce size
npx mapshaper shapefiles/lcd_000b21a_e.shp \
    -proj wgs84 \
    -simplify 5% \
    -o format=topojson ../static/heatmap/canada_cd.json

echo "Done! ../static/heatmap/canada_cd.json created."

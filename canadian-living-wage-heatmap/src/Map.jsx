import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import * as topojson from 'topojson-client';
import { scaleSequential } from 'd3-scale';



const HeatmapLayer = ({ data, viewMode }) => {
    const map = useMap();

    useEffect(() => {
        if (data) {
            const bounds = L.geoJSON(data).getBounds();
            if (bounds.isValid()) {
                map.fitBounds(bounds);
            }
        }
    }, [data, map]);

    const onEachFeature = (feature, layer) => {
        const data = feature.properties.data;
        if (!data) return;

        const formatter = new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 });
        const percentFormatter = new Intl.NumberFormat('en-CA', { style: 'percent', maximumFractionDigits: 1 });

        const isSingle = viewMode === 'single';
        const annual = isSingle ? data.singleAnnual : data.familyAnnual;
        const hourly = isSingle ? data.singleHourly : data.familyHourly;
        const title = isSingle ? "Single Adult" : "Family of 4";

        const content = `
      <div style="font-family: inherit; min-width: 200px;">
        <h3 style="margin: 0 0 8px 0; border-bottom: 1px solid #444; padding-bottom: 4px;">${feature.properties.CDNAME}</h3>
        
        <div style="margin-bottom: 12px;">
          <strong style="color: #4ade80; display: block; font-size: 0.9em; text-transform: uppercase; letter-spacing: 0.05em;">Required Income (${title})</strong>
          <span style="font-size: 1.4em; font-weight: bold;">${formatter.format(annual)}</span>
          <div style="font-size: 0.85em; color: #aaa;">(${formatter.format(hourly)}/hr)</div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; font-size: 0.9em;">
          <div>
            <div style="color: #94a3b8; font-size: 0.8em;">Min. Wage Income</div>
            <div style="font-weight: 600;">${formatter.format(data.minWageAnnual)}</div>
          </div>
          <div>
            <div style="color: #94a3b8; font-size: 0.8em;">% on Min. Wage</div>
            <div style="font-weight: 600;">${percentFormatter.format(data.minWageProportion / 100)}</div>
          </div>
        </div>
      </div>
    `;
        layer.bindTooltip(content, { sticky: true, className: 'custom-tooltip' });
    };

    const style = (feature) => {
        const data = feature.properties.data;
        if (!data) return { color: 'transparent' };

        const isSingle = viewMode === 'single';
        const annual = isSingle ? data.singleAnnual : data.familyAnnual;

        // Scale DYNAMICALLY based on mode
        let t = 0;
        if (isSingle) {
            // Single: $35k -> $55k
            t = Math.max(0, Math.min(1, (annual - 35000) / 20000));
        } else {
            // Family: $65k -> $95k
            t = Math.max(0, Math.min(1, (annual - 65000) / 30000));
        }

        // Custom Gradient: Teal -> Yellow -> Red
        let r, g, b;
        if (t < 0.5) {
            // First half: Teal (#2dd4bf) to Yellow (#facc15)
            const localT = t * 2;
            r = 45 + (250 - 45) * localT;
            g = 212 + (204 - 212) * localT;
            b = 191 + (21 - 191) * localT;
        } else {
            // Second half: Yellow (#facc15) to Red (#f87171)
            const localT = (t - 0.5) * 2;
            r = 250 + (248 - 250) * localT;
            g = 204 + (113 - 204) * localT;
            b = 21 + (113 - 21) * localT;
        }

        return {
            fillColor: `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`,
            weight: 1,
            opacity: 1,
            color: 'rgba(255,255,255,0.1)',
            fillOpacity: 0.8
        };
    };

    if (!data) return null;

    // Force re-render of GeoJSON when viewMode changes by using key
    return (
        <GeoJSON
            key={viewMode}
            data={data}
            style={style}
            onEachFeature={onEachFeature}
        />
    );
};

const Legend = ({ viewMode }) => {
    const isSingle = viewMode === 'single';
    const low = isSingle ? "$35k" : "$65k";
    const med = isSingle ? "$45k" : "$80k";
    const high = isSingle ? "$55k" : "$95k";
    const title = isSingle ? "Income (Single)" : "Income (Family)";

    return (
        <div className="leaflet-bottom leaflet-right">
            <div className="leaflet-control leaflet-bar" style={{
                backgroundColor: 'rgba(0,0,0,0.8)',
                color: '#fff',
                padding: '10px',
                borderRadius: '5px',
                border: '1px solid #333'
            }}>
                <h4 style={{ margin: '0 0 5px 0', fontSize: '14px' }}>{title}</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', fontSize: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <span style={{ width: '15px', height: '15px', background: '#2dd4bf' }}></span>
                        <span>&lt; {low} (Low)</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <span style={{ width: '15px', height: '15px', background: '#facc15' }}></span>
                        <span>{med} (Med)</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <span style={{ width: '15px', height: '15px', background: '#f87171' }}></span>
                        <span>&gt; {high} (High)</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const LivingWageMap = () => {
    // Canada Bounds: roughly [41, -141] to [83, -52]
    const canadaBounds = [
        [41.6765556, -141.00275], // SW
        [83.1165, -52.6194]       // NE
    ];

    const [geoData, setGeoData] = useState(null);
    const [viewMode, setViewMode] = useState('single'); // 'single' or 'family'

    useEffect(() => {
        fetch('/heatmap/canada_cd.json')
            .then(res => res.json())
            .then(topoData => {
                const objectName = Object.keys(topoData.objects)[0];
                const geojson = topojson.feature(topoData, topoData.objects[objectName]);
                setGeoData(geojson);
            })
            .catch(err => console.error("Failed to load map data", err));
    }, []);

    // Toggle Control Style
    const toggleStyle = {
        position: 'absolute',
        top: '20px',
        right: '20px', // Right side so it doesn't overlap zoom
        zIndex: 1000,
        backgroundColor: '#111',
        border: '1px solid #444',
        borderRadius: '8px',
        padding: '4px',
        display: 'flex',
        gap: '4px'
    };

    const btnStyle = (active) => ({
        padding: '6px 12px',
        borderRadius: '6px',
        border: 'none',
        background: active ? '#38bdf8' : 'transparent',
        color: active ? '#000' : '#888',
        fontWeight: '600',
        cursor: 'pointer',
        fontSize: '13px',
        transition: 'all 0.2s'
    });

    return (
        <div className="map-container" style={{ position: 'relative' }}>
            <div style={toggleStyle}>
                <button style={btnStyle(viewMode === 'single')} onClick={() => setViewMode('single')}>Single</button>
                <button style={btnStyle(viewMode === 'family')} onClick={() => setViewMode('family')}>Family (4)</button>
            </div>

            <MapContainer
                center={[56.1304, -106.3468]}
                zoom={4}
                minZoom={3}
                maxBounds={canadaBounds}
                maxBoundsViscosity={1.0}
                style={{ height: '100%', width: '100%', background: '#0a0a0a' }}
            >
                <TileLayer
                    attribution=''
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                />
                {geoData && <HeatmapLayer data={geoData} viewMode={viewMode} />}
                <Legend viewMode={viewMode} />
            </MapContainer>
        </div>
    );
};

export default LivingWageMap;

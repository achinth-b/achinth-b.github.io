import React, { useState, useEffect } from 'react';
import LivingWageMap from './Map';

const App = () => {
    return (
        <div className="app-container">
            <header>
                <h1>canadian living wage heatmap</h1>
                <p>estimated yearly income required to meet basic needs (2025 proj.)</p>
            </header>
            <main>
                <LivingWageMap />
            </main>
            <footer>
                <p>Methodology adapted from MIT Living Wage Calculator. Data sources: StatCan, CMHC.</p>
            </footer>
        </div>
    );
};

export default App;

// Interactive 3D Torus Component
class InteractiveTorus {
    constructor(container) {
        this.container = container;
        this.isZoomed = false;
        this.init();
    }

    init() {
        this.createTorus();
        this.addEventListeners();
    }

    createTorus() {
        const torus = document.createElement('div');
        torus.className = 'torus-container';
        torus.innerHTML = `
            <div class="torus">
                <div class="torus-surface"></div>
                <div class="torus-inner-hole"></div>
                <div class="torus-highlight"></div>
            </div>
        `;
        this.container.appendChild(torus);
        this.torus = torus.querySelector('.torus');
    }

    addEventListeners() {
        this.torus.addEventListener('click', () => this.toggleZoom());
        
        // Hover state for color change (like Three.js material)
        this.torus.addEventListener('mouseenter', () => {
            // Animation already running, just add hover class handled by CSS
        });
        
        this.torus.addEventListener('mouseleave', () => {
            // Remove hover effects handled by CSS
        });

        // Escape key to close zoom
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isZoomed) {
                this.toggleZoom();
            }
        });
    }

    toggleZoom() {
        this.isZoomed = !this.isZoomed;
        this.torus.classList.toggle('zoomed', this.isZoomed);
        this.torus.classList.toggle('active', this.isZoomed);
        
        if (this.isZoomed) {
            this.torus.style.animationPlayState = 'running';
            document.body.style.overflow = 'hidden'; // Prevent scrolling when zoomed
        } else {
            document.body.style.overflow = '';
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const torusContainer = document.getElementById('torus-component');
    if (torusContainer) {
        new InteractiveTorus(torusContainer);
    }
});

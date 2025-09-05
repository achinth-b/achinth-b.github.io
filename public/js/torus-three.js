// Three.js torus renderer
(() => {
  const torusRenderers = new Map(); // Track renderers by mount element

  function createTorusRenderer(mount) {
    if (torusRenderers.has(mount)) return; // Already has a renderer

    // Force consistent square sizing to match CSS
    mount.style.width = '100%';
    mount.style.height = '100%';
    mount.style.position = 'relative';
    mount.style.overflow = 'hidden';
    mount.style.aspectRatio = '1 / 1';
    
    // Use container dimensions dynamically
    const containerWidth = mount.clientWidth || 400;
    const containerHeight = mount.clientHeight || 400;
    
    // Make canvas square to match square carousel slides
    const size = Math.min(containerWidth, containerHeight);
    const width = size;
    const height = size; // Square aspect ratio (1:1)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio || 1);
    
    // Ensure canvas is centered and responsive to container
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.margin = 'auto';
    renderer.domElement.style.maxWidth = '100%';
    renderer.domElement.style.maxHeight = '100%';
    renderer.domElement.style.position = 'relative';
    renderer.domElement.style.zIndex = '1';
    
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 100);
    camera.position.set(0, 0, 8);

    // Lighting for depth cues
    const ambient = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambient);
    const dir = new THREE.DirectionalLight(0xffffff, 1.0);
    dir.position.set(5, 5, 5);
    scene.add(dir);

    // Torus geometry matching React Three Fiber code exactly: [2, 1, 64, 200]
    const geometry = new THREE.TorusGeometry(2, 1, 64, 200);

    // Normal material gives the rainbow effect you want
    const material = new THREE.MeshNormalMaterial({ flatShading: false });

    const torus = new THREE.Mesh(geometry, material);
    scene.add(torus);

    // Dynamic torus scaling based on container size
    function setDynamicTorusScale() {
      camera.aspect = 1; // Square aspect ratio
      camera.updateProjectionMatrix();
      
      // Scale based on container size - smaller to fit properly in container
      const baseSize = Math.min(width, height);
      const scaleFactor = (baseSize / 300) * 0.8; // Reduced from 1.2 to 0.8 to fit container
      torus.scale.setScalar(scaleFactor);
    }
    setDynamicTorusScale();

    let animationId;
    function animate() {
      animationId = requestAnimationFrame(animate);
      torus.rotation.x += 0.005;  // Slower rotation
      torus.rotation.y += 0.005;  // Slower rotation
      renderer.render(scene, camera);
    }

    animate();

    function onResize() {
      // Update to container dimensions - keep square
      mount.style.width = '100%';
      mount.style.height = '100%';
      mount.style.aspectRatio = '1 / 1';
      
      // Recalculate based on new container size - keep square
      const newContainerWidth = mount.clientWidth || 400;
      const newContainerHeight = mount.clientHeight || 400;
      const newSize = Math.min(newContainerWidth, newContainerHeight);
      const newWidth = newSize;
      const newHeight = newSize; // Square
      
      // Update renderer and camera
      renderer.setSize(newWidth, newHeight);
      camera.aspect = 1; // Square aspect ratio
      camera.updateProjectionMatrix();
      
      // Update torus scale for new size
      const baseSize = Math.min(newWidth, newHeight);
      const scaleFactor = (baseSize / 300) * 0.8; // Adjusted to match main scale
      torus.scale.setScalar(scaleFactor);
    }
    window.addEventListener('resize', onResize);

    // Store renderer data for cleanup
    torusRenderers.set(mount, {
      renderer,
      scene,
      camera,
      torus,
      animationId,
      onResize
    });
  }

  function init() {
    // Find all torus containers (original and duplicated)
    const mounts = document.querySelectorAll('[id^="torus-three"]');
    mounts.forEach(createTorusRenderer);
  }

  // Watch for new torus containers being added (when carousel duplicates)
  function observeTorusContainers() {
    if (typeof MutationObserver === 'undefined') return;
    
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            // Check if this node or its descendants contain torus containers
            const containers = node.id && node.id.startsWith('torus-three') 
              ? [node] 
              : node.querySelectorAll ? Array.from(node.querySelectorAll('[id^="torus-three"]')) : [];
            containers.forEach(createTorusRenderer);
          }
        });
      });
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  const ready = () => {
    if (document.readyState === 'loading') {
      window.addEventListener('DOMContentLoaded', () => {
        init();
        observeTorusContainers();
      }, { once: true });
    } else {
      // DOM is already ready
      init();
      observeTorusContainers();
    }
  };

  if (window.THREE) {
    ready();
  } else {
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/three@0.160.0/build/three.min.js';
    script.crossOrigin = 'anonymous';
    script.referrerPolicy = 'no-referrer';
    script.onload = ready;
    script.onerror = () => console.error('Failed to load Three.js');
    document.head.appendChild(script);
  }
})();

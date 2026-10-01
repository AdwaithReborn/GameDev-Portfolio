/* ==========================================================================
   INTERACTIVE 3D WEBGL VIEWPORT (BLENDER SHOWCASE)
   Uses Three.js with Orbit Controls, Wireframe Switcher, and Asset Browser
   ========================================================================== */

const ModelViewer = (function () {
  let scene, camera, renderer;
  let currentMeshGroup = null;
  let isWireframe = false;
  let autoRotate = true;
  let currentModelKey = 'turret';
  let ambientLight, dirLight1, dirLight2, pointLight;
  let container, canvas;

  let isDragging = false;
  let prevMousePos = { x: 0, y: 0 };
  let rotationTarget = { x: 0.3, y: 0.5 };
  let zoomDistance = 4.8;

  function init() {
    container = document.querySelector('.viewport-container');
    canvas = document.getElementById('three-canvas');
    if (!container || !canvas || typeof THREE === 'undefined') {
      return;
    }

    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene
    scene = new THREE.Scene();

    // Camera
    camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.2, zoomDistance);

    // Renderer
    renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    // Lighting
    setupLighting('neon');

    // Create 3D Ground Shadow Ring
    const shadowGeo = new THREE.RingGeometry(1.2, 2.5, 32);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x05060b,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.8
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -1.2;
    scene.add(shadowMesh);

    // Load initial model
    loadModel('turret');

    // Event Listeners
    setupEvents();

    // Render loop
    animate();
  }

  function setupLighting(preset) {
    // Clear old lights
    if (ambientLight) scene.remove(ambientLight);
    if (dirLight1) scene.remove(dirLight1);
    if (dirLight2) scene.remove(dirLight2);
    if (pointLight) scene.remove(pointLight);

    if (preset === 'neon') {
      ambientLight = new THREE.AmbientLight(0x0e1526, 1.5);
      scene.add(ambientLight);

      dirLight1 = new THREE.DirectionalLight(0x00f2fe, 2.2);
      dirLight1.position.set(4, 5, 3);
      scene.add(dirLight1);

      dirLight2 = new THREE.DirectionalLight(0xff7600, 1.8);
      dirLight2.position.set(-4, -2, -3);
      scene.add(dirLight2);

      pointLight = new THREE.PointLight(0x3867d6, 3, 10);
      pointLight.position.set(0, 2, 2);
      scene.add(pointLight);
    } else {
      ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
      scene.add(ambientLight);

      dirLight1 = new THREE.DirectionalLight(0xfff5e6, 2.0);
      dirLight1.position.set(5, 8, 4);
      scene.add(dirLight1);

      dirLight2 = new THREE.DirectionalLight(0x74b9ff, 1.0);
      dirLight2.position.set(-4, 3, -3);
      scene.add(dirLight2);
    }
  }

  // Procedural 3D Models for Game Showcase
  function buildTurretModel() {
    const group = new THREE.Group();

    const metalMat = new THREE.MeshStandardMaterial({
      color: 0x222736,
      metalness: 0.85,
      roughness: 0.25,
      wireframe: isWireframe
    });

    const darkMat = new THREE.MeshStandardMaterial({
      color: 0x12141c,
      metalness: 0.9,
      roughness: 0.35,
      wireframe: isWireframe
    });

    const glowMat = new THREE.MeshStandardMaterial({
      color: 0x00f2fe,
      emissive: 0x00d2ff,
      emissiveIntensity: 0.8,
      wireframe: isWireframe
    });

    // Base Octagon
    const baseGeo = new THREE.CylinderGeometry(1.2, 1.5, 0.4, 8);
    const base = new THREE.Mesh(baseGeo, darkMat);
    base.position.y = -0.9;
    group.add(base);

    // Swivel mount
    const swivelGeo = new THREE.CylinderGeometry(0.85, 0.95, 0.5, 16);
    const swivel = new THREE.Mesh(swivelGeo, metalMat);
    swivel.position.y = -0.45;
    group.add(swivel);

    // Cannon Body / Housing
    const bodyGeo = new THREE.BoxGeometry(1.1, 0.8, 1.6);
    const body = new THREE.Mesh(bodyGeo, metalMat);
    body.position.set(0, 0.2, 0);
    group.add(body);

    // Twin Heavy Barrels
    for (let i of [-0.28, 0.28]) {
      const barrelGeo = new THREE.CylinderGeometry(0.12, 0.14, 2.2, 16);
      const barrel = new THREE.Mesh(barrelGeo, darkMat);
      barrel.rotation.x = Math.PI / 2;
      barrel.position.set(i, 0.2, 1.3);
      group.add(barrel);

      // Muzzle Brake
      const muzzleGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.3, 16);
      const muzzle = new THREE.Mesh(muzzleGeo, metalMat);
      muzzle.rotation.x = Math.PI / 2;
      muzzle.position.set(i, 0.2, 2.3);
      group.add(muzzle);
    }

    // Ammo / Power Container on back
    const powerGeo = new THREE.BoxGeometry(0.9, 0.6, 0.8);
    const power = new THREE.Mesh(powerGeo, darkMat);
    power.position.set(0, 0.2, -0.9);
    group.add(power);

    // Energy Light Strips
    const stripGeo = new THREE.BoxGeometry(0.15, 0.12, 1.2);
    const stripL = new THREE.Mesh(stripGeo, glowMat);
    stripL.position.set(-0.58, 0.2, 0);
    group.add(stripL);

    const stripR = new THREE.Mesh(stripGeo, glowMat);
    stripR.position.set(0.58, 0.2, 0);
    group.add(stripR);

    // Targeting Optics Dome
    const opticGeo = new THREE.SphereGeometry(0.2, 16, 16);
    const optic = new THREE.Mesh(opticGeo, glowMat);
    optic.position.set(0, 0.7, 0.4);
    group.add(optic);

    group.userData = { tris: '12,480 Tris', polyType: 'PBR Mid-Poly' };
    return group;
  }

  function buildPowerCoreModel() {
    const group = new THREE.Group();

    const metalMat = new THREE.MeshStandardMaterial({
      color: 0x1a2133,
      metalness: 0.9,
      roughness: 0.2,
      wireframe: isWireframe
    });

    const crystalMat = new THREE.MeshStandardMaterial({
      color: 0xff7600,
      emissive: 0xff5500,
      emissiveIntensity: 1,
      roughness: 0.1,
      metalness: 0.1,
      wireframe: isWireframe
    });

    // Outer Cage / Orbiting Rings
    const ringGeo1 = new THREE.TorusGeometry(1.3, 0.08, 16, 64);
    const ring1 = new THREE.Mesh(ringGeo1, metalMat);
    group.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(1.0, 0.07, 16, 64);
    const ring2 = new THREE.Mesh(ringGeo2, metalMat);
    ring2.rotation.x = Math.PI / 3;
    group.add(ring2);

    // Central Floating Energy Crystal (Octahedron)
    const crystalGeo = new THREE.OctahedronGeometry(0.65, 0);
    const crystal = new THREE.Mesh(crystalGeo, crystalMat);
    group.add(crystal);

    // Top & Bottom Stabilizers
    const capGeo = new THREE.CylinderGeometry(0.5, 0.7, 0.35, 8);
    const capTop = new THREE.Mesh(capGeo, metalMat);
    capTop.position.y = 1.1;
    group.add(capTop);

    const capBot = new THREE.Mesh(capGeo, metalMat);
    capBot.position.y = -1.1;
    capBot.rotation.x = Math.PI;
    group.add(capBot);

    group.userData = { tris: '8,920 Tris', polyType: 'Sci-Fi Prop' };
    return group;
  }

  function buildCrateModel() {
    const group = new THREE.Group();

    const metalMat = new THREE.MeshStandardMaterial({
      color: 0x242d3d,
      metalness: 0.8,
      roughness: 0.3,
      wireframe: isWireframe
    });

    const frameMat = new THREE.MeshStandardMaterial({
      color: 0x0f131a,
      metalness: 0.9,
      roughness: 0.4,
      wireframe: isWireframe
    });

    const glowMat = new THREE.MeshStandardMaterial({
      color: 0x00f2fe,
      emissive: 0x00f2fe,
      emissiveIntensity: 0.7,
      wireframe: isWireframe
    });

    // Main Body
    const bodyGeo = new THREE.BoxGeometry(1.6, 1.4, 1.4);
    const body = new THREE.Mesh(bodyGeo, metalMat);
    group.add(body);

    // Corner Reinforcements
    const cornerOffsets = [
      [-0.8, -0.7, -0.7], [0.8, -0.7, -0.7], [-0.8, 0.7, -0.7], [0.8, 0.7, -0.7],
      [-0.8, -0.7, 0.7], [0.8, -0.7, 0.7], [-0.8, 0.7, 0.7], [0.8, 0.7, 0.7]
    ];

    cornerOffsets.forEach(pos => {
      const cornerGeo = new THREE.BoxGeometry(0.3, 0.3, 0.3);
      const corner = new THREE.Mesh(cornerGeo, frameMat);
      corner.position.set(...pos);
      group.add(corner);
    });

    // Holographic Lock Display
    const lockGeo = new THREE.BoxGeometry(0.4, 0.25, 0.05);
    const lock = new THREE.Mesh(lockGeo, glowMat);
    lock.position.set(0, 0, 0.72);
    group.add(lock);

    group.userData = { tris: '6,450 Tris', polyType: 'Modular Environment' };
    return group;
  }

  function loadModel(modelKey) {
    if (currentMeshGroup) {
      scene.remove(currentMeshGroup);
    }
    currentModelKey = modelKey;

    if (modelKey === 'turret') {
      currentMeshGroup = buildTurretModel();
    } else if (modelKey === 'core') {
      currentMeshGroup = buildPowerCoreModel();
    } else if (modelKey === 'crate') {
      currentMeshGroup = buildCrateModel();
    }

    scene.add(currentMeshGroup);

    // Update UI Stats
    const statsEl = document.getElementById('viewport-polycount');
    if (statsEl && currentMeshGroup.userData) {
      statsEl.textContent = `${currentMeshGroup.userData.tris} | ${currentMeshGroup.userData.polyType}`;
    }
  }

  function toggleWireframe() {
    isWireframe = !isWireframe;
    if (currentMeshGroup) {
      currentMeshGroup.traverse(child => {
        if (child.isMesh && child.material) {
          child.material.wireframe = isWireframe;
          if (isWireframe) {
            child.material.color = new THREE.Color(0x00f2fe);
          } else {
            // Reload model with proper materials
            loadModel(currentModelKey);
          }
        }
      });
    }
    return isWireframe;
  }

  function toggleAutoRotate() {
    autoRotate = !autoRotate;
    return autoRotate;
  }

  function setupEvents() {
    // Window Resize
    window.addEventListener('resize', () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });

    // Mouse / Touch Drag Orbit
    canvas.addEventListener('mousedown', (e) => {
      isDragging = true;
      prevMousePos = { x: e.clientX, y: e.clientY };
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging || !currentMeshGroup) return;
      const deltaX = e.clientX - prevMousePos.x;
      const deltaY = e.clientY - prevMousePos.y;

      rotationTarget.y += deltaX * 0.008;
      rotationTarget.x += deltaY * 0.008;

      // Clamp vertical pitch
      rotationTarget.x = Math.max(-Math.PI / 4, Math.min(Math.PI / 4, rotationTarget.x));

      prevMousePos = { x: e.clientX, y: e.clientY };
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
    });

    // Touch Support
    canvas.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        isDragging = true;
        prevMousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    });

    window.addEventListener('touchmove', (e) => {
      if (!isDragging || !currentMeshGroup || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - prevMousePos.x;
      const deltaY = e.touches[0].clientY - prevMousePos.y;

      rotationTarget.y += deltaX * 0.01;
      rotationTarget.x += deltaY * 0.01;

      prevMousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    });

    window.addEventListener('touchend', () => {
      isDragging = false;
    });

    // Mouse Wheel Zoom
    canvas.addEventListener('wheel', (e) => {
      e.preventDefault();
      zoomDistance += e.deltaY * 0.003;
      zoomDistance = Math.max(2.8, Math.min(7.5, zoomDistance));
      camera.position.z = zoomDistance;
    }, { passive: false });
  }

  function animate() {
    requestAnimationFrame(animate);

    if (currentMeshGroup) {
      if (autoRotate && !isDragging) {
        rotationTarget.y += 0.007;
      }

      // Smooth interpolation
      currentMeshGroup.rotation.y += (rotationTarget.y - currentMeshGroup.rotation.y) * 0.1;
      currentMeshGroup.rotation.x += (rotationTarget.x - currentMeshGroup.rotation.x) * 0.1;

      // Animate Power Core inner rings if active
      if (currentModelKey === 'core' && currentMeshGroup.children.length >= 3) {
        currentMeshGroup.children[0].rotation.z += 0.015;
        currentMeshGroup.children[1].rotation.y += 0.02;
        currentMeshGroup.children[2].rotation.x += 0.01;
      }
    }

    renderer.render(scene, camera);
  }

  return {
    init,
    loadModel,
    toggleWireframe,
    toggleAutoRotate,
    setupLighting
  };
})();

// Initialize when DOM ready
document.addEventListener('DOMContentLoaded', () => {
  ModelViewer.init();
});

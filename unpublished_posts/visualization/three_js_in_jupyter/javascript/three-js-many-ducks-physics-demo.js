import * as three from 'https://cdn.jsdelivr.net/npm/three@0.173.0/+esm';
import * as cannon from 'https://cdn.jsdelivr.net/npm/cannon-es@0.20.0/dist/cannon-es.js';
import { OBJLoader } from 'https://cdn.jsdelivr.net/npm/three@0.173.0/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'https://cdn.jsdelivr.net/npm/three@0.173.0/examples/jsm/loaders/MTLLoader.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.133.0/examples/jsm/controls/OrbitControls.js';

/* Scene / Camera / renderer ---------------------------------------------- */ 
const bodyWidth = document.getElementById("quarto-document-content").clientWidth;
const bodyHeight = 600;
const canvas7 = document.getElementById("three-d-canvas-7");

const scene7 = new three.Scene();
const camera7 = new three.PerspectiveCamera(75, bodyWidth / bodyHeight, 0.1, 1000);
const renderer7 = new three.WebGLRenderer({ canvas: canvas7 });
renderer7.setPixelRatio(window.devicePixelRatio);
renderer7.setSize(bodyWidth, bodyHeight);

/* Lights ---------------------------------------------- */
scene7.add(new three.AmbientLight(0xffffff, 1));
const dir = new three.DirectionalLight(0xffffff, 1);
dir.position.set(10, 20, 10);
scene7.add(dir);

/* Skybox ---------------------------------------------- */
scene7.background = new three.CubeTextureLoader().load([
    'https://raw.githubusercontent.com/v-poghosyan/v-poghosyan.github.io/refs/heads/main/posts/visualization/three_js_in_jupyter/textures/skybox/px.png',
    'https://raw.githubusercontent.com/v-poghosyan/v-poghosyan.github.io/refs/heads/main/posts/visualization/three_js_in_jupyter/textures/skybox/nx.png',
    'https://raw.githubusercontent.com/v-poghosyan/v-poghosyan.github.io/refs/heads/main/posts/visualization/three_js_in_jupyter/textures/skybox/py.png',
    'https://raw.githubusercontent.com/v-poghosyan/v-poghosyan.github.io/refs/heads/main/posts/visualization/three_js_in_jupyter/textures/skybox/ny.png',
    'https://raw.githubusercontent.com/v-poghosyan/v-poghosyan.github.io/refs/heads/main/posts/visualization/three_js_in_jupyter/textures/skybox/pz.png',
    'https://raw.githubusercontent.com/v-poghosyan/v-poghosyan.github.io/refs/heads/main/posts/visualization/three_js_in_jupyter/textures/skybox/nz.png'
]);


/* Physics World ---------------------------------------------- */
const world = new cannon.World();
world.gravity.set(0, -9.82, 0); // Gravity pointing down

// Water plane
// Water-like material
const waterTexture = new three.TextureLoader().load('https://threejs.org/examples/textures/water.jpg');
const waterBumpMap = new three.TextureLoader().load('https://threejs.org/examples/textures/water-bump.jpg');
const waterMaterial = new three.MeshStandardMaterial({
  map: waterTexture, // Water texture
  bumpMap: waterBumpMap, // Bump map for surface detail
  bumpScale: 0.1, // Adjust bump intensity
  color: 0x3399ff, // Light blue color for water
  transparent: true,
  opacity: 0.8, // Slight transparency for a water effect
});
const waterBody = new cannon.Body({
    mass: 0, // Static body
    shape: new cannon.Plane(),
});
waterBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0); // Rotate to be horizontal
world.addBody(waterBody);
const waterMesh = new three.Mesh(
    new three.PlaneGeometry(200, 200),
    waterMaterial
);
waterBody.position.y += 5;
waterMesh.rotation.x = -Math.PI / 2; // Rotate to make it horizontal
waterMesh.position.y += 5;
scene7.add(waterMesh); 
    

// Add walls to the pool
// Update wall material to shiny metal
const wallMaterial = new three.MeshStandardMaterial({
    color: 0xcccccc, // Base color for the metal
    metalness: 1,    // Fully metallic
    roughness: 0.1,  // Low roughness for a shiny surface
    envMap: scene7.background, // Use the skybox for reflections
});
const wallThickness = 10;
const wallHeight = 20;

const walls = [
  new three.Mesh(new three.BoxGeometry(200, wallHeight, wallThickness), wallMaterial), // Front wall
  new three.Mesh(new three.BoxGeometry(200, wallHeight, wallThickness), wallMaterial), // Back wall
  new three.Mesh(new three.BoxGeometry(wallThickness, wallHeight, 200), wallMaterial), // Left wall
  new three.Mesh(new three.BoxGeometry(wallThickness, wallHeight, 200), wallMaterial), // Right wall
  new three.Mesh(new three.BoxGeometry(200, wallThickness, 200), wallMaterial), // Floor
];

walls[0].position.set(0, wallHeight / 2, -95); // Front wall
walls[1].position.set(0, wallHeight / 2, 95);  // Back wall
walls[2].position.set(-95, wallHeight / 2, 0); // Left wall
walls[3].position.set(95, wallHeight / 2, 0);  // Right wall
walls[4].position.set(0, - wallThickness / 2, 0);  // Floor

walls.forEach((wall) => scene7.add(wall));

const wallBodies = walls.map((wall, index) => {
  const shape = new cannon.Box(new cannon.Vec3(
    wall.geometry.parameters.width / 2 || wall.geometry.parameters.depth / 2,
    wallHeight / 2,
    wall.geometry.parameters.depth / 2 || wall.geometry.parameters.width / 2
  ));
  const body = new cannon.Body({
    mass: 0, // Static body
    shape: shape,
  });
  body.position.set(wall.position.x, wall.position.y, wall.position.z);
  world.addBody(body);
  return body;
});

/* Load duck model ---------------------------------------------- */
const mtlURL = 'https://raw.githubusercontent.com/v-poghosyan/v-poghosyan.github.io/refs/heads/main/posts/visualization/three_js_in_jupyter/models/rubber_duck.mtl';
const objURL = 'https://raw.githubusercontent.com/v-poghosyan/v-poghosyan.github.io/refs/heads/main/posts/visualization/three_js_in_jupyter/models/rubber_duck.obj';

new MTLLoader().load(mtlURL, (materials) => {
  materials.preload();

  new OBJLoader().setMaterials(materials).load(objURL, (obj) => {
    const geos = [];
    const mats = [];
    obj.traverse((c) => {
      if (c.isMesh) {
        geos.push(c.geometry);
        mats.push(c.material);
      }
    });

    const N = 25; // Number of ducks
    const dummy = new three.Object3D();
    const meshGroup = new three.Group();
    const duckBodies = []; // Store physics bodies

    for (let p = 0; p < geos.length; p++) {
      const mesh = new three.InstancedMesh(geos[p], mats[p], N);

      for (let i = 0; i < N; i++) {
        // Random initial positions
        const x = Math.random() * 50 - 25;
        const y = Math.random() * 50 + 50; // Start above the ground
        const z = Math.random() * 50 - 25;

        // Create a physics body for each duck
        const duckBody = new cannon.Body({
          mass: 1, // Dynamic body
          shape: new cannon.Sphere(1), // Approximate shape
          position: new cannon.Vec3(x, y, z),
        });
        world.addBody(duckBody);
        duckBodies.push(duckBody);

        // Set initial transformation for the InstancedMesh
        dummy.position.set(x, y, z);
        dummy.rotation.y = Math.random() * Math.PI * 2;
        dummy.scale.set(3, 3, 3);
        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);
      }

      mesh.instanceMatrix.needsUpdate = true;
      meshGroup.add(mesh);
    }

    /* Spawning ducks one by one */
    scene7.add(meshGroup);

    /* Camera / Animation ---------------------------------------------- */
    camera7.position.set(0, 50, 100);
    camera7.lookAt(0, 0, 0);

    function animate() {
      requestAnimationFrame(animate);

      // Step the physics world multiple times per frame
      for(let i = 0; i < 3; i++) {  // Simulate physics 3x per frame
        world.step(1/60);         // Standard 60 FPS physics simulation
      }

      // Update the positions of the ducks
      for (let i = 0; i < N; i++) {
        const duckBody = duckBodies[i];
        const position = duckBody.position;
        const quaternion = duckBody.quaternion;

        dummy.position.set(position.x, position.y, position.z);
        dummy.quaternion.set(quaternion.x, quaternion.y, quaternion.z, quaternion.w);
        dummy.updateMatrix();

        meshGroup.children.forEach((mesh) => {
          mesh.setMatrixAt(i, dummy.matrix);
        });
      }

      meshGroup.children.forEach((mesh) => {
        mesh.instanceMatrix.needsUpdate = true;
      });

      controls.update();
      renderer7.render(scene7, camera7);
    }

    animate();
  });
});

/* Orbit Controls ---------------------------------------------- */
const controls = new OrbitControls(camera7, renderer7.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
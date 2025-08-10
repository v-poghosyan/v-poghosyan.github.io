/* Imports ---------------------------------------------- */
import * as three from 'https://cdn.jsdelivr.net/npm/three@0.173.0/build/three.module.js';
import { OBJLoader } from 'https://cdn.jsdelivr.net/npm/three@0.173.0/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'https://cdn.jsdelivr.net/npm/three@0.173.0/examples/jsm/loaders/MTLLoader.js';
import { OrbitControls } from "https://cdn.skypack.dev/three@0.133.0/examples/jsm/controls/OrbitControls.js";

/* Scene / camera / renderer ---------------------------------------- */
const bodyWidth  = document.getElementById("quarto-document-content").clientWidth;
const bodyHeight = 600;
const canvas6    = document.getElementById("three-d-canvas-6");

const scene6     = new three.Scene();
const camera6    = new three.PerspectiveCamera(75, bodyWidth / bodyHeight, 0.1, 1000);
const renderer6  = new three.WebGLRenderer({ canvas: canvas6 });
renderer6.setPixelRatio(window.devicePixelRatio);
renderer6.setSize(bodyWidth, bodyHeight);

/* Lights */
scene6.add(new three.AmbientLight(0xffffff, 1));
const dir = new three.DirectionalLight(0xffffff, 1);
dir.position.set(10, 20, 10);
scene6.add(dir);

/* Skybox */
scene6.background = new three.CubeTextureLoader().load([
  'https://raw.githubusercontent.com/vahram-pg/digital-garden/refs/heads/main/posts/visualization/three_js_in_jupyter/textures/skybox/px.png',
  'https://raw.githubusercontent.com/vahram-pg/digital-garden/refs/heads/main/posts/visualization/three_js_in_jupyter/textures/skybox/nx.png',
  'https://raw.githubusercontent.com/vahram-pg/digital-garden/refs/heads/main/posts/visualization/three_js_in_jupyter/textures/skybox/py.png',
  'https://raw.githubusercontent.com/vahram-pg/digital-garden/refs/heads/main/posts/visualization/three_js_in_jupyter/textures/skybox/ny.png',
  'https://raw.githubusercontent.com/vahram-pg/digital-garden/refs/heads/main/posts/visualization/three_js_in_jupyter/textures/skybox/pz.png',
  'https://raw.githubusercontent.com/vahram-pg/digital-garden/refs/heads/main/posts/visualization/three_js_in_jupyter/textures/skybox/nz.png'
]);

/* Controls */
const controls = new OrbitControls(camera6, renderer6.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

/* Load duck model --------------------------------------------------- */
const mtlURL = 'https://raw.githubusercontent.com/vahram-pg/digital-garden/refs/heads/main/posts/visualization/three_js_in_jupyter/models/rubber_duck.mtl';
const objURL = 'https://raw.githubusercontent.com/vahram-pg/digital-garden/refs/heads/main/posts/visualization/three_js_in_jupyter/models/rubber_duck.obj';

new MTLLoader().load(mtlURL, (materials) => {
  materials.preload();

  new OBJLoader().setMaterials(materials).load(objURL, (obj) => {

    /* Grab geometries & materials of every duck part ---------------- */
    const geos = [];
    const mats = [];
    obj.traverse((c) => { if (c.isMesh) { geos.push(c.geometry); mats.push(c.material); } });

    /* Build N shared transform matrices for each N duck *once* ----------------------------- */
    const N = 15;
    const dummy  = new three.Object3D();
    const matrices = []; // store for reuse
    for (let i = 0; i < N; i++) {
      const angle  = (i / N) * Math.PI * 2;
      const radius = 40;
      dummy.position.set(Math.cos(angle)*radius, 0, Math.sin(angle)*radius);
      dummy.rotation.y = Math.random() * Math.PI * 2;
      dummy.scale.set(3, 3, 3);
      dummy.updateMatrix();
      matrices.push(dummy.matrix.clone());   // ⬅️ keep a copy
    }

    /* One instanced mesh per part, but use *same* matrices for each of the 4 parts ------------ */
    const meshGroup = new three.Group();

    /* Adding the transformation matrix to each duck part */
    for (let p = 0; p < geos.length; p++) {
      const mesh = new three.InstancedMesh(geos[p], mats[p], N); // Make N InstancedMeshes of the duck part

      // Set the transform of each N InstancedMesh to one of the N matrices created above
      // Note that because of linearity: T(duck) = T(beak) + T(eyes) + T(body)
      // So the same transform can be applies to all parts of the duck 
      for (let i = 0; i < N; i++) {
        mesh.setMatrixAt(i, matrices[i]);    // ⬅️ reuse the matrix
      }
      mesh.instanceMatrix.needsUpdate = true;
      meshGroup.add(mesh);
    }

    scene6.add(meshGroup);

    /* Camera / animation ------------------------------------------- */
    camera6.position.set(0, 50, 100);
    camera6.lookAt(0, 0, 0);

    (function animate() {
      requestAnimationFrame(animate);
      controls.update();
      renderer6.render(scene6, camera6);
    })();
  });
});

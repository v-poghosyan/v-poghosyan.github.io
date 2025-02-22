import * as three from 'https://cdn.jsdelivr.net/npm/three@0.173.0/build/three.module.js';
import { OBJLoader } from 'https://cdn.jsdelivr.net/npm/three@0.173.0/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'https://cdn.jsdelivr.net/npm/three@0.173.0/examples/jsm/loaders/MTLLoader.js';

// Get the container and set dimensions
const body = document.getElementById("quarto-document-content");
const bodyWidth = body.clientWidth;
const bodyHeight = 600;

// Set up the canvas, scene, camera, and renderer
const canvas5 = document.getElementById("three-d-canvas-5");
const scene5 = new three.Scene();
const camera5 = new three.PerspectiveCamera(75, bodyWidth / bodyHeight, 0.1, 1000);
const renderer5 = new three.WebGLRenderer({ canvas: canvas5 });
renderer5.setPixelRatio(window.devicePixelRatio);
renderer5.setSize(bodyWidth, bodyHeight);

// Position the camera so the object will be in view.
camera5.position.set(0, 20, 0);

// Add some lights so the materials are visible.
const ambientLight = new three.AmbientLight(0xffffff, 0.6);
scene5.add(ambientLight);

const directionalLight = new three.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(10, 20, 10);
scene5.add(directionalLight);

// Load the MTL file first.
const mtlLoader = new MTLLoader();
mtlLoader.load(
  'https://raw.githubusercontent.com/v-poghosyan/v-poghosyan.github.io/refs/heads/main/posts/visualization/three_js_in_jupyter/models/rubber_duck.mtl',
  (materials) => {
    materials.preload();

    // Now load the OBJ file and set its materials.
    const objLoader = new OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.load(
      'https://raw.githubusercontent.com/v-poghosyan/v-poghosyan.github.io/refs/heads/main/posts/visualization/three_js_in_jupyter/models/rubber_duck.obj',
      (object) => {
        // Scale and position the loaded object.
        object.scale.set(5, 5, 5);
        object.position.set(0, 15, -20);
        scene5.add(object);

        // Animation loop
        function animate() {
          requestAnimationFrame(animate);
          object.rotation.y += 0.01;
          renderer5.render(scene5, camera5);
        }
        animate();
      },
      // onProgress callback
      (xhr) => {
        console.log("Loading object...");
      },
      // onError callback
      (error) => {
        console.error('An error occurred while loading the OBJ:', error);
      }
    );
  },
  // onProgress callback for MTL
  (xhr) => {
    console.log("Loading materials...");
  },
  // onError callback for MTL
  (error) => {
    console.error('An error occurred while loading the MTL:', error);
  }
);
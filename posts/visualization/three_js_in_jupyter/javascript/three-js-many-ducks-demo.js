import * as three from 'https://cdn.jsdelivr.net/npm/three@0.173.0/build/three.module.js';
import { OBJLoader } from 'https://cdn.jsdelivr.net/npm/three@0.173.0/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'https://cdn.jsdelivr.net/npm/three@0.173.0/examples/jsm/loaders/MTLLoader.js';

// Get the container and set dimensions
const body = document.getElementById("quarto-document-content");
const bodyWidth = body.clientWidth;
const bodyHeight = 600;

// Set up the canvas, scene, camera, and renderer
const canvas6 = document.getElementById("three-d-canvas-6");
const scene6 = new three.Scene();
const camera6 = new three.PerspectiveCamera(75, bodyWidth / bodyHeight, 0.1, 1000);
const renderer6 = new three.WebGLRenderer({ canvas: canvas6 });
renderer6.setPixelRatio(window.devicePixelRatio);
renderer6.setSize(bodyWidth, bodyHeight);

// Position the camera so the object will be in view.
camera6.position.set(0, 10, 30);
camera6.lookAt(new three.Vector3(0, 0, 0));

// Add some lights so the materials are visible.
const ambientLight = new three.AmbientLight(0xffffff, 0.6);
scene6.add(ambientLight);

const directionalLight = new three.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(10, 20, 10);
scene6.add(directionalLight);

// Helper function: generate a random number in range [min, max]
function randInRange(min, max) {
  return Math.random() * (max - min) + min;
}

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
        // Scale the loaded object.
        object.scale.set(3, 3, 3);

        // Extract meshes from OBJ (these need to be merged)
        const duckMesh = object.children[0];
        if (!duckMesh) {
          console.error('Loaded object does not contain a mesh.');
          return;
        }

        const numDuckies = 400;
        // Create an InstancedMesh using the duck's geometry and material.
        const instancedDuck = new three.InstancedMesh(
          duckMesh.geometry,
          duckMesh.material,
          numDuckies
        );
        scene6.add(instancedDuck);

        // Create a dummy Object3D to build transformation matrices.
        const dummy = new three.Object3D();

        // Initialize each instance with a random position and rotation.
        for (let i = 0; i < numDuckies; i++) {
          dummy.position.set(
            randInRange(-30, 30),
            randInRange(-30, 30),
            randInRange(-30, 30)
          );
          dummy.rotation.y = randInRange(0, Math.PI * 2);
          dummy.updateMatrix();
          instancedDuck.setMatrixAt(i, dummy.matrix);
        }

        // Animate: update rotation for each instance.
        function animate(time) {
          requestAnimationFrame(animate);

          // For a simple example, we’ll rotate each duck around its own Y-axis.
          for (let i = 0; i < numDuckies; i++) {
            // Retrieve the current matrix of instance i.
            instancedDuck.getMatrixAt(i, dummy.matrix);
            // Decompose the matrix into position, rotation, and scale.
            dummy.matrix.decompose(dummy.position, dummy.rotation, dummy.scale);
            // Increment the rotation.
            dummy.rotation.y += 0.01;
            // Update the dummy's matrix.
            dummy.updateMatrix();
            // Set the new matrix for instance i.
            instancedDuck.setMatrixAt(i, dummy.matrix);
          }
          // Mark the instance matrix attribute as needing an update.
          instancedDuck.instanceMatrix.needsUpdate = true;
          renderer6.render(scene6, camera6);
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
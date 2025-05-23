import * as three from 'https://cdn.jsdelivr.net/npm/three@0.173.0/+esm';

/* Scene / Camera / renderer ---------------------------------------------- */ 
const bodyWidth = document.getElementById("quarto-document-content").clientWidth;
const bodyHeight = 600;
const canvas10 = document.getElementById("three-d-canvas-10");

const scene10 = new three.Scene();
const camera10 = new three.PerspectiveCamera(75, bodyWidth / bodyHeight, 0.1, 1000);
const renderer10 = new three.WebGLRenderer({ canvas: canvas10 });
renderer10.setPixelRatio(window.devicePixelRatio);
renderer10.setSize(bodyWidth, bodyHeight);

/* Lights ---------------------------------------------- */
scene10.add(new three.AmbientLight(0xffffff, 1));
const dir = new three.DirectionalLight(0xffffff, 1);
dir.position.set(10, 20, 10);
scene10.add(dir);

/* Plane  ---------------------------------------------- */
const quadMesh = new three.Mesh(
    new three.PlaneGeometry(250, 250), // Plane is added to the XY plane (x+ = right, y+ = up, z+ = out of the screen)
);
scene10.add(quadMesh); 

/* Camera ---------------------------------------------- */
camera10.position.set(0, 0, 200); // The z+ represetns 100 units towards the viewer (out of the screen)
camera10.lookAt(quadMesh.position);

renderer10.render(scene10, camera10);
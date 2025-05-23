import * as three from 'https://cdn.jsdelivr.net/npm/three@0.173.0/+esm';

/* Scene / Camera / renderer ---------------------------------------------- */ 
const bodyWidth = document.getElementById("quarto-document-content").clientWidth;
const bodyHeight = 600;
const canvas9 = document.getElementById("three-d-canvas-9");

const scene9 = new three.Scene();
const camera9 = new three.PerspectiveCamera(75, bodyWidth / bodyHeight, 0.1, 1000);
const renderer9 = new three.WebGLRenderer({ canvas: canvas9 });
renderer9.setPixelRatio(window.devicePixelRatio);
renderer9.setSize(bodyWidth, bodyHeight);

/* Lights ---------------------------------------------- */
scene9.add(new three.AmbientLight(0xffffff, 1));
const dir = new three.DirectionalLight(0xffffff, 1);
dir.position.set(10, 20, 10);
scene9.add(dir);

/* Plane  ---------------------------------------------- */
const quadMesh = new three.Mesh(
    new three.PlaneGeometry(250, 250), // Plane is added to the XY plane (x+ = right, y+ = up, z+ = out of the screen)
);
scene9.add(quadMesh); 

/* Camera ---------------------------------------------- */
camera9.position.set(0, 0, 200); // The z+ represetns 100 units towards the viewer (out of the screen)
camera9.lookAt(quadMesh.position);

renderer9.render(scene9, camera9);
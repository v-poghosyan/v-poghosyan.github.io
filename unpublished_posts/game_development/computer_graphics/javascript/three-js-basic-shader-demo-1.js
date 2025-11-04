import * as three from 'https://cdn.jsdelivr.net/npm/three@0.173.0/+esm';

/* Scene / Camera / renderer ---------------------------------------------- */ 
const bodyWidth = document.getElementById("quarto-document-content").clientWidth;
const bodyHeight = 600;
const canvas1 = document.getElementById("three-d-canvas-1");

const scene1 = new three.Scene();
const camera1 = new three.PerspectiveCamera(75, bodyWidth / bodyHeight, 0.1, 1000);
const renderer1 = new three.WebGLRenderer({ canvas: canvas1 });
renderer1.setPixelRatio(window.devicePixelRatio);
renderer1.setSize(bodyWidth, bodyHeight);

/* Lights ---------------------------------------------- */
scene1.add(new three.AmbientLight(0xffffff, 1));
const dir = new three.DirectionalLight(0xffffff, 1);
dir.position.set(10, 20, 10);
scene1.add(dir);

/* Plane  ---------------------------------------------- */
const quadMesh = new three.Mesh(
    new three.PlaneGeometry(250, 250), // Plane is added to the XY plane (x+ = right, y+ = up, z+ = out of the screen)
);
scene1.add(quadMesh); 

/* Camera ---------------------------------------------- */
camera1.position.set(0, 0, 200); // The z+ represetns 100 units towards the viewer (out of the screen)
camera1.lookAt(quadMesh.position);

renderer1.render(scene1, camera1);
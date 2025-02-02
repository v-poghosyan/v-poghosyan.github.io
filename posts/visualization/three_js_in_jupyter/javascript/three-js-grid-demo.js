import * as three from 'https://cdn.jsdelivr.net/npm/three@0.173.0/+esm'

/*-----------------------------------------*/
////////////////// SCENE 1 //////////////////
/*-----------------------------------------*/

const scene1 = new three.Scene();

const body1 = document.getElementById("three-d-grid-item-1");
const bodyWidth1 = body1.clientWidth;
const bodyHeight1 = 300;


const canvas1 = document.getElementById("three-d-canvas-1")

const camera1 = new three.PerspectiveCamera(75, bodyWidth1 / bodyHeight1, 0.1, 1000);

const renderer1 = new three.WebGLRenderer({
    canvas: canvas1
});

renderer1.setPixelRatio( window.devicePixelRatio );
renderer1.setSize( bodyWidth1, bodyHeight1 );
camera1.position.setZ(30);

renderer1.render(scene1, camera1);

const geometry1 = new three.TorusGeometry(10,3,16,100);
const material1 = new three.MeshBasicMaterial({ color: 0xFF6347, wireframe: true });
const torus1 = new three.Mesh(geometry1, material1);

scene1.add(torus1);

function animate1() {
    requestAnimationFrame(animate1);

    torus1.rotation.x += 0.01;
    torus1.rotation.y += 0.005;
    torus1.rotation.z += 0.01;

    renderer1.render(scene1, camera1);
}

animate1();

/*-----------------------------------------*/
////////////////// SCENE 2 //////////////////
/*-----------------------------------------*/

const scene2 = new three.Scene();

const body2 = document.getElementById("three-d-grid-item-2");
const bodyWidth2 = body2.clientWidth;
const bodyHeight2 = 300;

const canvas2 = document.getElementById("three-d-canvas-2");

const camera2 = new three.PerspectiveCamera(75, bodyWidth2 / bodyHeight2, 0.1, 1000);

const renderer2 = new three.WebGLRenderer({
    canvas: canvas2
});

renderer2.setPixelRatio(window.devicePixelRatio);
renderer2.setSize(bodyWidth2, bodyHeight2);
camera2.position.setZ(30);

renderer2.render(scene2, camera2);

const geometry2 = new three.IcosahedronGeometry(10, 0);
const material2 = new three.MeshBasicMaterial({ color: 0x8A2BE2, wireframe: true });
const icosahedron2 = new three.Mesh(geometry2, material2);

scene2.add(icosahedron2);

function animate2() {
    requestAnimationFrame(animate2);

    icosahedron2.rotation.x += 0.01;
    icosahedron2.rotation.y += 0.005;
    icosahedron2.rotation.z += 0.01;

    renderer2.render(scene2, camera2);
}

animate2();

/*-----------------------------------------*/
////////////////// SCENE 3 //////////////////
/*-----------------------------------------*/

const scene3 = new three.Scene();

const body3 = document.getElementById("three-d-grid-item-3");
const bodyWidth3 = body3.clientWidth;
const bodyHeight3 = 300;

const canvas3 = document.getElementById("three-d-canvas-3");

const camera3 = new three.PerspectiveCamera(75, bodyWidth3 / bodyHeight3, 0.1, 1000);

const renderer3 = new three.WebGLRenderer({
    canvas: canvas3
});

renderer3.setPixelRatio(window.devicePixelRatio);
renderer3.setSize(bodyWidth3, bodyHeight3);
camera3.position.setZ(30);

renderer3.render(scene3, camera3);

const geometry3 = new three.SphereGeometry(10, 28, 12);
const material3 = new three.MeshBasicMaterial({ color: 0x2E8B57, wireframe: true });
const sphere3 = new three.Mesh(geometry3, material3);

scene3.add(sphere3);

function animate3() {
    requestAnimationFrame(animate3);

    sphere3.rotation.x += 0.01;
    sphere3.rotation.y += 0.005;
    sphere3.rotation.z += 0.01;

    renderer3.render(scene3, camera3);
}

animate3();


/*-----------------------------------------*/
////////////////// SCENE 4 //////////////////
/*-----------------------------------------*/

const scene4 = new three.Scene();

const body4 = document.getElementById("three-d-grid-item-4");
const bodyWidth4 = body4.clientWidth;
const bodyHeight4 = 300;

const canvas4 = document.getElementById("three-d-canvas-4");

const camera4 = new three.PerspectiveCamera(75, bodyWidth4 / bodyHeight4, 0.1, 1000);

const renderer4 = new three.WebGLRenderer({
    canvas: canvas4
});

renderer4.setPixelRatio(window.devicePixelRatio);
renderer4.setSize(bodyWidth4, bodyHeight4);
camera4.position.setZ(30);

renderer4.render(scene4, camera4);

const geometry4 = new three.DodecahedronGeometry(10, 0);
const material4 = new three.MeshBasicMaterial({ color: 0xFF69B4, wireframe: true });
const sphere4 = new three.Mesh(geometry4, material4);

scene4.add(sphere4);

function animate4() {
    requestAnimationFrame(animate4);

    sphere4.rotation.x += 0.01;
    sphere4.rotation.y += 0.005;
    sphere4.rotation.z += 0.01;

    renderer4.render(scene4, camera4);
}

animate4();




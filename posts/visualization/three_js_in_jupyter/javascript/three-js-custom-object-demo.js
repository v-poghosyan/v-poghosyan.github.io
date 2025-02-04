// import * as three from 'three';
// import { OBJLoader } from 'OBJLoader';
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.173.0/build/three.module.js';
import { OBJLoader } from 'https://cdn.jsdelivr.net/npm/three@0.173.0/examples/jsm/loaders/OBJLoader.js';

const body = document.getElementById("quarto-document-content");
const bodyWidth = body.clientWidth;
const bodyHeight = 600;

const canvas5 = document.getElementById("three-d-canvas-5");
const scene5 = new THREE.Scene();
const camera5 = new THREE.PerspectiveCamera(75, bodyWidth / bodyHeight, 0.1, 1000);
const renderer5 = new THREE.WebGLRenderer({
    canvas: canvas5
});
renderer5.setPixelRatio(window.devicePixelRatio);
renderer5.setSize(bodyWidth, bodyHeight);
camera5.position.setZ(0);
camera5.position.setY(20);

function init(geometry) {

    // // Add directional light
    // const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    // directionalLight.position.set(5, 10, 7.5);
    // scene5.add(directionalLight);

    // // Add ambient light
    // const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    // scene5.add(ambientLight);

    const material = new THREE.MeshNormalMaterial();
    const pottedPlant = new THREE.Mesh(geometry, material)

    pottedPlant.scale.set(5, 5, 5);
    pottedPlant.position.set(0, 15, -20);
    scene5.add(pottedPlant);

    function animate5() {
        requestAnimationFrame(animate5);
        pottedPlant.rotation.y += 0.01;
        renderer5.render(scene5, camera5);
    }
    animate5();
}



const loader = new OBJLoader();
loader.load(
    // URL to the OBJ file
    'https://raw.githubusercontent.com/v-poghosyan/v-poghosyan.github.io/refs/heads/main/posts/visualization/three_js_in_jupyter/models/rubber_duck.obj',
    // Called when the resource is loaded
    (object) => {
        console.log(object);
        const duck = object.children[0].geometry;
        const beak = object.children[1].geometry;
        const wings = object.children[2].geometry;
        const eyes = object.children[3].geometry;

        init(duck);
        init(beak);
        init(wings);
        init(eyes);
    }, 
    // Called while loading is progressing
    (xhr) => {
        console.log("Loading object...");
    },
    // Called when loading has errors
    (error) => {
        console.error('An error occured:', error);
    }
);
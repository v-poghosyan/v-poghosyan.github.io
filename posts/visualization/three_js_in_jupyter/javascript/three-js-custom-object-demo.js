// import * as three from 'https://cdn.jsdelivr.net/npm/three@0.173.0/+esm';
// import { OBJLoader } from "https://cdn.jsdelivr.net/npm/three@0.173.0/examples/jsm/loaders/OBJLoader.js";

import * as three from 'three';
import { OBJLoader } from 'OBJLoader';


const scene5 = new three.Scene();

const body = document.getElementById("quarto-document-content");
const bodyWidth = body.clientWidth;
const bodyHeight = 600;

const canvas5 = document.getElementById("#three-d-canvas-5")

const camera5 = new three.PerspectiveCamera(75, bodyWidth / bodyHeight, 0.1, 1000);

const renderer5 = new three.WebGLRenderer({
    canvas: canvas5
});

renderer5.setPixelRatio( window.devicePixelRatio );
renderer5.setSize( bodyWidth, bodyHeight );
camera5.position.setZ(30);

renderer5.render(scene5, camera5);

const loader = new OBJLoader();
loader.load(
    // URL to the OBJ file
    "models/potted_plant.obj",
    // Called when the resource is loaded
    function (object) {
        scene5.add(object);
    },
    // Called while loading is progressing
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    // Called when loading has errors
    function (error) {
        console.error('An error happened', error);
    }
);

renderer5.render(scene5, camera5);
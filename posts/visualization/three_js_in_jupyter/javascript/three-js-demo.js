import * as three from 'https://cdn.jsdelivr.net/npm/three@0.173.0/+esm'

const scene = new three.Scene();

const body = document.getElementById("quarto-document-content");
console.log(body);
const bodyWidth = body.clientWidth;
console.log(bodyWidth);
const bodyHeight = 600;
console.log(bodyHeight);

// // Function to detect if the user is on a mobile device using matchMedia
// function isMobile() {
//     return window.matchMedia("(max-width: 767px)").matches;
// }



const canvas = document.getElementById("#3d-canvas")
console.log(canvas)

const camera = new three.PerspectiveCamera(75, bodyWidth / bodyHeight, 0.1, 1000);

const renderer = new three.WebGLRenderer({
    canvas: canvas
});

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( bodyWidth, bodyHeight );
camera.position.setZ(30);

renderer.render(scene, camera);

const geometry = new three.TorusGeometry(10,3,16,100);
const material = new three.MeshBasicMaterial({ color: 0xFF6347, wireframe: true });
const torus = new three.Mesh(geometry, material);

scene.add(torus);

function animate() {
    requestAnimationFrame(animate);

    torus.rotation.x += 0.01;
    torus.rotation.y += 0.005;
    torus.rotation.z += 0.01;





    renderer.render(scene, camera);
}

animate();



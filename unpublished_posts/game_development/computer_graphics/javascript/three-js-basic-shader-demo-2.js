import * as three from 'https://cdn.jsdelivr.net/npm/three@0.173.0/+esm';

/* Scene / Camera / renderer ---------------------------------------------- */ 
const bodyWidth = document.getElementById("quarto-document-content").clientWidth;
const bodyHeight = 600;
const canvas2 = document.getElementById("three-d-canvas-2");

const scene2 = new three.Scene();
const camera2 = new three.PerspectiveCamera(75, bodyWidth / bodyHeight, 0.1, 1000);
const renderer2 = new three.WebGLRenderer({ canvas: canvas2 });
renderer2.setPixelRatio(window.devicePixelRatio);
renderer2.setSize(bodyWidth, bodyHeight);

/* Lights ---------------------------------------------- */
scene2.add(new three.AmbientLight(0xffffff, 1));
const dir = new three.DirectionalLight(0xffffff, 1);
dir.position.set(10, 20, 10);
scene2.add(dir);

/* Plane  ---------------------------------------------- */
const quadMesh = new three.Mesh(
    new three.PlaneGeometry(250, 250), // Plane is added to the XY plane (x+ = right, y+ = up, z+ = out of the screen)
);

/* Shader Material ---------------------------------------------- */
// Import shaders from ../shaders
const vertResponse = await fetch('https://raw.githubusercontent.com/vahram-pg/digital-garden/refs/heads/main/unpublished_posts/game_development/computer_graphics/shaders/shader2.vert');
const vertexShader = await vertResponse.text();
const fragResponse = await fetch('https://raw.githubusercontent.com/vahram-pg/digital-garden/refs/heads/main/unpublished_posts/game_development/computer_graphics/shaders/shader2.frag');
const fragmentShader = await fragResponse.text();
const shaderMaterial = new three.ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    uniforms: {
        uTime: { value: 0.0 },
        uResolution: { value: new three.Vector2(bodyWidth, bodyHeight) }
    }
});
quadMesh.material = shaderMaterial;

/* Camera ---------------------------------------------- */
camera2.position.set(0, 0, 200); // The z+ represetns 100 units towards the viewer (out of the screen)
camera2.lookAt(quadMesh.position);

scene2.add(quadMesh); 
renderer2.render(scene2, camera2);
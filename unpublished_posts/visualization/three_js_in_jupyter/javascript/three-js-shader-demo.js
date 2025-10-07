import * as three from 'https://cdn.jsdelivr.net/npm/three@0.173.0/+esm';
import * as cannon from 'https://cdn.jsdelivr.net/npm/cannon-es@0.20.0/dist/cannon-es.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.133.0/examples/jsm/controls/OrbitControls.js';

/* Scene / Camera / renderer ---------------------------------------------- */ 
const bodyWidth = document.getElementById("quarto-document-content").clientWidth;
const bodyHeight = 600;
const canvas8 = document.getElementById("three-d-canvas-8");

const scene8 = new three.Scene();
const camera8 = new three.PerspectiveCamera(75, bodyWidth / bodyHeight, 0.1, 1000);
const renderer8 = new three.WebGLRenderer({ canvas: canvas8 });
renderer8.setPixelRatio(window.devicePixelRatio);
renderer8.setSize(bodyWidth, bodyHeight);

/* Lights ---------------------------------------------- */
scene8.add(new three.AmbientLight(0xffffff, 1));
const dir = new three.DirectionalLight(0xffffff, 1);
dir.position.set(10, 20, 10);
scene8.add(dir);

/* Skybox ---------------------------------------------- */
scene8.background = new three.CubeTextureLoader().load([
    'https://raw.githubusercontent.com/v-poghosyan/v-poghosyan.github.io/refs/heads/main/posts/visualization/three_js_in_jupyter/textures/skybox/px.png',
    'https://raw.githubusercontent.com/v-poghosyan/v-poghosyan.github.io/refs/heads/main/posts/visualization/three_js_in_jupyter/textures/skybox/nx.png',
    'https://raw.githubusercontent.com/v-poghosyan/v-poghosyan.github.io/refs/heads/main/posts/visualization/three_js_in_jupyter/textures/skybox/py.png',
    'https://raw.githubusercontent.com/v-poghosyan/v-poghosyan.github.io/refs/heads/main/posts/visualization/three_js_in_jupyter/textures/skybox/ny.png',
    'https://raw.githubusercontent.com/v-poghosyan/v-poghosyan.github.io/refs/heads/main/posts/visualization/three_js_in_jupyter/textures/skybox/pz.png',
    'https://raw.githubusercontent.com/v-poghosyan/v-poghosyan.github.io/refs/heads/main/posts/visualization/three_js_in_jupyter/textures/skybox/nz.png'
]);


/* Physics World ---------------------------------------------- */
const world = new cannon.World();
world.gravity.set(0, -9.82, 0); // Gravity pointing down

// Water plane
// Water-like material
const waterVertexShader = `
  uniform float uTime;
  uniform float uBigWavesElevation;
  uniform vec2 uBigWavesFrequency;
  uniform float uBigWavesSpeed;

  uniform float  uSmallWavesElevation;
  uniform float  uSmallWavesFrequency;
  uniform float  uSmallWavesSpeed;
  uniform float  uSmallWavesIterations;

  varying float vElevation;

  //	Classic Perlin 3D Noise 
  //	by Stefan Gustavson
  //
  vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
  vec3 fade(vec3 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}

  float cnoise(vec3 P){
    vec3 Pi0 = floor(P); // Integer part for indexing
    vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1
    Pi0 = mod(Pi0, 289.0);
    Pi1 = mod(Pi1, 289.0);
    vec3 Pf0 = fract(P); // Fractional part for interpolation
    vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
    vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
    vec4 iy = vec4(Pi0.yy, Pi1.yy);
    vec4 iz0 = Pi0.zzzz;
    vec4 iz1 = Pi1.zzzz;

    vec4 ixy = permute(permute(ix) + iy);
    vec4 ixy0 = permute(ixy + iz0);
    vec4 ixy1 = permute(ixy + iz1);

    vec4 gx0 = ixy0 / 7.0;
    vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;
    gx0 = fract(gx0);
    vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
    vec4 sz0 = step(gz0, vec4(0.0));
    gx0 -= sz0 * (step(0.0, gx0) - 0.5);
    gy0 -= sz0 * (step(0.0, gy0) - 0.5);

    vec4 gx1 = ixy1 / 7.0;
    vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;
    gx1 = fract(gx1);
    vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
    vec4 sz1 = step(gz1, vec4(0.0));
    gx1 -= sz1 * (step(0.0, gx1) - 0.5);
    gy1 -= sz1 * (step(0.0, gy1) - 0.5);

    vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
    vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
    vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
    vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
    vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
    vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
    vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
    vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

    vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
    g000 *= norm0.x;
    g010 *= norm0.y;
    g100 *= norm0.z;
    g110 *= norm0.w;
    vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
    g001 *= norm1.x;
    g011 *= norm1.y;
    g101 *= norm1.z;
    g111 *= norm1.w;

    float n000 = dot(g000, Pf0);
    float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
    float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
    float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
    float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
    float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
    float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
    float n111 = dot(g111, Pf1);

    vec3 fade_xyz = fade(Pf0);
    vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
    vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
    float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x); 
    return 2.2 * n_xyz;
  }

  void main()
  {
      vec4 modelPosition = modelMatrix * vec4(position,1.0);

      //elevation 
      float elevation = sin(modelPosition.x * uBigWavesFrequency.x + uTime * uBigWavesSpeed ) 
                      * sin(modelPosition.z * uBigWavesFrequency.y + uTime * uBigWavesSpeed)
                      * uBigWavesElevation;

      for(float i = 1.0 ; i <= uSmallWavesIterations ; i++)
      
      {
      elevation -= abs(
          cnoise(
              vec3(
                  modelPosition.xz * uSmallWavesFrequency * i,
                  uTime*uSmallWavesSpeed
                  )
                  ) * uSmallWavesElevation / i
                  );
                              
      }



      modelPosition.y += elevation;





      vec4 viewPosition = viewMatrix * modelPosition;
      vec4 projectedPosition = projectionMatrix * viewPosition;

      gl_Position = projectedPosition;


      vElevation = elevation;
  }
`;

const waterFragmentShader = `
uniform vec3 uDepthColor;
  uniform vec3 uSurfaceColor;
  uniform float uColorOffset;
  uniform float uColorMultiplier;


  varying float vElevation;


  void main()
  {
      float mixStrenght = (vElevation  + uColorOffset)* uColorMultiplier;
      vec3 color = mix(uDepthColor,uSurfaceColor,mixStrenght) ;
      gl_FragColor = vec4(color,1.0);
  }
`;

// Create custom water material with shaders
const waterMaterial = new three.ShaderMaterial({
  // Uniforms are passed into GLSL files
  uniforms: {
    uTime: { value: 0 },
    uBigWavesElevation: { value: 0.2 },
    uBigWavesFrequency: { value: new three.Vector2(4, 1.5) },
    uBigWavesSpeed: { value: 0.75 },
    
    uSmallWavesElevation: { value: 0.15 },
    uSmallWavesFrequency: { value: 3 },
    uSmallWavesSpeed: { value: 0.2 },
    uSmallWavesIterations: { value: 4 },

    uDepthColor: { value: new three.Color('#1e4d40') },
    uSurfaceColor: { value: new three.Color('#4d9aaa') },
    uColorOffset: { value: 0.08 },
    uColorMultiplier: { value: 5 }
  },
  vertexShader: waterVertexShader,
  fragmentShader: waterFragmentShader,
  transparent: true,
  side: three.DoubleSide
});
const waterBody = new cannon.Body({
    mass: 0, // Static body
    shape: new cannon.Plane(),
});
waterBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0); // Rotate to be horizontal
world.addBody(waterBody);
const waterMesh = new three.Mesh(
    new three.PlaneGeometry(200, 200),
    waterMaterial
);
waterBody.position.y += 5;
waterMesh.rotation.x = -Math.PI / 2; // Rotate to make it horizontal
waterMesh.position.y += 5;
scene8.add(waterMesh); 
    

// Add walls to the pool
// Update wall material to shiny metal
const wallMaterial = new three.MeshStandardMaterial({
    color: 0xcccccc, // Base color for the metal
    metalness: 1,    // Fully metallic
    roughness: 0.1,  // Low roughness for a shiny surface
    envMap: scene8.background, // Use the skybox for reflections
});
const wallThickness = 10;
const wallHeight = 20;

const walls = [
  new three.Mesh(new three.BoxGeometry(200, wallHeight, wallThickness), wallMaterial), // Front wall
  new three.Mesh(new three.BoxGeometry(200, wallHeight, wallThickness), wallMaterial), // Back wall
  new three.Mesh(new three.BoxGeometry(wallThickness, wallHeight, 200), wallMaterial), // Left wall
  new three.Mesh(new three.BoxGeometry(wallThickness, wallHeight, 200), wallMaterial), // Right wall
  new three.Mesh(new three.BoxGeometry(200, wallThickness, 200), wallMaterial), // Floor
];

walls[0].position.set(0, wallHeight / 2, -95); // Front wall
walls[1].position.set(0, wallHeight / 2, 95);  // Back wall
walls[2].position.set(-95, wallHeight / 2, 0); // Left wall
walls[3].position.set(95, wallHeight / 2, 0);  // Right wall
walls[4].position.set(0, - wallThickness / 2, 0);  // Floor

walls.forEach((wall) => scene8.add(wall));

const wallBodies = walls.map((wall, index) => {
  const shape = new cannon.Box(new cannon.Vec3(
    wall.geometry.parameters.width / 2 || wall.geometry.parameters.depth / 2,
    wallHeight / 2,
    wall.geometry.parameters.depth / 2 || wall.geometry.parameters.width / 2
  ));
  const body = new cannon.Body({
    mass: 0, // Static body
    shape: shape,
  });
  body.position.set(wall.position.x, wall.position.y, wall.position.z);
  world.addBody(body);
  return body;
});


/* Camera / Animation ---------------------------------------------- */
camera8.position.set(0, 50, 100);
camera8.lookAt(0, 0, 0);

/* Orbit Controls ---------------------------------------------- */
const controls = new OrbitControls(camera8, renderer8.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

function animate() {
  requestAnimationFrame(animate);
  // Update water shader time uniform
  waterMaterial.uniforms.uTime.value = performance.now() * 0.001;

  controls.update();
  renderer8.render(scene8, camera8);
}

animate();
import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const canvas = document.querySelector('canvas.webgl')
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const scene = new THREE.Scene()
scene.background = new THREE.Color(0xc7edfb); // Set background color

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 15
scene.add(camera)

const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambientLight);

var spotLight = new THREE.SpotLight(0xffffff, 1.5);
spotLight.position.set(-40, 40, 30);
spotLight.angle = Math.PI / 4;
spotLight.penumbra = 0.1;
scene.add(spotLight);

const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('draco/')

const gltfLoader = new GLTFLoader()
gltfLoader.setDRACOLoader(dracoLoader)
gltfLoader.load('island.glb', (gltf) => {
    scene.add(gltf.scene);
});

const renderer = new THREE.WebGLRenderer({ canvas: canvas })
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

window.addEventListener('resize', () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

const animate = () => {
    controls.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(animate);
}

animate();

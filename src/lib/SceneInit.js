import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
//import Stats from 'three/examples/jsm/libs/stats.module';

export default class SceneInit {
  constructor(canvasId) {
    // NOTE: Core components to initialize Three.js app.
    this.scene = undefined;
    this.camera = undefined;
    this.renderer = undefined;

    // NOTE: Camera params;
    // this.aspect=  5.9;
    this.fov = 50;
    this.nearPlane = 0.01;
    this.farPlane = 1000;
    this.canvasId = canvasId;

    // NOTE: Additional components.
    this.clock = undefined;
    //this.stats = undefined;
    this.controls = undefined;

    // NOTE: Lighting is basically required.
    //this.hemilight = undefined;
    this.ambientLight = undefined;
    this.directionalLight = undefined;
    this.directionalLight2 = undefined;
  }

  initialize() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      this.fov,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );

    this.camera.position.set(0, 0, 50);
    this.camera.lookAt(10, 10, 10);

    //this.camera.aspect = width / height;
    //this.camera.updateProjectMatrix();

    // NOTE: Specify a canvas which is already created in the HTML.
    const canvas = document.getElementById(this.canvasId);
    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      canvas,
      // NOTE: Anti-aliasing smooths out the edges.
      antialias: true,
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0xffffff, 0);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.shadowMap.enabled = true;
    document.body.appendChild(this.renderer.domElement);

    //more sharp rendering
    this.pmremGenerator = new THREE.PMREMGenerator(this.renderer);
    this.pmremGenerator.compileEquirectangularShader();

    // const doc = document.querySelector('.main');
    // doc.appendChild(renderer.domElement);

    //this.drag_controls = new THREE.PointDragControls();

    this.clock = new THREE.Clock();
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    this.controls.minPolarAngle = Math.PI / 2;
    this.controls.maxPolarAngle = Math.PI / 2;

    //inertia in object
    this.controls.minDistance = 100;
    this.controls.maxDistance = 240;
    this.controls.enablePan = true;
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.5;
    this.controls.enableRotate = true;
    this.controls.rotateSpeed = 0.6;

    //this.controls.maxDistance = 9;
    this.controls.target.set(0, 0.5, 0);
    this.controls.update();

    // //auto rotate
    //this.controls.autoRotate = true;

    //mouse controls
    //this.controls.mouseButtons.LEFT = THREE.MOUSE.ROTATE;

    // this.stats = Stats();
    // document.body.appendChild(this.stats.dom);

    // ambient light which is for the whole scene
    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    //this.ambientLight.castShadow = true;
    this.scene.add(this.ambientLight);

    // directional light - parallel sun rays
    this.directionalLight = new THREE.DirectionalLight(0xffffff, 0.8 * Math.PI,);
    this.directionalLight.position.set(-3, 10, -10);
    // this.directionalLight.castShadow = true;
    // this.directionalLight.shadow.camera.top = 2;
    // this.directionalLight.shadow.camera.bottom = -2;
    // this.directionalLight.shadow.camera.left = -2;
    // this.directionalLight.shadow.camera.right = 2;
    // this.directionalLight.shadow.camera.near = 0.1;
    // this.directionalLight.shadow.camera.far = 40;
    //this.directionalLight.castShadow = true;
    //this.directionalLight.position.set(0, 30, 30);
    this.scene.add(this.directionalLight);

    //second lighting
    this.directionalLight2 = new THREE.DirectionalLight(0xffbb00, 0.1);
    this.directionalLight2.position.set(0, 30, 10);
    //this.directionalLight2.castShadow = true;
    // this.directionalLight2.shadow.camera.top = 2;
    // this.directionalLight2.shadow.camera.bottom = -2;
    // this.directionalLight2.shadow.camera.left = -2;
    // this.directionalLight2.shadow.camera.right = 2;
    // this.directionalLight2.shadow.camera.near = 0.1;
    // this.directionalLight2.shadow.camera.far = 40;
    //this.directionalLight2.castShadow = true;
    //this.directionalLight2.position.set(0, 30, 30);
    this.scene.add(this.directionalLight2);

    // if window resizes
    window.addEventListener('resize', () => this.onWindowResize(), true);

    // NOTE: Load space background.
    this.loader = new THREE.TextureLoader();
    //this.scene.background = this.loader.load('./pics/space.jpeg');
    //this.scene.background = new THREE.Color(0xffffff);
    //this.scene.fog = new THREE.Fog( 0xa0a0a0, 10, 500 );
    //NOTE: Declare uniforms to pass into glsl shaders.
    this.uniforms = {
      u_time: { type: 'f', value: 1.0 },
      colorB: { type: 'vec3', value: new THREE.Color(0xfff000) },
      colorA: { type: 'vec3', value: new THREE.Color(0xffffff) },
    };
  }

  animate() {
    // NOTE: Window is implied.
    // requestAnimationFrame(this.animate.bind(this));
    window.requestAnimationFrame(this.animate.bind(this));
    this.render();
  }

  render() {
    // NOTE: Update uniform data on each render.
    // this.uniforms.u_time.value += this.clock.getDelta();
    this.renderer.render(this.scene, this.camera);
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}

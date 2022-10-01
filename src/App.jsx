import { useEffect } from 'react';

import * as THREE from 'three';
//import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
// import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
// import { VOXLoader } from 'three/examples/jsm/loaders/VOXLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

import SceneInit from './lib/SceneInit';

function App() {
  useEffect(() => {
    const test = new SceneInit('myThreeJsCanvas');
    test.initialize();
    test.animate();

    // var position = { 
    //   x: selectedObject.position.x, 
    //   y: selectedObject.position.y, 
    //   z: selectedObject.position.z 
    // };
    
    // controls.target = new THREE.Vector3(position);

    // const white = new THREE.Color( 0xffffff );
    // const black = new THREE.Color( 0x000000 );
    // const red = new THREE.Color( 0xff0000 );
    // const green = new THREE.Color( 0x00ff00 );
    // const blue = new THREE.Color( 0x0000ff );

    // const boxGeometry = new THREE.BoxGeometry(40, 40, 40);
    // const boxMaterial = new THREE.MeshNormalMaterial();
    // const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
    // test.scene.add(boxMesh);

    let loadedModel;
    
    const glftLoader = new GLTFLoader();
    //glftLoader.load('./ShidharthaWork/Helmet_Red_output_1.gltf', (gltfScene) => {
    glftLoader.load('./assets/gcRed.gltf', (gltfScene) => {
      loadedModel = gltfScene;
      console.log(loadedModel);

      // loadedModel = new THREE.Box3().setFromObject( gltfScene );
      // var center = new THREE.Vector3();
      // gltfScene.getCenter( center );
      // gltfScene.position.sub( center ); // center the model

      loadedModel.scene.background = new THREE.Color(0xff0000); //background color

      gltfScene.scene.position.z = 0;
      gltfScene.scene.rotation.y = 0;
      gltfScene.scene.position.x = 0;
      gltfScene.scene.position.y = 0;
      gltfScene.scene.scale.set(0.2, 0.2, 0.2);
      
      test.scene.add(gltfScene.scene);
    });

    const animate = () => {
      if (loadedModel) {
        // controls.minPolarAngle = Math.PI/2;
        // controls.maxPolarAngle = Math.PI/2;
        //loadedModel.scene.rotation.x += 0.01;
        loadedModel.scene.rotation.y += 0.005;
        //loadedModel.scene.rotation.z += 0.01;
      }
      requestAnimationFrame(animate);
    };
    animate();
  }, []);

  return (
    <div>
      <canvas id="myThreeJsCanvas" />
    </div>
  );
}

export default App;
import { useEffect } from 'react';

import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import SceneInit from './lib/SceneInit';

function App() {
  useEffect(() => {
    const test = new SceneInit('myThreeJsCanvas');
    test.initialize();
    test.animate();

    function onDocumentMouseDown(event) {
      event.preventDefault();

      isUserInteracting = true;

      onPointerDownPointerX = event.clientX;
      onPointerDownPointerY = event.clientY;

      onPointerDownLon = lon;
      onPointerDownLat = lat;
    }

    function onDocumentMouseMove(event) {
      if (isUserInteracting === true) {
        lon = (onPointerDownPointerX - event.clientX) * 0.1 + onPointerDownLon;
        lat = (event.clientY - onPointerDownPointerY) * 0.1 + onPointerDownLat;
      }
    }

    function onDocumentMouseUp(event) {
      isUserInteracting = false;
    }

    function onDocumentMouseWheel(event) {
      var fov = camera.fov + event.deltaY * 0.05;

      camera.fov = THREE.Math.clamp(fov, 10, 75);

      camera.updateProjectionMatrix();
    }

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
    
    const loadingManager = new THREE.LoadingManager();
    loadingManager.onStart = function(url, item, total) {
      console.log(`Started loading: ${url}`);
    }
    let loadedModel, loadedModel2;

    const glftLoader = new GLTFLoader(loadingManager);
    glftLoader.load('./assets/gcWork/helmetAndBox.gltf', (gltfScene) => {
      loadedModel = gltfScene;
      console.log(loadedModel);

      gltfScene.scene.position.z = 0;
      gltfScene.scene.position.x = 0;
      gltfScene.scene.position.y = -25;
      gltfScene.scene.scale.set(0.15, 0.15, 0.15);

      test.scene.add(gltfScene.scene);
    });

    // const glftLoader2 = new GLTFLoader();
    // glftLoader2.load('./assets/BoxGlass_Output.gltf', (gltfScene2) => {
    //   loadedModel2 = gltfScene2;
    //   console.log(loadedModel2);

    //   gltfScene2.scene.position.z = 0;
    //   gltfScene2.scene.position.x = 0;
    //   gltfScene2.scene.position.y = -30;
    //   gltfScene2.scene.scale.set(0.25, 0.25, 0.25);

    //   test.scene.add(gltfScene2.scene);
    // });

    function update() {
      // Get time since last frame
      var now = Date.now();
      var dT = now - then;

      if (isUserInteracting) {
        // Get distance travelled since last frame
        var dLon = lon - prevLon;
        var dLat = lat - prevLat;
        // velocity = distance / time
        lonVelocity = dLon / dT;
        latVelocity = dLat / dT;
      } else {
        // old position + ( velocity * time ) = new position
        lon += lonVelocity * dT;
        lat += latVelocity * dT;
        lonVelocity *= 1 - dampingFactor;
        latVelocity *= 1 - dampingFactor;
      }

      // Save these for next frame
      then = now;
      prevLon = lon;
      prevLat = lat;

      lat = Math.max(-85, Math.min(85, lat));

      phi = THREE.Math.degToRad(90 - lat);
      theta = THREE.Math.degToRad(lon);

      target.x = 500 * Math.sin(phi) * Math.cos(theta);
      target.y = 500 * Math.cos(phi);
      target.z = 500 * Math.sin(phi) * Math.sin(theta);

      camera.lookAt(target);

      //Step 3: recalculate delta based on dampingFactor
      lonDelta *= 1 - dampingFactor;
      latDelta *= 1 - dampingFactor;

      renderer.render(scene, camera);
    }

    const animate = () => {
      if (loadedModel) {
        // controls.minPolarAngle = Math.PI/2;
        // controls.maxPolarAngle = Math.PI/2;
        //loadedModel.scene.rotation.x += 0.01;
        loadedModel.scene.rotation.y += 0.003;
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

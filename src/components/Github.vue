<template>
   <div>
    <div id="console"></div>
    <div id="container1"></div>
  </div>

</template>

<script>

import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// let container, camera, scene, renderer, model;
let container, camera, scene, renderer, cube
export default {
  name: 'Github',
  props: {
    msg: String
  },
  data: function () {
    return {
    }
  },
  mounted: function () {
    this.initScene()
    this.animate()
  },
  methods: {
    initScene () {
      container = document.getElementById('container1')
      
      scene = new THREE.Scene()
      // scene.background = new THREE.Color(0xffffff)

      var ambientLight = new THREE.AmbientLight(0x404040, 10);
      scene.add(ambientLight);
      camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000)
      camera.position.set( -20, 0, 200 )
      // camera.position.z = 10
      scene.add(camera)
      
      var helper = new THREE.GridHelper(2000, 1000)
      helper.position.y = -20
      helper.material.opacity = 0.7
      helper.material.transparent = true
      scene.add(helper)

      helper = new THREE.GridHelper(2000, 500)
      helper.position.y = 50
      helper.material.opacity = 1
      helper.material.transparent = false
      scene.add(helper)

      renderer = new THREE.WebGLRenderer({ antialias: true })
      renderer.setPixelRatio(window.devicePixelRatio)
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.shadowMap.enabled = true

      var controls = new OrbitControls(camera, renderer.domElement)
      controls.target.set(0, 0, 0)
      controls.update()
      
      container.appendChild(renderer.domElement)
      // Init BoxGeometry object (rectangular cuboid)
      const geometry = new THREE.BoxGeometry(3, 3, 3)

      var wireframe = new THREE.WireframeGeometry(geometry)

      cube = new THREE.LineSegments(wireframe)
      // cube = new THREE.Mesh(wireframe)
      cube.material.depthTest = true
      cube.material.opacity = 1
      cube.material.transparent = true

      scene.add(cube)

      var loader = new GLTFLoader()
      var src = './bird.glb'

      // loader.load(src, (gltfData) => {
      //   scene.add(gltfData.scene);
      //   this.$emit('on-load')
      // }, (xhr) => {
      //   this.$emit('on-progress', xhr)
      // }, (err) => {
      //   console.log(err)
      //   this.$emit('on-error', err)
      // })
    
      this.load(loader, src)

      // this.loader.load("./bread.glb", gltf => {

      //   // ADD MODEL TO THE SCENE
      //   this.scene.add(gltf.scene);

      //   this.renderer.render(this.scene, this.camera);
      // }, undefined,
      // error => {
      //   console.log(error);
      // });

      window.addEventListener('resize', () => {
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(window.innerWidth, window.innerHeight);
      }, false);

    document.addEventListener('dblclick', () => document.documentElement.requestFullscreen());
    document.addEventListener('fullscreenchange', () => {
        if (document.fullscreenElement != null) {
            screen.orientation.lock("natural")
          }
        });
    },
    // renderScene() {
    //     requestAnimationFrame(this.renderScene);
    //     camera.lookAt(scene.position);
    //     renderer.render(scene, camera);
    // }
    animate () {
      requestAnimationFrame(this.animate)

      // Rotate cube (Change values to change speed)
      cube.rotation.x += 0.01
      cube.position.z -= 0.001

      renderer.render(scene, camera)
    },
    load (loader, src) {
      loader.load(src, (gltfData) => {
        scene.add(gltfData.scene);
        // mixer = new AnimationMixer(data)
        // mixer.clipAction(data.animations[0]).play()
        // mixer.update(clock.getDelta())
        // this.render()
        this.$emit('on-load')
      }, (xhr) => {
        this.$emit('on-progress', xhr)
      }, (err) => {
        console.log(err)
        this.$emit('on-error', err)
      })
    }
  }
}
</script>


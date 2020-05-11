<template>
   <div>
    <div id="console"></div>
    <div id="container"></div>
  </div>

</template>

<script>
import {
  AbsoluteOrientationSensor
  // RelativeOrientationSensor
} from 'motion-sensors-polyfill'
import * as THREE from 'three'
// import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
// import {  MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
const params = new URLSearchParams(new URL(window.location.href).search.slice(1))
// const relative = !!Number(params.get("relative"));
const coordinateSystem = params.get('coord')

// let container, camera, scene, renderer, model;
let container, camera, scene, renderer, cube, sensor
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data: function () {
    return {
    }
  },
  mounted: function () {
    this.initScene()
    if (navigator.permissions) {
      // https://w3c.github.io/orientation-sensor/#model
      Promise.all([navigator.permissions.query({ name: 'accelerometer' }),
        navigator.permissions.query({ name: 'magnetometer' }),
        navigator.permissions.query({ name: 'gyroscope' })])
        .then(results => {
          if (results.every(result => result.state === 'granted')) {
            this.initSensor()
          } else {
            console.log('Permission to use sensor was denied.')
          }
        }).catch(err => {
          console.log('Integration with Permissions API is not enabled, still try to start app.' + err)
          this.initSensor()
        })
    } else {
      console.log('No Permissions API, still try to start app.')
      this.initSensor()
    }

    // this.renderScene();
    this.animate()
    const log = console.log
    console.log = (message, ...rest) => {
      const div = document.querySelector('#console')
      div.innerText = message
      log.call(console, message, ...rest)
    }
    console.log('mounted')
  },
  methods: {
    calcPosFromLatLonRad(lat,lon,radius){
        
        var phi   = (90-lat)*(Math.PI/180);
        var theta = (lon+180)*(Math.PI/180);
        var x, y,z
        x = -((radius) * Math.sin(phi)*Math.cos(theta));
        z = ((radius) * Math.sin(phi)*Math.sin(theta));
        y = ((radius) * Math.cos(phi));
            
            
        console.log([x,y,z]);
        return [x,y,z];
    },
    createRandomPoints() {
        var meshes=[];
        for(var i = 0 ; i < 10 ; i++){
            var geometry	= new THREE.SphereGeometry(0.025, 20, 20)
            var material	= new THREE.MeshBasicMaterial({
                color: new THREE.Color('white')
            })
            var mesh	= new THREE.Mesh(geometry, material)
            meshes.push(mesh);
        }
        return meshes
    },
    initScene () {
      container = document.getElementById('container')
      // document.body.appendChild(container);

      camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 100)
      camera.position.z = 10

      scene = new THREE.Scene()
      scene.background = new THREE.Color(0x00f0ff)

      // var ambientLight = new THREE.AmbientLight(0x404040, 10);
      // scene.add(ambientLight);
      // camera.position.set( 0, 250, 1000 );
      scene.add(camera)

      scene.add(new THREE.AmbientLight(0xf0f0f0))
      var light = new THREE.SpotLight(0xffffff, 1.5)
      light.position.set(0, 10, 0)
      light.angle = Math.PI * 0.2
      light.castShadow = true
      light.shadow.camera.near = 20
      light.shadow.camera.far = 50
      light.shadow.bias = -0.222
      light.shadow.mapSize.width = 10
      light.shadow.mapSize.height = 10
      scene.add(light)

      
      var helper = new THREE.GridHelper(2000, 1000)
      helper.position.y = -20
      helper.material.opacity = 0.7
      helper.material.transparent = false
      // helper.material.color = 0x0f00f0
      scene.add(helper)

      helper = new THREE.GridHelper(2000, 500)
      helper.position.y = 20
      helper.material.opacity = 1
      helper.material.transparent = true
      scene.add(helper)

      renderer = new THREE.WebGLRenderer({ antialias: true })
      renderer.setPixelRatio(window.devicePixelRatio)
      renderer.setSize(window.innerWidth * 0.8, window.innerHeight * 0.8)
      renderer.shadowMap.enabled = true

      var controls = new OrbitControls(camera, renderer.domElement)
      controls.target.set(0, 0, 0)
      controls.update()
      
      container.appendChild(renderer.domElement)
      
      
      var geometry	= new THREE.SphereGeometry(0.5, 32, 32)
      var material	= new THREE.MeshPhongMaterial({
        map		: THREE.ImageUtils.loadTexture('./img/map/night.jpg'),
        bumpMap: new THREE.ImageUtils.loadTexture('./img/map/bump.jpg' ),
        specularMap: new THREE.ImageUtils.loadTexture( './img/map/spekular.jpg' ),
        })
      var mesh	= new THREE.Mesh(geometry, material)
      scene.add(mesh)

      var latlons = [[40.7142700,-74.0059700], [52.5243700,13.4105300]];
	
    var meshes= this.createRandomPoints()
    for(var i = 0; i< meshes.length; i++ ){
        scene.add(meshes[i])
                
        var latlon=latlons[Math.floor(Math.random()*latlons.length)];

        var latlonpoint = this.calcPosFromLatLonRad(latlon[0],latlon[1], 0.5);
        meshes[i].position.set(latlonpoint[0],latlonpoint[1],latlonpoint[2]);
        }

    },
    initSensor () {
      const options = { frequency: 60, coordinateSystem }
      console.log(JSON.stringify(options))
      sensor = new AbsoluteOrientationSensor(options)
      sensor.onreading = () => cube.quaternion.fromArray(sensor.quaternion).inverse()
      sensor.onerror = (event) => {
        if (event.error.name === 'NotReadableError') {
          console.log('Sensor is not available.')
        }
      }
      sensor.start()
      console.log(sensor)
    },
    // renderScene() {
    //     requestAnimationFrame(this.renderScene);
    //     camera.lookAt(scene.position);
    //     renderer.render(scene, camera);
    // }
    animate () {
      requestAnimationFrame(this.animate)

      // Rotate cube (Change values to change speed)
    //   cube.rotation.x += 0.01
    //   cube.position.z -= 0.001

      renderer.render(scene, camera)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style type="text/css">
  /* .garden {
  position: relative;
  width : 200px;
  height: 200px;
  border: 5px solid #CCC;
  border-radius: 10px;
}

.ball {
  position: absolute;
  top   : 90px;
  left  : 90px;
  width : 20px;
  height: 20px;
  background: green;
  border-radius: 100%;
} */

</style>

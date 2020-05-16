<template>
    <div id="3d-graph"></div>
</template>

<script>
import * as THREE from 'three';

// import Stats from 'three/examples/jsm/libs/stats.module.js';

import ForceGraph3D from '3d-force-graph';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
// import * as THREE from 'three'

var SEPARATION = 100, AMOUNTX = 50, AMOUNTY = 50;

// var container, stats;
var camera, renderer;

var particles, count = 0;
// var posDeltaX = 0
var posDeltaY = -350
// var posDeltaZ = 0

// var mouseX = -100, mouseY = -400;

// var windowHalfX = window.innerWidth / 2;
// var windowHalfY = window.innerHeight / 2;
let hoverNode = null;
const highlightNodes = new Set();
const highlightLinks = new Set();
var Graph = ForceGraph3D();
export default {
  name: "Shaders",
  computed: {
  },
  data: function () {
    return {
        vertexshader: `attribute float scale;

			void main() {

				vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );

				gl_PointSize = scale * ( 300.0 / - mvPosition.z );

				gl_Position = projectionMatrix * mvPosition;

			}`,
        fragmentshader: `uniform vec3 color;

			void main() {

				if ( length( gl_PointCoord - vec2( 0.5, 0.5 ) ) > 0.475 ) discard;

				gl_FragColor = vec4( color, 1.0 );

			}`
    }
  },
  mounted: function () {
      Graph(document.getElementById('3d-graph')) //.graphData('../assets/dataset.json')
        .jsonUrl('./dataset.json')
        .nodeLabel('id')
        .nodeAutoColorBy('group')
        .linkDirectionalParticles("value")
        .linkDirectionalParticleSpeed(d => d.value * 0.001)
        .nodeColor(node => highlightNodes.has(node) ? node === hoverNode ? 'rgb(255,0,0,1)' : 'rgba(255,160,0,0.8)' : 'rgba(0,255,255,0.6)')
        .linkWidth(link => highlightLinks.has(link) ? 4 : 1)
        .linkDirectionalParticles(link => highlightLinks.has(link) ? 4 : 0)
        .linkDirectionalParticleWidth(4)
        .onNodeClick(node => console.log(node))
        .onNodeHover(node => {
          // no state change
          if ((!node && !highlightNodes.size) || (node && hoverNode === node)) return;

          highlightNodes.clear();
          highlightLinks.clear();
          if (node) {
            highlightNodes.add(node);
            // node.neighbors.forEach(neighbor => highlightNodes.add(neighbor));
            // node.links.forEach(link => highlightLinks.add(link));
          }

          hoverNode = node || null;

          this.updateHighlight();
        })
        .onLinkHover(link => {
          highlightNodes.clear();
          highlightLinks.clear();

          if (link) {
            highlightLinks.add(link);
            highlightNodes.add(link.source);
            highlightNodes.add(link.target);
          }

          this.updateHighlight();
        })
    const bloomPass = new UnrealBloomPass();
    bloomPass.strength = 2;
    bloomPass.radius = 1;
    bloomPass.threshold = 0.2;
    Graph.postProcessingComposer().addPass(bloomPass);

    Graph.scene().add(this.init())

    
    // this.init();
    this.animate();
  },
  methods : {
    updateHighlight() {
      // trigger update of highlighted objects in scene
        Graph
            .nodeColor(Graph.nodeColor())
            .linkWidth(Graph.linkWidth())
            .linkDirectionalParticles(Graph.linkDirectionalParticles());
    },
    init() {

        // container = document.getElementById( 'container4' );
        // document.body.appendChild( container );

        camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
        // camera.position.set(-200,-200,-3000);

        // scene = new THREE.Scene();

        //

        var numParticles = AMOUNTX * AMOUNTY;

        var positions = new Float32Array( numParticles * 3 );
        var scales = new Float32Array( numParticles );

        var i = 0, j = 0;

        for ( var ix = 0; ix < AMOUNTX; ix ++ ) {

            for ( var iy = 0; iy < AMOUNTY; iy ++ ) {

                positions[ i ] = ix * SEPARATION - ( ( AMOUNTX * SEPARATION ) / 2 ) ; // x
                positions[ i + 1 ] = 0 ; // y
                positions[ i + 2 ] = iy * SEPARATION - ( ( AMOUNTY * SEPARATION ) / 2 ); // z

                scales[ j ] = 1;

                i += 3;
                j ++;

            }

        }
        var geometry = new THREE.BufferGeometry();
        geometry.setAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
        geometry.setAttribute( 'scale', new THREE.BufferAttribute( scales, 1 ) );

        var material = new THREE.ShaderMaterial( {

            uniforms: {
                color: { value: new THREE.Color( 0xfffff0 ) },
            },
            vertexShader: this.vertexshader, // document.getElementById( 'vertexshader' ).textContent,
            fragmentShader: this.fragmentshader // document.getElementById( 'fragmentshader' ).textContent

        } );

        //

        return particles = new THREE.Points( geometry, material );
        // scene.add( particles );

        // //

        // renderer = new THREE.WebGLRenderer( { antialias: true } );
        // renderer.setPixelRatio( window.devicePixelRatio );
        // renderer.setSize( window.innerWidth, window.innerHeight );
        // container.appendChild( renderer.domElement );

        // stats = new Stats();
        // container.appendChild( stats.dom );

        // // document.addEventListener( 'mousemove', onDocumentMouseMove, false );
        // // document.addEventListener( 'touchstart', onDocumentTouchStart, false );
        // // document.addEventListener( 'touchmove', onDocumentTouchMove, false );

        // //

        // window.addEventListener( 'resize', this.onWindowResize, false );

    },
    onWindowResize() {

        // windowHalfX = window.innerWidth / 2;
        // windowHalfY = window.innerHeight / 2;

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize( window.innerWidth, window.innerHeight );

    },
    animate() {

        requestAnimationFrame( this.animate );

        this.render();
        // stats.update();

    },
    render() {

        // camera.position.x += ( mouseX - camera.position.x ) * .05;
        // camera.position.y += ( - mouseY - camera.position.y ) * .05;
        // camera.lookAt( scene.position );

        var positions = particles.geometry.attributes.position.array;
        var scales = particles.geometry.attributes.scale.array;

        var i = 0, j = 0;

        for ( var ix = 0; ix < AMOUNTX; ix ++ ) {

            for ( var iy = 0; iy < AMOUNTY; iy ++ ) {

                positions[ i + 1 ] =  ( Math.sin( ( ix + count ) * 0.3 ) * 50 ) +
                                ( Math.sin( ( iy + count ) * 0.5 ) * 50 ) + posDeltaY;

                scales[ j ] = ( Math.sin( ( ix + count ) * 0.3 ) + 1 ) * 8 +
                                ( Math.sin( ( iy + count ) * 0.5 ) + 1 ) * 8;

                i += 3;
                j ++;

            }

        }

        particles.geometry.attributes.position.needsUpdate = true;
        particles.geometry.attributes.scale.needsUpdate = true;

        // renderer.render( scene, camera );

        count += 0.1;

    }


  }
}
</script>
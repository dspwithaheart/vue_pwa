<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <div id="3d-graph"></div>
  </div>
</template>


<script>
import ForceGraph3D from '3d-force-graph';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import * as THREE from 'three'


    // const Graph = ForceGraph3D()
    //   (document.getElementById('3d-graph'))
    //     .jsonUrl('../datasets/miserables.json')
    //     .nodeLabel('id')
    //     .nodeAutoColorBy('group')
    //     .linkDirectionalParticles("value")
    //     .linkDirectionalParticleSpeed(d => d.value * 0.001);
let hoverNode = null;
const highlightNodes = new Set();
const highlightLinks = new Set();
var Graph = ForceGraph3D();
export default {
  name: "Home",
  computed: {
  },
  data: function () {
    return {
    }
  },
  mounted: function () {
    // var myGraph = ForceGraph3D();
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

    var helper = new THREE.GridHelper(2000, 10)
    helper.position.y = -500
    helper.material.opacity = 0.7
    helper.material.transparent = true
    // helper.material.color = 0x0f00f0
    Graph.scene().add(helper)

    helper = new THREE.GridHelper(2000, 5)
    helper.position.y = 20
    helper.material.opacity = 1
    helper.material.transparent = true
    // Graph.scene().add(helper)

    const bloomPass = new UnrealBloomPass();
    bloomPass.strength = 2;
    bloomPass.radius = 1;
    bloomPass.threshold = 0.1;
    Graph.postProcessingComposer().addPass(bloomPass);

    const geometry = new THREE.BoxGeometry(30, 30, 30)
    var wireframe = new THREE.WireframeGeometry(geometry)

    var cube = new THREE.LineSegments(wireframe)
    // cube = new THREE.Mesh(wireframe)
    cube.material.depthTest = true
    cube.material.opacity = 1
    cube.material.transparent = true

    Graph.scene().add(cube)
    document.addEventListener('dblclick', () => document.documentElement.requestFullscreen());
     
    
        
  },
  methods: {
      updateHighlight() {
      // trigger update of highlighted objects in scene
        Graph
            .nodeColor(Graph.nodeColor())
            .linkWidth(Graph.linkWidth())
            .linkDirectionalParticles(Graph.linkDirectionalParticles());
    }

  }
};


  </script>
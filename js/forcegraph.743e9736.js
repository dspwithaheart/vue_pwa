(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["forcegraph"],{"20f0":function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},r=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("div",{attrs:{id:"3d-graph"}})])}],i=(n("d3b7"),n("6062"),n("3ca3"),n("ddb0"),n("ac32")),o=n("9ab2"),l=n("5a89"),c=null,d=new Set,u=new Set,s=Object(i["a"])(),p={name:"Home",computed:{},data:function(){return{}},mounted:function(){var e=this;s(document.getElementById("3d-graph")).jsonUrl("./dataset.json").nodeLabel("id").nodeAutoColorBy("group").linkDirectionalParticles("value").linkDirectionalParticleSpeed((function(e){return.001*e.value})).nodeColor((function(e){return d.has(e)?e===c?"rgb(255,0,0,1)":"rgba(255,160,0,0.8)":"rgba(0,255,255,0.6)"})).linkWidth((function(e){return u.has(e)?4:1})).linkDirectionalParticles((function(e){return u.has(e)?4:0})).linkDirectionalParticleWidth(4).onNodeClick((function(e){return console.log(e)})).onNodeHover((function(t){!t&&!d.size||t&&c===t||(d.clear(),u.clear(),t&&d.add(t),c=t||null,e.updateHighlight())})).onLinkHover((function(t){d.clear(),u.clear(),t&&(u.add(t),d.add(t.source),d.add(t.target)),e.updateHighlight()}));var t=new l["w"](2e3,10);t.position.y=-500,t.material.opacity=.7,t.material.transparent=!0,s.scene().add(t),t=new l["w"](2e3,5),t.position.y=20,t.material.opacity=1,t.material.transparent=!0;var n=new o["a"];n.strength=2,n.radius=1,n.threshold=.1,s.postProcessingComposer().addPass(n);var a=new l["i"](30,30,30),r=new l["Ob"](a),i=new l["H"](r);i.material.depthTest=!0,i.material.opacity=1,i.material.transparent=!0,s.scene().add(i),document.addEventListener("dblclick",(function(){return document.documentElement.requestFullscreen()}))},methods:{updateHighlight:function(){s.nodeColor(s.nodeColor()).linkWidth(s.linkWidth()).linkDirectionalParticles(s.linkDirectionalParticles())}}},h=p,m=n("2877"),f=Object(m["a"])(h,a,r,!1,null,null,null);t["default"]=f.exports}}]);
//# sourceMappingURL=forcegraph.743e9736.js.map
import React, { Component } from 'react';
import * as THREE from 'three';
import { connect } from 'react-redux';
import OrbitControls from 'three-orbitcontrols';
import skybox from './Skyboxes/Skybox';
import gridCubeLines from './3DModels/GridCubeLines';
class ThreeJSCanvas extends Component {
  constructor(props) {
    super(props);

    //RENDERER
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight, false);
    this.renderer.setClearColor(0xcccccc);

    //SCENE
    this.scene = new THREE.Scene();

    //CAMERA
    this.camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    this.camera.position.set(0, 10, -30);

    //AMBIENT LIGHT
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    this.scene.add(ambientLight);

    //ORBITAL CONTROLS
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableKeys = false;
    this.controls.enableDamping = true; //an animation loop is required when damping or auto-rotation are enabled
    this.controls.dampingFactor = 1;
    this.controls.minDistance = 2;
    this.controls.maxDistance = 50;
    // this.controls.maxPolarAngle = Math.PI / 2;

    // //SKYBOX (uncomment to turn on the default skybox)
    // this.scene.add(skybox);

    // GRID CUBE LINES
    this.scene.add(gridCubeLines);

  }

  componentDidMount() {
    document.getElementById('canvas').appendChild(this.renderer.domElement);
    this.animate();
  }

  animate = async () => {
    requestAnimationFrame(this.animate);

    gridCubeLines.rotation.x += 0.0082;
    gridCubeLines.rotation.y += 0.0084;
    gridCubeLines.rotation.z += 0.0086;

    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  };

  render() {
    return <div id="canvas" />;
  }
}

// const mapState = state => {
//   return {
//     prop: state.prop,
//   };
// };

// const mapDispatch = dispatch => {
//   return {
//     default: () => {
//       dispatch(default());
//     },
//   };
// };

export default connect(
  null,
  null
)(ThreeJSCanvas);

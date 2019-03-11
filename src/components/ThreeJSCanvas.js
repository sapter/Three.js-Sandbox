import React, { Component } from "react";
import { connect } from "react-redux";
import * as THREE from "three";
import { Interaction } from "three.interaction";
import OrbitControls from "three-orbitcontrols";
// import gridCubeLines from './3DModels/GridCubeLines';
import cubeCreator from "./3DModels/cubeCreator";
import GameOfLife from "./gameOfLife";

const game = new GameOfLife(10);
let group = game.board3d;
// let group2d = new THREE.Group();

class ThreeJSCanvas extends Component {
  constructor(props) {
    super(props);
    this.meshOnClick = this.meshOnClick.bind(this);
    //RENDERER
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    // this.renderer.setClearColor(0xcccccc);

    //SCENE
    this.scene = new THREE.Scene();

    //CAMERA
    this.camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      500,
    );
    // this.camera.position.set(25, 12.5, -10);
    this.camera.position.set(10, 10, 10);
    // this.camera.add(new THREE.PointLight(0xffffff, 1));
    // INTERACTION
    this.interaction = new Interaction(this.renderer, this.scene, this.camera);
    //AMBIENT LIGHT
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    this.scene.add(THREE.AmbientLight(0x222222));

    //ORBITAL CONTROLS
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableKeys = false;
    this.controls.enableDamping = true; //an animation loop is required when damping or auto-rotation are enabled
    this.controls.dampingFactor = 1;
    this.controls.minDistance = 2;
    this.controls.maxDistance = 50;
    // this.controls.maxPolarAngle = Math.PI / 2;

    // GRID CUBE LINES
    // this.scene.add(gridCubeLines);
    // group2d.position.set(30, 0, 0);
    group.children.forEach(cell => this.meshOnClick(cell));
  }

  componentDidMount() {
    document.getElementById("canvas").appendChild(this.renderer.domElement);
    // this.boardCreate(4);
    this.scene.add(group);
    this.randomVisualize();
    setInterval(this.changeBoard, 600);
    this.animate();
  }

  // CREATE CUBE BOARD
  boardCreate = size => {
    for (let x = 0; x < size; x++) {
      for (let y = 0; y < size; y++) {
        for (let z = 0; z < size; z++) {
          const cube = cubeCreator(0.98, x, y, z, true);
          const cubeChild = cubeCreator(0.94 / 2, 0, 0, 0, false);
          group.add(cube);
          cube.add(cubeChild);
          this.meshOnClick(cube);
          this.meshOnClick(cubeChild);
        }
      }
    }
  };
  meshOnClick = mesh => {
    mesh.cursor = "pointer";
    mesh.on("click", function(ev) {
      // ev.data.target.userData.toggle();
      console.dir(ev);
      // this.children[0].visible = !this.children[0].visible;
    });
  };

  changeBoard = () => {
    this.scene.remove(group);
    const newGroup = game.tick();
    group = newGroup;
    group.children.forEach(cell => this.meshOnClick(cell));
    this.scene.add(group);
    // requestAnimationFrame(this.animate);
  };

  randomVisualize = () => {
    group.children.forEach(el => {
      const randNum = Math.floor(Math.random() * 2);
      if (randNum) el.children[0].visible = !el.children[0].visible;
    });
  };

  // add2d = zCoord => {
  //   this.scene.remove(group2d);
  //   group2d = new THREE.Group();
  //   // zMeshArr holds all cells from cube with given zCoord
  //   const zMeshArr = group.children.filter(el => el.position.z === zCoord);
  //   zMeshArr.forEach(el => {
  //     group2d.add(el);
  //   });
  //   this.scene.add(group2d);
  // };

  animate = () => {
    requestAnimationFrame(this.animate);
    // gridCubeLines.rotation.x += 0.0082;
    // group.rotation.y += 0.0084;
    // gridCubeLines.rotation.z += 0.0086;

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
  null,
)(ThreeJSCanvas);

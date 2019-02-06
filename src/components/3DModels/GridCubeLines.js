import * as THREE from 'three';

const gridCubeGeometry = new THREE.BoxGeometry(10, 10, 10);

const gridCubeEdges = new THREE.EdgesGeometry(gridCubeGeometry);
const gridCubeLines = new THREE.LineSegments(
  gridCubeEdges,
  new THREE.LineBasicMaterial({ color: 0x488384 })
);
//This line is to remind readers that the cube is centered
gridCubeLines.position.set(0, 0, 0);

export default gridCubeLines;

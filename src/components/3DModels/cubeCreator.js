const { BoxBufferGeometry, MeshBasicMaterial, Mesh } = require("three");
// import { BoxBufferGeometry, MeshBasicMaterial, Mesh } from "three";
const cubeCreator = (size, a, b, c, parent = true) => {
  const geometry = new BoxBufferGeometry(size, size, size);
  const material = new MeshBasicMaterial({
    color: 0x0080ff,
    wireframe: parent ? true : false,
    opacity: parent ? 0.2 : 0.7,
    transparent: true,
  });
  const cube = new Mesh(geometry, material);
  cube.position.set(a, b, c);

  if (parent) {
    cube.add(cubeCreator(size / 2, 0, 0, 0, false));
  } else {
    cube.visible = false;
  }
  return cube;
};
module.exports = cubeCreator;
// export default cubeCreator;

import { BoxBufferGeometry, MeshBasicMaterial, Mesh } from "three";
const cubeCreator = (size, a, b, c, parent = true) => {
  const geometry = new BoxBufferGeometry(size, size, size);
  const material = new MeshBasicMaterial({
    color: 0x0080ff,
    wireframe: parent ? true : false,
    opacity: parent ? 0.5 : 1,
    transparent: parent ? true : false,
  });
  const cube = new Mesh(geometry, material);
  cube.position.set(a, b, c);
  //   if (parent) {
  //     cube.add(cubeCreator(size / 2, a, b, c, false));
  //   }
  return cube;
};

export default cubeCreator;

// const cubeCreator = require("./3DModels/cubeCreator");
// const { Group, Vector3 } = require("three");
// const ThreeJSCanvas = require("./ThreeJSCanvas");
import cubeCreator from "./3DModels/cubeCreator";
import { Group } from "three";

class GameOfLife {
  constructor(size) {
    this.size = size;
    this.board3d = this.make3dBoard(this.size);
    this.make3dBoard = this.make3dBoard.bind(this);
    this.tick = this.tick.bind(this);
  }

  make3dBoard(size) {
    const group = new Group();
    for (let x = 0; x < size; x++) {
      for (let y = 0; y < size; y++) {
        for (let z = 0; z < size; z++) {
          const cell3d = cubeCreator(0.94, x, y, z);
          group.add(cell3d);
        }
      }
    }
    return group;
  }

  getCell(a, b, c, board3d = this.board3d) {
    //   Series of if-else-if statements to create wrap-around
    //   at edges
    if (a >= this.size) a = 1;
    else if (a < 0) a = this.size - 1;
    if (b >= this.size) b = 1;
    else if (b < 0) b = this.size - 1;
    if (c >= this.size) c = 1;
    else if (c < 0) c = this.size - 1;
    return board3d.children.find(el => {
      const { x, y, z } = el.position;
      //   console.log({ x, y, z }, { a, b, c }, x === a && y === b && z === c);
      if (x === a && y === b && z === c) return el;
    });
  }

  toggleCell(cell) {
    const child = cell.children[0];
    child.visible = !child.visible;
  }

  livingNeighbors(x, y, z) {
    const n1 = this.getCell(x - 1, y + 1, z).children[0].visible;
    const n2 = this.getCell(x - 1, y, z).children[0].visible;
    const n3 = this.getCell(x - 1, y - 1, z).children[0].visible;
    const n4 = this.getCell(x + 1, y + 1, z).children[0].visible;
    const n5 = this.getCell(x + 1, y, z).children[0].visible;
    const n6 = this.getCell(x + 1, y - 1, z).children[0].visible;
    const n7 = this.getCell(x, y + 1, z).children[0].visible;
    const n8 = this.getCell(x, y - 1, z).children[0].visible;
    return n1 + n2 + n3 + n4 + n5 + n6 + n7 + n8;
  }

  tick() {
    const newBoard = this.board3d.clone();
    const cells = newBoard.children;
    cells.forEach(cell => {
      const isAlive = cell.children[0].visible;
      const { x, y, z } = cell.position;
      const numAlive = this.livingNeighbors(x, y, z);
      if (isAlive) {
        if (numAlive < 2 || numAlive > 3) {
          this.toggleCell(cell);
        }
      } else {
        if (numAlive === 3) {
          this.toggleCell(cell);
        }
      }
      //   if (numAlive === 3) {
      //     if (!isAlive) {
      //       this.toggleCell(cell);
      //     }
      //   }
      //   if (numAlive === 2 || numAlive === 3) {
      //     if (isAlive) {
      //       this.toggleCell(cell);
      //     }
      //   }
    });
    this.board3d = newBoard;
    return this.board3d;
  }
}

export default GameOfLife;

// const test = new GameOfLife(3);
// console.log(test.livingNeighbors(0, 0, 1));

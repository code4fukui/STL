import * as THREE from "https://code4fukui.github.io/three.js/build/three.module.js";
import { mesh2stl } from "./mesh2stl.js";

// TorusKnotGeometry(radius, tube, tubularSegments, radialSegments, p : Integer, q : Integer)
const geo = new THREE.TorusKnotGeometry(.5, .5 * 0.15, 1000, 100, 6, 4);
const mat = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
const mesh = new THREE.Mesh(geo, mat);

const binary = true;
//const binary = false;
const stl = mesh2stl(mesh, binary);
if (binary) {
  await Deno.writeFile("torusknot.stl", stl);
} else {
  await Deno.writeTextFile("torusknot.stl", stl);
}

import { STL } from "./STL.js";

export const makeSTLBox = async (width, height, depth) => { // m
  const w = width / 2 * 1000;
  const h = height / 2 * 1000;
  const d = depth / 2 * 1000;
  const p = [
    { x: -w, y:  h, z: -d },
    { x: -w, y:  h, z:  d },
    { x:  w, y:  h, z:  d },
    { x:  w, y:  h, z: -d },
    { x: -w, y: -h, z: -d },
    { x: -w, y: -h, z:  d },
    { x:  w, y: -h, z:  d },
    { x:  w, y: -h, z: -d },
  ];
  const faces = [
    [0, 1, 2, 3],
    [0, 4, 5, 1],
    [1, 5, 6, 2],
    [2, 6, 7, 3],
    [3, 7, 4, 0],
    [7, 6, 5, 4],
  ];
  const polygons = [];
  for (const v of faces) {
    polygons.push({ points: [p[v[0]], p[v[1]], p[v[3]]] });
    polygons.push({ points: [p[v[1]], p[v[2]], p[v[3]]] });
  }
  return STL.encode(polygons);
};

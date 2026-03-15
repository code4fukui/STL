# stlutil

A set of utilities for creating and manipulating STL files.

## Features
- Decode and encode STL files
- Calculate vertex normals
- Generate a box-shaped STL
- Convert a Three.js mesh to an STL file

## Usage

### Generating a box-shaped STL

```javascript
import { makeSTLBox } from "./makeSTLBox.js";

const bin2 = await makeSTLBox(0.1, 0.05, 0.01); // m
await Deno.writeFile("box-made.stl", bin2);
```

### Converting a Three.js mesh to an STL file

```javascript
import * as THREE from "https://code4fukui.github.io/three.js/build/three.module.js";
import { mesh2stl } from "./mesh2stl.js";

const geo = new THREE.TorusKnotGeometry(.5, .5 * 0.15, 1000, 100, 6, 4);
const mat = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
const mesh = new THREE.Mesh(geo, mat);

const stl = mesh2stl(mesh, true); // binary STL
await Deno.writeFile("torusknot.stl", stl);
```

## License
MIT
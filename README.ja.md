# stl-util

STLファイルを作成・操作するためのユーティリティセットです。

## 機能
- STLファイルのデコードとエンコード
- 頂点法線の計算
- 箱型STLの生成
- Three.jsメッシュのSTLファイルへの変換

## 使い方

### 箱型STLの生成

```javascript
import { makeSTLBox } from "./makeSTLBox.js";

const bin2 = await makeSTLBox(0.1, 0.05, 0.01); // m
await Deno.writeFile("box-made.stl", bin2);
```

### Three.jsメッシュのSTLファイルへの変換

```javascript
import * as THREE from "https://code4fukui.github.io/three.js/build/three.module.js";
import { mesh2stl } from "./mesh2stl.js";

const geo = new THREE.TorusKnotGeometry(.5, .5 * 0.15, 1000, 100, 6, 4);
const mat = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
const mesh = new THREE.Mesh(geo, mat);

const stl = mesh2stl(mesh, true); // バイナリSTL
await Deno.writeFile("torusknot.stl", stl);
```

## ライセンス
MIT License — 詳細は [LICENSE](LICENSE) を参照してください。

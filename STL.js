import { BinReader } from "https://code4fukui.github.io/binutil/BinReader.js";
import { BinWriter } from "https://code4fukui.github.io/binutil/BinWriter.js";
import { calcNormal } from "./calcNormal.js";

/*
https://en.wikipedia.org/wiki/STL_(file_format)

UINT8[80]    – Header                 -     80 bytes
UINT32       – Number of triangles    -      4 bytes
foreach triangle                      - 50 bytes:
    REAL32[3] – Normal vector             - 12 bytes
    REAL32[3] – Vertex 1                  - 12 bytes
    REAL32[3] – Vertex 2                  - 12 bytes
    REAL32[3] – Vertex 3                  - 12 bytes
    UINT16    – Attribute byte count      -  2 bytes
end
*/

export class STL {
  static decode(bin) {
    const r = new BinReader(bin);
    const header = r.readBytes(80);
    //console.log(new TextDecoder().decode(header));
    const n = r.readUint32();
    const polygons = [];
    const readVector3 = () => {
      return {
        x: r.readFloat32(),
        y: r.readFloat32(),
        z: r.readFloat32(),
      };
    };
    for (let i = 0; i < n; i++) {
      const normal = readVector3();
      const points = [];
      for (let i = 0; i < 3; i++) {
        points.push(readVector3());
      }
      const attribute = r.readUint16();
      //console.log(attribute); // all 0
      polygons.push({
        normal, points, attribute,
      })
    }
    return polygons;
  }
  static encode(polygons) { // polygons = [{ (normal), points[3], (attribute) }]
    const w = new BinWriter(1024);
    w.writeString("made by https://github.com/code4fukui/stl-util/STL.js", 80);
    w.writeUint32(polygons.length);
    const writeVector3 = (p) => {
      w.writeFloat32(p.x);
      w.writeFloat32(p.y);
      w.writeFloat32(p.z);
    };
    for (const p of polygons) {
      if (p.normal) {
        writeVector3(p.normal);
      } else {
        const normal = calcNormal(p.points[0], p.points[1], p.points[2]);
        writeVector3(normal);
      }
      for (let i = 0; i < 3; i++) {
        writeVector3(p.points[i]);
      }
      if (p.attribute) {
        w.writeUint16(p.attribute);
      } else {
        w.writeUint16(0);
      }
    }
    return w.toBytes();
  }
};

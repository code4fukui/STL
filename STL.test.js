import * as t from "https://deno.land/std/testing/asserts.ts";
import { STL } from "./STL.js";

Deno.test("simple", async () => {
  const box = await Deno.readFile("box.stl");
  const polygons = STL.decode(box);
  //console.log(polygons);
  t.assertEquals(polygons.length, 12);
});
Deno.test("remake stl", async () => {
  const box = await Deno.readFile("box.stl");
  const polygons = STL.decode(box);
  //console.log(polygons);
  polygons.forEach(i => {
    delete i.normal;
    delete i.attribute;
  });
  console.log(polygons);
  const bin = STL.encode(polygons);
  await Deno.writeFile("box-test.stl", bin);

  const polygons2 = STL.decode(bin);
  //console.log(polygons2);
});
Deno.test("make stl", async () => {
  const polygons = [
    {
      points: [
        { x: 0, y: 0, z: 0 },
        { x: -1, y: -1, z: 0 },
        { x: 1, y: -1, z: 0 },
      ]
    },
  ];
  const bin = STL.encode(polygons);
  await Deno.writeFile("triangle-test.stl", bin);

  const polygons2 = STL.decode(bin);
  console.log(polygons2);
});

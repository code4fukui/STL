import { makeSTLBox } from "./makeSTLBox.js";

const bin2 = await makeSTLBox(0.1, 0.05, 0.01); // m
//const bin2 = await makeSTLBox(0.01, 0.01, 0.1); // m
console.log(bin2)
await Deno.writeFile("box-made.stl", bin2);

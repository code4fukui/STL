import { STLExporter } from "./STLExporter.js";

export const mesh2stl = (mesh, binary = true) => {
  const exporter = new STLExporter();
  const stl = exporter.parse(mesh, { binary });
  if (binary) {
    return new Uint8Array(stl.buffer);
  }
  return stl;
};

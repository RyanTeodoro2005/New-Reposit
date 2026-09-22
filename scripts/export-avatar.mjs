import { mkdir, writeFile } from "node:fs/promises";
import { GLTFExporter } from "three/addons/exporters/GLTFExporter.js";
import { createRyanAvatar } from "../src/three/createRyanAvatar.js";

// GLTFExporter only needs the browser FileReader binary API for this asset.
globalThis.FileReader = class {
  readAsArrayBuffer(blob) {
    blob
      .arrayBuffer()
      .then((result) => {
        this.result = result;
        this.onloadend?.();
      })
      .catch((error) => this.onerror?.(error));
  }
  readAsDataURL(blob) {
    blob
      .arrayBuffer()
      .then((result) => {
        this.result = `data:${blob.type};base64,${Buffer.from(result).toString("base64")}`;
        this.onloadend?.();
      })
      .catch((error) => this.onerror?.(error));
  }
};
const { root, animations } = createRyanAvatar();
// Solid-color materials need no UV data; omit it to keep the downloadable asset small.
root.traverse((object) => {
  if (object.geometry) {
    object.geometry.deleteAttribute("uv");
    object.geometry.normalizeNormals();
  }
});
root.updateMatrixWorld(true);
const binary = await new GLTFExporter().parseAsync(root, {
  binary: true,
  animations,
  onlyVisible: true,
});
await mkdir(new URL("../public/models/", import.meta.url), { recursive: true });
await writeFile(
  new URL("../public/models/ryan-animated-bust.glb", import.meta.url),
  Buffer.from(binary),
);
const geometrySet = new Set();
let triangles = 0,
  meshes = 0;
root.traverse((obj) => {
  if (obj.isMesh) {
    meshes++;
    geometrySet.add(obj.geometry);
    triangles +=
      (obj.geometry.index?.count ?? obj.geometry.attributes.position.count) / 3;
  }
});
console.log(
  JSON.stringify({
    file: "public/models/ryan-animated-bust.glb",
    bytes: binary.byteLength,
    meshes,
    triangles,
    animations: animations.map((a) => a.name),
  }),
);
geometrySet.forEach((g) => g.dispose());

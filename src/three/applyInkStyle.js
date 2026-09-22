import * as THREE from "three";

// Preserve the GLB's morph targets and articulation; only its shading changes.
// Object-space hatching moves with the surface instead of sliding over it.
export function applyInkStyle(model) {
  const materials = new Set();
  const outlines = [];
  model.traverse((object) => {
    if (!object.isMesh) return;
    materials.add(object.material);
    if (
      /^(Sculpted_face|Ear_-?1|Afro_silhouette|Neck|Shoulders_and_turtleneck_shirt|Silver_hoop_-?1|Nose_stud)$/.test(
        object.name,
      )
    )
      outlines.push(object);
  });
  materials.forEach((material) => {
    const paper = material.name === "Paper_skin";
    material.roughness = 1;
    material.metalness = 0;
    material.onBeforeCompile = (shader) => {
      shader.vertexShader = shader.vertexShader.replace(
        "#include <common>",
        "#include <common>\nvarying vec3 vInkPosition;\nvarying vec3 vInkNormal;",
      );
      shader.vertexShader = shader.vertexShader.replace(
        "#include <begin_vertex>",
        "#include <begin_vertex>\nvInkPosition = position;\nvInkNormal = normal;",
      );
      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <common>",
        "#include <common>\nvarying vec3 vInkPosition;\nvarying vec3 vInkNormal;",
      );
      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <opaque_fragment>",
        `
        vec3 paperColor = diffuseColor.rgb;
        ${
          paper
            ? `
          vec3 n = normalize(vInkNormal);
          float shade = 1.0 - max(dot(n, normalize(vec3(-0.45, 0.6, 1.4))), 0.0);
          float edgeShade = smoothstep(0.38, 0.95, shade);
          float stripe = (vInkPosition.x * 0.8 + vInkPosition.y * 1.25 + vInkPosition.z * 0.3) * 72.0;
          float aa = max(fwidth(stripe), 0.025);
          float hatch = 1.0 - smoothstep(0.075, 0.075 + aa, abs(fract(stripe) - 0.5));
          float ink = hatch * edgeShade * 0.74;
          paperColor = mix(paperColor, vec3(0.007, 0.008, 0.005), ink);
        `
            : ""
        }
        outgoingLight = paperColor;
        #include <opaque_fragment>
      `,
      );
    };
    material.customProgramCacheKey = () => `engraving-v5-${paper}`;
    material.needsUpdate = true;
  });
  const ink = new THREE.MeshBasicMaterial({
    color: "#11120f",
    side: THREE.BackSide,
    toneMapped: false,
  });
  for (const object of outlines) {
    const geometry = object.geometry.clone();
    const position = geometry.attributes.position;
    const normal = geometry.attributes.normal;
    for (let i = 0; i < position.count; i++) {
      position.setXYZ(
        i,
        position.getX(i) + normal.getX(i) * 0.006,
        position.getY(i) + normal.getY(i) * 0.006,
        position.getZ(i) + normal.getZ(i) * 0.006,
      );
    }
    position.needsUpdate = true;
    geometry.computeBoundingSphere();
    const outline = new THREE.Mesh(geometry, ink);
    outline.name = `${object.name}_Ink_outline`;
    object.add(outline);
  }
}

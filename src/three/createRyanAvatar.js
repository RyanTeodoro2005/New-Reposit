import * as THREE from "three";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";

// Authored stylized geometry based on IMG_7626, not a photo mapped onto a plane.
// The face is one continuous sculpted surface. The named head/eye controls and
// blink morph targets survive GLB export and can be edited in Blender.
export function createRyanAvatar() {
  const root = new THREE.Group();
  root.name = "Ryan_AnimatedBust";
  root.userData = {
    reference: "IMG_7626",
    style: "ivory-and-ink-engraving",
    version: 5,
  };
  const head = new THREE.Group();
  head.name = "Head_Control";
  head.position.y = -0.48;
  root.add(head);
  const faceGroup = new THREE.Group();
  faceGroup.name = "Face_Assembly";
  faceGroup.position.y = 1;
  faceGroup.scale.x = 1.055;
  head.add(faceGroup);
  const material = (name, color, roughness = 0.64, metalness = 0) => {
    const m = new THREE.MeshStandardMaterial({ color, roughness, metalness });
    m.name = name;
    return m;
  };
  const skin = material("Paper_skin", "#eee4ce", 1);
  const earInner = material("Ear_ink", "#28251f", 1);
  const lips = material("Paper_lips", "#ddd0b4", 1);
  const mouth = material("Smile_ink", "#141310", 1);
  const hair = material("Ink_curls", "#11120f", 1);
  const hairAccent = material("Ink_curl_volume", "#191a15", 1);
  const curlInk = material("Etched_curl_highlights", "#b5ad96", 1);
  const beard = material("Facial_ink", "#171813", 1);
  const shirt = material("Ink_shirt", "#11120f", 1);
  const seams = material("Etched_cloth", "#8b8775", 1);
  const silver = material("Outlined_jewelry", "#cfc7b4", 1);
  const glint = material("Jewelry_paper", "#f3ead6", 1);
  const white = material("Eye_paper", "#f4ead4", 1);
  const irisMat = material("Ink_iris", "#272820", 1);
  const pupilMat = material("Pupils", "#10110e", 1);
  const sphere = new THREE.SphereGeometry(1, 24, 16);
  const mesh = (name, geometry, mat, parent = root) => {
    const m = new THREE.Mesh(geometry, mat);
    m.name = name;
    parent.add(m);
    return m;
  };
  const oval = (name, mat, pos, scale, parent = faceGroup) => {
    const m = mesh(name, sphere, mat, parent);
    m.position.set(...pos);
    m.scale.set(...scale);
    return m;
  };
  const curveMesh = (
    name,
    points,
    radius,
    mat,
    parent = faceGroup,
    closed = false,
  ) =>
    mesh(
      name,
      new THREE.TubeGeometry(
        new THREE.CatmullRomCurve3(
          points.map((p) => new THREE.Vector3(...p)),
          closed,
        ),
        Math.max(20, points.length * 5),
        radius,
        7,
        closed,
      ),
      mat,
      parent,
    );
  const lathe = (name, profile, depth, mat, parent = root) => {
    const c = new THREE.SplineCurve(
      profile.map((p) => new THREE.Vector2(...p)),
    );
    const m = mesh(
      name,
      new THREE.LatheGeometry(c.getPoints(70), 64),
      mat,
      parent,
    );
    m.scale.z = depth;
    return m;
  };
  lathe(
    "Shoulders_and_turtleneck_shirt",
    [
      [0, -1.92],
      [0.85, -1.92],
      [1.17, -1.85],
      [1.18, -1.55],
      [1.03, -1.16],
      [0.72, -0.98],
      [0.34, -0.82],
      [0, -0.82],
    ],
    0.5,
    shirt,
  );
  lathe(
    "Neck",
    [
      [0, -0.9],
      [0.33, -0.9],
      [0.31, -0.55],
      [0.29, -0.27],
      [0, -0.22],
    ],
    0.92,
    skin,
  );
  lathe(
    "High_knit_collar",
    [
      [0.32, -0.94],
      [0.365, -0.91],
      [0.36, -0.69],
      [0.35, -0.64],
      [0.315, -0.66],
    ],
    0.94,
    shirt,
  );
  for (let i = 0; i < 3; i++)
    curveMesh(
      `Collar_seam_${i}`,
      Array.from({ length: 33 }, (_, j) => [
        Math.sin((j / 32) * Math.PI * 2) * 0.363,
        -0.71 - i * 0.06,
        Math.cos((j / 32) * Math.PI * 2) * 0.339,
      ]),
      0.003,
      seams,
      root,
      true,
    );
  for (const side of [-1, 1])
    curveMesh(
      `Shoulder_seam_${side}`,
      [
        [side * 0.73, -1.02, 0.3],
        [side * 0.94, -1.2, 0.36],
        [side * 1.03, -1.53, 0.31],
        [side * 1.03, -1.8, 0.26],
      ],
      0.003,
      seams,
      root,
    );

  // Continuous facial sculpt: flattened front, tapered jaw, cheeks, eye sockets,
  // nose bridge, nose wings, mouth plane, chin and brow ridge.
  const shape = new THREE.SplineCurve(
    [
      [-0.94, 0],
      [-0.87, 0.25],
      [-0.7, 0.43],
      [-0.42, 0.56],
      [-0.08, 0.626],
      [0.27, 0.64],
      [0.62, 0.63],
      [0.87, 0.55],
      [1.04, 0.33],
      [1.1, 0],
    ].map(([y, r]) => new THREE.Vector2(y, r)),
  );
  const profile = shape.getPoints(120);
  const gaussian = (x, y, cx, cy, sx, sy) =>
    Math.exp(-(((x - cx) / sx) ** 2 + ((y - cy) / sy) ** 2));
  const sculpt = (x, y) =>
    0.085 * gaussian(x, y, 0, 0.16, 0.105, 0.39) +
    0.19 * gaussian(x, y, 0, -0.105, 0.13, 0.13) +
    0.055 * gaussian(x, y, 0.122, -0.16, 0.075, 0.075) +
    0.055 * gaussian(x, y, -0.122, -0.16, 0.075, 0.075) +
    0.06 * gaussian(x, y, 0, -0.43, 0.27, 0.13) +
    0.07 * gaussian(x, y, 0, -0.72, 0.27, 0.16) +
    0.035 * gaussian(x, y, 0.36, -0.13, 0.22, 0.19) +
    0.035 * gaussian(x, y, -0.36, -0.13, 0.22, 0.19) -
    0.048 * gaussian(x, y, 0.275, 0.22, 0.195, 0.14) -
    0.048 * gaussian(x, y, -0.275, 0.22, 0.195, 0.14) +
    0.026 * gaussian(x, y, 0.27, 0.44, 0.24, 0.09) +
    0.026 * gaussian(x, y, -0.27, 0.44, 0.24, 0.09);
  const positions = [],
    indices = [];
  const segments = 112;
  for (let row = 0; row < profile.length; row++) {
    const { x: y, y: radius } = profile[row];
    for (let col = 0; col <= segments; col++) {
      const theta = (col / segments) * Math.PI * 2;
      const c = Math.cos(theta);
      const x = radius * Math.sin(theta);
      const front = Math.max(0, c);
      const depth = radius * 0.84;
      const z =
        depth * Math.sign(c) * Math.pow(Math.abs(c), c > 0 ? 0.48 : 1) +
        sculpt(x, y) * Math.pow(front, 4);
      positions.push(x, y, z);
      if (row < profile.length - 1 && col < segments) {
        const a = row * (segments + 1) + col,
          b = a + segments + 1;
        indices.push(a, a + 1, b, b, a + 1, b + 1);
      }
    }
  }
  const faceGeometry = new THREE.BufferGeometry();
  faceGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions, 3),
  );
  faceGeometry.setIndex(indices);
  faceGeometry.computeVertexNormals();
  mesh("Sculpted_face", faceGeometry, skin, faceGroup);
  for (const side of [-1, 1]) {
    oval(
      `Ear_${side}`,
      skin,
      [side * 0.635, -0.015, -0.015],
      [0.134, 0.223, 0.11],
    );
    oval(
      `Ear_inner_${side}`,
      earInner,
      [side * 0.694, -0.012, 0.065],
      [0.052, 0.137, 0.027],
    );
    curveMesh(
      `Ear_fold_${side}`,
      [
        [side * 0.7, 0.08, 0.1],
        [side * 0.735, 0.025, 0.1],
        [side * 0.7, -0.08, 0.1],
      ],
      0.017,
      skin,
    );
    const hoop = mesh(
      `Silver_hoop_${side}`,
      new THREE.TorusGeometry(0.077, 0.015, 10, 28),
      silver,
      faceGroup,
    );
    hoop.position.set(side * 0.69, -0.23, 0.065);
    hoop.rotation.y = side * 0.28;
    for (let j = 0; j < 5; j++) {
      const a = -0.9 + j * 0.43;
      oval(
        `Earring_stone_${side}_${j}`,
        glint,
        [side * 0.69 + Math.cos(a) * 0.077, -0.23 + Math.sin(a) * 0.077, 0.079],
        [0.014, 0.014, 0.014],
      );
    }
  }

  // Eyes have real geometry, movable iris groups and authored blink morphs.
  const pupils = [],
    eyes = [];
  for (const side of [-1, 1]) {
    const name = side < 0 ? "Left" : "Right";
    const eye = new THREE.Group();
    eye.name = `Eye_${name}`;
    eye.position.set(side * 0.28, 0.205, 0.533);
    faceGroup.add(eye);
    const eyeGeometry = sphere.clone();
    eyeGeometry.scale(0.166, 0.062, 0.032);
    const closedPositions = eyeGeometry.attributes.position.clone();
    for (let i = 0; i < closedPositions.count; i++)
      closedPositions.setY(i, closedPositions.getY(i) * 0.035);
    eyeGeometry.morphAttributes.position = [closedPositions];
    const eyeball = mesh(`EyeWhite_${name}`, eyeGeometry, white, eye);
    eyeball.morphTargetDictionary = { Blink: 0 };
    eyes.push(eyeball);
    const pupil = new THREE.Group();
    pupil.name = `Gaze_${name}`;
    eye.add(pupil);
    pupils.push(pupil);
    oval(`Iris_${name}`, irisMat, [0, 0, 0.031], [0.055, 0.052, 0.008], pupil);
    oval(
      `Pupil_${name}`,
      pupilMat,
      [0, 0, 0.039],
      [0.034, 0.038, 0.004],
      pupil,
    );
    oval(
      `Catchlight_${name}`,
      white,
      [-0.019, 0.023, 0.044],
      [0.009, 0.01, 0.003],
      pupil,
    );
    curveMesh(
      `Upper_lid_${name}`,
      [
        [-0.17, 0, 0],
        [-0.1, 0.052, 0.025],
        [0.02, 0.065, 0.027],
        [0.11, 0.044, 0.02],
        [0.171, -0.008, 0],
      ],
      0.017,
      skin,
      eye,
    );
    curveMesh(
      `Lashline_${name}`,
      [
        [-0.17, 0, 0.009],
        [-0.1, 0.044, 0.035],
        [0.025, 0.057, 0.038],
        [0.125, 0.036, 0.028],
        [0.171, -0.008, 0.005],
      ],
      0.009,
      beard,
      eye,
    );
    curveMesh(
      `Lower_lid_${name}`,
      [
        [-0.17, 0, 0],
        [-0.075, -0.049, 0.028],
        [0.075, -0.049, 0.028],
        [0.171, -0.008, 0],
      ],
      0.004,
      beard,
      eye,
    );
    curveMesh(
      `Eyebrow_${name}`,
      [
        [side * 0.11, 0.415, 0.556],
        [side * 0.23, 0.463, 0.541],
        [side * 0.37, 0.463, 0.508],
        [side * 0.455, 0.418, 0.46],
      ],
      0.027,
      beard,
    );
  }
  // Narrow, slightly smiling mouth and understated facial hair.
  curveMesh(
    "Upper_lip",
    [
      [-0.203, -0.419, 0.52],
      [-0.12, -0.428, 0.557],
      [-0.047, -0.423, 0.574],
      [0, -0.435, 0.577],
      [0.07, -0.425, 0.573],
      [0.145, -0.407, 0.551],
      [0.203, -0.395, 0.515],
    ],
    0.016,
    lips,
  );
  curveMesh(
    "Lower_lip",
    [
      [-0.195, -0.425, 0.518],
      [-0.11, -0.46, 0.547],
      [0, -0.47, 0.564],
      [0.11, -0.451, 0.547],
      [0.198, -0.403, 0.515],
    ],
    0.02,
    lips,
  );
  curveMesh(
    "Smile",
    [
      [-0.2, -0.423, 0.528],
      [-0.1, -0.445, 0.57],
      [0, -0.447, 0.585],
      [0.115, -0.432, 0.565],
      [0.203, -0.4, 0.523],
    ],
    0.005,
    mouth,
  );
  for (const side of [-1, 1]) {
    oval(
      `Nostril_${side}`,
      earInner,
      [side * 0.09, -0.19, 0.629],
      [0.035, 0.018, 0.012],
    );
    curveMesh(
      `Moustache_${side}`,
      [
        [side * 0.03, -0.327, 0.585],
        [side * 0.1, -0.342, 0.572],
        [side * 0.174, -0.38, 0.54],
      ],
      0.012,
      beard,
    );
  }
  oval("Nose_stud", silver, [0.151, -0.072, 0.647], [0.016, 0.016, 0.014]);
  oval("Nose_stud_glint", glint, [0.15, -0.068, 0.659], [0.006, 0.006, 0.004]);
  curveMesh(
    "Chin_beard",
    [
      [-0.4, -0.56, 0.34],
      [-0.31, -0.745, 0.37],
      [-0.15, -0.846, 0.285],
      [0, -0.864, 0.237],
      [0.15, -0.846, 0.285],
      [0.31, -0.745, 0.37],
      [0.4, -0.56, 0.34],
    ],
    0.008,
    beard,
  );

  // Sculpted afro silhouette + hundreds of merged, individually oriented curls.
  // One mesh per material keeps draw calls low on mobile.
  const cap = mesh(
    "Afro_silhouette",
    new THREE.SphereGeometry(1, 40, 28),
    hair,
    faceGroup,
  );
  cap.position.set(0, 1.12, -0.075);
  cap.scale.set(0.84, 0.85, 0.68);
  const curls = [[], []];
  const coils = [];
  let seed = 7626;
  const random = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };
  const curlGeometry = new THREE.SphereGeometry(1, 7, 5);
  const coilCurve = new THREE.CatmullRomCurve3(
    Array.from({ length: 18 }, (_, i) => {
      const t = i / 17;
      const angle = t * Math.PI * 3.4;
      return new THREE.Vector3(
        Math.cos(angle) * 0.041,
        Math.sin(angle) * 0.041,
        (t - 0.5) * 0.065,
      );
    }),
  );
  const coilGeometry = new THREE.TubeGeometry(coilCurve, 16, 0.0028, 3, false);
  const dummy = new THREE.Object3D();
  for (let i = 0; i < 700; i++) {
    const phi = Math.acos(1 - (2 * (i + 0.5)) / 700),
      theta = i * 2.399963229728653;
    const normal = new THREE.Vector3(
      Math.sin(phi) * Math.cos(theta),
      Math.cos(phi),
      Math.sin(phi) * Math.sin(theta),
    );
    const x = normal.x * 0.84,
      y = 1.12 + normal.y * 0.85,
      z = -0.075 + normal.z * 0.68;
    // The front hairline opens the forehead and tapers toward the ears.
    if (y < (z > 0.22 ? 0.72 + Math.abs(x) * 0.06 : 0.42)) continue;
    const size = 0.047 + random() * 0.032;
    dummy.position.set(x, y, z);
    dummy.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);
    dummy.rotateZ(random() * Math.PI * 2);
    dummy.scale.set(size, size * 0.95, size * 0.8);
    dummy.updateMatrix();
    curls[i % 2].push(curlGeometry.clone().applyMatrix4(dummy.matrix));
    dummy.position.addScaledVector(normal, size * 0.6);
    dummy.scale.setScalar(0.8 + random() * 0.5);
    dummy.updateMatrix();
    coils.push(coilGeometry.clone().applyMatrix4(dummy.matrix));
  }
  curls.forEach((parts, i) => {
    const geometry = mergeGeometries(parts);
    mesh(
      `Sculpted_curl_clusters_${i}`,
      geometry,
      i ? hairAccent : hair,
      faceGroup,
    );
    parts.forEach((g) => g.dispose());
  });
  mesh("Defined_curl_coils", mergeGeometries(coils), curlInk, faceGroup);
  coils.forEach((g) => g.dispose());
  curlGeometry.dispose();
  coilGeometry.dispose();
  for (let i = 0; i < 4; i++)
    curveMesh(
      `Forehead_curl_${i}`,
      Array.from({ length: 20 }, (_, j) => {
        const t = j / 19;
        return [
          (i - 1.5) * 0.22 + Math.sin(t * Math.PI * 4) * 0.032,
          0.79 - t * (i === 2 ? 0.19 : 0.105),
          0.53 + Math.cos(t * Math.PI * 4) * 0.024,
        ];
      }),
      0.026,
      hair,
    );

  // Ink strokes lie on the sculpt itself, so they remain attached during turns.
  // Merge the fine lines into one mesh instead of hundreds of draw calls.
  const inkStrokes = [];
  const faceZ = (x, y) => {
    let row = 0;
    while (row < profile.length - 2 && profile[row + 1].x < y) row++;
    const a = profile[row],
      b = profile[row + 1];
    const radius = THREE.MathUtils.lerp(
      a.y,
      b.y,
      THREE.MathUtils.clamp((y - a.x) / (b.x - a.x), 0, 1),
    );
    const front = Math.sqrt(
      Math.max(0.001, 1 - (x / Math.max(radius, 0.001)) ** 2),
    );
    return (
      radius * 0.84 * Math.pow(front, 0.48) + sculpt(x, y) * front ** 4 + 0.006
    );
  };
  const stroke = (points, width = 0.0023) => {
    const curve = new THREE.CatmullRomCurve3(
      points.map(([x, y]) => new THREE.Vector3(x, y, faceZ(x, y))),
    );
    inkStrokes.push(
      new THREE.TubeGeometry(
        curve,
        Math.max(5, points.length * 4),
        width,
        3,
        false,
      ),
    );
  };
  for (const side of [-1, 1]) {
    // Interrupted lines describe the nose without a heavy, cartoon outline.
    stroke(
      [
        [side * 0.075, 0.31],
        [side * 0.09, 0.18],
        [side * 0.105, 0.07],
      ],
      0.0028,
    );
    stroke(
      [
        [side * 0.12, 0.01],
        [side * 0.158, -0.105],
        [side * 0.155, -0.19],
        [side * 0.113, -0.225],
      ],
      0.004,
    );
    stroke(
      [
        [side * 0.032, -0.235],
        [side * 0.062, -0.249],
        [side * 0.1, -0.226],
      ],
      0.003,
    );
    stroke(
      [
        [side * 0.19, -0.25],
        [side * 0.231, -0.32],
        [side * 0.247, -0.39],
      ],
      0.0018,
    );
    // Creases above and below the eyes; brows built from individual pen marks.
    stroke([
      [side * 0.115, 0.3],
      [side * 0.22, 0.344],
      [side * 0.35, 0.343],
      [side * 0.447, 0.287],
    ]);
    stroke(
      [
        [side * 0.137, 0.108],
        [side * 0.235, 0.075],
        [side * 0.35, 0.085],
        [side * 0.433, 0.139],
      ],
      0.003,
    );
    stroke(
      [
        [side * 0.2, 0.025],
        [side * 0.299, 0.008],
        [side * 0.403, 0.049],
      ],
      0.0018,
    );
    for (let i = 0; i < 36; i++) {
      const x = 0.11 + i * 0.0094;
      const y = 0.418 + Math.sin((i / 35) * Math.PI) * 0.045;
      stroke(
        [
          [side * x, y - 0.013],
          [side * (x + 0.016), y + 0.025],
          [side * (x + 0.029), y + 0.033],
        ],
        0.0024,
      );
    }
    // Tapering hatches: temple, outer cheek, under-eye and nose shadow.
    for (let i = 0; i < 45; i++) {
      const y = 0.63 - i * 0.025;
      const edge = y > -0.1 ? 0.6 : 0.6 + (y + 0.1) * 0.2;
      const length = 0.027 + 0.035 * (0.5 + 0.5 * Math.sin(i * 1.7));
      stroke(
        [
          [side * (edge - length), y + 0.018],
          [side * edge, y - 0.018],
        ],
        0.0019,
      );
    }
    for (let i = 0; i < 16; i++) {
      const x = 0.16 + i * 0.018;
      const y = -0.008 - Math.sin((i / 15) * Math.PI) * 0.025;
      stroke(
        [
          [side * x, y],
          [side * (x + 0.019), y - 0.027],
        ],
        0.0015,
      );
    }
    for (let i = 0; i < 13; i++) {
      const y = 0.13 - i * 0.024;
      const x = 0.1 + Math.sin((i / 12) * Math.PI) * 0.047;
      stroke(
        [
          [side * x, y],
          [side * (x + 0.021), y + 0.018],
        ],
        0.0016,
      );
    }
    // Fine moustache and sparse chin stubble, not a solid painted beard.
    for (let i = 0; i < 42; i++) {
      const x = 0.021 + random() * 0.175;
      const y = -0.332 - x * 0.2 - random() * 0.031;
      stroke(
        [
          [side * x, y],
          [side * (x + 0.008), y + 0.019 + random() * 0.023],
        ],
        0.0017,
      );
    }
    for (let i = 0; i < 95; i++) {
      const x = random() * 0.37;
      const y = -0.82 + x * x * 1.43 + random() * 0.065;
      stroke(
        [
          [side * x, y],
          [side * (x + 0.005), y + 0.014 + random() * 0.023],
        ],
        0.0016,
      );
    }
  }
  stroke(
    [
      [-0.13, -0.533],
      [-0.035, -0.55],
      [0.066, -0.538],
    ],
    0.002,
  );
  for (let i = 0; i < 17; i++) {
    const x = -0.12 + i * 0.014;
    stroke(
      [
        [x, -0.477],
        [x + 0.007, -0.495],
      ],
      0.0016,
    );
  }
  mesh(
    "Engraved_facial_strokes",
    mergeGeometries(inkStrokes),
    beard,
    faceGroup,
  );
  inkStrokes.forEach((g) => g.dispose());

  const times = [0, 1.5, 3, 4.5, 6];
  const quaternions = times.flatMap((t, i) =>
    new THREE.Quaternion()
      .setFromEuler(
        new THREE.Euler(
          [0, 0.02, 0, -0.015, 0][i],
          [0, 0.055, 0, -0.055, 0][i],
          0,
        ),
      )
      .toArray(),
  );
  const idle = new THREE.AnimationClip("Idle", 6, [
    new THREE.QuaternionKeyframeTrack(
      "Head_Control.quaternion",
      times,
      quaternions,
    ),
  ]);
  const blinkTimes = [0, 2.5, 2.61, 2.72, 5];
  const blinkTracks = eyes.map(
    (eye) =>
      new THREE.NumberKeyframeTrack(
        `${eye.name}.morphTargetInfluences`,
        blinkTimes,
        [0, 0, 1, 0, 0],
      ),
  );
  pupils.forEach((p) =>
    blinkTracks.push(
      new THREE.VectorKeyframeTrack(
        `${p.name}.scale`,
        blinkTimes,
        [1, 1, 1, 1, 1, 1, 1, 0.02, 1, 1, 1, 1, 1, 1, 1],
      ),
    ),
  );
  const blink = new THREE.AnimationClip("Blink", 5, blinkTracks);
  root.animations = [idle, blink];
  return { root, head, pupils, eyes, animations: [idle, blink] };
}

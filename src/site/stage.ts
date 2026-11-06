// One fixed WebGL canvas behind the page. It draws chrome shapes wherever a [data-shape]
// placeholder sits in the DOM, plus the robot tunnel and the closing terrain, each clipped to its section.
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { mergeVertices } from 'three/addons/utils/BufferGeometryUtils.js';

const ACCENT = 0xff10e8;
const CAMERA_Z = 10;
const FOV = 30;

// --- Morphing chrome ---------------------------------------------------------------------
// Each solid is star-shaped, so it can be expressed as a radius per direction on one shared sphere mesh.
type Radial = (x: number, y: number, z: number) => number;

const pnorm = (values: number[], p: number) => {
  let sum = 0;
  for (const value of values) if (value > 0) sum += Math.pow(value, p);
  return 1 / Math.pow(sum, 1 / p);
};

const planes = (normals: number[][], p: number): Radial => (x, y, z) =>
  pnorm(normals.map(([a, b, c, d]) => (a * x + b * y + c * z) / d), p);

const SOLIDS: Record<string, Radial> = {
  pyramid: planes([
    [0.943, 0.333, 0, 0.62],
    [-0.471, 0.333, 0.816, 0.62],
    [-0.471, 0.333, -0.816, 0.62],
    [0, -1, 0, 0.62],
  ], 14),
  cube: planes([
    [1, 0, 0, 0.7], [-1, 0, 0, 0.7], [0, 1, 0, 0.7], [0, -1, 0, 0.7], [0, 0, 1, 0.7], [0, 0, -1, 0.7],
  ], 11),
  cone: (x, y, z) => {
    const rho = Math.hypot(x, z);
    return pnorm([(0.87 * rho + 0.5 * y) / 0.52, -y / 0.52], 16);
  },
  orb: () => 0.92,
  lens: (x, y, z) => pnorm([Math.hypot(x, z) / 1, Math.abs(y) / 0.3], 5),
  pill: (x, y, z) => pnorm([Math.hypot(x, z) / 0.42, Math.abs(y) / 1.05], 3),
};

// Index order is shared with CAPABILITIES[].shape in content.ts.
const MORPH_ORDER = ['pyramid', 'cube', 'cone', 'lens', 'pill', 'orb'];

function createMorphGeometry(): THREE.BufferGeometry {
  const base = new THREE.IcosahedronGeometry(1, 48);
  base.deleteAttribute('normal');
  base.deleteAttribute('uv');
  const geometry = mergeVertices(base, 1e-4);
  const unit = geometry.getAttribute('position').clone();
  const positions: THREE.BufferAttribute[] = [];
  const normals: THREE.BufferAttribute[] = [];

  for (const name of MORPH_ORDER) {
    const radial = SOLIDS[name];
    const target = unit.clone() as THREE.BufferAttribute;
    for (let i = 0; i < target.count; i++) {
      const x = unit.getX(i);
      const y = unit.getY(i);
      const z = unit.getZ(i);
      const radius = radial(x, y, z);
      target.setXYZ(i, x * radius, y * radius, z * radius);
    }
    const probe = new THREE.BufferGeometry();
    probe.setAttribute('position', target);
    probe.setIndex(geometry.getIndex());
    probe.computeVertexNormals();
    positions.push(target);
    normals.push(probe.getAttribute('normal') as THREE.BufferAttribute);
  }

  geometry.setAttribute('position', positions[0].clone());
  geometry.setAttribute('normal', normals[0].clone());
  geometry.morphAttributes.position = positions;
  geometry.morphAttributes.normal = normals;
  geometry.morphTargetsRelative = false;
  return geometry;
}

function createEnvironment(renderer: THREE.WebGLRenderer): THREE.Texture {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x030304);
  const panel = (color: number, power: number, w: number, h: number, pos: number[], look = [0, 0, 0]) => {
    const material = new THREE.MeshBasicMaterial({ color: new THREE.Color(color).multiplyScalar(power), side: THREE.DoubleSide });
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(w, h), material);
    mesh.position.set(pos[0], pos[1], pos[2]);
    mesh.lookAt(look[0], look[1], look[2]);
    scene.add(mesh);
  };
  // A broad, dim fill behind the camera stops flat faces from reflecting pure black.
  panel(0x8d8d98, 0.16, 26, 18, [0, 1, 14]);
  // Thin hard-edged strips give the chrome its crisp highlight lines.
  panel(0xffffff, 14, 16, 1.4, [0, 10, 3]);
  panel(0xffffff, 8, 0.8, 14, [-7, 4, 8]);
  panel(0xffffff, 6, 0.5, 12, [6, 5, 9]);
  panel(0xffffff, 3, 9, 0.5, [0, 2.5, 12]);
  panel(0xffffff, 5, 2, 12, [-9, 3, 5]);
  panel(0xffffff, 2.2, 8, 8, [8, 4, -6]);
  panel(ACCENT, 4, 20, 7, [0, -8, 3]);
  panel(ACCENT, 1.5, 5, 8, [9, -3, 6]);
  const pmrem = new THREE.PMREMGenerator(renderer);
  const texture = pmrem.fromScene(scene, 0).texture;
  pmrem.dispose();
  return texture;
}

interface ShapeItem {
  el: HTMLElement;
  mesh: THREE.Mesh;
  morph: boolean;
  scale: number;
  spin: THREE.Vector3;
  velocity: THREE.Vector2;
}

// --- Stage -------------------------------------------------------------------------------
export interface Stage {
  render: (dt: number, time: number) => void;
  loadRobot: (onProgress: (ratio: number) => void) => Promise<void>;
  setPointer: (x: number, y: number) => void;
  /** Progress for a clipped full-screen scene. `null` hides it. */
  setRobot: (rect: DOMRect | null, progress: number, shot: 0 | 1) => void;
  setTerrain: (rect: DOMRect | null, progress: number) => void;
  dispose: () => void;
}

export function createStage(canvas: HTMLCanvasElement, root: HTMLElement, reduced: boolean): Stage | null {
  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  } catch (error) {
    console.error('WebGL is unavailable; showing the site without 3D.', error);
    return null;
  }
  renderer.autoClear = false;
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;

  const environment = createEnvironment(renderer);
  const shapeScene = new THREE.Scene();
  shapeScene.environment = environment;
  const camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 60);
  camera.position.z = CAMERA_Z;
  const accentLight = new THREE.PointLight(ACCENT, 7, 20);
  accentLight.position.set(0, -4, 4);
  shapeScene.add(accentLight);

  const chrome = new THREE.MeshPhysicalMaterial({ color: 0xffffff, metalness: 1, roughness: 0.07, clearcoat: 1, clearcoatRoughness: 0.04, envMapIntensity: 1.1 });
  const morphGeometry = createMorphGeometry();
  const extraGeometries: Record<string, THREE.BufferGeometry> = {
    torus: new THREE.TorusGeometry(0.66, 0.3, 40, 96),
    spring: (() => {
      const points: THREE.Vector3[] = [];
      for (let i = 0; i <= 220; i++) {
        const t = i / 220;
        const angle = t * Math.PI * 9;
        points.push(new THREE.Vector3(Math.cos(angle) * 0.62, t * 1.8 - 0.9, Math.sin(angle) * 0.62));
      }
      return new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points), 500, 0.14, 16);
    })(),
  };

  const shapes: ShapeItem[] = [];
  const dragCleanups: (() => void)[] = [];
  root.querySelectorAll<HTMLElement>('[data-shape]').forEach((el, index) => {
    const kind = el.dataset.shape!;
    const extra = extraGeometries[kind];
    const mesh = new THREE.Mesh(extra ?? morphGeometry, chrome);
    if (!extra) {
      mesh.updateMorphTargets();
      const start = kind === 'morph' ? 0 : MORPH_ORDER.indexOf(kind);
      mesh.morphTargetInfluences![Math.max(0, start)] = 1;
    }
    mesh.rotation.set(0.4 + index, index * 1.3, 0.2);
    mesh.visible = false;
    shapeScene.add(mesh);
    const item: ShapeItem = {
      el, mesh, morph: kind === 'morph', scale: 0,
      spin: new THREE.Vector3(0.12 + (index % 3) * 0.05, 0.3 - (index % 4) * 0.04, 0.06),
      velocity: new THREE.Vector2(),
    };
    shapes.push(item);

    // Drag to fling a shape; placeholders are real DOM nodes, so this needs no raycasting.
    if (el.dataset.drag !== undefined) {
      let last: { x: number; y: number } | null = null;
      const down = (event: PointerEvent) => { last = { x: event.clientX, y: event.clientY }; el.setPointerCapture(event.pointerId); };
      const move = (event: PointerEvent) => {
        if (!last) return;
        item.velocity.x += (event.clientY - last.y) * 0.012;
        item.velocity.y += (event.clientX - last.x) * 0.012;
        last = { x: event.clientX, y: event.clientY };
      };
      const up = () => { last = null; };
      el.addEventListener('pointerdown', down);
      el.addEventListener('pointermove', move);
      el.addEventListener('pointerup', up);
      el.addEventListener('pointercancel', up);
      dragCleanups.push(() => {
        el.removeEventListener('pointerdown', down);
        el.removeEventListener('pointermove', move);
        el.removeEventListener('pointerup', up);
        el.removeEventListener('pointercancel', up);
      });
    }
  });

  // --- Robot tunnel ----------------------------------------------------------------------
  const robotScene = new THREE.Scene();
  robotScene.environment = environment;
  robotScene.environmentIntensity = 0.5;
  robotScene.fog = new THREE.FogExp2(0x000000, 0.06);
  const robotCamera = new THREE.PerspectiveCamera(36, 1, 0.05, 90);
  const robotGroup = new THREE.Group();
  robotScene.add(robotGroup);
  const key = new THREE.DirectionalLight(0xffffff, 0.7);
  key.position.set(-2, 5, 4);
  const rimA = new THREE.PointLight(ACCENT, 34, 12);
  rimA.position.set(2.6, 2.6, -1.5);
  const rimB = new THREE.PointLight(0xffffff, 26, 10);
  rimB.position.set(-2.8, 3.2, -1);
  robotScene.add(key, rimA, rimB);

  const TUNNEL_STEP = 2.4;
  const TUNNEL_ROWS = 24;
  const tunnel = new THREE.Group();
  robotScene.add(tunnel);
  const barGeometry = new THREE.BoxGeometry(1, 0.05, 1);
  const barMaterial = new THREE.MeshBasicMaterial({ toneMapped: false });
  const columns = [-11, -9.2, -7.4, -5.6, -3.8, -2, -0.4, 1.2, 3, 4.8, 6.6, 8.4, 10.2];
  const bars = new THREE.InstancedMesh(barGeometry, barMaterial, TUNNEL_ROWS * columns.length * 2);
  const white = new THREE.Color(1.7, 1.7, 1.8);
  const pink = new THREE.Color(ACCENT).multiplyScalar(1.9);
  const dummy = new THREE.Object3D();
  let barIndex = 0;
  let seed = 7;
  const random = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
  for (let row = 0; row < TUNNEL_ROWS; row++) {
    columns.forEach((x) => {
      const length = 1.2 + random() * 2.6;
      const lit = random() > 0.42;
      const color = !lit ? new THREE.Color(0.04, 0.04, 0.05) : random() > 0.72 ? pink : white;
      const fade = 1 - Math.abs(x) * 0.02;
      for (const mirror of [0, 1]) {
        dummy.position.set(x, mirror ? -2.2 : 6.4 - Math.abs(x) * 0.22, -row * TUNNEL_STEP);
        dummy.rotation.set(0, 0, mirror ? 0 : x * 0.035);
        dummy.scale.set(mirror ? 0.1 : 0.15, 1, length);
        dummy.updateMatrix();
        bars.setMatrixAt(barIndex, dummy.matrix);
        bars.setColorAt(barIndex, color.clone().multiplyScalar(mirror ? 0.3 * fade : fade));
        barIndex++;
      }
    });
  }
  tunnel.add(bars);
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(40, 90),
    new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.45 }),
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.set(0, -0.02, -25);
  robotScene.add(floor);

  // [camera position, look target, turntable angle] for the start and end of each pinned shot.
  const SHOTS = [
    { from: [2.1, 1.5, 3.9], to: [0.45, 1.9, 2.7], lookFrom: [0, 1.28, 0], lookTo: [0, 1.82, 0], yawFrom: -0.85, yawTo: 0.12 },
    { from: [-0.9, 2.5, 1.5], to: [0.3, 2.42, 1.08], lookFrom: [0, 2.34, 0], lookTo: [0, 2.3, 0], yawFrom: 0.8, yawTo: -0.34 },
  ];
  const robotState = { rect: null as DOMRect | null, progress: 0, smooth: -1, shot: 0 as 0 | 1 };
  const shotFrom = new THREE.Vector3();
  const shotTo = new THREE.Vector3();
  const lookAt = new THREE.Vector3();

  // --- Closing terrain -------------------------------------------------------------------
  const terrainScene = new THREE.Scene();
  const terrainCamera = new THREE.PerspectiveCamera(50, 1, 0.1, 200);
  const terrainUniforms = { uTime: { value: 0 }, uScroll: { value: 0 }, uAccent: { value: new THREE.Color(ACCENT) } };
  const terrainMaterial = new THREE.ShaderMaterial({
    uniforms: terrainUniforms,
    transparent: true,
    vertexShader: /* glsl */ `
      uniform float uTime; uniform float uScroll;
      varying vec3 vPos; varying float vH;
      float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
      float noise(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.-2.*f);
        return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y); }
      float fbm(vec2 p){ float v=0., a=.5; for(int i=0;i<5;i++){ v+=a*noise(p); p*=2.02; a*=.5; } return v; }
      void main(){
        vec2 q = position.xy * 0.045 + vec2(0., uScroll * 0.9);
        float valley = smoothstep(4., 34., abs(position.x + 6. * sin(position.y * 0.04)));
        float h = fbm(q) * (2. + valley * 15.);
        vH = h; vPos = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position.xy, h, 1.);
      }`,
    fragmentShader: /* glsl */ `
      uniform float uTime; uniform vec3 uAccent;
      varying vec3 vPos; varying float vH;
      void main(){
        float flow = vH * 2.6 + vPos.x * 0.05 - uTime * 0.22;
        float ribbon = abs(fract(flow) - .5);
        float line = smoothstep(.055, .0, ribbon);
        float halo = smoothstep(.34, .0, ribbon) * .28;
        float hot = smoothstep(.016, .0, ribbon);
        float distanceFade = smoothstep(120., 4., -vPos.y + 62.);
        vec3 base = mix(vec3(.012,.002,.012), uAccent * .15, smoothstep(.0, 9., vH));
        vec3 col = base + uAccent * (line + halo) + vec3(1.) * hot * .85;
        float fog = smoothstep(62., 18., vPos.y);
        col = mix(uAccent * .3, col, fog);
        gl_FragColor = vec4(col * distanceFade, 1.);
      }`,
  });
  const terrainPlane = new THREE.Mesh(new THREE.PlaneGeometry(170, 130, 300, 240), terrainMaterial);
  terrainPlane.rotation.x = -Math.PI / 2;
  terrainPlane.position.set(0, -4, -30);
  terrainScene.add(terrainPlane);
  const sky = new THREE.Mesh(
    new THREE.SphereGeometry(150, 32, 24),
    new THREE.ShaderMaterial({
      side: THREE.BackSide,
      uniforms: { uAccent: terrainUniforms.uAccent },
      vertexShader: 'varying vec3 vP; void main(){ vP=normalize(position); gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.); }',
      fragmentShader: 'uniform vec3 uAccent; varying vec3 vP; void main(){ float g=smoothstep(.34,-.03,vP.y); gl_FragColor=vec4(uAccent*g*g*.72,1.); }',
    }),
  );
  terrainScene.add(sky);
  const planet = new THREE.Mesh(
    new THREE.SphereGeometry(1, 64, 48),
    new THREE.ShaderMaterial({
      uniforms: { uAccent: terrainUniforms.uAccent },
      vertexShader: 'varying vec3 vN; varying vec3 vV; void main(){ vN=normalize(normalMatrix*normal); vec4 m=modelViewMatrix*vec4(position,1.); vV=normalize(-m.xyz); gl_Position=projectionMatrix*m; }',
      fragmentShader: 'uniform vec3 uAccent; varying vec3 vN; varying vec3 vV; void main(){ float f=pow(1.-max(dot(vN,vV),0.),2.4); float lit=smoothstep(-.6,.9,dot(vN,normalize(vec3(-.5,.8,.3)))); gl_FragColor=vec4(uAccent*(.04+lit*.26)+mix(uAccent,vec3(1.),f*f)*f*1.25,1.); }',
    }),
  );
  planet.scale.setScalar(19);
  planet.position.set(40, 24, -92);
  terrainScene.add(planet);
  const terrainState = { rect: null as DOMRect | null, progress: 0, smooth: 0 };

  // --- Frame -----------------------------------------------------------------------------
  const pointer = new THREE.Vector2();
  const smoothPointer = new THREE.Vector2();
  const influences = new Array(MORPH_ORDER.length).fill(0);

  const resize = () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
    renderer.setSize(w, h, false);
    camera.aspect = robotCamera.aspect = terrainCamera.aspect = w / h;
    camera.updateProjectionMatrix();
    robotCamera.updateProjectionMatrix();
    terrainCamera.updateProjectionMatrix();
  };
  resize();
  window.addEventListener('resize', resize);

  const drawClipped = (scene: THREE.Scene, cam: THREE.Camera, rect: DOMRect) => {
    const h = window.innerHeight;
    const top = Math.max(0, rect.top);
    const bottom = Math.min(h, rect.bottom);
    if (bottom <= top) return;
    renderer.setScissorTest(true);
    renderer.setScissor(0, h - bottom, window.innerWidth, bottom - top);
    renderer.render(scene, cam);
    renderer.setScissorTest(false);
    renderer.clearDepth();
  };

  const render = (dt: number, time: number) => {
    renderer.clear();
    const motion = reduced ? 0 : 1;
    smoothPointer.lerp(pointer, 1 - Math.exp(-dt * 4));

    if (robotState.rect && robotGroup.children.length) {
      if (robotState.smooth < 0) robotState.smooth = robotState.progress;
      robotState.smooth += (robotState.progress - robotState.smooth) * (1 - Math.exp(-dt * 5));
      const shot = SHOTS[robotState.shot];
      const t = robotState.smooth;
      shotFrom.fromArray(shot.from);
      shotTo.fromArray(shot.to);
      robotCamera.position.lerpVectors(shotFrom, shotTo, t);
      robotCamera.position.x += smoothPointer.x * 0.14 * motion;
      robotCamera.position.y += smoothPointer.y * 0.08 * motion;
      // Keep the figure framed on tall screens by backing the camera away.
      robotCamera.position.z *= camera.aspect < 1 ? 1.5 : 1;
      shotFrom.fromArray(shot.lookFrom);
      shotTo.fromArray(shot.lookTo);
      lookAt.lerpVectors(shotFrom, shotTo, t);
      robotCamera.lookAt(lookAt);
      robotGroup.rotation.y = THREE.MathUtils.lerp(shot.yawFrom, shot.yawTo, t);
      tunnel.position.z = 6 + ((t * 26) % TUNNEL_STEP) * motion;
      drawClipped(robotScene, robotCamera, robotState.rect);
    } else {
      robotState.smooth = -1;
    }

    if (terrainState.rect) {
      terrainState.smooth += (terrainState.progress - terrainState.smooth) * (1 - Math.exp(-dt * 4));
      terrainUniforms.uTime.value = time * motion;
      terrainUniforms.uScroll.value = terrainState.smooth;
      terrainCamera.position.set(smoothPointer.x * 0.5 * motion, 10 - terrainState.smooth * 2 + smoothPointer.y * 0.25 * motion, 22);
      terrainCamera.lookAt(0, 5.4, -30);
      planet.rotation.y = time * 0.03 * motion;
      drawClipped(terrainScene, terrainCamera, terrainState.rect);
    }

    let anyShape = false;
    const pxToWorld = (2 * CAMERA_Z * Math.tan(THREE.MathUtils.degToRad(FOV / 2))) / window.innerHeight;
    const vh = window.innerHeight;
    for (const item of shapes) {
      const rect = item.el.getBoundingClientRect();
      const onScreen = rect.bottom > -120 && rect.top < vh + 120 && rect.width > 1;
      const hidden = item.el.dataset.hidden === '1';
      const target = onScreen && !hidden ? 1 : 0;
      item.scale += (target - item.scale) * (1 - Math.exp(-dt * 5));
      if (item.scale < 0.004 && !target) { item.mesh.visible = false; continue; }
      anyShape = true;
      item.mesh.visible = true;

      const depth = Number(item.el.dataset.z ?? 0);
      const perspective = (CAMERA_Z - depth) / CAMERA_Z;
      item.mesh.position.set(
        (rect.left + rect.width / 2 - window.innerWidth / 2) * pxToWorld * perspective + smoothPointer.x * 0.1 * motion,
        -(rect.top + rect.height / 2 - vh / 2) * pxToWorld * perspective + smoothPointer.y * 0.06 * motion,
        depth,
      );
      item.mesh.scale.setScalar((Math.min(rect.width, rect.height) / 2) * pxToWorld * perspective * item.scale);

      item.mesh.rotation.x += (item.spin.x * motion + item.velocity.x) * dt;
      item.mesh.rotation.y += (item.spin.y * motion + item.velocity.y) * dt;
      item.mesh.rotation.z += item.spin.z * motion * dt;
      item.velocity.multiplyScalar(Math.exp(-dt * 1.6));

      if (item.morph && item.mesh.morphTargetInfluences) {
        const wanted = Number(item.el.dataset.morph ?? 0);
        influences.fill(0);
        const lower = Math.floor(wanted) % MORPH_ORDER.length;
        const upper = (lower + 1) % MORPH_ORDER.length;
        const mix = wanted - Math.floor(wanted);
        influences[lower] = 1 - mix;
        influences[upper] = mix;
        const dict = item.mesh.morphTargetInfluences;
        for (let i = 0; i < dict.length; i++) dict[i] += (influences[i] - dict[i]) * (1 - Math.exp(-dt * 6));
      }
    }
    if (anyShape) renderer.render(shapeScene, camera);
  };

  const loadRobot = (onProgress: (ratio: number) => void) => new Promise<void>((resolve, reject) => {
    new GLTFLoader().load(
      '/models/protector_nemesis__the_fallen_seraph.glb',
      (gltf) => {
        const bounds = new THREE.Box3().setFromObject(gltf.scene);
        const size = bounds.getSize(new THREE.Vector3());
        const center = bounds.getCenter(new THREE.Vector3());
        const scale = 2.8 / size.y;
        gltf.scene.scale.setScalar(scale);
        gltf.scene.position.set(-center.x * scale, -bounds.min.y * scale, -center.z * scale);
        // Push the supplied armour toward polished metal so it sits with the chrome shapes.
        gltf.scene.traverse((child) => {
          if (!(child instanceof THREE.Mesh)) return;
          for (const material of Array.isArray(child.material) ? child.material : [child.material]) {
            if (material instanceof THREE.MeshStandardMaterial) {
              material.metalness = Math.max(material.metalness, 0.82);
              material.roughness = Math.min(material.roughness, 0.34);
            }
          }
        });
        robotGroup.add(gltf.scene);
        resolve();
      },
      (event) => { if (event.total) onProgress(event.loaded / event.total); },
      reject,
    );
  });

  return {
    render,
    loadRobot,
    setPointer: (x, y) => pointer.set(x, y),
    setRobot: (rect, progress, shot) => { robotState.rect = rect; robotState.progress = progress; robotState.shot = shot; },
    setTerrain: (rect, progress) => { terrainState.rect = rect; terrainState.progress = progress; },
    dispose: () => {
      window.removeEventListener('resize', resize);
      dragCleanups.forEach((cleanup) => cleanup());
      const disposeScene = (scene: THREE.Scene) => scene.traverse((object) => {
        if (!(object instanceof THREE.Mesh)) return;
        object.geometry.dispose();
        (Array.isArray(object.material) ? object.material : [object.material]).forEach((material) => {
          Object.values(material).forEach((value) => { if (value instanceof THREE.Texture) value.dispose(); });
          material.dispose();
        });
      });
      disposeScene(shapeScene);
      disposeScene(robotScene);
      disposeScene(terrainScene);
      environment.dispose();
      renderer.dispose();
    },
  };
}

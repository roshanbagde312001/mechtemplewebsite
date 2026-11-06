import * as THREE from 'three';
import { RobotMaterials } from './materials';

export interface RobotComposite {
  group: THREE.Group;
  headGroup: THREE.Group;
  templeDiscLeft: THREE.Group;
  templeDiscRight: THREE.Group;
  chestCore: THREE.Mesh;
  particles: THREE.Points;
  internalCorridor: THREE.Group;
  haloMesh: THREE.Mesh;
  update: (time: number) => void;
}

export function buildHumanoidRobot(materials: RobotMaterials): RobotComposite {
  const root = new THREE.Group();
  root.position.set(0, -0.65, 0);
  // Three-quarter dynamic pose matching the uploaded photo
  root.rotation.y = -0.38;

  // 1. RED VOLUMETRIC HALO RING BEHIND HEAD (Prominent element in reference photo)
  const haloGeo = new THREE.TorusGeometry(0.72, 0.015, 16, 64);
  const haloMesh = new THREE.Mesh(haloGeo, materials.redHaloGlow);
  haloMesh.position.set(0.15, 2.2, -0.35);
  haloMesh.rotation.y = 0.2;
  root.add(haloMesh);

  // Soft glow disc inside halo
  const haloDiscGeo = new THREE.CircleGeometry(0.70, 48);
  const haloDiscMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color(0x38040d),
    transparent: true,
    opacity: 0.35,
    side: THREE.DoubleSide,
  });
  const haloDisc = new THREE.Mesh(haloDiscGeo, haloDiscMat);
  haloDisc.position.set(0.15, 2.2, -0.36);
  haloDisc.rotation.y = 0.2;
  root.add(haloDisc);

  // 2. CRANIUM & HELMET
  const headGroup = new THREE.Group();
  headGroup.position.set(0, 2.15, 0.05);
  headGroup.rotation.x = 0.04;

  // Aerodynamic main cranium shell (Liquid obsidian)
  const skullGeo = new THREE.SphereGeometry(0.39, 36, 32);
  skullGeo.scale(0.88, 1.12, 1.05);
  const skullMesh = new THREE.Mesh(skullGeo, materials.obsidianCarapace);
  headGroup.add(skullMesh);

  // Segmented dorsal crest / aerodynamic helmet fin
  const crestShape = new THREE.Shape();
  crestShape.moveTo(0, 0.38);
  crestShape.lineTo(-0.05, 0.48);
  crestShape.lineTo(-0.03, -0.25);
  crestShape.lineTo(0.03, -0.25);
  crestShape.lineTo(0.05, 0.48);
  crestShape.closePath();
  const crestExtrudeSettings = { depth: 0.44, bevelEnabled: true, bevelSegments: 3, steps: 1, bevelSize: 0.025, bevelThickness: 0.025 };
  const crestGeo = new THREE.ExtrudeGeometry(crestShape, crestExtrudeSettings);
  crestGeo.center();
  const crestMesh = new THREE.Mesh(crestGeo, materials.obsidianCarapace);
  crestMesh.position.set(0, 0.14, -0.04);
  crestMesh.rotation.x = 0.18;
  headGroup.add(crestMesh);

  // Angular visor faceplate (Smooth black glass reflecting red rim)
  const visorGeo = new THREE.CylinderGeometry(0.26, 0.19, 0.44, 24, 1, false, -Math.PI / 2.4, Math.PI / 1.2);
  const visorMesh = new THREE.Mesh(visorGeo, materials.visorGlass);
  visorMesh.position.set(0, -0.04, 0.23);
  visorMesh.rotation.x = 0.24;
  headGroup.add(visorMesh);

  // Crimson red glowing ocular sensor slit
  const sensorGeo = new THREE.BoxGeometry(0.32, 0.016, 0.05);
  const sensorMesh = new THREE.Mesh(sensorGeo, materials.redNeonGlow);
  sensorMesh.position.set(0, 0.02, 0.37);
  headGroup.add(sensorMesh);

  // Sculpted chin and mandible armor
  const chinShape = new THREE.Shape();
  chinShape.moveTo(-0.14, 0);
  chinShape.lineTo(0.14, 0);
  chinShape.lineTo(0.08, -0.24);
  chinShape.lineTo(-0.08, -0.24);
  chinShape.closePath();
  const chinGeo = new THREE.ExtrudeGeometry(chinShape, { depth: 0.28, bevelEnabled: true, bevelSize: 0.03, bevelThickness: 0.03 });
  chinGeo.center();
  const chinMesh = new THREE.Mesh(chinGeo, materials.obsidianCarapace);
  chinMesh.position.set(0, -0.22, 0.18);
  chinMesh.rotation.x = 0.35;
  headGroup.add(chinMesh);

  // 3. TEMPLE ACOUSTIC MECHANISM (Left & Right - Prominent acoustic disc in photo)
  const buildTempleAssembly = (isLeft: boolean) => {
    const templeGroup = new THREE.Group();
    const sign = isLeft ? 1 : -1;
    templeGroup.position.set(sign * 0.35, 0.05, 0.02);
    templeGroup.rotation.y = sign * (Math.PI / 2 + 0.18);

    // Outer circular mounting ring with metallic edge
    const outerRingGeo = new THREE.TorusGeometry(0.16, 0.024, 16, 36);
    const outerRing = new THREE.Mesh(outerRingGeo, materials.templeMechanism);
    templeGroup.add(outerRing);

    // Concentric stepped outer bezel
    const bezelGeo = new THREE.CylinderGeometry(0.14, 0.15, 0.05, 36);
    bezelGeo.rotateX(Math.PI / 2);
    const bezel = new THREE.Mesh(bezelGeo, materials.obsidianCarapace);
    templeGroup.add(bezel);

    // Inner rotor disc with concentric stepped micro-grooves
    const rotorGeo = new THREE.CylinderGeometry(0.11, 0.115, 0.03, 32);
    rotorGeo.rotateX(Math.PI / 2);
    const rotor = new THREE.Mesh(rotorGeo, materials.templeMechanism);
    templeGroup.add(rotor);

    // Micro-screws around perimeter
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const screwGeo = new THREE.CylinderGeometry(0.008, 0.008, 0.02, 10);
      screwGeo.rotateX(Math.PI / 2);
      const screw = new THREE.Mesh(screwGeo, materials.hydraulicPiston);
      screw.position.set(Math.cos(angle) * 0.13, Math.sin(angle) * 0.13, 0.026);
      templeGroup.add(screw);
    }

    // Glowing crimson red acoustic ring
    const glowRingGeo = new THREE.TorusGeometry(0.075, 0.010, 12, 32);
    const glowRing = new THREE.Mesh(glowRingGeo, materials.redNeonGlow);
    glowRing.position.z = 0.028;
    templeGroup.add(glowRing);

    // Central optical sensor diode
    const diodeGeo = new THREE.SphereGeometry(0.034, 16, 16);
    const diode = new THREE.Mesh(diodeGeo, materials.redNeonGlow);
    diode.position.z = 0.035;
    templeGroup.add(diode);

    // Hydraulic conduit arching from temple to base of cranium
    const curve = new THREE.CubicBezierCurve3(
      new THREE.Vector3(0, -0.06, 0.02),
      new THREE.Vector3(-sign * 0.05, -0.16, -0.05),
      new THREE.Vector3(-sign * 0.07, -0.26, -0.15),
      new THREE.Vector3(-sign * 0.09, -0.36, -0.22)
    );
    const conduitGeo = new THREE.TubeGeometry(curve, 24, 0.015, 10, false);
    const conduit = new THREE.Mesh(conduitGeo, materials.carbonSubChassis);
    templeGroup.add(conduit);

    return templeGroup;
  };

  const templeDiscLeft = buildTempleAssembly(true);
  const templeDiscRight = buildTempleAssembly(false);
  headGroup.add(templeDiscLeft);
  headGroup.add(templeDiscRight);

  // 4. INTERNAL CRANIAL CRAWL CORRIDOR
  const internalCorridor = new THREE.Group();
  internalCorridor.position.set(0.06, 0, 0.02);

  const tunnelGeo = new THREE.CylinderGeometry(0.26, 0.3, 0.75, 20, 8, true);
  tunnelGeo.rotateX(Math.PI / 2);
  const tunnelMesh = new THREE.Mesh(tunnelGeo, materials.internalCircuits);
  internalCorridor.add(tunnelMesh);

  for (let z = -0.32; z <= 0.32; z += 0.09) {
    const ringGeo = new THREE.TorusGeometry(0.24, 0.008, 12, 28);
    const ringMesh = new THREE.Mesh(ringGeo, materials.redNeonGlow);
    ringMesh.position.set(0, 0, z);
    internalCorridor.add(ringMesh);
  }

  const coreProcessorGeo = new THREE.BoxGeometry(0.14, 0.14, 0.14);
  const coreProcessor = new THREE.Mesh(coreProcessorGeo, materials.templeMechanism);
  coreProcessor.position.set(0, 0, 0);
  internalCorridor.add(coreProcessor);

  const synapticCoreGeo = new THREE.IcosahedronGeometry(0.06, 2);
  const synapticCore = new THREE.Mesh(synapticCoreGeo, materials.redNeonGlow);
  internalCorridor.add(synapticCore);

  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2;
    const busGeo = new THREE.CylinderGeometry(0.009, 0.009, 0.7, 8);
    busGeo.rotateX(Math.PI / 2);
    const busMesh = new THREE.Mesh(busGeo, i % 2 === 0 ? materials.hydraulicPiston : materials.redNeonGlow);
    busMesh.position.set(Math.cos(angle) * 0.20, Math.sin(angle) * 0.20, 0);
    internalCorridor.add(busMesh);
  }

  headGroup.add(internalCorridor);
  root.add(headGroup);

  // 5. CERVICAL SPINE & HYDRAULIC NECK
  const neckGroup = new THREE.Group();
  neckGroup.position.set(0, 1.7, 0);

  for (let i = 0; i < 5; i++) {
    const vertGeo = new THREE.CylinderGeometry(0.12 - i * 0.006, 0.13 - i * 0.006, 0.045, 20);
    const vert = new THREE.Mesh(vertGeo, materials.spinalVertebrae);
    vert.position.set(0, 0.22 - i * 0.08, -0.04);
    neckGroup.add(vert);

    const knobGeo = new THREE.BoxGeometry(0.045, 0.035, 0.055);
    const knob = new THREE.Mesh(knobGeo, materials.hydraulicPiston);
    knob.position.set(0, 0.22 - i * 0.08, -0.13);
    neckGroup.add(knob);
  }

  const addHydraulic = (x: number, z: number, tiltX: number, tiltZ: number) => {
    const pistonGroup = new THREE.Group();
    pistonGroup.position.set(x, 0.06, z);
    pistonGroup.rotation.x = tiltX;
    pistonGroup.rotation.z = tiltZ;

    const sleeveGeo = new THREE.CylinderGeometry(0.024, 0.026, 0.24, 14);
    const sleeve = new THREE.Mesh(sleeveGeo, materials.obsidianCarapace);
    pistonGroup.add(sleeve);

    const shaftGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.3, 14);
    const shaft = new THREE.Mesh(shaftGeo, materials.hydraulicPiston);
    shaft.position.y = 0.05;
    pistonGroup.add(shaft);

    neckGroup.add(pistonGroup);
  };

  addHydraulic(0.13, 0.07, 0.1, -0.16);
  addHydraulic(-0.13, 0.07, 0.1, 0.16);
  addHydraulic(0.10, -0.09, -0.1, -0.14);
  addHydraulic(-0.10, -0.09, -0.1, 0.14);

  for (let i = 0; i < 4; i++) {
    const angle = (i / 4) * Math.PI * 2;
    const neckCable = new THREE.CubicBezierCurve3(
      new THREE.Vector3(Math.cos(angle) * 0.16, 0.28, Math.sin(angle) * 0.16),
      new THREE.Vector3(Math.cos(angle) * 0.19, 0.06, Math.sin(angle) * 0.19),
      new THREE.Vector3(Math.cos(angle) * 0.17, -0.13, Math.sin(angle) * 0.17),
      new THREE.Vector3(Math.cos(angle) * 0.15, -0.22, Math.sin(angle) * 0.15)
    );
    const cableGeo = new THREE.TubeGeometry(neckCable, 20, 0.012, 8, false);
    const cable = new THREE.Mesh(cableGeo, materials.carbonSubChassis);
    neckGroup.add(cable);
  }

  root.add(neckGroup);

  // 6. TORSO & CHEST
  const torsoGroup = new THREE.Group();
  torsoGroup.position.set(0, 1.0, 0);

  const innerSkeletonGeo = new THREE.CylinderGeometry(0.34, 0.26, 1.15, 20);
  const innerSkeleton = new THREE.Mesh(innerSkeletonGeo, materials.carbonSubChassis);
  innerSkeleton.position.set(0, 0, -0.02);
  torsoGroup.add(innerSkeleton);

  const buildPectoralPlate = (isLeft: boolean) => {
    const shape = new THREE.Shape();
    const sign = isLeft ? 1 : -1;
    shape.moveTo(0, 0.36);
    shape.lineTo(sign * 0.40, 0.31);
    shape.lineTo(sign * 0.44, 0.03);
    shape.lineTo(sign * 0.26, -0.24);
    shape.lineTo(0, -0.19);
    shape.closePath();

    const extrudeSettings = {
      depth: 0.19,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 1,
      bevelSize: 0.045,
      bevelThickness: 0.045,
    };
    const plateGeo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    plateGeo.center();
    const plateMesh = new THREE.Mesh(plateGeo, materials.obsidianCarapace);
    plateMesh.position.set(sign * 0.23, 0.20, 0.19);
    plateMesh.rotation.y = sign * -0.22;
    plateMesh.rotation.x = -0.12;
    return plateMesh;
  };

  torsoGroup.add(buildPectoralPlate(true));
  torsoGroup.add(buildPectoralPlate(false));

  const clavicleGeo = new THREE.BoxGeometry(0.76, 0.09, 0.24);
  const clavicle = new THREE.Mesh(clavicleGeo, materials.obsidianCarapace);
  clavicle.position.set(0, 0.52, 0.09);
  torsoGroup.add(clavicle);

  const sternumGroup = new THREE.Group();
  sternumGroup.position.set(0, 0.16, 0.26);

  const sternumBaseGeo = new THREE.BoxGeometry(0.13, 0.44, 0.08);
  const sternumBase = new THREE.Mesh(sternumBaseGeo, materials.templeMechanism);
  sternumGroup.add(sternumBase);

  const chestCoreGeo = new THREE.CylinderGeometry(0.048, 0.048, 0.045, 20);
  chestCoreGeo.rotateX(Math.PI / 2);
  const chestCore = new THREE.Mesh(chestCoreGeo, materials.redNeonGlow);
  chestCore.position.set(0, 0.06, 0.048);
  sternumGroup.add(chestCore);

  for (let i = 0; i < 6; i++) {
    const finGeo = new THREE.BoxGeometry(0.10, 0.013, 0.038);
    const fin = new THREE.Mesh(finGeo, materials.hydraulicPiston);
    fin.position.set(0, 0.15 - i * 0.048, 0.052);
    sternumGroup.add(fin);
  }
  torsoGroup.add(sternumGroup);

  for (let i = 0; i < 3; i++) {
    const abGeo = new THREE.CylinderGeometry(0.29 - i * 0.02, 0.27 - i * 0.02, 0.10, 20, 1, false, -Math.PI / 2.7, Math.PI / 1.35);
    const ab = new THREE.Mesh(abGeo, materials.obsidianCarapace);
    ab.position.set(0, -0.16 - i * 0.12, 0.17 - i * 0.02);
    ab.rotation.x = -0.08;
    torsoGroup.add(ab);

    const abSeamGeo = new THREE.BoxGeometry(0.19 - i * 0.02, 0.009, 0.02);
    const abSeam = new THREE.Mesh(abSeamGeo, materials.redNeonGlow);
    abSeam.position.set(0, -0.11 - i * 0.12, 0.30 - i * 0.03);
    torsoGroup.add(abSeam);
  }

  for (let side = -1; side <= 1; side += 2) {
    for (let r = 0; r < 3; r++) {
      const ribGeo = new THREE.CylinderGeometry(0.013, 0.013, 0.26, 10);
      ribGeo.rotateZ(side * 0.72);
      const rib = new THREE.Mesh(ribGeo, materials.hydraulicPiston);
      rib.position.set(side * 0.30, 0.04 - r * 0.09, 0.07);
      torsoGroup.add(rib);
    }
  }

  root.add(torsoGroup);

  // 7. SHOULDERS & ARMS
  const buildArm = (isLeft: boolean) => {
    const armGroup = new THREE.Group();
    const sign = isLeft ? 1 : -1;
    armGroup.position.set(sign * 0.58, 1.38, 0.04);

    const shoulderBallGeo = new THREE.SphereGeometry(0.15, 24, 24);
    const shoulderBall = new THREE.Mesh(shoulderBallGeo, materials.carbonSubChassis);
    armGroup.add(shoulderBall);

    const pauldronShape = new THREE.Shape();
    pauldronShape.moveTo(0, 0.22);
    pauldronShape.lineTo(sign * 0.26, 0.15);
    pauldronShape.lineTo(sign * 0.30, -0.18);
    pauldronShape.lineTo(0, -0.24);
    pauldronShape.closePath();
    const pauldronGeo = new THREE.ExtrudeGeometry(pauldronShape, { depth: 0.28, bevelEnabled: true, bevelSize: 0.035, bevelThickness: 0.035 });
    pauldronGeo.center();
    const pauldron = new THREE.Mesh(pauldronGeo, materials.obsidianCarapace);
    pauldron.position.set(sign * 0.09, 0.05, 0.02);
    pauldron.rotation.z = sign * -0.18;
    pauldron.rotation.y = sign * 0.25;
    armGroup.add(pauldron);

    const trimGeo = new THREE.BoxGeometry(0.016, 0.24, 0.025);
    const trim = new THREE.Mesh(trimGeo, materials.redNeonGlow);
    trim.position.set(sign * 0.24, 0.03, 0.13);
    armGroup.add(trim);

    const bicepChassisGeo = new THREE.CylinderGeometry(0.12, 0.10, 0.48, 18);
    const bicepChassis = new THREE.Mesh(bicepChassisGeo, materials.obsidianCarapace);
    bicepChassis.position.set(sign * 0.04, -0.34, -0.02);
    bicepChassis.rotation.z = sign * 0.08;
    armGroup.add(bicepChassis);

    const armRamGeo = new THREE.CylinderGeometry(0.018, 0.018, 0.34, 12);
    const armRam = new THREE.Mesh(armRamGeo, materials.hydraulicPiston);
    armRam.position.set(sign * 0.13, -0.34, 0.06);
    armGroup.add(armRam);

    const forearmGeo = new THREE.CylinderGeometry(0.10, 0.08, 0.50, 18);
    const forearm = new THREE.Mesh(forearmGeo, materials.obsidianCarapace);
    forearm.position.set(sign * 0.09, -0.76, 0.07);
    forearm.rotation.x = -0.35;
    forearm.rotation.z = sign * 0.05;
    armGroup.add(forearm);

    return armGroup;
  };

  root.add(buildArm(true));
  root.add(buildArm(false));

  // 8. AMBIENT PARTICLES
  const particleCount = 200;
  const particleGeo = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);

  const crimsonRed = new THREE.Color(0xff1133);
  const deepRose = new THREE.Color(0xff4466);

  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3;
    const radius = 0.2 + Math.random() * 2.2;
    const theta = Math.random() * Math.PI * 2;
    const y = 0.2 + Math.random() * 2.8;

    positions[i3] = Math.cos(theta) * radius;
    positions[i3 + 1] = y;
    positions[i3 + 2] = Math.sin(theta) * radius;

    const chosenColor = Math.random() > 0.4 ? crimsonRed : deepRose;
    colors[i3] = chosenColor.r;
    colors[i3 + 1] = chosenColor.g;
    colors[i3 + 2] = chosenColor.b;
  }

  particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const particleMat = new THREE.PointsMaterial({
    size: 0.02,
    vertexColors: true,
    transparent: true,
    opacity: 0.65,
    blending: THREE.AdditiveBlending,
  });

  const particles = new THREE.Points(particleGeo, particleMat);
  root.add(particles);

  const update = (time: number) => {
    templeDiscLeft.rotation.z = time * 0.8;
    templeDiscRight.rotation.z = -time * 0.8;
    const pulse = Math.sin(time * 3.0) * 0.5 + 0.5;
    materials.redNeonGlow.emissiveIntensity = 2.4 + pulse * 1.0;
  };

  return {
    group: root,
    headGroup,
    templeDiscLeft,
    templeDiscRight,
    chestCore,
    particles,
    internalCorridor,
    haloMesh,
    update,
  };
}

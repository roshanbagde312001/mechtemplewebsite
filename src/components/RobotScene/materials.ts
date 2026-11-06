import * as THREE from 'three';

export interface RobotMaterials {
  obsidianCarapace: THREE.MeshPhysicalMaterial;
  carbonSubChassis: THREE.MeshStandardMaterial;
  templeMechanism: THREE.MeshPhysicalMaterial;
  redNeonGlow: THREE.MeshStandardMaterial;
  redHaloGlow: THREE.MeshBasicMaterial;
  hydraulicPiston: THREE.MeshStandardMaterial;
  visorGlass: THREE.MeshPhysicalMaterial;
  internalCircuits: THREE.MeshStandardMaterial;
  spinalVertebrae: THREE.MeshStandardMaterial;
}

export function createRobotMaterials(isSoftwareGl: boolean): RobotMaterials {
  // Ultra-glossy liquid obsidian armor matching the Korvantage reference image
  const obsidianCarapace = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(0x06070a),
    metalness: 0.94,
    roughness: 0.12,
    clearcoat: isSoftwareGl ? 0 : 1.0,
    clearcoatRoughness: 0.08,
    reflectivity: 0.98,
  });

  // Matte textured carbon fiber sub-chassis
  const carbonSubChassis = new THREE.MeshStandardMaterial({
    color: new THREE.Color(0x101217),
    metalness: 0.6,
    roughness: 0.45,
  });

  // Metallic precision temple disc with concentric micro-grooves
  const templeMechanism = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(0x1a1c22),
    metalness: 0.96,
    roughness: 0.18,
    clearcoat: isSoftwareGl ? 0 : 0.9,
    clearcoatRoughness: 0.1,
  });

  // Intense Crimson Red luminescent neon rim and conduits (matching reference photo)
  const redNeonGlow = new THREE.MeshStandardMaterial({
    color: new THREE.Color(0xff1438),
    emissive: new THREE.Color(0xff0829),
    emissiveIntensity: 2.8,
    roughness: 0.2,
  });

  // Luminous red volumetric circular halo behind the head
  const redHaloGlow = new THREE.MeshBasicMaterial({
    color: new THREE.Color(0xff0a2e),
    transparent: true,
    opacity: 0.85,
    side: THREE.DoubleSide,
  });

  // Polished chrome hydraulic pistons
  const hydraulicPiston = new THREE.MeshStandardMaterial({
    color: new THREE.Color(0xd8dce4),
    metalness: 0.98,
    roughness: 0.1,
  });

  // Dark tinted liquid visor faceplate with red reflections
  const visorGlass = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(0x040507),
    metalness: 0.92,
    roughness: 0.06,
    clearcoat: 1.0,
    clearcoatRoughness: 0.04,
    transparent: true,
    opacity: 0.94,
  });

  // Internal processor boards and conduits
  const internalCircuits = new THREE.MeshStandardMaterial({
    color: new THREE.Color(0x0a0c14),
    emissive: new THREE.Color(0x28050e),
    emissiveIntensity: 1.2,
    roughness: 0.4,
    metalness: 0.85,
  });

  // Segmented spinal vertebrae
  const spinalVertebrae = new THREE.MeshStandardMaterial({
    color: new THREE.Color(0x181a22),
    metalness: 0.88,
    roughness: 0.3,
  });

  return {
    obsidianCarapace,
    carbonSubChassis,
    templeMechanism,
    redNeonGlow,
    redHaloGlow,
    hydraulicPiston,
    visorGlass,
    internalCircuits,
    spinalVertebrae,
  };
}

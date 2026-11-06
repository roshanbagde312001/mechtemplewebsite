import * as THREE from 'three';
import { CinematicPhase } from '../../types';

export const CINEMATIC_TOTAL_DURATION = 21.0; // Total sequence length in seconds

export const CINEMATIC_PHASES: CinematicPhase[] = [
  {
    id: 'zoom_in',
    title: 'Initial Approach & Zoom-In',
    startTime: 0.0,
    endTime: 3.2,
    startPos: [1.6, 1.4, 3.2],
    endPos: [0.75, 1.45, 1.65],
    startTarget: [0, 1.15, 0],
    endTarget: [0.08, 1.35, 0.02],
    isPaused: false,
    isInside: false,
    description: 'Cinematic approach zooming in on the obsidian humanoid robot posture and cranial silhouette.',
  },
  {
    id: 'pause_2s',
    title: '2-Second Calibration Poise',
    startTime: 3.2,
    endTime: 5.2,
    startPos: [0.75, 1.45, 1.65],
    endPos: [0.75, 1.45, 1.65],
    startTarget: [0.08, 1.35, 0.02],
    endTarget: [0.08, 1.35, 0.02],
    isPaused: true,
    isInside: false,
    description: 'Suspended in 3D space: 2.0-second focus on the lacquered armor reflections and temple aperture.',
  },
  {
    id: 'dive_in_2s',
    title: '2-Second Micro-Crawl Inside',
    startTime: 5.2,
    endTime: 7.2,
    startPos: [0.75, 1.45, 1.65],
    endPos: [0.12, 1.25, 0.05],
    startTarget: [0.08, 1.35, 0.02],
    endTarget: [0.0, 1.22, -0.04],
    isPaused: false,
    isInside: true,
    description: 'Penetrating the cranial temple port in 2.0s like an internal crawl into cybernetic anatomy.',
  },
  {
    id: 'temple_internal_pan',
    title: 'Slow 3D Temple Detail & Internal Anatomy Pan',
    startTime: 7.2,
    endTime: 14.0,
    startPos: [0.12, 1.25, 0.05],
    endPos: [-0.08, 1.28, -0.08],
    startTarget: [0.0, 1.22, -0.04],
    endTarget: [0.16, 1.25, 0.06],
    isPaused: false,
    isInside: true,
    description: 'Slow 3D macro pan inspecting the internal temple acoustic rotor, synaptic lattices, and amber conduits.',
  },
  {
    id: 'exit_crawl_back',
    title: 'Crawl Back & Silhouette Orbit',
    startTime: 14.0,
    endTime: 18.5,
    startPos: [-0.08, 1.28, -0.08],
    endPos: [1.4, 1.3, 2.6],
    startTarget: [0.16, 1.25, 0.06],
    endTarget: [0, 1.15, 0],
    isPaused: false,
    isInside: false,
    description: 'Exiting the internal thoracic cavity and smoothly pulling back to reveal the full humanoid frame.',
  },
  {
    id: 'hero_return',
    title: 'Return to Heroic Presentation',
    startTime: 18.5,
    endTime: 21.0,
    startPos: [1.4, 1.3, 2.6],
    endPos: [1.6, 1.4, 3.2],
    startTarget: [0, 1.15, 0],
    endTarget: [0, 1.15, 0],
    isPaused: false,
    isInside: false,
    description: 'Seamless loop transition ready for interactive user exploration or replay.',
  },
];

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export function evaluateCinematicCamera(time: number): {
  position: THREE.Vector3;
  target: THREE.Vector3;
  currentPhase: CinematicPhase;
  progressInPhase: number;
  totalProgress: number;
} {
  const normalizedTime = Math.max(0, Math.min(time, CINEMATIC_TOTAL_DURATION));
  const totalProgress = normalizedTime / CINEMATIC_TOTAL_DURATION;

  let currentPhase = CINEMATIC_PHASES[0];
  for (const phase of CINEMATIC_PHASES) {
    if (normalizedTime >= phase.startTime && normalizedTime <= phase.endTime) {
      currentPhase = phase;
      break;
    }
  }

  const phaseDuration = currentPhase.endTime - currentPhase.startTime;
  const rawT = phaseDuration > 0 ? (normalizedTime - currentPhase.startTime) / phaseDuration : 0;
  const easedT = currentPhase.isPaused ? 0 : easeInOutCubic(rawT);

  const startP = new THREE.Vector3(...currentPhase.startPos);
  const endP = new THREE.Vector3(...currentPhase.endPos);
  const startT = new THREE.Vector3(...currentPhase.startTarget);
  const endT = new THREE.Vector3(...currentPhase.endTarget);

  const position = new THREE.Vector3().lerpVectors(startP, endP, easedT);
  const target = new THREE.Vector3().lerpVectors(startT, endT, easedT);

  if (currentPhase.isInside) {
    const crawlBobY = Math.sin(normalizedTime * 5.0) * 0.008;
    const crawlBobX = Math.cos(normalizedTime * 3.5) * 0.006;
    position.y += crawlBobY;
    position.x += crawlBobX;
  }

  return {
    position,
    target,
    currentPhase,
    progressInPhase: rawT,
    totalProgress,
  };
}

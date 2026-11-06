export type ExperienceMode = 'cinematic' | 'scroll' | 'free_crawl';

export interface CameraWaypoint {
  name: string;
  position: [number, number, number];
  target: [number, number, number];
  fov?: number;
  duration?: number;
  description: string;
}

export interface CinematicPhase {
  id: string;
  title: string;
  startTime: number; // in seconds
  endTime: number;
  startPos: [number, number, number];
  endPos: [number, number, number];
  startTarget: [number, number, number];
  endTarget: [number, number, number];
  isPaused?: boolean;
  isInside?: boolean;
  description: string;
}

export interface StoryChapter {
  id: string;
  number: string;
  title: string;
  headline: string;
  body: string;
  cameraPos: [number, number, number];
  cameraTarget: [number, number, number];
  tag: string;
  metrics?: { label: string; value: string; unit?: string }[];
}

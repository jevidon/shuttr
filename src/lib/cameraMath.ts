import type { CameraSettings, ShutterSpeed } from '../types';

const shutterSeconds: Record<ShutterSpeed, number> = {
  '1/1000': 1 / 1000,
  '1/500': 1 / 500,
  '1/250': 1 / 250,
  '1/125': 1 / 125,
  '1/60': 1 / 60,
  '1/30': 1 / 30,
  '1/15': 1 / 15,
};

export function shutterToSeconds(shutterSpeed: ShutterSpeed): number {
  return shutterSeconds[shutterSpeed];
}

export function exposureStops(settings: CameraSettings, baseline: CameraSettings): number {
  const apertureStops = Math.log2((baseline.aperture * baseline.aperture) / (settings.aperture * settings.aperture));
  const shutterStops = Math.log2(shutterToSeconds(settings.shutterSpeed) / shutterToSeconds(baseline.shutterSpeed));
  const isoStops = Math.log2(settings.iso / baseline.iso);

  return apertureStops + shutterStops + isoStops;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function settingsEqual(a: CameraSettings, b: CameraSettings): boolean {
  return a.aperture === b.aperture && a.shutterSpeed === b.shutterSpeed && a.iso === b.iso;
}

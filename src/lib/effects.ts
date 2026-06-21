import type { CameraSettings, Scene } from '../types';
import { clamp, exposureStops, shutterToSeconds } from './cameraMath';

export function getEffects(scene: Scene, settings: CameraSettings) {
  const stops = clamp(exposureStops(settings, scene.defaultSettings), -2.2, 2.2);
  const apertureRange = scene.ranges.aperture;
  const minAperture = Math.min(...apertureRange);
  const maxAperture = Math.max(...apertureRange);
  const apertureDepth = 1 - (settings.aperture - minAperture) / (maxAperture - minAperture);
  const backgroundBlurPx = clamp(apertureDepth * scene.simulation.apertureBlurMaxPx, 0, scene.simulation.apertureBlurMaxPx);

  const shutterValues = scene.ranges.shutterSpeed.map(shutterToSeconds);
  const slowest = Math.max(...shutterValues);
  const fastest = Math.min(...shutterValues);
  const shutterDepth = (shutterToSeconds(settings.shutterSpeed) - fastest) / (slowest - fastest);
  const motionBlurPx = clamp(shutterDepth * scene.simulation.motionBlurMaxPx, 0, scene.simulation.motionBlurMaxPx);

  const isoValues = scene.ranges.iso;
  const isoDepth = (settings.iso - Math.min(...isoValues)) / (Math.max(...isoValues) - Math.min(...isoValues));
  const noiseAmount = clamp(isoDepth * scene.simulation.noiseMaxOpacity, 0, scene.simulation.noiseMaxOpacity);

  return {
    exposureStops: stops,
    backgroundBlurPx,
    motionBlurPx,
    noiseAmount,
    vignetteOpacity: clamp(backgroundBlurPx / scene.simulation.apertureBlurMaxPx, 0.08, 0.28),
  };
}

export function filtersForExposure(stops: number): string {
  const brightness = 1 + stops * 0.13;
  const contrast = 1 + Math.abs(stops) * 0.045;
  const saturation = 1 + stops * 0.025;

  return `brightness(${clamp(brightness, 0.72, 1.32)}) contrast(${clamp(contrast, 1, 1.14)}) saturate(${clamp(saturation, 0.92, 1.1)})`;
}

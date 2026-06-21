import type { CameraSettings, Scene, VisualState } from '../types';
import { getEffects, filtersForExposure } from './effects';

export function resolveVisualState(scene: Scene, settings: CameraSettings): VisualState {
  const canvasEffects = getEffects(scene, settings);

  return {
    mode: scene.mode === 'simulation' ? 'simulation' : 'variant',
    imageSrc: scene.baseImage,
    cssFilters: filtersForExposure(canvasEffects.exposureStops),
    canvasEffects,
    displayedSettings: settings,
    disclosure: 'Simulated teaching effect. The relationships are simplified for learning.',
  };
}

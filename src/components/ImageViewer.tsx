import { useMemo } from 'react';
import type { CameraSettings, Scene, VisualState } from '../types';
import { CameraSettingsOverlay } from './CameraSettingsOverlay';
import { resolveVisualState } from '../lib/resolveVisualState';

type ImageViewerProps = {
  scene: Scene;
  settings: CameraSettings;
  showBaseline?: boolean;
  compact?: boolean;
};

export function ImageViewer({ scene, settings, showBaseline = false, compact = false }: ImageViewerProps) {
  const visualState = useMemo<VisualState>(() => resolveVisualState(scene, settings), [scene, settings]);
  const baselineState = useMemo<VisualState>(() => resolveVisualState(scene, scene.defaultSettings), [scene]);

  return (
    <figure className={`image-viewer ${compact ? 'compact' : ''}`}>
      <div
        className="viewer-stage"
        style={
          {
            '--background-blur': `${visualState.canvasEffects.backgroundBlurPx}px`,
            '--motion-blur': `${visualState.canvasEffects.motionBlurPx}px`,
            '--motion-opacity': Math.min(0.55, visualState.canvasEffects.motionBlurPx / 18),
            '--motion-shift': `${visualState.canvasEffects.motionBlurPx * 0.22}px`,
            '--noise-opacity': visualState.canvasEffects.noiseAmount,
            '--vignette-opacity': visualState.canvasEffects.vignetteOpacity,
            '--vignette-soft': visualState.canvasEffects.vignetteOpacity * 0.35,
            '--viewer-filter': visualState.cssFilters,
            '--baseline-filter': baselineState.cssFilters,
          } as React.CSSProperties
        }
      >
        <img className="viewer-base blurred-layer" src={visualState.imageSrc} alt="" aria-hidden="true" />
        <img className="viewer-base subject-layer" src={visualState.imageSrc} alt={scene.alt} />
        <div className="motion-layer" aria-hidden="true" />
        <div className="noise-layer" aria-hidden="true" />
        <div className="vignette-layer" aria-hidden="true" />
        {showBaseline ? (
          <div className="baseline-split" aria-label="Baseline comparison">
            <img src={baselineState.imageSrc} alt="" aria-hidden="true" />
            <span>Baseline</span>
          </div>
        ) : null}
        <CameraSettingsOverlay settings={visualState.displayedSettings} />
      </div>
      <figcaption className="viewer-caption">{visualState.disclosure}</figcaption>
    </figure>
  );
}

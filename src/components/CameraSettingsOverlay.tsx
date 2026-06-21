import type { CameraSettings } from '../types';

type CameraSettingsOverlayProps = {
  settings: CameraSettings;
};

export function CameraSettingsOverlay({ settings }: CameraSettingsOverlayProps) {
  return (
    <dl className="settings-overlay" aria-label="Current camera settings">
      <div>
        <dt>Aperture</dt>
        <dd>f/{settings.aperture}</dd>
      </div>
      <div>
        <dt>Shutter</dt>
        <dd>{settings.shutterSpeed}s</dd>
      </div>
      <div>
        <dt>ISO</dt>
        <dd>{settings.iso}</dd>
      </div>
    </dl>
  );
}

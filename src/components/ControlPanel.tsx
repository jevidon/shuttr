import { Aperture, Gauge, RotateCcw, Timer, Waves } from 'lucide-react';
import type { CameraSettings, Scene, ShutterSpeed } from '../types';
import { SettingControl } from './SettingControl';

type ControlPanelProps = {
  scene: Scene;
  settings: CameraSettings;
  showBaseline: boolean;
  onSettingsChange: (settings: CameraSettings) => void;
  onReset: () => void;
  onBaselineChange: (enabled: boolean) => void;
};

export function ControlPanel({
  scene,
  settings,
  showBaseline,
  onSettingsChange,
  onReset,
  onBaselineChange,
}: ControlPanelProps) {
  return (
    <aside className="control-panel" aria-label="Manual camera controls">
      <div className="panel-title-row">
        <div>
          <p className="eyebrow">Manual Mode</p>
          <h2>Shape the image</h2>
        </div>
        <button className="icon-button" type="button" onClick={onReset} aria-label="Reset to default settings">
          <RotateCcw size={19} aria-hidden="true" />
        </button>
      </div>

      <SettingControl
        id="aperture"
        label="Aperture"
        value={settings.aperture}
        values={scene.ranges.aperture}
        formatValue={(value) => `f/${value}`}
        onChange={(aperture) => onSettingsChange({ ...settings, aperture })}
        help="Wider apertures soften the background; narrower apertures keep more detail sharp."
        icon={<Aperture size={18} />}
      />
      <SettingControl
        id="shutter"
        label="Shutter speed"
        value={settings.shutterSpeed}
        values={scene.ranges.shutterSpeed}
        formatValue={(value: ShutterSpeed) => `${value}s`}
        onChange={(shutterSpeed) => onSettingsChange({ ...settings, shutterSpeed })}
        help="Faster shutters freeze movement; slower shutters turn motion into streaks."
        icon={<Timer size={18} />}
      />
      <SettingControl
        id="iso"
        label="ISO"
        value={settings.iso}
        values={scene.ranges.iso}
        onChange={(iso) => onSettingsChange({ ...settings, iso })}
        help="Higher ISO brightens the image and adds visible grain."
        icon={<Gauge size={18} />}
      />

      <label className="toggle-row">
        <span><Waves size={17} aria-hidden="true" /> Compare baseline</span>
        <input
          type="checkbox"
          checked={showBaseline}
          onChange={(event) => onBaselineChange(event.currentTarget.checked)}
        />
      </label>
    </aside>
  );
}

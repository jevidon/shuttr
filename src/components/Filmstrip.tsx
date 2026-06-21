import { Play } from 'lucide-react';
import type { CameraSettings, Preset } from '../types';
import { settingsEqual } from '../lib/cameraMath';

type FilmstripProps = {
  presets: Preset[];
  activeSettings: CameraSettings;
  onSelect: (settings: CameraSettings) => void;
};

export function Filmstrip({ presets, activeSettings, onSelect }: FilmstripProps) {
  return (
    <section className="filmstrip-wrap" aria-labelledby="filmstrip-title">
      <div className="section-heading">
        <p className="eyebrow">Presets</p>
        <h2 id="filmstrip-title">Keyframes to compare</h2>
      </div>
      <div className="filmstrip" role="list">
        {presets.map((preset) => {
          const active = settingsEqual(preset.settings, activeSettings);
          return (
            <button
              className={`filmstrip-item ${active ? 'active' : ''}`}
              key={preset.id}
              type="button"
              aria-pressed={active}
              onClick={() => onSelect(preset.settings)}
            >
              <span className="film-icon"><Play size={15} aria-hidden="true" /></span>
              <span className="film-label">{preset.label}</span>
              <span className="film-settings">
                f/{preset.settings.aperture} · {preset.settings.shutterSpeed}s · ISO {preset.settings.iso}
              </span>
              <span className="film-description">{preset.description}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

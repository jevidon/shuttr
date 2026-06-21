import { useEffect, useReducer, useState } from 'react';
import { ControlPanel } from '../components/ControlPanel';
import { DisclosureNote } from '../components/DisclosureNote';
import { Filmstrip } from '../components/Filmstrip';
import { ImageViewer } from '../components/ImageViewer';
import { settingsReducer } from '../lib/settingsReducer';
import { routeHref } from '../lib/urlState';
import type { CameraSettings, Scene } from '../types';

type ManualViewProps = {
  scene: Scene;
  initialSettings: CameraSettings;
};

export function ManualView({ scene, initialSettings }: ManualViewProps) {
  const [settings, dispatch] = useReducer(settingsReducer, initialSettings);
  const [showBaseline, setShowBaseline] = useState(false);

  useEffect(() => {
    window.history.replaceState(null, '', routeHref('manual', settings));
  }, [settings]);

  return (
    <div className="page app-page">
      <section className="workspace-grid">
        <div className="viewer-column">
          <ImageViewer scene={scene} settings={settings} showBaseline={showBaseline} />
          <DisclosureNote>Simulated teaching effects show the relationship between settings, not a physically accurate RAW processor.</DisclosureNote>
        </div>
        <ControlPanel
          scene={scene}
          settings={settings}
          showBaseline={showBaseline}
          onSettingsChange={(nextSettings) => dispatch({ type: 'apply', settings: nextSettings })}
          onReset={() => dispatch({ type: 'reset', settings: scene.defaultSettings })}
          onBaselineChange={setShowBaseline}
        />
      </section>
      <Filmstrip
        presets={scene.presets}
        activeSettings={settings}
        onSelect={(nextSettings) => dispatch({ type: 'apply', settings: nextSettings })}
      />
    </div>
  );
}

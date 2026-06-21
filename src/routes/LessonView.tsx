import { useEffect, useReducer } from 'react';
import { DisclosureNote } from '../components/DisclosureNote';
import { Filmstrip } from '../components/Filmstrip';
import { ImageViewer } from '../components/ImageViewer';
import { LessonPanel } from '../components/LessonPanel';
import { settingsReducer } from '../lib/settingsReducer';
import { routeHref } from '../lib/urlState';
import type { CameraSettings, Lesson, Scene } from '../types';

type LessonViewProps = {
  scene: Scene;
  lesson: Lesson;
  initialSettings: CameraSettings;
};

export function LessonView({ scene, lesson, initialSettings }: LessonViewProps) {
  const [settings, dispatch] = useReducer(settingsReducer, initialSettings);

  useEffect(() => {
    window.history.replaceState(null, '', routeHref('lesson', settings, lesson.id));
  }, [settings, lesson.id]);

  return (
    <div className="page app-page">
      <section className="workspace-grid lesson-layout">
        <div className="viewer-column">
          <ImageViewer scene={scene} settings={settings} />
          <DisclosureNote>Lesson examples use simulated effects so the setting relationships are easy to compare.</DisclosureNote>
        </div>
        <LessonPanel
          lesson={lesson}
          activeSettings={settings}
          onSelect={(nextSettings) => dispatch({ type: 'apply', settings: nextSettings })}
        />
      </section>
      <Filmstrip
        presets={scene.presets.filter((preset) => preset.id !== 'default-exposure')}
        activeSettings={settings}
        onSelect={(nextSettings) => dispatch({ type: 'apply', settings: nextSettings })}
      />
    </div>
  );
}

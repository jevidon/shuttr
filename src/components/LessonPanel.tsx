import { ArrowRight, CheckCircle2 } from 'lucide-react';
import type { CameraSettings, Lesson } from '../types';
import { settingsEqual } from '../lib/cameraMath';
import { routeHref } from '../lib/urlState';

type LessonPanelProps = {
  lesson: Lesson;
  activeSettings: CameraSettings;
  onSelect: (settings: CameraSettings) => void;
};

export function LessonPanel({ lesson, activeSettings, onSelect }: LessonPanelProps) {
  return (
    <aside className="lesson-panel" aria-labelledby="lesson-title">
      <p className="eyebrow">Lesson Mode</p>
      <h1 id="lesson-title">{lesson.title}</h1>
      <p className="lesson-summary">{lesson.summary}</p>

      <div className="readout-row" aria-label="Current settings">
        <span>f/{activeSettings.aperture}</span>
        <span>{activeSettings.shutterSpeed}s</span>
        <span>ISO {activeSettings.iso}</span>
      </div>

      <div className="lesson-steps">
        {lesson.steps.map((step, index) => {
          const active = settingsEqual(step.settings, activeSettings);
          return (
            <button
              key={step.id}
              className={`lesson-step ${active ? 'active' : ''}`}
              type="button"
              aria-pressed={active}
              onClick={() => onSelect(step.settings)}
            >
              <span className="step-index">{active ? <CheckCircle2 size={18} /> : index + 1}</span>
              <span>
                <strong>{step.title}</strong>
                <small>{step.body}</small>
              </span>
            </button>
          );
        })}
      </div>

      <a className="button-link primary full" href={routeHref('manual', activeSettings)}>
        Try this in Manual Mode <ArrowRight size={17} aria-hidden="true" />
      </a>
    </aside>
  );
}

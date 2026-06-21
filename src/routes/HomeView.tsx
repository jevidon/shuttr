import { ArrowRight, BookOpen, SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';
import { ImageViewer } from '../components/ImageViewer';
import { Filmstrip } from '../components/Filmstrip';
import type { CameraSettings, Lesson, Scene } from '../types';
import { routeHref } from '../lib/urlState';

type HomeViewProps = {
  scene: Scene;
  lesson: Lesson;
  initialSettings: CameraSettings;
};

export function HomeView({ scene, lesson, initialSettings }: HomeViewProps) {
  const [previewSettings, setPreviewSettings] = useState(initialSettings);

  return (
    <div className="page">
      <section className="hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">Interactive photography learning</p>
          <h1>Shuttr</h1>
          <p className="hero-lede">
            Learn manual camera settings by changing aperture, shutter speed, and ISO, then watching the image respond instantly.
          </p>
          <div className="hero-actions">
            <a className="button-link primary" href={routeHref('manual', initialSettings)}>
              <SlidersHorizontal size={18} aria-hidden="true" /> Try Manual Mode
            </a>
            <a className="button-link secondary" href={routeHref('lesson', initialSettings, lesson.id)}>
              <BookOpen size={18} aria-hidden="true" /> Browse Lessons
            </a>
          </div>
        </div>
        <ImageViewer scene={scene} settings={previewSettings} compact />
      </section>

      <section className="split-section">
        <div>
          <p className="eyebrow">How it works</p>
          <h2>Move a control. See the tradeoff.</h2>
        </div>
        <div className="feature-grid">
          <article>
            <h3>Aperture</h3>
            <p>Explore subject separation and background detail by moving between wide and narrow apertures.</p>
          </article>
          <article>
            <h3>Shutter speed</h3>
            <p>Compare frozen motion against slower, more expressive blur.</p>
          </article>
          <article>
            <h3>ISO</h3>
            <p>Brighten the scene while noticing how grain appears as ISO climbs.</p>
          </article>
        </div>
      </section>

      <section className="philosophy-section">
        <div>
          <p className="eyebrow">Learning loop</p>
          <h2>Change, observe, compare, repeat.</h2>
        </div>
        <p>
          Shuttr keeps the feedback loop short. Learners can experiment freely in Manual Mode, then follow guided lesson steps that explain what changed and why it matters.
        </p>
        <a className="text-link" href={routeHref('lesson', initialSettings, lesson.id)}>
          Start the portraiture lesson <ArrowRight size={16} aria-hidden="true" />
        </a>
      </section>

      <Filmstrip presets={scene.presets} activeSettings={previewSettings} onSelect={setPreviewSettings} />
    </div>
  );
}

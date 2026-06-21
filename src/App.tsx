import { useEffect, useMemo, useState } from 'react';
import { Aperture, BookOpen, Camera, SlidersHorizontal } from 'lucide-react';
import manifestData from './data/shuttrManifest.json';
import { HomeView } from './routes/HomeView';
import { ManualView } from './routes/ManualView';
import { LessonView } from './routes/LessonView';
import type { CameraSettings, Manifest } from './types';
import { parseRoute, routeHref, type AppRoute } from './lib/urlState';

const manifest = manifestData as Manifest;

export function App() {
  const [route, setRoute] = useState<AppRoute>(() => parseRoute());
  const scene = manifest.scenes[0];
  const lesson = manifest.lessons[0];
  const routeSettings = useMemo<CameraSettings>(() => {
    return { ...scene.defaultSettings, ...route.settings };
  }, [route.settings, scene.defaultSettings]);

  useEffect(() => {
    const handleHashChange = () => setRoute(parseRoute());
    window.addEventListener('hashchange', handleHashChange);
    if (!window.location.hash) {
      window.history.replaceState(null, '', '#/');
    }
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#/" aria-label="Shuttr home">
          <span className="brand-mark"><Aperture size={20} aria-hidden="true" /></span>
          <span>Shuttr</span>
        </a>
        <nav className="nav-links" aria-label="Primary navigation">
          <a href="#/" className={route.name === 'home' ? 'active' : ''}>
            <Camera size={17} aria-hidden="true" /> Home
          </a>
          <a href={routeHref('manual', routeSettings)} className={route.name === 'manual' ? 'active' : ''}>
            <SlidersHorizontal size={17} aria-hidden="true" /> Manual Mode
          </a>
          <a href={routeHref('lesson', routeSettings, lesson.id)} className={route.name === 'lesson' ? 'active' : ''}>
            <BookOpen size={17} aria-hidden="true" /> Lesson Mode
          </a>
        </nav>
      </header>

      <main>
        {route.name === 'manual' ? (
          <ManualView scene={scene} initialSettings={routeSettings} />
        ) : route.name === 'lesson' ? (
          <LessonView scene={scene} lesson={lesson} initialSettings={routeSettings} />
        ) : (
          <HomeView scene={scene} lesson={lesson} initialSettings={routeSettings} />
        )}
      </main>
    </div>
  );
}

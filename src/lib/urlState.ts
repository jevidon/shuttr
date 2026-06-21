import type { CameraSettings, ShutterSpeed } from '../types';

export type RouteName = 'home' | 'manual' | 'lesson';

export type AppRoute = {
  name: RouteName;
  lessonId?: string;
  settings?: Partial<CameraSettings>;
};

function parseParams(raw: string): URLSearchParams {
  const queryStart = raw.indexOf('?');
  return new URLSearchParams(queryStart >= 0 ? raw.slice(queryStart + 1) : '');
}

export function parseRoute(): AppRoute {
  const hash = window.location.hash.replace(/^#\/?/, '');
  const path = hash.split('?')[0];
  const params = parseParams(hash);
  const settings: Partial<CameraSettings> = {};

  const aperture = Number(params.get('aperture'));
  const iso = Number(params.get('iso'));
  const shutter = params.get('shutter') as ShutterSpeed | null;

  if (Number.isFinite(aperture) && aperture > 0) settings.aperture = aperture;
  if (Number.isFinite(iso) && iso > 0) settings.iso = iso;
  if (shutter) settings.shutterSpeed = shutter;

  if (path.startsWith('lesson')) {
    return { name: 'lesson', lessonId: params.get('id') ?? 'portraiture', settings };
  }

  if (path.startsWith('manual')) {
    return { name: 'manual', settings };
  }

  return { name: 'home', settings };
}

export function routeHref(route: RouteName, settings?: CameraSettings, lessonId?: string): string {
  const params = new URLSearchParams();
  if (lessonId) params.set('id', lessonId);
  if (settings) {
    params.set('aperture', String(settings.aperture));
    params.set('shutter', settings.shutterSpeed);
    params.set('iso', String(settings.iso));
  }

  const query = params.toString();
  return `#/${route}${query ? `?${query}` : ''}`;
}

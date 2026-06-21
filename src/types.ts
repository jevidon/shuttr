export type ShutterSpeed = '1/1000' | '1/500' | '1/250' | '1/125' | '1/60' | '1/30' | '1/15';

export type CameraSettings = {
  aperture: number;
  shutterSpeed: ShutterSpeed;
  iso: number;
};

export type Preset = {
  id: string;
  label: string;
  description: string;
  settings: CameraSettings;
};

export type Scene = {
  id: string;
  title: string;
  mode: 'simulation' | 'variants';
  baseImage: string;
  alt: string;
  ranges: {
    aperture: number[];
    shutterSpeed: ShutterSpeed[];
    iso: number[];
  };
  defaultSettings: CameraSettings;
  presets: Preset[];
  simulation: {
    apertureBlurMaxPx: number;
    motionBlurMaxPx: number;
    noiseMaxOpacity: number;
  };
};

export type LessonStep = {
  id: string;
  title: string;
  body: string;
  settings: CameraSettings;
};

export type Lesson = {
  id: string;
  title: string;
  sceneId: string;
  summary: string;
  steps: LessonStep[];
};

export type Manifest = {
  scenes: Scene[];
  lessons: Lesson[];
};

export type CanvasEffects = {
  exposureStops: number;
  backgroundBlurPx: number;
  motionBlurPx: number;
  noiseAmount: number;
  vignetteOpacity: number;
};

export type VisualState = {
  mode: 'simulation' | 'variant';
  imageSrc: string;
  cssFilters: string;
  canvasEffects: CanvasEffects;
  displayedSettings: CameraSettings;
  disclosure: string;
};

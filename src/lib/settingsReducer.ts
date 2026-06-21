import type { CameraSettings, ShutterSpeed } from '../types';

export type SettingsAction =
  | { type: 'set-aperture'; aperture: number }
  | { type: 'set-shutter'; shutterSpeed: ShutterSpeed }
  | { type: 'set-iso'; iso: number }
  | { type: 'apply'; settings: CameraSettings }
  | { type: 'reset'; settings: CameraSettings };

export function settingsReducer(state: CameraSettings, action: SettingsAction): CameraSettings {
  switch (action.type) {
    case 'set-aperture':
      return { ...state, aperture: action.aperture };
    case 'set-shutter':
      return { ...state, shutterSpeed: action.shutterSpeed };
    case 'set-iso':
      return { ...state, iso: action.iso };
    case 'apply':
    case 'reset':
      return action.settings;
    default:
      return state;
  }
}

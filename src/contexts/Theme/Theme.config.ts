import { Color, ThemeModel, ThemeType } from './Theme.model';

export const THEMES: Record<ThemeType, ThemeModel> = {
  [ThemeType.LIGHT]: {
    '--primary': Color.BLACK,
    '--secondary': Color.DARK_BLUE,
    '--background': Color.LIGHT,
    '--white': Color.WHITE,
    '--backgroundBtn': Color.WHITE,
    '--error': Color.RED,
    '--search': Color.YELLOW,
    '--outlined': Color.LIGHT,
  },
  [ThemeType.DARK]: {
    '--primary': Color.WHITE,
    '--secondary': Color.WHITE,
    '--background': Color.DARK,
    '--white': Color.WHITE,
    '--backgroundBtn': Color.DARK_BLUE,
    '--error': Color.RED,
    '--search': Color.YELLOW,
    '--outlined': Color.WHITE,
  },
};

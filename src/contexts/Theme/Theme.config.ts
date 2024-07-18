import { Color, ThemeModel, ThemeType } from './Theme.model';

export const THEMES: Record<ThemeType, ThemeModel> = {
  [ThemeType.LIGHT]: {
    '--primary': Color.DARK_BLUE,
    '--secondary': Color.DARK_BLUE,
    '--background': Color.LIGHT,
    '--white': Color.WHITE,
    '--backgroundBtn': Color.WHITE,
  },
  [ThemeType.DARK]: {
    '--primary': Color.WHITE,
    '--secondary': Color.WHITE,
    '--background': Color.DARK,
    '--white': Color.WHITE,
    '--backgroundBtn': Color.DARK_BLUE,
  },
};

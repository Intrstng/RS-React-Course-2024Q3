export enum Color {
  LIGHT_GREY = 'rgba(174,174,174,0.32)',
  LIGHT = 'rgba(255,255,255,0)',
  WHITE = '#FFF',
  DARK = 'rgba(0,0,0,0.8)',
  DARK_BLUE = 'rgba(4,44,118,0.9)',
  YELLOW = 'rgb(254,219,73)',
  RED = 'rgb(248,0,0)',
  ORANGE = 'rgb(248,128,0)',
  BLACK = 'rgb(0,0,0)',
  GREEN = 'rgb(0,252,17)',
}

export enum ThemeType {
  LIGHT = 'light',
  DARK = 'dark',
}

export type ThemeModel = {
  '--primary': Color;
  '--secondary': Color;
  '--background': Color;
  '--white': Color;
  '--backgroundBtn': Color;
  '--error': Color;
  '--search': Color;
  '--outlined': Color;
  '--alert': Color;
  '--delete': Color;
};

export type ThemeContextProps = {
  themeType: ThemeType;
  theme: ThemeModel;
  setCurrentTheme: (currentTheme: ThemeType) => void;
};

'use client';

import React, { createContext, FC, useState } from 'react';
import { THEMES } from './Theme.config';
import { ThemeContextProps, ThemeType } from './Theme.model';

export const ThemeContext = createContext<ThemeContextProps>({
  themeType: ThemeType.LIGHT,
  theme: THEMES[ThemeType.LIGHT],
} as ThemeContextProps);

export const ThemeProvider: FC = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeType>(ThemeType.LIGHT);

  return (
    <ThemeContext.Provider
      value={{
        themeType: currentTheme,
        theme: THEMES[currentTheme],
        setCurrentTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

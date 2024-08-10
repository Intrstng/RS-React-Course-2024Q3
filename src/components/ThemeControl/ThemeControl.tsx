'use client'

import React, { useContext, useEffect } from 'react';
import { ThemeContext } from '../../contexts/Theme/Theme.context';
import { ThemeType } from '../../contexts/Theme/Theme.model';
import S from '../../styles/ThemeControl.module.css';
import { Button } from '../Button';

export const LOCAL_STORAGE_THEME_KEY = 'themeValue';

export const getInitThemeFromLS = (key: string) => {
  if (typeof window !== 'undefined') {
    const storedTheme = localStorage.getItem(key);
    return storedTheme ? JSON.parse(storedTheme) : 'light';
  }
  return 'light';
};

export const ThemeControl = () => {
  const { setCurrentTheme } = useContext(ThemeContext);
  const themeLS = getInitThemeFromLS(LOCAL_STORAGE_THEME_KEY);

  useEffect(() => {
    setCurrentTheme(themeLS);
  }, []);

  const onClickSetLightHandler = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(
        LOCAL_STORAGE_THEME_KEY,
        JSON.stringify(ThemeType.LIGHT),
      );
    }
    setCurrentTheme(ThemeType.LIGHT);
  };

  const onClickSetDarkHandler = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(
        LOCAL_STORAGE_THEME_KEY,
        JSON.stringify(ThemeType.DARK),
      );
    }
    setCurrentTheme(ThemeType.DARK);
  };

  return (
    <div className={S.themeControls}>
      <Button color={'primary'} onClickCallBack={onClickSetLightHandler}>
        Light
      </Button>
      <Button color={'secondary'} onClickCallBack={onClickSetDarkHandler}>
        Dark
      </Button>
    </div>
  );
};

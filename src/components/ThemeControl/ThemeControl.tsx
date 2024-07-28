import React, { useContext, useEffect } from 'react';
import { ThemeContext } from '../../contexts/Theme/Theme.context';
import { ThemeType } from '../../contexts/Theme/Theme.model';
import S from './ThemeControl.module.css';
import { Button } from '../Button';
import useLocalStorageAdvanced from '../hooks/useLocalStorageAdvanced';

const LOCAL_STORAGE_THEME_KEY = 'themeValue';

export const ThemeControl = () => {
  const { setCurrentTheme } = useContext(ThemeContext);
  const [themeLS, setThemeLS] = useLocalStorageAdvanced<string>(
    LOCAL_STORAGE_THEME_KEY,
    ThemeType.LIGHT,
  );

  useEffect(() => {
    setCurrentTheme(themeLS);
  }, []);

  const onClickSetLightHandler = () => {
    setThemeLS(ThemeType.LIGHT);
    setCurrentTheme(ThemeType.LIGHT);
  };

  const onClickSetDarkHandler = () => {
    setThemeLS(ThemeType.DARK);
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

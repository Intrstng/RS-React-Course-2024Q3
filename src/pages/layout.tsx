import React, { CSSProperties, useContext } from 'react';
import type { ReactNode } from 'react';
import { ThemeControl } from '../components/ThemeControl/ThemeControl';
import { Search } from '../components/Search/Search';
import { ThemeContext } from '../contexts/Theme/Theme.context';
import S from '../styles/Layout.module.css'

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({children}) => {
  const {theme} = useContext(ThemeContext);
  return (
      <div
          className={S.app}
          style={{...(theme as CSSProperties)}}
          data-testid={'app'}
      >
        <ThemeControl/>
        <Search/>
        <main>{children}</main>
      </div>
  );
};

export default Layout;
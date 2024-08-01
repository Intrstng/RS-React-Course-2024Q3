import React, { CSSProperties, ReactNode, useContext } from 'react';
import { ThemeControl } from '../ThemeControl/ThemeControl';
import { Search } from '../Search/Search';
import { ThemeContext } from '../../contexts/Theme/Theme.context';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({children}) => {
  const { theme } = useContext(ThemeContext);
  return (
      <div
        className={'app'}
        style={{ ...(theme as CSSProperties) }}
        data-testid={'app'}
      >
        <ThemeControl/>
        <Search/>
        <main>{children}</main>
      </div>
  );
};

export default Layout;
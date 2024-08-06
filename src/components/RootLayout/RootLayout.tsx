import type { ReactNode } from 'react';
import React, { CSSProperties, useContext } from 'react';
import { ThemeContext } from '../../contexts/Theme/Theme.context';
import { Search } from '../Search/Search';
import { ThemeControl } from '../ThemeControl/ThemeControl';

export type LayoutProps = {
  children: ReactNode;
};

const RootLayout: React.FC<LayoutProps> = ({ children }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <div
      className={'app'}
      style={{ ...(theme as CSSProperties) }}
      data-testid={'app'}
    >
      <ThemeControl />
      <Search />
      <main>{children}</main>
    </div>
  );
};

export default RootLayout;

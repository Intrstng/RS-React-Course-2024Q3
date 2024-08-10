'use client'

import React, { CSSProperties, useContext } from 'react';
import { ThemeContext } from '../../contexts/Theme/Theme.context';
import { ThemeControl } from '../ThemeControl/ThemeControl';
import { Search } from '../Search/Search';

const Page = ({children}) => {
  const { theme } = useContext(ThemeContext);

  return (
      <div
          className={'app'}
          style={{ ...(theme as CSSProperties) }}
      >
        <ThemeControl />
        <Search />
        <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
        {children}
        </div>
      </div>
  );
};

export default Page;
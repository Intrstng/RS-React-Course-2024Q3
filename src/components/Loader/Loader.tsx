import React from 'react';
import loadSpinner from '../../assets/load-spinner-red.gif';
import S from './Loader.module.css';

export const Loader = () => {
  return (
    <div className={S.loader}>
      <img src={loadSpinner.src} alt={'loading'} />
      <p className={'loading'}>Loading...</p>
    </div>
  );
};

import React from 'react';
import loadSpinner from '../../assets/load-spinner.gif';
import S from './Loader.module.css';

export const Loader = () => {
  return (
    <div className={S.loader}>
      <img src={loadSpinner} alt={'loading'} />
      <p className={'loading'}>Loading...</p>
    </div>
  );
};

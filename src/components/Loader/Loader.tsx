import React from 'react';
import loadSpinner from '../../assets/load-spinner.gif';

export const Loader = () => {
  return (
    <>
      <img src={loadSpinner} alt={'loading'} />
      <p className={'loading'}>Loading...</p>
    </>
  );
};

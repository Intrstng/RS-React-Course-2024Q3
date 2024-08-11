import React from 'react';
import loadSpinner from '../../assets/load-spinner-red.gif';
import S from '../../styles/Loader.module.css';
import Image from 'next/image';

export const Loader = () => {
  return (
    <div className={S.loader}>
      <Image
        src={loadSpinner.src}
        alt={'loading'}
        width={230}
        height={230}
        unoptimized
      />
      <p className={'loading'}>Loading...</p>
    </div>
  );
};

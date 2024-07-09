import React from 'react';
import errorNotFound from '../../assets/error_404.png';
import S from './Error404.module.css';

export const Error404 = () => {
  return (
    <img className={S.error} src={errorNotFound} alt={'error not found'} />
  );
};

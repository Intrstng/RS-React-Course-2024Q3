import React from 'react';
import errorNotFound from '../../assets/error_404.png';
import S from './Error404.module.css';
import { useRouteError } from 'react-router-dom';

export const Error404 = () => {
  const error = useRouteError();
  console.error(error);
  return (
    <img className={S.error} src={errorNotFound} alt={'error not found'} />
  );
};

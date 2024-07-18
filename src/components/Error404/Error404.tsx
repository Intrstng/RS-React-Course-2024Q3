import React from 'react';
import errorNotFound from '../../assets/error_404.png';
import S from './Error404.module.css';
import { useNavigate, useRouteError } from 'react-router-dom';
import { Button } from '../Button';

export const Error404 = () => {
  const navigate = useNavigate();
  const error = useRouteError();
  console.error(error);

  const onClickRedirectHomeHandler = () => {
    navigate('/');
  };

  return (
    <>
      <img className={S.error} src={errorNotFound} alt={'error not found'} />
      <Button
        className={S.homeButton}
        onClickCallBack={onClickRedirectHomeHandler}
      >
        Home
      </Button>
    </>
  );
};

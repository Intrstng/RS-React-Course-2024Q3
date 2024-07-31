import React from 'react';
import errorNotFound from '../../assets/error_404.png';
import S from './Error404.module.css';
import { useRouter } from 'next/router';
import { Button } from '../Button';

export const Error404 = () => {
  const router = useRouter();

  const onClickRedirectHomeHandler = () => {
    router.push('/');
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

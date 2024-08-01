import React from 'react';
import errorNotFound from '../assets/error_404.png';
import S from '../components/Error404/Error404.module.css';
import { useRouter } from 'next/router';
import { Button } from '../components/Button';

const Custom404 = () => {
  const router = useRouter();

  const onClickRedirectHomeHandler = () => {
    router.push('/');
  };

  return (
    <>
      <img
        className={S.error}
        src={errorNotFound.src}
        alt={'error not found'}
      />
      <Button
        className={S.homeButton}
        onClickCallBack={onClickRedirectHomeHandler}
      >
        Home
      </Button>
    </>
  );
};

export default Custom404;

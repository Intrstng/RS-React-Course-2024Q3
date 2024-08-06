import React from 'react';
import errorNotFound from '../assets/error_404.png';
import S from '../styles/Error404.module.css';
import { useRouter } from 'next/router';
import { Button } from '../components/Button';
import Image from 'next/image';

const Custom404 = () => {
  const router = useRouter();

  const onClickRedirectHomeHandler = () => {
    router.push('/');
  };

  return (
    <>
      <Image
        className={S.error}
        src={errorNotFound.src}
        alt={'error not found'}
        width={1920}
        height={1068}
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

'use client';

import S from '../styles/ErrorBoundary.module.css';
import errorImg from '../assets/error-page.jpg';
import { Button } from '../components/Button';
import React from 'react';

export default function ErrorWrapper({ error }: { error: Error }) {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className={S.errorContainer}>
      <img src={errorImg.src} alt={'error'} className={S.errorImg} />
      <h2 className={S.error}>{error.message}</h2>
      <Button className={S.refreshButton} onClickCallBack={handleRefresh}>
        Refresh page
      </Button>
    </div>
  );
}

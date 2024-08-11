'use client';
import React, { useRef } from 'react';
import { Provider } from 'react-redux';
import { AppRootState, setupStore } from '../redux/store';

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppRootState>();
  if (!storeRef.current) {
    storeRef.current = setupStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}

'use client';
import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { LOCAL_STORAGE_SEARCH_KEY } from '../redux/slices/appSlice';
import { getInitValueFromLS } from '../components/Search/Search';

export default function App() {
  const router = useRouter();
  const pathname = usePathname();
  const [text] = useState<string>(getInitValueFromLS(LOCAL_STORAGE_SEARCH_KEY));

  useEffect(() => {
    if (pathname === '/') {
      text.length > 0
        ? router.replace(`/page/1?search=${text}`)
        : router.replace(`/page/1`);
    }
  }, [router]);

  return <h1>Welcome to RS School Next.js App Routing</h1>;
}

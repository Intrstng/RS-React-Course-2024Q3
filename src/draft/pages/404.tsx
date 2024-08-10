import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Error404 = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace('/error');
  }, []);

  return null;
};

export default Error404;

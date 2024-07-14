import { MutableRefObject, useEffect, useState } from 'react';

const useLocalStorage = (
  key: string,
  inputRef: MutableRefObject<HTMLInputElement | null>,
  initialValue: string = '',
) => {
  const [localStorageData, setLocalStorageData] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error reading from local storage', error);
      return initialValue;
    }
  });

  useEffect(() => {
    const textTrimmed = inputRef.current?.value.trim();
    localStorage.setItem(key, JSON.stringify(inputRef.current?.value.trim()));
    return () => {
      localStorage.setItem(key, JSON.stringify(textTrimmed));
    };
  }, [key, inputRef.current?.value]);

  return [localStorageData, setLocalStorageData] as const;
};

export default useLocalStorage;

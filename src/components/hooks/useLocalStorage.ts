import { useEffect, useState } from 'react';

export const useLocalStorage = (key: string, initialValue: string = '') => {
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
    try {
      localStorage.setItem(key, JSON.stringify(localStorageData.trim()));
    } catch (error) {
      console.error('Error saving to local storage', error);
    }
  }, [key, localStorageData]);

  return [localStorageData, setLocalStorageData] as const;
};

import {
  DependencyList,
  EffectCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

const useLocalStorageAdvanced = (key: string, initialValue: string = '') => {
  const [localStorageData, setLocalStorageData] = useState(() => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });

  function useMount(initRun: () => void) {
    const runRef = useRef(initRun);
    useEffect(() => {
      runRef.current();
    }, []);
  }

  const useUnMount = (
    effect: EffectCallback,
    dependencies?: DependencyList,
  ) => {
    const unMountedRef = useRef(false);

    useMount(() => {
      unMountedRef.current = false;
    });

    useEffect(() => {
      localStorage.setItem(key, JSON.stringify(localStorageData));
      return () => {
        unMountedRef.current = true;
      };
    }, []);

    useEffect(() => {
      localStorage.setItem(key, JSON.stringify(localStorageData));
    }, [key, localStorageData]);

    useEffect(
      () => () => {
        if (unMountedRef.current) {
          effect();
        }
      },
      [dependencies, effect],
    );
  };

  useMount(() => {
    console.log(
      'Component mounted with data from localStorage: ',
      localStorageData,
    );
  });

  useUnMount(() => {
    console.log(
      'Component unmounted with data saved to localStorage: ',
      localStorageData,
    );
    localStorage.setItem(key, JSON.stringify(localStorageData));
  }, [localStorageData]);

  return [localStorageData, setLocalStorageData] as const;
};

export default useLocalStorageAdvanced;

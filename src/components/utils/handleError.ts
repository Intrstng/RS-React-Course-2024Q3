import { SetStateApp } from '../../types/types';

export const handleError = (setState: SetStateApp, error: unknown): void => {
  if (error instanceof Error) {
    setState((prevState) => ({
      ...prevState,
      isLoading: false,
      error: error.message,
    }));
  } else {
    setState((prevState) => ({
      ...prevState,
      isLoading: false,
      error: 'An unexpected error occurred',
    }));
  }
};

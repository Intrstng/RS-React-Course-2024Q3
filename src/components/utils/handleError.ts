export const handleError = (
  setError: (error: string | null) => void,
  error: unknown,
): void => {
  if (error instanceof Error) {
    setError(error.message);
  } else {
    setError('An unexpected error occurred');
  }
};

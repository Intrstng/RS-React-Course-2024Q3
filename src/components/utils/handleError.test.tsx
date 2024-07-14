import { describe, test, expect, vi, beforeEach } from 'vitest';
import { handleError } from '../utils/handleError';

describe('handleError', () => {
  const setError = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('should set error message if error is an instance of Error', () => {
    const error = new Error('Test Error');
    handleError(setError, error);
    expect(setError).toHaveBeenCalledWith('Test Error');
  });

  test('should set a generic error message if error is not an instance of Error', () => {
    const error = 'Some error';
    handleError(setError, error);
    expect(setError).toHaveBeenCalledWith('An unexpected error occurred');
  });

  test('should set a generic error message if error is null or undefined', () => {
    handleError(setError, null);
    expect(setError).toHaveBeenCalledWith('An unexpected error occurred');
    handleError(setError, undefined);
    expect(setError).toHaveBeenCalledWith('An unexpected error occurred');
  });
});

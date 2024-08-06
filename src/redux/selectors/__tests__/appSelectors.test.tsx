import { describe, expect, test } from 'vitest';
import { statusSelector } from '../appSelectors';

const IS_LOADING = true;

describe('statusSelector', () => {
  test('should return true when state.app.isLoading is true', () => {
    const mockState = {
      app: {
        isLoading: IS_LOADING,
      },
    };

    const result = statusSelector(mockState);

    expect(result).toBe(IS_LOADING);
  });

  test('should return false when state.app.isLoading is false', () => {
    const mockState = {
      app: {
        isLoading: !IS_LOADING,
      },
    };

    const result = statusSelector(mockState);

    expect(result).toBe(!IS_LOADING);
  });
});

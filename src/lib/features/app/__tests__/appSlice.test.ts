import { describe, test, expect, beforeEach, afterEach } from 'vitest';
import { appReducer, appActions } from '../appSlice';

describe('appSlice', () => {
  const initialState = {
    search: '',
    isLoading: false,
    error: null,
    currentPage: 1,
    isToastifyOpen: true,
  };

  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  test('should handle initial state by invalid action', () => {
    expect(appReducer(initialState, { type: 'unknown' })).toEqual(initialState);
  });

  test('toggleIsToastifyOpen should toggle the isToastifyOpen state', () => {
    const newState = appReducer(
      initialState,
      appActions.toggleIsToastifyOpen(),
    );
    expect(newState.isToastifyOpen).toBe(!initialState.isToastifyOpen);

    const toggledState = appReducer(
      newState,
      appActions.toggleIsToastifyOpen(),
    );
    expect(toggledState.isToastifyOpen).toBe(initialState.isToastifyOpen);
  });

  test('showIsToastify should set isToastifyOpen to true', () => {
    const initialStateWithToastifyClosed = {
      ...initialState,
      isToastifyOpen: false,
    };
    const newState = appReducer(
      initialStateWithToastifyClosed,
      appActions.showIsToastify(),
    );
    expect(newState.isToastifyOpen).toBe(true);
  });

  test('should initialize search state to empty string if localStorage is empty', () => {
    const initializedState = appReducer(initialState, { type: 'unknown' });
    expect(initializedState.search).toEqual('');
  });
});

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

  test.skip('setAppSearch should set the search value', () => {
    const searchValue = 'New search value';
    const newState = appReducer(
      initialState,
      appActions.setAppSearch({ search: searchValue }),
    );
    expect(newState.search).toEqual(searchValue);
  });

  test.skip('setAppStatus should set the loading status', () => {
    const isLoading = true;
    const newState = appReducer(
      initialState,
      appActions.setAppStatus({ isLoading }),
    );
    expect(newState.isLoading).toBe(isLoading);
    expect();
  });

  test.skip('setAppError should set the error message', () => {
    const error = 'An error occurred';
    const newState = appReducer(
      initialState,
      appActions.setAppError({ error }),
    );
    expect(newState.error).toEqual(error);
  });

  test.skip('setAppError should clear the error message', () => {
    const errorState = { ...initialState, error: 'An error occurred' };
    const newState = appReducer(
      errorState,
      appActions.setAppError({ error: null }),
    );
    expect(newState.error).toBeNull();
  });

  test.skip('setAppCurrentPage should set the current page', () => {
    const currentPage = 2;
    const newState = appReducer(
      initialState,
      appActions.setAppCurrentPage({ currentPage }),
    );
    expect(newState.currentPage).toBe(currentPage);
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

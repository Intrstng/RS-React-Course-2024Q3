import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const LOCAL_STORAGE_SEARCH_KEY = 'searchValue';

const appSlice = createSlice({
  name: 'app',
  initialState: {
    search: localStorage.getItem(LOCAL_STORAGE_SEARCH_KEY)
      ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_SEARCH_KEY))
      : '',
    isLoading: false,
    error: null,
    currentPage: 1,
  } as AppInitialState,
  reducers: {
    setAppSearch(state, action: PayloadAction<{ search: string }>) {
      state.search = action.payload.search;
    },
    setAppStatus(state, action: PayloadAction<{ isLoading: boolean }>) {
      state.isLoading = action.payload.isLoading;
    },
    setAppError(state, action: PayloadAction<{ error: string | null }>) {
      state.error = action.payload.error;
    },
    setAppCurrentPage(state, action: PayloadAction<{ currentPage: number }>) {
      state.currentPage = action.payload.currentPage;
    },
  },
});

export type AppInitialState = {
  search: string;
  isLoading: boolean;
  error: string | null;
  currentPage: number;
};

export const appReducer = appSlice.reducer;
export const appActions = appSlice.actions;

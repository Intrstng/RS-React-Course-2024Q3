import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const LOCAL_STORAGE_SEARCH_KEY = 'searchValue';


const appSlice = createSlice({
  name: 'app',
  initialState: {
    isToastifyOpen: true,
  } as AppInitialState,
  reducers: {
    toggleIsToastifyOpen(state) {
      state.isToastifyOpen = !state.isToastifyOpen;
    },
    showIsToastify(state) {
      state.isToastifyOpen = true;
    },
  },
});

type AppInitialState = {
  isToastifyOpen: boolean;
};

export const appReducer = appSlice.reducer;
export const appActions = appSlice.actions;

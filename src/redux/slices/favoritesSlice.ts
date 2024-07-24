import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    favorites: [] as string[],
  },
  reducers: {
    addToFavorites(state, action: PayloadAction<{ cardId: string }>) {
      state.favorites.push(action.payload.cardId);
    },
    removeFromFavorites(state, action: PayloadAction<{ cardId: string }>) {
      const idx = state.favorites.findIndex(
        (c) => c.id === action.payload.cardId,
      );
      if (idx !== -1) {
        state.favorites.splice(idx, 1);
      }
    },
  },
});

export const favoritesReducer = favoritesSlice.reducer;
export const favoritesActions = favoritesSlice.actions;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { VehicleDetailsDomain } from '../../types/types';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    favorites: {} as FavoritesItems | object,
  },
  reducers: {
    toggleToFavorites(
      state,
      action: PayloadAction<{ cardId: string; cards: VehicleDetailsDomain[] }>,
    ) {
      if (action.payload.cardId in state.favorites) {
        delete state.favorites[action.payload.cardId];
      } else {
        const card = action.payload.cards.find(
          (c) => c.id === action.payload.cardId,
        );
        if (card) {
          state.favorites[action.payload.cardId] = { ...card };
        }
      }
    },
    clearFavorites(state) {
      Object.keys(state.favorites).forEach((key) => {
        delete state.favorites[key];
      });
    },
  },
});

export type FavoritesItems = {
  [key: string]: VehicleDetailsDomain;
};

export const favoritesReducer = favoritesSlice.reducer;
export const favoritesActions = favoritesSlice.actions;

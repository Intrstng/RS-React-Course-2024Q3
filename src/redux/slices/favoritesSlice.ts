import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DetailedVehicle, VehicleDetailsDomain } from '../../shared/types/types';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    favoriteCards: [] as VehicleDetailsDomain[],
  },
  reducers: {
    toggleCardToFavorites(
        state,
        action: PayloadAction<{ cardId: string | undefined; card: VehicleDetailsDomain }>,
    ) {
      if (!action.payload.cardId) {
        return;
      }

      const idx = state.favoriteCards.findIndex((c) => c.id === action.payload.cardId);

      if (idx === -1) {
        state.favoriteCards.push(action.payload.card);
      } else {
        state.favoriteCards.splice(idx, 1)
      }
    },

    clearFavorites(state) {
      state.favoriteCards = [];
    },
  },
});

export type FavoritesItems = {
  [key: string]: VehicleDetailsDomain;
};

export const favoritesReducer = favoritesSlice.reducer;
export const favoritesActions = favoritesSlice.actions;

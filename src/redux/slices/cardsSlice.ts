import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  Vehicle,
  VehicleDetails,
  VehicleDetailsDomain,
  VehiclesResponse,
} from '../../shared/types/types';
import { FavoritesItems } from './favoritesSlice';

const cardsSlice = createSlice({
  name: 'cards',
  initialState: {
    domainCards: {} as VehiclesResponse<VehicleDetailsDomain>,
  },
  reducers: {
    // setDomainCards(
    //   state,
    //   action: PayloadAction<{
    //     cards: VehiclesResponse<VehicleDetails> | undefined;
    //   }>,
    // ) {
    //   state.domainCards = {
    //     ...action.payload.cards,
    //     results: action.payload.cards?.results.map((card) => ({
    //       ...card,
    //       isChecked: false,
    //       id: card.url.split('/').slice(-2, -1)[0],
    //     })),
    //   };
    // },
    toggleDomainCardToFavorites(
      state,
      action: PayloadAction<{ cardId: string | undefined; isChecked: boolean }>,
    ) {
      const idx = state.domainCards.results.findIndex(
        (c) => c.id === action.payload.cardId,
      );
      if (idx !== -1) {
        state.domainCards.results[idx].isChecked = action.payload.isChecked;
      }
    },
    clearAllFromFavorites(state) {
      state.domainCards.results.forEach((card) => (card.isChecked = false));
    },
    restoreToFavorites(
      state,
      action: PayloadAction<{ favorites: FavoritesItems }>,
    ) {
      state.domainCards?.results?.forEach((card) => {
        Object.keys(action.payload.favorites).includes(card.id) &&
          (card.isChecked = true);
      });
    },
  },
});

export const cardsReducer = cardsSlice.reducer;
export const cardsActions = cardsSlice.actions;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  VehicleDetails,
  VehicleDetailsDomain,
  VehiclesResponse,
} from '../../types/types';

const cardsSlice = createSlice({
  name: 'cards',
  initialState: {
    domainCards: {} as VehiclesResponse<VehicleDetailsDomain>,
  },
  reducers: {
    setDomainCards(
      state,
      action: PayloadAction<{ cards: VehiclesResponse<VehicleDetails> }>,
    ) {
      state.domainCards = {
        ...action.payload.cards,
        results: action.payload.cards?.results.map((card) => ({
          ...card,
          isChecked: false,
          id: card.url.split('/').slice(-2, -1)[0],
        })),
      };
    },
    toggleDomainCardToFavorites(
      state,
      action: PayloadAction<{ cardId: string; isChecked: boolean }>,
    ) {
      const idx = state.domainCards.results.findIndex(
        (c) => c.id === action.payload.cardId,
      );
      if (idx !== -1) {
        state.domainCards.results[idx].isChecked = action.payload.isChecked;
      }
    },
  },
});

export const cardsReducer = cardsSlice.reducer;
export const cardsActions = cardsSlice.actions;

import { describe, test, expect } from 'vitest';
import {
  favoritesReducer,
  favoritesActions,
  FavoritesItems,
} from '../favoritesSlice';
import { VehicleDetailsDomain } from '../../../shared/types/types';
import { mockCards, mockFavoritesCars } from '../../../test/mockData';

describe('favoritesSlice', () => {
  const initialState = {
    favorites: {} as FavoritesItems,
  };

  test('should handle initial state by invalid action', () => {
    expect(favoritesReducer(initialState, { type: 'unknown' })).toEqual(
      initialState,
    );
  });

  test.skip('toggleToFavorites should add a card to favorites if not already present', () => {
    const cardId = mockCards[0].id;
    const cards: VehicleDetailsDomain[] = mockCards;

    const newState = favoritesReducer(
      initialState,
      favoritesActions.toggleToFavorites({ cardId, cards }),
    );
    expect(newState.favorites).toHaveProperty(cardId);
  });

  test.skip('toggleToFavorites should remove a card from favorites if already present', () => {
    const cardId = mockCards[0].id;
    const cards: VehicleDetailsDomain[] = mockCards;

    const stateWithFavorites = {
      favorites: mockFavoritesCars,
    };

    const newState = favoritesReducer(
      stateWithFavorites,
      favoritesActions.toggleToFavorites({ cardId, cards }),
    );
    expect(newState.favorites).not.toHaveProperty(cardId);
  });

  test.skip('clearFavorites should remove all favorites', () => {
    const stateWithFavorites = {
      favorites: mockFavoritesCars,
    };

    const newState = favoritesReducer(
      stateWithFavorites,
      favoritesActions.clearFavorites(),
    );
    expect(newState.favorites).toEqual({});
  });
});

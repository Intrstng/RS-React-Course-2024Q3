import { describe, expect, test } from 'vitest';
import { favoritesActions, favoritesReducer } from '../../favoritesSlice';
import { VehicleDetailsDomain } from '../../../../../shared/types/types';
import { mockCards } from '../../../../../mocks/mockData';

describe('favoritesSlice', () => {
  const initialState = {
    favoriteCards: [] as VehicleDetailsDomain[],
  };

  test('should handle initial state by invalid action', () => {
    expect(favoritesReducer(initialState, { type: 'brokenAction' })).toEqual(
      initialState,
    );
  });

  test('toggleCardToFavorites should return the state unchanged if cardId is undefined', () => {
    const initialState = {
      favoriteCards: [] as VehicleDetailsDomain[],
    };

    const card: VehicleDetailsDomain = mockCards[0];
    const action = favoritesActions.toggleCardToFavorites({
      cardId: undefined,
      card,
    });
    const newState = favoritesReducer(initialState, action);

    expect(newState).toEqual(initialState);
  });

  test('toggleCardToFavorites should add a card to favoriteCards if not already present', () => {
    const cardId = '1';
    const card: VehicleDetailsDomain = mockCards[0];

    const newState = favoritesReducer(
      initialState,
      favoritesActions.toggleCardToFavorites({ cardId, card }),
    );
    expect(newState.favoriteCards).toContainEqual(card);
  });

  test('toggleCardToFavorites should remove a card from favoriteCards if already present', () => {
    const cardId = mockCards[0].id;
    const card: VehicleDetailsDomain = mockCards[0];

    const stateWithFavorites = {
      favoriteCards: mockCards,
    };

    const newState = favoritesReducer(
      stateWithFavorites,
      favoritesActions.toggleCardToFavorites({ cardId, card }),
    );
    expect(newState.favoriteCards).not.toContainEqual(card);
  });

  test('clearFavorites should remove all favorites', () => {
    const stateWithFavorites = {
      favoriteCards: mockCards,
    };

    const newState = favoritesReducer(
      stateWithFavorites,
      favoritesActions.clearFavorites(),
    );
    expect(newState.favoriteCards).toEqual([]);
  });
});

import { describe, test, expect } from 'vitest';
import { cardsReducer, cardsActions } from '../cardsSlice';
import {
  VehicleDetails,
  VehicleDetailsDomain,
  VehiclesResponse,
} from '../../../shared/types/types';
import { FavoritesItems } from '../favoritesSlice';
import { mockCardsInit } from '../../../test/mockData';

const CARD_ID = '20';

describe('cardsSlice', () => {
  const initialState = {
    domainCards: {
      results: [],
    } as VehiclesResponse<VehicleDetailsDomain>,
  };

  const sampleCardDomain: VehicleDetailsDomain = {
    ...mockCardsInit[0],
    isChecked: false,
    id: CARD_ID,
  };

  test.skip('setDomainCards should set domain cards with isChecked and id', () => {
    const cards: VehiclesResponse<VehicleDetails> = {
      count: 1,
      next: '',
      previous: '',
      results: mockCardsInit,
    };

    const actual = cardsReducer(
      initialState,
      cardsActions.setDomainCards({ cards }),
    );
    expect(actual.domainCards.results).toHaveLength(2);
    expect(actual.domainCards.results[0]).toEqual(sampleCardDomain);
  });

  test('toggleDomainCardToFavorites should toggle the isChecked status of a card', () => {
    const initialStateWithCards = {
      domainCards: {
        count: 1,
        next: '',
        previous: '',
        results: [sampleCardDomain],
      },
    };

    const actual = cardsReducer(
      initialStateWithCards,
      cardsActions.toggleDomainCardToFavorites({
        cardId: CARD_ID,
        isChecked: true,
      }),
    );
    expect(actual.domainCards.results[0].isChecked).toBe(true);

    const toggledState = cardsReducer(
      actual,
      cardsActions.toggleDomainCardToFavorites({
        cardId: CARD_ID,
        isChecked: false,
      }),
    );
    expect(toggledState.domainCards.results[0].isChecked).toBe(false);
  });

  test('clearAllFromFavorites should set isChecked to false for all cards', () => {
    const initialStateWithCheckedCards = {
      domainCards: {
        count: 1,
        next: '',
        previous: '',
        results: [{ ...sampleCardDomain, isChecked: true }],
      },
    };

    const actual = cardsReducer(
      initialStateWithCheckedCards,
      cardsActions.clearAllFromFavorites(),
    );
    expect(actual.domainCards.results[0].isChecked).toBe(false);
  });

  test('restoreToFavorites should set isChecked to true for cards present in favorites', () => {
    const favorites: FavoritesItems = {
      [CARD_ID]: sampleCardDomain,
    };

    const actual = cardsReducer(
      initialState,
      cardsActions.restoreToFavorites({ favorites }),
    );
    expect(actual.domainCards.results).toEqual([]);

    const initialStateWithCards = {
      domainCards: {
        count: 1,
        next: '',
        previous: '',
        results: [sampleCardDomain],
      },
    };
    const restoredState = cardsReducer(
      initialStateWithCards,
      cardsActions.restoreToFavorites({ favorites }),
    );
    expect(restoredState.domainCards.results[0].isChecked).toBe(true);
  });
});

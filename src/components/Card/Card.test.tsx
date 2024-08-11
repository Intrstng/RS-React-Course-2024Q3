import React from 'react';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { Card } from './Card';
import { mockCards } from '../../test/mockData';
import { ThemeType } from '../../contexts/Theme/Theme.model';
import { ThemeProvider } from '../../contexts/Theme/Theme.context';
import { THEMES } from '../../contexts/Theme/Theme.config';
import { appActions, appReducer } from '../../redux/slices/appSlice';
import { favoritesActions, favoritesReducer } from '../../redux/slices/favoritesSlice';
import { useParams, useSearchParams } from 'next/navigation';

const PAGE_ID = 1;
const CARD_ID = '4';
const QUERY_PARAMETER = 'test';

const initialState = {
  app: {
    isToastifyOpen: true,
  },
  favorites: {
    favoriteCards: mockCards,
  },
};

const store = configureStore({
  reducer: {
    app: appReducer,
    favorites: favoritesReducer,
  },
  preloadedState: initialState,
});

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
  usePathname: vi.fn(),
  useSearchParams: vi.fn(),
  useParams: vi.fn(),
}));

describe('Card Component', () => {
  beforeEach(() => {
    (useSearchParams as vi.Mock).mockReturnValue(new URLSearchParams({search: QUERY_PARAMETER}));
    (useParams as vi.Mock).mockReturnValue({id: PAGE_ID});
  });

  test('should render the relevant card data', () => {
    const themeContextValue = {
      themeType: ThemeType.LIGHT,
      theme: THEMES[ThemeType.LIGHT],
      setCurrentTheme: () => {},
    };
    render(
        <ThemeProvider value={themeContextValue}>
          <Provider store={store}>
            <Card card={mockCards[0]} pageId={PAGE_ID} cardId={CARD_ID} />
          </Provider>
        </ThemeProvider>,
    );

    const cardTitle = screen.getByText(mockCards[0].name);
    expect(cardTitle).toBeVisible();
  });

  test('dispatches the correct actions on input change', async () => {
    const dispatchSpy = vi.spyOn(store, 'dispatch');

    render(
        <Provider store={store}>
          <ThemeProvider
              value={{
                themeType: ThemeType.LIGHT,
                theme: THEMES[ThemeType.LIGHT],
                setCurrentTheme: () => {},
              }}
          >
            <Card card={mockCards[0]} pageId={PAGE_ID} cardId={CARD_ID}/>
          </ThemeProvider>
        </Provider>
    );

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    await waitFor(() => {
      expect(dispatchSpy).toHaveBeenCalledTimes(2);
      expect(dispatchSpy).toHaveBeenCalledWith(
          favoritesActions.toggleCardToFavorites({cardId: CARD_ID, card: mockCards[0]})
      );
      expect(dispatchSpy).toHaveBeenCalledWith(appActions.showIsToastify());
    });

    dispatchSpy.mockRestore();
  });
});
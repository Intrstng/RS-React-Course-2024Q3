import React from 'react';
import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Card } from './Card';
import '@testing-library/jest-dom';
import { mockCards } from '../../test/mockData';
import { Provider } from 'react-redux';
import { setupStore } from '../../redux/store';
import { ThemeType } from '../../contexts/Theme/Theme.model';
import { ThemeProvider } from '../../contexts/Theme/Theme.context';
import { THEMES } from '../../contexts/Theme/Theme.config';

const MOCK_ID = '1';

describe('Card Component', () => {
  test.skip('should render the relevant card data', () => {
    const themeContextValue = {
      themeType: ThemeType.LIGHT,
      theme: THEMES[ThemeType.LIGHT],
      setCurrentTheme: () => {},
    };
    render(
      <ThemeProvider value={themeContextValue}>
        <Provider store={setupStore()}>
          <BrowserRouter>
            <Card card={mockCards[0]} cardId={MOCK_ID} isChecked={false} />
          </BrowserRouter>
        </Provider>
      </ThemeProvider>,
    );

    const cardTitle = screen.getByText(mockCards[0].name);
    expect(cardTitle).toBeVisible();
  });
});

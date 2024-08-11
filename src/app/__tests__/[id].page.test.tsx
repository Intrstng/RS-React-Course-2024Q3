import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import CardList from '../page/[id]/page';
import * as cardService from '../../../src/services/getCards';
import { setupStore } from '../../redux/store';
import { useParams, useSearchParams } from 'next/navigation';
import { mockCardsInit } from '../../test/mockData';

const PAGE_ID = '1';
const QUERY_PARAMETER = 'test';

vi.mock('../../../src/services/getCards', () => ({
  getCards: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
  useParams: vi.fn(),
  useSearchParams: vi.fn(),
  usePathname: vi.fn(),
}));

describe('CardList', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (useSearchParams as vi.Mock).mockReturnValue(new URLSearchParams({ search: QUERY_PARAMETER }));
    (useParams as vi.Mock).mockReturnValue({ id: PAGE_ID });
  });

  test('renders the list of cards', async () => {
    const params = { id: PAGE_ID };
    const searchParams = { card: '' };

    vi.spyOn(cardService, 'getCards').mockResolvedValue({
      count: 2,
      next: '',
      previous: '',
      results: mockCardsInit
    });

    await render(
        <Provider store={setupStore()}>
          {await CardList ({
          params,
          searchParams
        })}
        </Provider>
    );

    const card1 = await screen.findByText(mockCardsInit[0].name);
    const card2 = await screen.findByText(mockCardsInit[1].name);
    expect(card1).toBeInTheDocument();
    expect(card2).toBeInTheDocument();
  });

  test('renders no results message when no cards found', async () => {
    const params = { id: PAGE_ID };
    const searchParams = { card: '' };

    vi.spyOn(cardService, 'getCards').mockResolvedValue({
      count: 0,
      next: '',
      previous: '',
      results: [],
    });

    await render(
        <Provider store={setupStore()}>
          {await CardList ({
            params,
            searchParams
          })}
        </Provider>
    );

    const noResultsMessage = await screen.findByText(
        /no results were found for your request/i
    );
    expect(noResultsMessage).toBeInTheDocument();
  });
});
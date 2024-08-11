import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Detailed from './Detailed';
import { getCardDetails } from '../../services/getCards';
import { useRouter } from 'next/navigation';
import { mockCards } from '../../test/mockData';

const PAGE_ID = '1';
const CARD_ID = '4';

vi.mock('../../services/getCards', () => ({
  getCardDetails: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

describe('Detailed Component', () => {
  it('should render the DetailedCard component with correct props', async () => {
    const mockResponse = mockCards[0];

    (getCardDetails as vi.Mock).mockResolvedValue(mockResponse);

    const mockPush = vi.fn();
    (useRouter as vi.Mock).mockReturnValue({
      push: mockPush,
      pathname: '/',
      query: {},
      asPath: '/',
      route: '/',
    });

    const params = { id: PAGE_ID };
    const searchParams = { card: CARD_ID };

    render(
      await Detailed({
        params,
        searchParams,
      }),
    );

    await waitFor(() => {
      expect(screen.getByText(mockCards[0].model)).toBeInTheDocument();
    });

    expect(getCardDetails).toHaveBeenCalledWith(CARD_ID);
  });
});

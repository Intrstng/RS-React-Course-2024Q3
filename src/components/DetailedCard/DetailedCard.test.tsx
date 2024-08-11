import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { useRouter } from 'next/navigation';
import { DetailedCard } from './DetailedCard';
import { mockDetailedVehicle } from '../../test/mockData';

const PAGE_ID = '1';
const CARD_ID = '4';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

describe('DetailedCard', () => {
  const detailsData = mockDetailedVehicle[0];

  const params = {
    id: PAGE_ID,
  };

  const searchParams = {
    card: CARD_ID,
    search: mockDetailedVehicle[0].name,
  };

  test('renders detailed card data correctly', () => {
    useRouter.mockReturnValue({
      push: vi.fn(),
    });

    render(
      <DetailedCard
        detailsData={detailsData}
        params={params}
        searchParams={searchParams}
      />,
    );

    expect(screen.getByText(`${detailsData.model}`)).toBeInTheDocument();
    expect(screen.getByText(`${detailsData.manufacturer}`)).toBeInTheDocument();
    expect(screen.getByText(`${detailsData.length}`)).toBeInTheDocument();
    expect(screen.getByText(`${detailsData.crew}`)).toBeInTheDocument();
    expect(screen.getByText(`${detailsData.passengers}`)).toBeInTheDocument();
    expect(screen.getByText(`${detailsData.consumables}`)).toBeInTheDocument();
  });

  test('renders error message if detailed card data not loaded', () => {
    useRouter.mockReturnValue({
      push: vi.fn(),
    });

    const detailsData = undefined;

    render(
      <DetailedCard
        detailsData={detailsData}
        params={params}
        searchParams={searchParams}
      />,
    );

    expect(
      screen.getByText(/error loading detailed cards/i),
    ).toBeInTheDocument();
  });

  test('handles form submit and redirects correctly', () => {
    const pushMock = vi.fn();
    useRouter.mockReturnValue({
      push: pushMock,
    });

    render(
      <DetailedCard
        detailsData={detailsData}
        params={params}
        searchParams={searchParams}
      />,
    );

    const closeButton = screen.getByText('Close');
    fireEvent.click(closeButton);

    expect(pushMock).toHaveBeenCalledWith(
      `/page/${params.id}?search=${searchParams.search}`,
    );
  });

  test('handles click outside and redirects correctly', () => {
    const pushMock = vi.fn();
    useRouter.mockReturnValue({
      push: pushMock,
    });

    render(
      <DetailedCard
        detailsData={detailsData}
        params={params}
        searchParams={searchParams}
      />,
    );

    fireEvent.mouseDown(document);

    expect(pushMock).toHaveBeenCalledWith(
      `/page/${params.id}?search=${searchParams.search}`,
    );
  });
});

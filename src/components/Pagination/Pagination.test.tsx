import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Pagination } from './Pagination';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { describe, expect, test, vi } from 'vitest';

const PAGE_ID = 2;
const QUERY_PARAMETER = 'testQuery';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
  usePathname: vi.fn(),
  useParams: vi.fn(),
  useSearchParams: vi.fn(),
}));

(useRouter as vi.Mock).mockReturnValue({
  push: vi.fn(),
});

(useParams as vi.Mock).mockReturnValue({
  id: PAGE_ID,
});

(useSearchParams as vi.Mock).mockReturnValue({
  get: vi.fn().mockReturnValue('searchValue'),
});

describe('Pagination Component', () => {
  test('renders the Pagination component with correct page number', () => {
    render(<Pagination cardsCount={20} />);
    expect(screen.getByText(PAGE_ID)).toBeInTheDocument();
  });

  test('disables the Prev button on the first page', () => {
    (useParams as vi.Mock).mockReturnValue({
      id: '1',
    });
    render(<Pagination cardsCount={20} />);
    const prevButton = screen.getByText('Prev');
    expect(prevButton).toBeDisabled();
  });

  test('disables the Next button on the last page', () => {
    render(<Pagination cardsCount={10} />);
    const nextButton = screen.getByText('Next');
    expect(nextButton).toBeDisabled();
  });

  test('should render correctly and navigate to the next and previous pages', () => {
    const mockPush = vi.fn();

    (useRouter as vi.Mock).mockReturnValue({
      push: mockPush,
    });

    (useParams as vi.Mock).mockReturnValue({ id: PAGE_ID });

    (useSearchParams as vi.Mock).mockReturnValue(
      new URLSearchParams(`search=${QUERY_PARAMETER}`),
    );

    render(<Pagination cardsCount={30} />);

    expect(screen.getByText(PAGE_ID)).toBeInTheDocument();

    fireEvent.click(screen.getByText('Next'));

    expect(mockPush).toHaveBeenCalledWith(
      `/page/${PAGE_ID + 1}?search=${QUERY_PARAMETER}`,
    );

    fireEvent.click(screen.getByText('Prev'));

    expect(mockPush).toHaveBeenCalledWith(
      `/page/${PAGE_ID - 1}?search=${QUERY_PARAMETER}`,
    );
  });

  test('should disable the Prev button on the first page', () => {
    (useParams as vi.Mock).mockReturnValue({ id: '1' });

    (useSearchParams as vi.Mock).mockReturnValue(
      new URLSearchParams(`search=${QUERY_PARAMETER}`),
    );

    render(<Pagination cardsCount={30} />);

    expect(screen.getByText('Prev')).toBeDisabled();
  });

  test('should disable the Next button on the last page', () => {
    (useParams as vi.Mock).mockReturnValue({ id: '3' });

    (useSearchParams as vi.Mock).mockReturnValue(
      new URLSearchParams(`search=${QUERY_PARAMETER}`),
    );

    render(<Pagination cardsCount={30} />);

    expect(screen.getByText('Next')).toBeDisabled();
  });
});

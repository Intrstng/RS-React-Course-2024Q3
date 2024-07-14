import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { Pagination } from './Pagination';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

let START_PAGE: number;
const TOTAL_PAGES = 7;

describe('Pagination', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test('should update the URL when the next button is clicked', () => {
    START_PAGE = 1;
    render(<Pagination currentPage={START_PAGE} pagesCount={TOTAL_PAGES} />);

    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);

    expect(mockNavigate).toHaveBeenCalledWith(`/page/${START_PAGE + 1}`);
  });

  test('should update the URL when the prev button is clicked', () => {
    START_PAGE = 2;
    render(<Pagination currentPage={START_PAGE} pagesCount={TOTAL_PAGES} />);

    const prevButton = screen.getByText('Prev');
    fireEvent.click(prevButton);

    expect(mockNavigate).toHaveBeenCalledWith(`/page/${START_PAGE - 1}`);
  });

  test('should disable the prev button on the first page', () => {
    START_PAGE = 1;
    render(<Pagination currentPage={START_PAGE} pagesCount={TOTAL_PAGES} />);

    const prevButton = screen.getByText('Prev');
    expect(prevButton).toBeDisabled();
  });

  test('should disable the next button on the last page', () => {
    START_PAGE = TOTAL_PAGES;
    render(<Pagination currentPage={START_PAGE} pagesCount={TOTAL_PAGES} />);

    const nextButton = screen.getByText('Next');
    expect(nextButton).toBeDisabled();
  });

  test('should enable both buttons when not on the first or last page', () => {
    START_PAGE = 3;
    render(<Pagination currentPage={START_PAGE} pagesCount={TOTAL_PAGES} />);

    const prevButton = screen.getByText('Prev');
    const nextButton = screen.getByText('Next');

    expect(prevButton).not.toBeDisabled();
    expect(nextButton).not.toBeDisabled();
  });
});

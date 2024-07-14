import React from 'react';
import { expect, test, describe, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Card } from './Card';
import '@testing-library/jest-dom';
import { mockCards } from '../../test/mockData';
import { DetailsPage } from '../DetailsPage/DetailsPage';
import { getVehicleDetails } from '../bll/vehiclesThunks';

const MOCK_ID = 1;

vi.mock('../bll/vehiclesThunks', () => ({
  getVehicleDetails: vi.fn(),
}));

describe('Card Component', () => {
  test('should render the relevant card data', () => {
    render(
      <BrowserRouter>
        <Card card={mockCards[0]} id={MOCK_ID} />
      </BrowserRouter>,
    );

    const cardTitle = screen.getByText(mockCards[0].name);
    expect(cardTitle).toBeVisible();
  });

  test('should trigger an additional API call to fetch detailed information on click', async () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Card card={mockCards[0]} id={MOCK_ID} />} />
          <Route path="card/:cardId" element={<DetailsPage />} />
        </Routes>
      </BrowserRouter>,
    );

    const cardLink = screen.getByRole('link');
    fireEvent.click(cardLink);

    await waitFor(() => {
      expect(getVehicleDetails).toHaveBeenCalledTimes(1);
    });
  });

  test('should navigate to detailed card component on click', async () => {
    render(
      <BrowserRouter>
        <Card card={mockCards[0]} id={MOCK_ID} />
      </BrowserRouter>,
    );

    const cardLink = screen.getByRole('link');
    fireEvent.click(cardLink);

    await waitFor(() => {
      expect(window.location.pathname).toBe(`/card/${MOCK_ID}`);
    });
  });
});

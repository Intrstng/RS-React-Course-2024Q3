import React from 'react';
import { expect, test, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter, Outlet, Routes, Route } from 'react-router-dom';
import { CardList } from './CardList';
import '@testing-library/jest-dom';
import { VehicleDetails } from '../../shared/types/types';
import { ReactNode } from 'react';
import { mockCards } from '../../test/mockData';

const MockOutletContext = ({
  children,
  cards,
}: {
  children: ReactNode;
  cards: VehicleDetails[];
}) => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Outlet context={{ cards }} />}>
        <Route index element={children} />
      </Route>
    </Routes>
  </BrowserRouter>
);

describe('CardList Component', () => {
  test('should render the specified number of cards', () => {
    render(
      <MockOutletContext cards={mockCards}>
        <CardList />
      </MockOutletContext>,
    );

    const cards = screen.getAllByRole('listitem');
    expect(cards).toHaveLength(mockCards.length);
  });

  test('should display no results message if no cards are present', () => {
    render(
      <MockOutletContext cards={[]}>
        <CardList />
      </MockOutletContext>,
    );

    const message = screen.getByText(
      /No results were found for your request.../i,
    );
    expect(message).toBeVisible();
  });
});

import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { DetailedCard } from './DetailedCard';
import { getVehicleDetails } from '../bll/vehiclesThunks';
import { mockCards } from '../../test/mockData';

vi.mock('../bll/vehiclesThunks', () => ({
  getVehicleDetails: vi.fn(),
}));

const CURRENT_PAGE = '1';
const CURRENT_CARD = '1';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useParams: () => ({ pageId: CURRENT_PAGE, cardId: CURRENT_CARD }),
}));

describe('DetailedCard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should display a loading indicator while fetching data', () => {
    (getVehicleDetails as vi.Mock).mockImplementationOnce(
      (setCardDetails, setIsLoading) => {
        setIsLoading(true);
      },
    );

    render(<DetailedCard />);

    const imgElement = screen.getByAltText('loading');
    expect(imgElement).toBeInTheDocument();
    const textElement = screen.getByText('Loading...');
    expect(textElement).toBeInTheDocument();
  });

  it('should correctly display the detailed card data', async () => {
    (getVehicleDetails as vi.Mock).mockImplementationOnce(
      (setCardDetails, setIsLoading) => {
        setCardDetails(mockCards[0]);
        setIsLoading(false);
      },
    );

    render(<DetailedCard />);

    await waitFor(() => {
      expect(screen.getByText(/Model:/)).toHaveTextContent(
        `Model: ${mockCards[0].model}`,
      );
      expect(screen.getByText(/Manufacturer:/)).toHaveTextContent(
        `Manufacturer: ${mockCards[0].manufacturer}`,
      );
      expect(screen.getByText(/Length:/)).toHaveTextContent(
        `Length: ${mockCards[0].length}`,
      );
      expect(screen.getByText(/Crew:/)).toHaveTextContent(
        `Crew: ${mockCards[0].crew}`,
      );
      expect(screen.getByText(/Passengers:/)).toHaveTextContent(
        `Passengers: ${mockCards[0].passengers}`,
      );
      expect(screen.getByText(/Consumables:/)).toHaveTextContent(
        `Consumables: ${mockCards[0].consumables}`,
      );
    });
  });

  it('should hide the component by clicking the close button', async () => {
    (getVehicleDetails as vi.Mock).mockImplementationOnce(
      (setCardDetails, setIsLoading) => {
        setCardDetails(mockCards[0]);
        setIsLoading(false);
      },
    );

    render(<DetailedCard />);

    await waitFor(() => {
      expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
    });

    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);

    expect(mockNavigate).toHaveBeenCalledWith(`/page/${CURRENT_PAGE}`);
  });
});

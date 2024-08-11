import { describe, expect, test, vi } from 'vitest';
import { VehicleDetails, VehiclesResponse } from '../shared/types/types';
import { getCardDetails, getCards } from './getCards';
import { mockCards } from '../test/mockData';

describe('API functions', () => {
  describe('getCards', () => {
    test('should return a VehiclesResponse object with VehicleDetails array', async () => {
      const mockResponse: VehiclesResponse<VehicleDetails> = {
        count: 2,
        next: '',
        previous: null,
        results: mockCards
      };

      vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: true,
        json: async () => mockResponse
      } as Response);

      const cardsResponse = await getCards({ search: 'Sand Crawler' });
      expect(cardsResponse).toEqual(mockResponse);
    });

    test('should throw an error if fetch fails', async () => {
      vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: false,
        statusText: 'Internal Server Error'
      } as Response);

      await expect(getCards({ search: 'Sand Crawler' })).rejects.toThrow('Unable to fetch cards.');
    });
  });

  describe('getCardDetails', () => {
    test('should return a DetailedVehicle object', async () => {
      const mockResponse = mockCards[0];

      vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: true,
        json: async () => mockResponse
      } as Response);

      const cardDetails = await getCardDetails('4');
      expect(cardDetails).toEqual(mockResponse);
    });

    test('should return undefined if no ID is provided', async () => {
      const cardDetails = await getCardDetails();
      expect(cardDetails).toBeUndefined();
    });

    test('should throw an error if fetch fails', async () => {
      vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: false,
        statusText: 'Not Found'
      } as Response);

      await expect(getCardDetails('4')).rejects.toThrow('Unable to card Details.');
    });
  });
});
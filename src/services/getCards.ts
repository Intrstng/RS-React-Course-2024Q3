import { DetailedVehicle, VehicleDetails, VehicleDetailsDomain, VehiclesResponse } from '../shared/types/types';

type GetCardsParams = {
  search?: string;
  page?: number;
}

export const getCards = async ({ search = '', page = 1 }: GetCardsParams): Promise<VehiclesResponse<VehicleDetails>> => {
  const response = await fetch(`https://swapi.dev/api/vehicles/?search=${search}&page=${page}`);

  if (!response.ok) throw new Error('Unable to fetch cards.');

  return response.json();
};


export const getCardDetails = async (id: string): Promise<DetailedVehicle> => {
  const response = await fetch(
      `https://swapi.dev/api/vehicles/${id}/`,
      { headers: { 'Content-type': 'application/json' } }
  );

  if (!response.ok) throw new Error('Unable to card Details.');

  return response.json();
}

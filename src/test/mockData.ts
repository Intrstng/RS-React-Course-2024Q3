import { VehicleDetails, VehiclesResponse } from '../shared/types/types';

export const mockCards: VehicleDetails[] = [
  {
    name: 'Storm IV Twin-Pod cloud car',
    model: 'Storm IV Twin-Pod',
    manufacturer: 'Bespin Motors',
    vehicleClass: 'repulsorcraft',
    length: '7',
    crew: '2',
    passengers: '0',
    maxAtmospheringSpeed: '1500',
    cargoCapacity: '10',
    consumables: '1 day',
    cost_in_credits: '75000',
    pilots: [],
    films: ['https://swapi.dev/api/films/2/'],
    created: new Date(),
    edited: new Date(),
    url: 'https://swapi.dev/api/vehicles/20/',
  },
  {
    name: 'AT-ST',
    model: 'All Terrain Scout Transport',
    manufacturer: 'Kuat Drive Yards, Imperial Department of Military Research',
    vehicleClass: 'walker',
    length: '2',
    crew: '2',
    passengers: '0',
    maxAtmospheringSpeed: '90',
    cargoCapacity: '200',
    consumables: 'none',
    cost_in_credits: 'unknown',
    pilots: ['https://swapi.dev/api/people/13/'],
    films: ['https://swapi.dev/api/films/2/', 'https://swapi.dev/api/films/3/'],
    created: new Date(),
    edited: new Date(),
    url: 'https://swapi.dev/api/vehicles/19/',
  },
];

export const mockResponse: VehiclesResponse<VehicleDetails> = {
  results: [
    {
      cost_in_credits: 'string',
      pilots: ['string'],
      films: ['string'],
      created: new Date(),
      edited: new Date(),
      url: 'string',
    } as VehicleDetails,
  ],
  count: 1,
  next: 'string',
  previous: 'string',
};

import { VehicleDetailsDomain } from '../types/types';

export const refineFavoritesItemsStructureToCSV = (
  data: VehicleDetailsDomain[],
) => {
  return data.map((card) => {
    return {
      ...card,
      manufacturer: card.manufacturer.replace(/,/g, ' -'),
      films: card.films.join('  '),
      pilots: card.pilots.join('  '),
    };
  });
};

export type RefineFavoritesItemsStructureToCSV = ReturnType<
  typeof refineFavoritesItemsStructureToCSV
>;

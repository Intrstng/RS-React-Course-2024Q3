import { FavoritesItems } from '../../redux/slices/favoritesSlice';

export const refineFavoritesItemsStructureToCSV = (data: FavoritesItems) => {
  const selectedCardIdArray = Object.keys(data);
  const selectedCards = selectedCardIdArray.map((cardId) => data[cardId]);
  return selectedCards.map((card) => {
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

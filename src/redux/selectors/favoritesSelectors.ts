import { AppRootState } from '../store';
import { FavoritesItems } from '../slices/favoritesSlice';
import { VehicleDetailsDomain } from '../../shared/types/types';

export const favoriteCardsSelector = (state: AppRootState): VehicleDetailsDomain[] =>
    state.favorites.favoriteCards;

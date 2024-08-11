import { AppRootState } from '../store';
import { FavoritesItems } from '../slices/favoritesSlice';

export const favoriteCardsSelector = (state: AppRootState): FavoritesItems =>
    state.favorites.favoriteCards;

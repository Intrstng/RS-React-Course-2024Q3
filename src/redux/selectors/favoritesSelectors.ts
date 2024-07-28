import { AppRootState } from '../store';
import { FavoritesItems } from '../slices/favoritesSlice';

export const favoritesSelector = (state: AppRootState): FavoritesItems =>
  state.favorites.favorites;

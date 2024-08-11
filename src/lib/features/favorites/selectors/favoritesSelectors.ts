import { AppRootState } from '../../../store';
import { VehicleDetailsDomain } from '../../../../shared/types/types';

export const favoriteCardsSelector = (
  state: AppRootState,
): VehicleDetailsDomain[] => state.favorites.favoriteCards;

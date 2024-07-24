import { AppRootState } from '../store';
import { VehicleDetailsDomain, VehiclesResponse } from '../../types/types';

export const domainCardsSelector = (
  state: AppRootState,
): VehiclesResponse<VehicleDetailsDomain> => state.cards.domainCards;

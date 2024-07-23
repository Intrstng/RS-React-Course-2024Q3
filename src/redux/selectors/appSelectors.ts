import { AppRootState } from '../store';
import { Status } from '../slices/appSlice';

export const searchSelector = (state: AppRootState): string => state.app.search;
export const statusSelector = (state: AppRootState): Status => state.app.status;
export const errorSelector = (state: AppRootState): string | null =>
  state.app.error;
export const currentPageSelector = (state: AppRootState): number =>
  state.app.currentPage;

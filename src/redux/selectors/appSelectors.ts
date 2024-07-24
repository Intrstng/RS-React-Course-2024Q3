import { AppRootState } from '../store';

export const searchSelector = (state: AppRootState): string => state.app.search;
export const statusSelector = (state: AppRootState): boolean =>
  state.app.isLoading;
export const errorSelector = (state: AppRootState): string | null =>
  state.app.error;
export const currentPageSelector = (state: AppRootState): number =>
  state.app.currentPage;

import { AppRootState } from '../store';

export const isToastifyOpenSelector = (state: AppRootState): boolean =>
  state.app.isToastifyOpen;

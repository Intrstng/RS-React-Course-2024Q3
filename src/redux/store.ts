import {
  configureStore,
  ThunkAction,
  ThunkDispatch,
  UnknownAction,
} from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector, useStore } from 'react-redux';
import { cardsApi } from './api/cardsApi';
import { appReducer, cardsReducer, favoritesReducer } from './slices';
import { createWrapper } from 'next-redux-wrapper';

export const setupStore = () => {
  return configureStore({
    reducer: {
      app: appReducer,
      favorites: favoritesReducer,
    }
  });
};
export type AppRootState = ReturnType<typeof setupStore>;



                              export type RootState = ReturnType<AppRootState['getState']>
                              export type AppDispatch = AppRootState['dispatch']
                              export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
                              export const useAppSelector = useSelector.withTypes<RootState>()
                              export const useAppStore = useStore.withTypes<AppRootState>()

// export type AppRootState = ReturnType<typeof setupStore>;
// export type AppDispatch = ThunkDispatch<AppRootState, unknown, UnknownAction>;
// export type AppThunk<ReturnType = void> = ThunkAction<
//   ReturnType,
//   AppRootState,
//   unknown,
//   UnknownAction
// >;
//
// export const useAppDispatch: () => AppDispatch = useDispatch;
// export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector;
//
// export const wrapper = createWrapper<AppRootState>(setupStore, { debug: true });

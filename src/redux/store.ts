import { configureStore } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
  useStore,
} from 'react-redux';
import { appReducer } from './slices/appSlice';
import { favoritesReducer } from './slices/favoritesSlice';

export const setupStore = () => {
  return configureStore({
    reducer: {
      app: appReducer,
      favorites: favoritesReducer,
    },
  });
};
export type AppRootState = ReturnType<typeof setupStore>;

export type RootState = ReturnType<AppRootState['getState']>;
export type AppDispatch = AppRootState['dispatch'];
export const useAppStore = useStore.withTypes<AppRootState>();

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector;

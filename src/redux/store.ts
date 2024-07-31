import {
  configureStore,
  ThunkAction,
  ThunkDispatch,
  UnknownAction,
} from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { cardsApi } from './api/cardsApi';
import { appReducer, cardsReducer, favoritesReducer } from './slices';
import { createWrapper } from 'next-redux-wrapper';


// export const store = configureStore({
//   reducer: {
//     [cardsApi.reducerPath]: cardsApi.reducer,
//     app: appReducer,
//     cards: cardsReducer,
//     favorites: favoritesReducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(cardsApi.middleware),
// });

export const setupStore = () => {
  return configureStore({
    reducer: {
      [cardsApi.reducerPath]: cardsApi.reducer,
      app: appReducer,
      cards: cardsReducer,
      favorites: favoritesReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(cardsApi.middleware),
  })
}

// export type AppRootState = ReturnType<typeof store.getState>;
export type AppRootState = ReturnType<typeof setupStore>;
export type AppDispatch = ThunkDispatch<AppRootState, unknown, UnknownAction>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppRootState,
  unknown,
  UnknownAction
>;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector;


export const wrapper = createWrapper<AppRootState>(setupStore, { debug: true });

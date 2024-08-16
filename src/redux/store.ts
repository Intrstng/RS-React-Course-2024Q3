import { configureStore, ThunkDispatch, UnknownAction } from '@reduxjs/toolkit';
import { formReducer } from './slices/formSlice';

export const store = configureStore({
  reducer: {
    form: formReducer
  }
});

export type AppRootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<AppRootState, unknown, UnknownAction>;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { countries } from '../../shared/consts/consts';
import { Form } from '../../shared/consts';

const formSlice = createSlice({
  name: 'form',
  initialState: {
    countries: countries as string[],
    filledForms: [] as Form[],
    isHighlighted: false as boolean
  },
  reducers: {
    addFilledForm(state, action: PayloadAction<{ form: Form }>) {
      state.filledForms.unshift(action.payload.form);
    },
    toggleIsHighlighted(state, action: PayloadAction<{ flag: boolean }>) {
      state.isHighlighted = action.payload.flag;
    }
  }
});

export const formReducer = formSlice.reducer;
export const formActions = formSlice.actions;

import { AppRootState } from '../store';
import { Form } from '../../shared/consts/types';

export const countrySelector = (state: AppRootState): string[] =>
  state.form.countries;
export const filledFormsSelector = (state: AppRootState): Form[] =>
  state.form.filledForms;
export const isHighlightedSelector = (state: AppRootState): boolean =>
  state.form.isHighlighted;

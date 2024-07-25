import React, { forwardRef } from 'react';
import { SearchFieldProps } from '../../shared/types/types';

export const SearchField = forwardRef<HTMLInputElement, SearchFieldProps>(
  ({ placeholder, value, onChangeHandler, color }, ref) => {
    return (
      <input
        ref={ref}
        type={'text'}
        placeholder={placeholder}
        value={value}
        className={`input input--${color}`}
        onChange={onChangeHandler}
      />
    );
  },
);

SearchField.displayName = 'SearchField';

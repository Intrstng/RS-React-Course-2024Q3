import React, { forwardRef } from 'react';
import S from './SearchField.module.css';
import { SearchFieldProps } from '../../types/types';

export const SearchField = forwardRef<HTMLInputElement, SearchFieldProps>(
  ({ placeholder, value, onChangeHandler }, ref) => {
    return (
      <input
        ref={ref}
        type={'text'}
        placeholder={placeholder}
        value={value}
        className={S.searchInput}
        onChange={onChangeHandler}
      />
    );
  },
);

SearchField.displayName = 'SearchField';

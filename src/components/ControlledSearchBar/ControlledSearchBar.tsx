import React, { ChangeEvent, useState, forwardRef } from 'react';
import S from './ControlledSearchBar.module.css';
import { ValidationError } from 'yup';
import { CustomError } from '../CustomError/CustomError';

type ControlledSearchBarProps = {
  countries: string[];
  error?: ValidationError | undefined;
  resetError?: () => void;
  onChange: (value: string) => void;
  value: string;
};

export const ControlledSearchBar = forwardRef<
  HTMLInputElement,
  ControlledSearchBarProps
>(({ error, countries, onChange, value }, ref) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const filteredCountries = countries.filter((country) =>
    country.toLocaleLowerCase().startsWith(value.toLowerCase())
  );

  const onClickOpenMenu = () => {
    setIsOpen(true);
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const onClickSelectItem = (e: React.MouseEvent<HTMLLIElement>) => {
    e.stopPropagation();
    setIsOpen(false);
    if (e.currentTarget.textContent) {
      onChange(e.currentTarget.textContent);
    } else {
      onChange('');
    }
  };

  return (
    <div className={S.searchBarGroup}>
      <label htmlFor="country">Country</label>
      <input
        ref={ref}
        id="country"
        name="country"
        type="text"
        placeholder="Select country..."
        value={value}
        onClick={onClickOpenMenu}
        onChange={onChangeHandler}
        className={S.searchBarInput}
      />

      {value.length > 0 && isOpen && (
        <ul className={S.listItems}>
          {filteredCountries.map((country, index) => (
            <li key={index} className={S.listItem} onClick={onClickSelectItem}>
              {country}
            </li>
          ))}
        </ul>
      )}
      {error && <CustomError error={error} />}
    </div>
  );
});

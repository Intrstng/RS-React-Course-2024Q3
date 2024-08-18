import React, { ChangeEvent, FC, useState } from 'react';
import S from './UncontrolledSearchBar.module.css';
import { ValidationError } from 'yup';
import { CustomError } from '../../CustomError/CustomError';

interface UncontrolledSearchBarProps {
  countries: string[];
  error: ValidationError | undefined;
  resetError?: () => void;
}

export const UncontrolledSearchBar: FC<UncontrolledSearchBarProps> = ({
  error,
  countries,
  resetError
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentSearch, setCurrentSearch] = useState<string>('');

  const filteredCountries = countries.filter((country) =>
    country.toLocaleLowerCase().startsWith(currentSearch.toLowerCase())
  );

  const onClickOpenMenu = () => {
    setIsOpen(true);
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentSearch(e.target.value);
    if (resetError) {
      resetError();
    }
  };

  const onClickSelectItem = (e: React.MouseEvent<HTMLLIElement>) => {
    e.stopPropagation();
    setIsOpen(false);
    const target = e.target as HTMLLIElement;
    if (target.textContent) {
      setCurrentSearch(target.textContent);
    } else {
      setCurrentSearch('');
    }
  };

  return (
    <div className={S.searchBarGroup}>
      <label htmlFor="country">Country</label>
      <input
        id="country"
        name="country"
        type="text"
        placeholder="Select country..."
        value={currentSearch}
        onClick={onClickOpenMenu}
        onChange={onChangeHandler}
        className={S.searchBarInput}
      />

      {currentSearch.length > 0 && isOpen && (
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
};

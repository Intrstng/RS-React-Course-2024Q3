import React, {
  ChangeEvent,
  MouseEvent,
  forwardRef,
  useMemo,
  useState,
  MouseEventHandler,
  FC
} from 'react';
import S from './UncontrolledSearchBar.module.css';
import { ValidationError } from 'yup';

interface UncontrolledSearchBarProps {
  countries: string[];
  errors?: ValidationError | undefined;
}

export const UncontrolledSearchBar: FC<UncontrolledSearchBarProps> = ({
  errors,
  countries
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentSearch, setCurrentSearch] = useState<string>('');
  console.log(currentSearch);

  const filteredCountries = countries.filter((country) =>
    country.toLocaleLowerCase().startsWith(currentSearch.toLowerCase())
  );

  const onClickOpenMenu = () => {
    setIsOpen(true);
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentSearch(e.target.value);
  };

  const onClickSelectItem = (e: React.MouseEvent<HTMLLIElement>) => {
    e.stopPropagation();
    setIsOpen(false);
    if (e.target.textContent) {
      setCurrentSearch(e.target.textContent);
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
      {/*{errors && <p className={S.error}>{errors}</p>}*/}
    </div>
  );
};

import React, { ChangeEvent, FC, FormEvent, useEffect, useRef } from 'react';
import S from './SearchContainer.module.css';
import { Button } from '../Button';
import { SearchField } from '../SearchField/SearchField';
import { ButtonType, SearchContainerProps } from '../../types/types';
import { useLocalStorage } from '../hooks/useLocalStorage';

const LOCAL_STORAGE_KEY = 'searchValue';

export const SearchContainer: FC<SearchContainerProps> = ({
  error,
  fetchVehicles,
  setAppError,
}) => {
  const [text, setText] = useLocalStorage<string>(LOCAL_STORAGE_KEY);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    fetchVehicles(text);
    if (inputRef.current !== null) {
      inputRef.current!.focus();
    }
  }, []);

  const onClickFetchVehiclesHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedText = text.trim();
    setText(trimmedText);
    fetchVehicles(trimmedText);
  };

  const onChangeSetInputValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.currentTarget.value);
  };

  const onClickSetError = () => {
    setAppError(
      "An error occurred when user clicked the 'Throw error on click' button",
    );
  };

  if (error !== null) throw new Error(error);

  return (
    <section>
      <form
        onSubmit={onClickFetchVehiclesHandler}
        className={S.searchContainer}
      >
        <SearchField
          ref={inputRef}
          placeholder={'search'}
          value={text}
          onChangeHandler={onChangeSetInputValueHandler}
        />

        <div className={S.searchControls}>
          <Button type={ButtonType.SUBMIT} className={S.searchButton}>
            Search
          </Button>
          <Button className={S.errorButton} onClickCallBack={onClickSetError}>
            Throw error on click
          </Button>
        </div>
      </form>
    </section>
  );
};

import React, { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import S from './SearchContainer.module.css';
import { Button } from '../Button';
import { SearchField } from '../SearchField/SearchField';
import { SearchContainerProps } from '../../types/types';

const LOCAL_STORAGE_KEY = 'searchValue';

export const SearchContainer: FC<SearchContainerProps> = ({
  error,
  fetchVehicles,
  setAppError,
}) => {
  const [text, setText] = useState<string>('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const searchValueFromLocalStorage = getFromLocalStorage(LOCAL_STORAGE_KEY);
    setText(searchValueFromLocalStorage);
    fetchVehicles(searchValueFromLocalStorage);
    if (inputRef.current !== null) {
      inputRef.current!.focus();
    }
  }, []);

  const getFromLocalStorage = (key: string): string => {
    try {
      const serializedState = localStorage.getItem(key);
      if (!serializedState) {
        return '';
      }
      return JSON.parse(serializedState);
    } catch {
      throw new Error('Data from local storage is not loaded');
    }
  };

  const saveToLocalStorage = (key: string, value): void => {
    try {
      const serializedState = JSON.stringify(value);
      localStorage.setItem(key, serializedState);
    } catch {
      throw new Error('Data is not saved to local storage');
    }
  };

  const onClickFetchVehiclesHandler = () => {
    const trimmedText = text.trim();
    setText(trimmedText);
    saveToLocalStorage(LOCAL_STORAGE_KEY, trimmedText);
    fetchVehicles(trimmedText);
  };

  const onChangeSetInputValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const currentValue = e.currentTarget.value;
    setText(currentValue);
  };

  const onClickSetError = () => {
    setAppError(
      "An error occurred when user clicked the 'Throw error on click' button",
    );
  };

  if (error !== null) throw new Error(error);

  return (
    <section className={S.searchContainer}>
      <SearchField
        ref={inputRef}
        placeholder={'search'}
        value={text}
        onChangeHandler={onChangeSetInputValueHandler}
      />

      <div className={S.searchControls}>
        <Button
          className={S.searchButton}
          onClickCallBack={onClickFetchVehiclesHandler}
        >
          Search
        </Button>
        <Button className={S.errorButton} onClickCallBack={onClickSetError}>
          Throw error on click
        </Button>
      </div>
    </section>
  );
};

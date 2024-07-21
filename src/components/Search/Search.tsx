import React, { ChangeEvent, FC, FormEvent, useEffect, useRef } from 'react';
import S from './Search.module.css';
import { Button } from '../Button';
import { SearchField } from '../SearchField/SearchField';
import { ButtonType, SearchContainerProps } from '../../types/types';
import useLocalStorageAdvanced from '../hooks/useLocalStorageAdvanced';
import { Pagination } from '../Pagination/Pagination';

const LOCAL_STORAGE_KEY = 'searchValue';

export const Search: FC<SearchContainerProps> = ({
  error,
  pagesCount,
  isLoading,
  navigationPage,
  fetchVehicles,
  setAppError,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [text, setText] = useLocalStorageAdvanced<string>(LOCAL_STORAGE_KEY);

  useEffect(() => {
    fetchVehicles(text, navigationPage);
    if (inputRef.current !== null) {
      inputRef.current!.focus();
    }
  }, [navigationPage]);

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
          color={'primary'}
        />

        <div className={S.searchControls}>
          <Button
            type={ButtonType.SUBMIT}
            disabled={isLoading}
            color={'search'}
          >
            Search
          </Button>
          <Button onClickCallBack={onClickSetError} color={'error'}>
            Throw error on click
          </Button>
        </div>
      </form>
      {!isLoading && (
        <Pagination pagesCount={pagesCount} currentPage={navigationPage} />
      )}
    </section>
  );
};

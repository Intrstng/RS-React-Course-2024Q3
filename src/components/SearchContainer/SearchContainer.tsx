import React, { ChangeEvent, FC, FormEvent, useEffect, useRef } from 'react';
import S from './SearchContainer.module.css';
import { Button } from '../Button';
import { SearchField } from '../SearchField/SearchField';
import { ButtonType, SearchContainerProps } from '../../types/types';
import useLocalStorageAdvanced from '../hooks/useLocalStorageAdvanced';
import { Pagination } from '../Pagination/Pagination';

const LOCAL_STORAGE_KEY = 'searchValue';

export const SearchContainer: FC<SearchContainerProps> = ({
  error,
  pagesCount,
  isLoading,
  navigationPage,
  fetchVehicles,
  setAppError,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  // const [text, setText] = useLocalStorage<string>(LOCAL_STORAGE_KEY, inputRef);
  const [text, setText] = useLocalStorageAdvanced<string>(
    LOCAL_STORAGE_KEY,
    inputRef,
  );

  useEffect(() => {
    fetchVehicles(text, navigationPage);
    if (inputRef.current !== null) {
      inputRef.current!.focus();
    }
  }, [navigationPage]); // or []

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
          <Button
            type={ButtonType.SUBMIT}
            className={S.searchButton}
            disabled={isLoading}
          >
            Search
          </Button>
          <Button className={S.errorButton} onClickCallBack={onClickSetError}>
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

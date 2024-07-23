import React, { ChangeEvent, FC, FormEvent, useEffect, useRef } from 'react';
import S from './Search.module.css';
import { Button } from '../Button';
import { SearchField } from '../SearchField/SearchField';
import { ButtonType, SearchContainerProps } from '../../types/types';
import useLocalStorageAdvanced from '../hooks/useLocalStorageAdvanced';
import { Pagination } from '../Pagination/Pagination';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import {
  currentPageSelector,
  searchSelector,
} from '../../redux/selectors/appSelectors';
import { appActions } from '../../redux/slices/appSlice';

const LOCAL_STORAGE_KEY = 'searchValue';

export const Search: FC<SearchContainerProps> = ({
  error,
  pagesCount,
  isLoading,
  fetchVehicles,
  setAppError,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [, setTextLS] = useLocalStorageAdvanced<string>(LOCAL_STORAGE_KEY);
  const searchValue = useAppSelector<string>(searchSelector);
  const navigationPage = useAppSelector<number>(currentPageSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetchVehicles(searchValue, navigationPage);
    if (inputRef.current !== null) {
      inputRef.current!.focus();
    }
  }, [navigationPage]);

  const onClickFetchVehiclesHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedText = searchValue.trim();
    setTextLS(trimmedText);
    fetchVehicles(trimmedText);
  };

  const onChangeSetInputValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    // setTextLS(e.currentTarget.value);
    dispatch(appActions.setAppSearch({ search: e.currentTarget.value }));
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
          value={searchValue}
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
      {!isLoading && <Pagination pagesCount={pagesCount} />}
    </section>
  );
};

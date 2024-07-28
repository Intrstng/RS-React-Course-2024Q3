import React, { ChangeEvent, FormEvent, useEffect, useRef } from 'react';
import S from './Search.module.css';
import { Button } from '../Button';
import { SearchField } from '../SearchField/SearchField';
import { ButtonType } from '../../shared/types/types';
import useLocalStorageAdvanced from '../hooks/useLocalStorageAdvanced';
import { Pagination } from '../Pagination/Pagination';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import {
  currentPageSelector,
  errorSelector,
  searchSelector,
} from '../../redux/selectors/appSelectors';
import {
  appActions,
  LOCAL_STORAGE_SEARCH_KEY,
} from '../../redux/slices/appSlice';
import { cardsActions } from '../../redux/slices/cardsSlice';
import { useGetCardsQuery } from '../../redux/api/cardsApi';
import { useNavigate } from 'react-router-dom';
import { favoritesSelector } from '../../redux/selectors';
import { FavoritesItems } from '../../redux/slices/favoritesSlice';

export const Search = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [text, setText] = useLocalStorageAdvanced<string>(
    LOCAL_STORAGE_SEARCH_KEY,
  );
  const searchValue = useAppSelector<string>(searchSelector);
  const navigationPage = useAppSelector<number>(currentPageSelector);
  const appError = useAppSelector<string | null>(errorSelector);
  const { data, isFetching, isError, error } = useGetCardsQuery({
    search: searchValue,
    page: navigationPage,
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const favoritesItems = useAppSelector<FavoritesItems>(favoritesSelector);

  useEffect(() => {
    dispatch(appActions.setAppStatus({ isLoading: isFetching }));
    dispatch(cardsActions.setDomainCards({ cards: data }));
    dispatch(cardsActions.restoreToFavorites({ favorites: favoritesItems }));
    dispatch(
      appActions.setAppError({ error: isError === false ? null : error.error }),
    );

    if (inputRef.current !== null) {
      inputRef.current!.focus();
    }
  }, [searchValue, navigationPage, data, isFetching, isError, error]);

  const onClickFetchVehiclesHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`/page/1`);
    dispatch(appActions.setAppCurrentPage({ currentPage: 1 }));
    const trimmedText = text.trim();
    setText(trimmedText);
    dispatch(appActions.setAppSearch({ search: trimmedText }));
  };

  const onChangeSetInputValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.currentTarget.value);
  };

  const onClickSetError = () => {
    dispatch(
      appActions.setAppError({
        error:
          "An error occurred when user clicked the 'Throw error on click' button",
      }),
    );
  };

  if (appError !== null) throw new Error(appError);

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
            disabled={isFetching}
            color={'search'}
          >
            Search
          </Button>
          <Button onClickCallBack={onClickSetError} color={'error'}>
            Throw error on click
          </Button>
        </div>
      </form>
      {!isFetching && <Pagination />}
    </section>
  );
};

'use client'
import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import S from '../../styles/Search.module.css';
import { Button } from '../Button';
import { SearchField } from '../SearchField/SearchField';
import { ButtonType } from '../../shared/types/types';
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
import { useRouter, usePathname } from 'next/navigation'
import { favoritesSelector } from '../../redux/selectors';
import { FavoritesItems } from '../../redux/slices/favoritesSlice';

export const getInitValueFromLS = (key: string) => {
  return typeof window !== 'undefined'
    ? JSON.parse(localStorage.getItem(key)) || ''
    : '';
};

export const Search = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [text, setText] = useState<string>(
    getInitValueFromLS(LOCAL_STORAGE_SEARCH_KEY),
  );
  // const favoritesItems = useAppSelector<FavoritesItems>(favoritesSelector);
  // const searchValue = useAppSelector<string>(searchSelector);
  // const navigationPage = useAppSelector<number>(currentPageSelector);
  // const appError = useAppSelector<string | null>(errorSelector);
  // const { data, isFetching, isError, error } = useGetCardsQuery({
  //   search: searchValue,
  //   page: navigationPage,
  // });

  const [appError, setAppError] = useState<string | null>(null);

  // const dispatch = useAppDispatch();
  const router = useRouter();
  // const { id, search } = router.query;

  // useEffect(() => {
  //   dispatch(
  //     appActions.setAppCurrentPage({
  //       currentPage: Number(id) || navigationPage,
  //     }),
  //   );
  //   dispatch(appActions.setAppStatus({ isLoading: isFetching }));
  //   dispatch(cardsActions.setDomainCards({ cards: data }));
  //   dispatch(cardsActions.restoreToFavorites({ favorites: favoritesItems }));
  //   dispatch(
  //     appActions.setAppError({ error: isError === false ? null : error.error }),
  //   );
  //
  //   if (inputRef.current !== null) {
  //     inputRef.current!.focus();
  //   }
  // }, [searchValue, navigationPage, data, isFetching, isError, error, id]);

  // useEffect(() => {
  //   if (search) {
  //     setText(search.trim());
  //     dispatch(appActions.setAppSearch({ search }));
  //     dispatch(appActions.setAppCurrentPage({ currentPage: id }));
  //   }
  //   if (search && typeof window !== 'undefined') {
  //     localStorage.setItem(LOCAL_STORAGE_SEARCH_KEY, JSON.stringify(search));
  //   }
  // }, [search]);
  //
  // const onClickFetchVehiclesHandler = (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //
  //   const trimmedText = text.trim();
  //   setText(trimmedText);
  //   dispatch(appActions.setAppCurrentPage({ currentPage: 1 }));
  //   dispatch(appActions.setAppSearch({ search: trimmedText }));
  //   router.push({
  //     pathname: '/page/1',
  //     query: { search: trimmedText },
  //   });
  // };

  const onChangeSetInputValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.currentTarget.value);
    if (typeof window !== 'undefined') {
      localStorage.setItem(
        LOCAL_STORAGE_SEARCH_KEY,
        JSON.stringify(e.currentTarget.value),
      );
    }
  };

  const onClickSetError = () => {
    // dispatch(
    //   appActions.setAppError({
    //     error:
    //       "An error occurred when user clicked the 'Throw error on click' button",
    //   }),
    // );
    setAppError("An error occurred when user clicked the 'Throw error on click' button")
  };

  if (appError !== null) throw new Error(appError);

  return (
    <section>
      <form
        // onSubmit={onClickFetchVehiclesHandler}
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
            // disabled={isFetching}
            color={'search'}
          >
            Search
          </Button>
          <Button onClickCallBack={onClickSetError} color={'error'}>
            Throw error on click
          </Button>
        </div>
      </form>
    </section>
  );
};

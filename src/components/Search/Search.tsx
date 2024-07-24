import React, {
  ChangeEvent,
  FC,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
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
import {
  appActions,
  LOCAL_STORAGE_SEARCH_KEY,
} from '../../redux/slices/appSlice';
import { cardsActions } from '../../redux/slices/cardsSlice';
import { useGetCardsQuery } from '../../redux/api/cardsApi';

export const Search: FC<SearchContainerProps> = ({
  error,
  // pagesCount,
  // isLoading,
  setAppError,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [text, setText] = useLocalStorageAdvanced<string>(
    LOCAL_STORAGE_SEARCH_KEY,
  );
  const searchValue = useAppSelector<string>(searchSelector);
  const navigationPage = useAppSelector<number>(currentPageSelector);
  const dispatch = useAppDispatch();

  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState<number>(1);

  const { data } = useGetCardsQuery({ search: search, page: page });
  console.log(data);
  useEffect(() => {
    setSearch(searchValue);
    setPage(navigationPage);
    dispatch(cardsActions.setDomainCards({ cards: data }));

    if (inputRef.current !== null) {
      inputRef.current!.focus();
    }
  }, [searchValue, navigationPage, data]);

  const onClickFetchVehiclesHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedText = text.trim();
    setText(trimmedText);
    setSearch(trimmedText);
    dispatch(appActions.setAppSearch({ search: trimmedText }));
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
            // disabled={isLoading}
            color={'search'}
          >
            Search
          </Button>
          <Button onClickCallBack={onClickSetError} color={'error'}>
            Throw error on click
          </Button>
        </div>
      </form>
      {/*{!isLoading && <Pagination pagesCount={pagesCount} />}*/}
      {<Pagination />}
    </section>
  );
};

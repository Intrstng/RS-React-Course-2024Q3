'use client';
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
import { LOCAL_STORAGE_SEARCH_KEY } from '../../lib/features/app/appSlice';
import { useRouter, useSearchParams } from 'next/navigation';

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

  const [appError, setAppError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search');

  useEffect(() => {
    !searchQuery && text.length > 0 && router.push(`/page/1?search=${text}`);
    searchQuery ? setText(searchQuery) : setText(text);
  }, []);

  const onClickFetchVehiclesHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedText = text.trim();
    setText(trimmedText);
    const href = `/page/1?search=${trimmedText}`;
    router.push(href);
  };

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
    setAppError(
      "An error occurred when user clicked the 'Throw error on click' button",
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
          <Button type={ButtonType.SUBMIT} color={'search'}>
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

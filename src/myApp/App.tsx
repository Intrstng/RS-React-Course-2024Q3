import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/store';
import {
  currentPageSelector,
  searchSelector,
  statusSelector,
} from '../redux/selectors/appSelectors';
import { appActions } from '../redux/slices/appSlice';
import { useRouter } from 'next/router';
import { Loader } from '../components/Loader/Loader';
import CardList from '../components/CardList/CardList';

const App = () => {
  const router = useRouter();
  const { id } = router.query;
  const pageFromParams = parseInt(id ?? '1', 10);
  const currentPage = useAppSelector<number>(currentPageSelector);
  const isLoading = useAppSelector<boolean>(statusSelector);
  const dispatch = useAppDispatch();
  const searchValue = useAppSelector<string>(searchSelector);

  useEffect(() => {
    dispatch(appActions.setAppCurrentPage({ currentPage: pageFromParams }));

    if (router.pathname === '/') {
      router.replace(
        {
          pathname: `/page/${currentPage}`,
          query: { search: searchValue },
        },
        undefined,
        { shallow: true },
      );
    }
  }, [router, pageFromParams, searchValue]);

  return (
    <div className={'content'}>{isLoading ? <Loader /> : <CardList />}</div>
  );
};

export default App;

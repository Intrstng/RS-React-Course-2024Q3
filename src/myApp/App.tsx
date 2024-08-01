import React, { useContext, useEffect } from 'react';
import './App.css';
// import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { ThemeContext } from '../contexts/Theme/Theme.context';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { currentPageSelector, searchSelector, statusSelector, } from '../redux/selectors/appSelectors';
import { appActions } from '../redux/slices/appSlice';
import { useRouter } from 'next/router';
import { Loader } from '../components/Loader/Loader';
import { CardList } from '../components/CardList/CardList';
import { VehicleDetailsDomain, VehiclesResponse } from '../shared/types/types';
import { domainCardsSelector, favoritesSelector } from '../redux/selectors';
import { FavoritesItems } from '../redux/slices/favoritesSlice';

const App = () => {
  const { theme } = useContext(ThemeContext);
  const router = useRouter();
  const { pageId } = router.query;
  const pageFromParams = parseInt(pageId ?? '1', 10);
  const currentPage = useAppSelector<number>(currentPageSelector);
  const isLoading = useAppSelector<boolean>(statusSelector);
  const dispatch = useAppDispatch();
  const searchValue = useAppSelector<string>(searchSelector);

  const domainCards =
    useAppSelector<VehiclesResponse<VehicleDetailsDomain>>(domainCardsSelector);
  const favoritesItems = useAppSelector<FavoritesItems>(favoritesSelector);

  useEffect(() => {
    dispatch(appActions.setAppCurrentPage({ currentPage: pageFromParams }));

    if (router.pathname === '/') {
      router.replace({
        pathname: `/page/${currentPage}`,
        query: { search: searchValue },
      });
    }
  }, [router, pageFromParams, searchValue]);

  return (
    // <div className={'content'}>{isLoading ? <Loader /> : <Outlet />}</div>

    <div className={'content'}>{isLoading ? <Loader /> : <CardList />}</div>
  );
};

export default App;

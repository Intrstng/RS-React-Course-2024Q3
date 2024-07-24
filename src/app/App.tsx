import React, { CSSProperties, useContext, useEffect } from 'react';
import './App.css';
import { Search } from '../components/Search/Search';
import { ErrorBoundary } from '../components/ErrorBoundary/ErrorBoundary';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { PATH } from '../routes/Route';
import { ThemeContext } from '../contexts/Theme/Theme.context';
import { ThemeControl } from '../components/ThemeControl/ThemeControl';
import { useAppDispatch, useAppSelector } from '../redux/store';
import {
  currentPageSelector,
  statusSelector,
} from '../redux/selectors/appSelectors';
import { appActions } from '../redux/slices/appSlice';
import { Loader } from '../components/Loader/Loader';

export const App = () => {
  const { theme } = useContext(ThemeContext);
  const { pageId } = useParams<{ pageId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const pageFromParams = parseInt(pageId ?? '1', 10);
  const currentPage = useAppSelector<number>(currentPageSelector);
  const isLoading = useAppSelector<boolean>(statusSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(appActions.setAppCurrentPage({ currentPage: pageFromParams }));
    if (location.pathname === PATH.PAGE_ROOT) {
      navigate(`/page/${currentPage}`, { replace: true });
    }
  }, [location, pageFromParams]);

  return (
    <ErrorBoundary>
      <div
        className={'app'}
        style={{ ...(theme as CSSProperties) }}
        data-testid={'app'}
      >
        <ThemeControl />
        <Search />
        <div className={'content'}>{isLoading ? <Loader /> : <Outlet />}</div>
      </div>
    </ErrorBoundary>
  );
};

import React from 'react';
import S from './Pagination.module.css';
import { Button } from '../Button';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { currentPageSelector } from '../../redux/selectors/appSelectors';
import { appActions } from '../../redux/slices/appSlice';
import { domainCardsSelector } from '../../redux/selectors/domainCardsSelectors';

export const Pagination = () => {
  const router = useRouter();
  const currentPage = useAppSelector(currentPageSelector);
  const dispatch = useAppDispatch();
  const domainCards = useAppSelector(domainCardsSelector);
  const pagesCount = Math.ceil(domainCards?.count / 10);

  const onClickPrevPageHandler = () => {
    if (currentPage > 1) {
      dispatch(appActions.setAppCurrentPage({ currentPage: currentPage - 1 }));
      router.push(`/page/${currentPage - 1}`);
    }
  };

  const onClickNextPageHandler = () => {
    dispatch(appActions.setAppCurrentPage({ currentPage: currentPage + 1 }));
    router.push(`/page/${currentPage + 1}`);
  };

  return (
    <div className={S.paginationBlock}>
      <Button
        onClickCallBack={onClickPrevPageHandler}
        disabled={currentPage <= 1}
        color={'select'}
      >
        Prev
      </Button>
      <span>{currentPage}</span>
      <Button
        onClickCallBack={onClickNextPageHandler}
        disabled={currentPage >= pagesCount}
        color={'select'}
      >
        Next
      </Button>
    </div>
  );
};

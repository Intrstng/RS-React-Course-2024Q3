'use client'
import React, { FC } from 'react';
import S from '../../styles/Pagination.module.css';
import { Button } from '../Button';
import { useRouter, usePathname, useParams, useSearchParams } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '../../redux/store';
import {
  currentPageSelector,
  searchSelector,
} from '../../redux/selectors/appSelectors';
import { appActions } from '../../redux/slices/appSlice';
import { domainCardsSelector } from '../../redux/selectors/domainCardsSelectors';

type PaginationProps = {
  cardsCount: number
}

export const Pagination: FC<PaginationProps> = ({cardsCount}) => {
  // const router = useRouter();
  // const currentPage = useAppSelector(currentPageSelector);
  // const dispatch = useAppDispatch();
  // const domainCards = useAppSelector(domainCardsSelector);
  const pagesCount = Math.ceil(cardsCount / 10);
  // const searchValue = useAppSelector<string>(searchSelector);


  const router = useRouter()
  const params = useParams()
  const querySearch = useSearchParams()
  const searchValue = querySearch.get('search')
  const currentPage = Number(params.id)


  let prevHref = querySearch ? `/page/${currentPage - 1}?${querySearch}` : `/page/${currentPage - 1}`


  let nextHref = querySearch ? `/page/${currentPage + 1}?${querySearch}` : `/page/${currentPage + 1}`

  const onClickPrevPageHandler = () => {
    if (currentPage > 1) {
      // dispatch(appActions.setAppCurrentPage({ currentPage: currentPage - 1 }));
      router.push(prevHref);
    }
  };

  const onClickNextPageHandler = () => {
    // dispatch(appActions.setAppCurrentPage({ currentPage: currentPage + 1 }));
    router.push(nextHref);
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

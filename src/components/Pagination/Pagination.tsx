'use client';
import React, { FC } from 'react';
import S from '../../styles/Pagination.module.css';
import { Button } from '../Button';
import { useParams, useRouter, useSearchParams } from 'next/navigation';

type PaginationProps = {
  cardsCount: number;
};

export const Pagination: FC<PaginationProps> = ({ cardsCount }) => {
  const pagesCount = Math.ceil(cardsCount / 10);
  const router = useRouter();
  const params = useParams();
  const querySearch = useSearchParams();
  const currentPage = Number(params.id);

  const prevHref = querySearch
    ? `/page/${currentPage - 1}?${querySearch}`
    : `/page/${currentPage - 1}`;

  const nextHref = querySearch
    ? `/page/${currentPage + 1}?${querySearch}`
    : `/page/${currentPage + 1}`;

  const onClickPrevPageHandler = () => {
    if (currentPage > 1) {
      router.push(prevHref);
    }
  };

  const onClickNextPageHandler = () => {
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

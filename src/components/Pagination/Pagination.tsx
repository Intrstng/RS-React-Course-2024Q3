import React, { FC, useEffect, useState } from 'react';
import S from './Pagination.module.css';
import { PaginationProps } from '../../types/types';
import { Button } from '../Button';

export const Pagination: FC<PaginationProps> = ({
  pagesCount,
  fetchPageData,
}) => {
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    setPage(1);
  }, [pagesCount]);

  const onClickPrevPageHandler = () => {
    setPage(page - 1);
    fetchPageData(page - 1);
  };

  const onClickNextPageHandler = () => {
    setPage(page + 1);
    fetchPageData(page + 1);
  };

  return (
    <div className={S.paginationBlock}>
      <Button onClickCallBack={onClickPrevPageHandler} disabled={page <= 1}>
        Prev
      </Button>
      <span>{page}</span>
      <Button
        onClickCallBack={onClickNextPageHandler}
        disabled={page >= pagesCount}
      >
        Next
      </Button>
    </div>
  );
};

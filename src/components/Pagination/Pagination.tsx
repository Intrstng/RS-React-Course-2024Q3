import React, { FC } from 'react';
import S from './Pagination.module.css';
import { PaginationProps } from '../../types/types';
import { Button } from '../Button';
import { useNavigate } from 'react-router-dom';

export const Pagination: FC<PaginationProps> = ({
  pagesCount,
  currentPage,
}) => {
  const navigate = useNavigate();

  const onClickPrevPageHandler = () => {
    if (currentPage > 1) {
      navigate(`/page/${currentPage - 1}`);
    }
  };

  const onClickNextPageHandler = () => {
    navigate(`/page/${currentPage + 1}`);
  };

  return (
    <div className={S.paginationBlock}>
      <Button
        onClickCallBack={onClickPrevPageHandler}
        disabled={currentPage <= 1}
      >
        Prev
      </Button>
      <span>{currentPage}</span>
      <Button
        onClickCallBack={onClickNextPageHandler}
        disabled={currentPage >= pagesCount}
      >
        Next
      </Button>
    </div>
  );
};

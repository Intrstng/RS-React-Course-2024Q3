import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import S from './DetailedCard.module.css';
import { DetailsPageParams } from '../../shared/types/types';
import { Loader } from '../Loader/Loader';
import defaultImage from '../../assets/image_default.jpg';
import { useGetCardDetailsQuery } from '../../redux/api/cardsApi';
import { useAppSelector } from '../../redux/store';
import { currentPageSelector, searchSelector } from '../../redux/selectors';

export const DetailedCard = () => {
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [detailedCardId, setDetailedCardId] = useState('');
  const { data, isFetching, isError } = useGetCardDetailsQuery(detailedCardId);
  const detailsRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const { cardId } = router.query;
  const pageId = useAppSelector(currentPageSelector);
  const searchValue = useAppSelector(searchSelector);

      useEffect(() => {
    const fetchData = async () => {
      await setDetailedCardId(cardId);
      await setImgSrc(
        `https://starwars-visualguide.com/assets/img/vehicles/${cardId}.jpg`,
      );
    };
    fetchData();
  }, [cardId]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        detailsRef.current &&
        !detailsRef.current!.contains(e.target as Node)
      ) {
        router.push(`/page/${pageId}?search=${searchValue}`);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [pageId]);

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/page/${pageId}?search=${searchValue}`);
  };

  const handleImageError = () => {
    setImgSrc(defaultImage);
  };

  if (isError) {
    return (
      <div className={S.details} ref={detailsRef}>
        <p className={S.error}>Error loading detailed cards</p>
      </div>
    );
  }

  return (
    <div className={S.details} ref={detailsRef}>
      {isFetching ? (
        <Loader />
      ) : (
        <div className={S.detailsCard}>
          {imgSrc && (
            <img
              src={imgSrc}
              alt="card"
              className={S.card}
              onError={handleImageError}
            />
          )}
          <p>
            Model: <span>{data.model}</span>
          </p>
          <p>
            Manufacturer: <span>{data.manufacturer}</span>
          </p>
          <p>
            Length: <span>{data.length}</span>
          </p>
          <p>
            Crew: <span>{data.crew}</span>
          </p>
          <p>
            Passengers: <span>{data.passengers}</span>
          </p>
          <p>
            Consumables: <span>{data.consumables}</span>
          </p>
          <form onSubmit={onSubmitHandler}>
            <button type="submit" disabled={isFetching}>
              Close
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

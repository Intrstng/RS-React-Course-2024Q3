import React, { FC, FormEvent, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import S from './DetailedCard.module.css';
import { VehicleDetails } from '../../shared/types/types';
import defaultImage from '../../assets/image_default.jpg';
import { useAppSelector } from '../../redux/store';
import { currentPageSelector, searchSelector } from '../../redux/selectors';

export type DetaileCardProps = {
  detailsData?: VehicleDetails | undefined
}

export const DetailedCard: FC<DetaileCardProps> = ({detailsData}) => {
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const detailsRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const {cardId} = router.query;
  const pageId = useAppSelector(currentPageSelector);
  const searchValue = useAppSelector(searchSelector);

  useEffect(() => {
    const fetchData = async () => {
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
    setImgSrc(defaultImage.src);
  };

  return (
      <div className={S.details} ref={detailsRef}>
        <div className={S.detailsCard}>
          {imgSrc && (
              <img
                  src={imgSrc}
                  alt="card"
                  className={S.card}
                  onError={handleImageError}
              />
          )}
          {detailsData ? (
              <>
                <p>
                  Model: <span>{detailsData.model}</span>
                </p>
                <p>
                  Manufacturer: <span>{detailsData.manufacturer}</span>
                </p>
                <p>
                  Length: <span>{detailsData.length}</span>
                </p>
                <p>
                  Crew: <span>{detailsData.crew}</span>
                </p>
                <p>
                  Passengers: <span>{detailsData.passengers}</span>
                </p>
                <p>
                  Consumables: <span>{detailsData.consumables}</span>
                </p>
              </>
          ) : <p className={S.error}>Error loading detailed cards</p>
          }
          <form onSubmit={onSubmitHandler}>
            <button type="submit">
              Close
            </button>
          </form>
        </div>
        }
      </div>
  );
};

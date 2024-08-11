'use client';
import React, { FC, FormEvent, useEffect, useRef, useState } from 'react';
import S from '../../styles/DetailedCard.module.css';
import { DetailedVehicle } from '../../shared/types/types';
import defaultImage from '../../assets/image_default.jpg';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export type DetailedCardProps = {
  detailsData?: DetailedVehicle | undefined;
  params: {
    id: string;
  };
  searchParams?: { [key: string]: string | undefined };
};

export const DetailedCard: FC<DetailedCardProps> = ({
  detailsData,
  params,
  searchParams,
}) => {
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const detailsRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    setImgSrc(
      `https://starwars-visualguide.com/assets/img/vehicles/${searchParams?.card}.jpg`,
    );
  }, [searchParams?.card]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        detailsRef.current &&
        !detailsRef.current!.contains(e.target as Node)
      ) {
        searchParams?.search
          ? router.push(`/page/${params.id}?search=${searchParams?.search}`)
          : router.push(`/page/${params.id}`);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [params.id]);

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // router.push(`/page/${params.id}?search=${searchValue}`);
    searchParams?.search
      ? router.push(`/page/${params.id}?search=${searchParams?.search}`)
      : router.push(`/page/${params.id}`);
  };

  const handleImageError = () => {
    setImgSrc(defaultImage.src);
  };

  return (
    <div className={S.details} ref={detailsRef}>
      <div className={S.detailsCard}>
        {imgSrc && (
          <Image
            src={imgSrc}
            alt="card"
            className={S.card}
            onError={handleImageError}
            width={230}
            height={155}
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
        ) : (
          <p className={S.error}>Error loading detailed cards</p>
        )}
        <form onSubmit={onSubmitHandler}>
          <button type="submit">Close</button>
        </form>
      </div>
    </div>
  );
};

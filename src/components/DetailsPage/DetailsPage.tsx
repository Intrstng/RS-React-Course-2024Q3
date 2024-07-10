import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import S from './DetailsPage.module.css';
import { DetailsPageParams, VehicleDetails } from '../../types/types';
import { getVehicleDetails } from '../bll/vehiclesThunks';
import { Loader } from '../Loader/Loader';
import defaultImage from '../../assets/image_default.jpg';

export const DetailsPage = () => {
  const [vehicleDetails, setVehicleDetails] = useState<VehicleDetails>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const { model, manufacturer, length, crew, passengers, consumables } =
    vehicleDetails;
  const detailsRef = useRef<HTMLDivElement | null>(null);

  const navigate = useNavigate();
  const { pageId, vehicleId } = useParams<DetailsPageParams>();

  useEffect(() => {
    const fetchData = async () => {
      await getVehicleDetails(
        setVehicleDetails,
        setIsLoading,
        setError,
        setImgSrc,
        vehicleId,
      );
    };
    fetchData();
  }, [vehicleId]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        detailsRef.current &&
        !detailsRef.current!.contains(e.target as Node)
      ) {
        navigate(`/page/${pageId}`);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [pageId]);

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`/page/${pageId}`);
  };

  const handleImageError = () => {
    setImgSrc(defaultImage);
  };

  if (error !== null) throw new Error(error);

  return (
    <div className={S.details} ref={detailsRef}>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={S.detailsCard}>
          {imgSrc && (
            <img
              src={imgSrc}
              alt="vehicle"
              className={S.vehicleCard}
              onError={handleImageError}
            />
          )}
          <p>
            Model: <span>{model}</span>
          </p>
          <p>
            Manufacturer: <span>{manufacturer}</span>
          </p>
          <p>
            Length: <span>{length}</span>
          </p>
          <p>
            Crew: <span>{crew}</span>
          </p>
          <p>
            Passengers: <span>{passengers}</span>
          </p>
          <p>
            Consumables: <span>{consumables}</span>
          </p>
          <form onSubmit={onSubmitHandler}>
            <button type="submit" disabled={isLoading}>
              Close
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

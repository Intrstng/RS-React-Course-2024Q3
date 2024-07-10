import React, { FormEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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

  // const navigate = useNavigate();
  const { vehicleId } = useParams<DetailsPageParams>();

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

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    if (!confirm('Please confirm you want to close this record.')) {
      e.preventDefault();
      // navigate(`/page/${page}`);
    }
  };

  const handleImageError = () => {
    setImgSrc(defaultImage);
  };

  if (error !== null) throw new Error(error);

  return (
    <div className={S.details}>
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

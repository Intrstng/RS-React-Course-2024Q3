import React from 'react';
import { getCardDetails } from '../../services/getCards';
import { DetailedCard } from '../DetailedCard/DetailedCard';

type Params = {
  params: {
    id: string;
  };
  searchParams: {
    [key: string]: string | undefined;
  };
};

const Detailed = async ({ params, searchParams }: Params) => {
  const response = await getCardDetails(searchParams.card);
  return (
    <DetailedCard
      detailsData={response}
      params={params}
      searchParams={searchParams}
    />
  );
};

export default Detailed;

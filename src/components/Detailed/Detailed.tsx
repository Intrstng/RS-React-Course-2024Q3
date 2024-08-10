// 'use client'

// import { useRouter, usePathname } from 'next/navigation'

import { getCardDetails } from '../../services/getCards';
import { DetailedCard } from '../DetailedCard/DetailedCard';

type Params = {
  params: {
    id: string;
  };
};

// export async function generateMetadata({ params }: Params) {
//   return { title: `Detailed card: ${params?.cardId}` };
// }

const Detailed = async ({ params, searchParams }: Params) => {
  const response = await getCardDetails(searchParams.card);

  return <DetailedCard detailsData={response} params={params} searchParams={searchParams}/>;
}

export default Detailed
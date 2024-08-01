/* eslint-disable @next/next/no-img-element */
import React, { FC } from 'react';
import Head from 'next/head';
import { VehicleDetails, VehiclesResponse } from '../../../shared/types/types';
import { wrapper } from '../../../redux/store';
import { getCardDetails, getRunningQueriesThunk } from '../../../redux/api/cardsApi';
import { CardList } from '../../../components/CardList/CardList';
import Layout from '../../layout';
import { appActions } from '../../../redux/slices/appSlice';

type PageProps = {
  cardsData?: VehiclesResponse<VehicleDetails>;
  detailsData?: VehicleDetails
};

type PageParamsProps = {
  params: { id: string };
  query: { search?: string };
};

export const getServerSideProps = wrapper.getServerSideProps(
    (store) =>
        async ({ params }: PageParamsProps) => {
          const cardId = params?.cardId || '4';

          let result = await store.dispatch(
              getCardDetails.initiate(cardId),
          );

          await Promise.all(store.dispatch(getRunningQueriesThunk()));

          if (result.data) {
            return {
              props: {
                detailsData: result.data,
              },
            };
          } else {
            return null
          }
        },
);

const Page: FC<PageProps> = ({ detailsData}) => {
  return (
      <div>
        <Head>
          <title>RS School Next.js Task</title>
        </Head>
        <Layout>
          <>
            <div className={'content'}>{<CardList detailsData={detailsData}/>}</div>
          </>
        </Layout>
      </div>
  );
};

export default Page;

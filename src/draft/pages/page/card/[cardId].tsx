import React from 'react';
import Head from 'next/head';
import { VehicleDetails, VehiclesResponse } from '../../../../shared/types/types';
import { wrapper } from '../../../../redux/store';
import {
  getCardDetails,
  getRunningQueriesThunk,
} from '../../../../redux/api/cardsApi';
import CardList from '../../../../components/CardList/CardList';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import RootLayout from '../../../../components/RootLayout/RootLayout';

type PageProps = {
  cardsData?: VehiclesResponse<VehicleDetails>;
  detailsData?: VehicleDetails;
};

type PageParamsProps = {
  params: { id: string };
  query: { search?: string };
};

export const getServerSideProps: GetServerSideProps<
  PageProps,
  PageParamsProps['params']
> = wrapper.getServerSideProps(
  (store) =>
    async ({ params }: PageParamsProps) => {
      const cardId = params?.cardId || '4';

      const result = await store.dispatch(getCardDetails.initiate(cardId));

      await Promise.all(store.dispatch(getRunningQueriesThunk()));

      if (result.data) {
        return {
          props: {
            detailsData: result.data,
          },
        };
      } else {
        return {
          notFound: true,
        };
      }
    },
);

const Page = ({
  detailsData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div>
      <Head>
        <title>RS School Next.js Task</title>
      </Head>
      <div className={'content'}>{<CardList detailsData={detailsData} />}</div>
    </div>
  );
};

Page.Layout = RootLayout;

export default Page;

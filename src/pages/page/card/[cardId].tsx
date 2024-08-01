/* eslint-disable @next/next/no-img-element */
import React, { FC, useEffect } from 'react';
import Head from 'next/head';

import { DetailedCard } from '../../../components/DetailedCard/DetailedCard';
import { VehicleDetails, VehiclesResponse } from '../../../shared/types/types';
import { useAppDispatch, useAppSelector, wrapper } from '../../../redux/store';
import { getCards, getRunningQueriesThunk } from '../../../redux/api/cardsApi';
import { favoritesSelector, searchSelector, statusSelector } from '../../../redux/selectors';
import { FavoritesItems } from '../../../redux/slices/favoritesSlice';
import { CardList } from '../../../components/CardList/CardList';
import Layout from '../../layout';

type PageProps = {
  cardsData: VehiclesResponse<VehicleDetails>;
};

type PageParamsProps = {
  params: { id: string };
  query: { search?: string };
};

export const getServerSideProps = wrapper.getServerSideProps(
    (store) =>
        async ({ params, query }: PageParamsProps) => {
          let search = query.search || '';
          const pageId = params?.id || '1';

          let result = await store.dispatch(
              getCards.initiate({ search, page: pageId }),
          );

          await Promise.all(store.dispatch(getRunningQueriesThunk()));

          if (result.data) {
            return {
              props: {
                cardsData: result.data,
              },
            };
          } else {
            return null
          }
        },
);

const Page: FC<PageProps> = ({ cardsData }) => {
  const searchValue = useAppSelector<string>(searchSelector);
  const favoritesItems = useAppSelector<FavoritesItems>(favoritesSelector);
  const isLoading = useAppSelector<boolean>(statusSelector);
  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   dispatch(appActions.setAppStatus({ isLoading: false }));
  //   dispatch(cardsActions.setDomainCards({ cards: cardsData }));
  //   dispatch(cardsActions.restoreToFavorites({ favorites: favoritesItems }));
  //   dispatch(appActions.setAppError({ error: null }));
  // }, [searchValue, cardsData, favoritesItems]);

  return (
      <div>
        <Head>
          <title>RS School Next.js Task</title>
        </Head>
        <Layout>
          <>
            <div className={'content'}>{<CardList />}</div>
          </>
        </Layout>
      </div>
  );
};

export default Page;

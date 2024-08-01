/* eslint-disable @next/next/no-img-element */
import React, { FC, useEffect } from 'react';
import Head from 'next/head';
import { getCards, getRunningQueriesThunk } from '../../redux/api/cardsApi';
import { useAppDispatch, useAppSelector, wrapper } from '../../redux/store';
import {
  favoritesSelector,
  searchSelector,
  statusSelector,
} from '../../redux/selectors';
import { appActions } from '../../redux/slices/appSlice';
import { cardsActions } from '../../redux/slices/cardsSlice';
import { FavoritesItems } from '../../redux/slices/favoritesSlice';
import { CardList } from '../../components/CardList/CardList';
import { Loader } from '../../components/Loader/Loader';
import Layout from '../layout';
import { VehicleDetails, VehiclesResponse } from '../../shared/types/types';

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

      const result = await store.dispatch(
        getCards.initiate({ search, page: pageId }),
      );

      await Promise.all(store.dispatch(getRunningQueriesThunk()));

      return {
        props: {
          cardsData: result.data,
        },
      };
    },
);

const Page: FC<PageProps> = ({ cardsData }) => {
  const searchValue = useAppSelector<string>(searchSelector);
  const favoritesItems = useAppSelector<FavoritesItems>(favoritesSelector);
  const isLoading = useAppSelector<boolean>(statusSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(appActions.setAppStatus({ isLoading: false }));
    dispatch(cardsActions.setDomainCards({ cards: cardsData }));
    dispatch(cardsActions.restoreToFavorites({ favorites: favoritesItems }));
    dispatch(appActions.setAppError({ error: null }));
  }, [searchValue, cardsData, favoritesItems]);

  return (
    <div>
      <Head>
        <title>RS School Next.js Task</title>
      </Head>
      <Layout>
        <div className={'content'}>{isLoading ? <Loader /> : <CardList />}</div>
      </Layout>
    </div>
  );
};

export default Page;

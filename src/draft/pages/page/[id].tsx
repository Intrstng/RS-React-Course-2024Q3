import React, { useEffect } from 'react';
import Head from 'next/head';
import { getCards, getRunningQueriesThunk } from '../../../redux/api/cardsApi';
import { useAppDispatch, useAppSelector, wrapper } from '../../../redux/store';
import { favoritesSelector, statusSelector } from '../../../redux/selectors';
import { appActions } from '../../../redux/slices/appSlice';
import { cardsActions } from '../../../redux/slices/cardsSlice';
import { FavoritesItems } from '../../../redux/slices/favoritesSlice';
import CardList from '../../../components/CardList/CardList';
import { Loader } from '../../../components/Loader/Loader';
import { VehicleDetails, VehiclesResponse } from '../../../shared/types/types';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import RootLayout from '../../../components/RootLayout/RootLayout';

type PageProps = {
  cardsData?: VehiclesResponse<VehicleDetails>;
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
    async ({ params, query }: PageParamsProps) => {
      const search = query?.search || '';
      const pageId = params?.id || '1';

      store.dispatch(appActions.setAppStatus({ isLoading: true }));

      const result = await store.dispatch(
        getCards.initiate({ search, page: pageId }),
      );

      await store.dispatch(cardsActions.setDomainCards({ cards: result.data }));

      await Promise.all(store.dispatch(getRunningQueriesThunk()));

      if (result.data) {
        return {
          props: {
            cardsData: result.data,
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
  cardsData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const favoritesItems = useAppSelector<FavoritesItems>(favoritesSelector);
  const isLoading = useAppSelector<boolean>(statusSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(cardsActions.setDomainCards({ cards: cardsData }));
    dispatch(cardsActions.restoreToFavorites({ favorites: favoritesItems }));
  }, [cardsData, favoritesItems]);

  return (
    <div>
      <Head>
        <title>RS School Next.js Task</title>
      </Head>
      <div className={'content'}>{isLoading ? <Loader /> : <CardList />}</div>
    </div>
  );
};

Page.Layout = RootLayout;

export default Page;

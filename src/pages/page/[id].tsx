/* eslint-disable @next/next/no-img-element */
import React, { FC, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/Details.module.css";
import { useGetCardDetailsQuery, useGetCardsQuery } from '../../redux/api/cardsApi';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { favoritesSelector, searchSelector, statusSelector } from '../../redux/selectors';
import { appActions } from '../../redux/slices/appSlice';
import { cardsActions } from '../../redux/slices/cardsSlice';
import { FavoritesItems } from '../../redux/slices/favoritesSlice';
import { CardList } from '../../components/CardList/CardList';
import { Loader } from '../../components/Loader/Loader';
import Layout from '../layout';
import App from '../../myApp/App';

type PageProps = {
  pageId: string;
}

type PageParamsProps = {
  params: { id: string }
}

export async function getServerSideProps({ params }: PageParamsProps) {
  return {
    props: {
      pageId: params.id,
    },
  };
}

const Page: FC<PageProps> = ({ pageId }) => {
  const searchValue = useAppSelector<string>(searchSelector);
  const favoritesItems = useAppSelector<FavoritesItems>(favoritesSelector);
  const isLoading = useAppSelector<boolean>(statusSelector);
  const { data, isFetching, isError, error } = useGetCardsQuery({
    search: searchValue,
    page: pageId,
  });
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(appActions.setAppStatus({ isLoading: isFetching }));
    dispatch(cardsActions.setDomainCards({ cards: data }));
    dispatch(cardsActions.restoreToFavorites({ favorites: favoritesItems }));
    dispatch(
        appActions.setAppError({ error: isError === false ? null : error.error }),
    );

  }, [searchValue, pageId, data, isFetching, isError, error]);

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
}

export default Page;
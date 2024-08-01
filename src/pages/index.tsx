/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Head from 'next/head';
import App from '../myApp/App';
import { wrapper } from '../redux/store';
import { getCards, getRunningQueriesThunk, } from '../redux/api/cardsApi';
import Layout from './layout';

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const searchText = '';
    const page = context.query.page || 1;

    store.dispatch(getCards.initiate({ search: searchText, page }));

    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return {
      props: {},
    };
  },
);

export default function Home() {
  return (
    <div>
      <Head>
        <title>RS School Next.js</title>
        <meta name="description" content="RS School Next.js Page Routing app" />
      </Head>
      <Layout>
        <App />
      </Layout>
    </div>
  );
}

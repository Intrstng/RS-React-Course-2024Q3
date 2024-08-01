/* eslint-disable @next/next/no-img-element */
import React, { CSSProperties, useContext } from "react";
import Head from "next/head";
import styles from "../../styles/Home.module.css";
import Link from 'next/link';
import App from '../myApp/App';
import { Provider } from 'react-redux';
import { setupStore, store, wrapper } from '../redux/store';
import { ThemeContext, ThemeProvider } from '../contexts/Theme/Theme.context';
import { cardsApi, getCards, getRunningQueriesThunk } from '../redux/api/cardsApi';
import Layout from './layout';


export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async (context) => {
      // const searchText = cardsApi.myApp.search || '';
      const searchText = '';

      const page = context.query.page || '1';

      store.dispatch(getCards.initiate({search: searchText, page}));
      if (typeof searchText === 'string') {
        store.dispatch(getCards.initiate({search: searchText, page}));
      }

      if (typeof searchText === 'undefined') {
        store.dispatch(getCards.initiate({search: 's', page}));
      }

      await Promise.all(store.dispatch(getRunningQueriesThunk()));

      return {
        props: {},
      };
    }
);


export default function Home() {

  return (
      <div>
        <Head>
          <title>RS School Next.js</title>
          <meta name='description' content='RS School Next.js Page Routing app'/>
        </Head>
        <Layout>
          <App/>
        </Layout>
      </div>
  );
}
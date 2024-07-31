import '../styles/globals.css'
import type { AppProps } from 'next/app';
import { wrapper } from '../redux/store';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { ThemeProvider } from '../contexts/Theme/Theme.context';


export default function App({Component, pageProps}: AppProps) {
  const {store, props} = wrapper.useWrappedStore(pageProps);
  return (
      <>
        <Head>
          <title>RS School Next.js Task</title>
        </Head>
        <ThemeProvider>
          <Provider store={store}>
            <Component {...pageProps} />
          </Provider>
        </ThemeProvider>
      </>
  )
}
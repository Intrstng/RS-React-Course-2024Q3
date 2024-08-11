import React from 'react';
import App from '../myApp/App';

export const metadata = {
  title: 'RS School Next.js',
};

const Home = () => {
  return (
    <div>
      {/*<Head>*/}
      {/*  <title>RS School Next.js</title>*/}
      {/*  <meta name="description" content="RS School Next.js Page Routing app" />*/}
      {/*</Head>*/}
      <App />
    </div>
  );
};

export default Home;

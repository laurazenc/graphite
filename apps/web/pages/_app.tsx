import Head from 'next/head';

import 'styles/global.css';

function App({ Component, pageProps }: any) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no"
        />
        <title>graphite</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default App;

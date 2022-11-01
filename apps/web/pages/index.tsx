import dynamic from 'next/dynamic';
import Head from 'next/head';



const Graphite = dynamic(() => import('graphite'), { ssr: false });

export default function Web() {
  return (
    <>
      <Head>
        <title>Graphite</title>
      </Head>
      <Graphite />
    </>
  );
}

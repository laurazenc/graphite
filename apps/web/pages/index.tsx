import dynamic from "next/dynamic";
import Head from "next/head";

const Canvas = dynamic(() => import('graphite'), { ssr: false })

export default function Web() {
  return (
    <div>
      <Head>
        <title>Graphite</title>
      </Head>
      <Canvas />
    </div>
  );
}

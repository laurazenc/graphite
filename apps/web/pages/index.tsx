import Head from 'next/head';
import { GraphiteStore, Size } from 'graphite-core';
import { Graphite, GraphiteProvider } from 'graphite-react';

const store = new GraphiteStore();

const nodeA = store.addNode({
  name: 'A node',
  coordinates: { x: 50, y: 50 },
});
const nodeB = store.addNode({
  name: 'B for big name',

  coordinates: { x: 300, y: 150 },
});
const nodeC = store.addNode({
  name: 'Custom node ',

  coordinates: { x: 600, y: 300 },
});

const nodeD = store.addNode({
  name: 'Different try for a long node name',

  coordinates: { x: 300, y: 600 },
});

const portsA = store.getNodePorts(nodeA.id);
const portsB = store.getNodePorts(nodeB.id);
const portsC = store.getNodePorts(nodeC.id);

portsA[1].connect(portsB[0]);
portsA[2].connect(portsC[3]);

export default function Web() {
  return (
    <>
      <Head>
        <title>Graphite</title>
      </Head>
      <GraphiteProvider store={store}>
        <Graphite />
      </GraphiteProvider>
    </>
  );
}

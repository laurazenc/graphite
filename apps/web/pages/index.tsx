import Head from 'next/head';
import { GraphiteStore, Size } from 'graphite-core';
import { Graphite, GraphiteProvider } from 'graphite-react';

const store = new GraphiteStore();

const nodeA = store.addNode({
  name: 'A',
  size: Size.create(100, 100),
  coordinates: { x: 50, y: 50 },
});
const nodeB = store.addNode({
  name: 'B',
  size: Size.create(100, 100),
  coordinates: { x: 300, y: 150 },
});
const nodeC = store.addNode({
  name: 'C',
  size: Size.create(100, 100),
  coordinates: { x: 600, y: 300 },
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

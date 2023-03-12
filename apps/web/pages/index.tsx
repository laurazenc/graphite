import Head from 'next/head';
import { Coordinate, GraphiteStore, Node, Size } from 'graphite-core';
import { Graphite, GraphiteProvider } from 'graphite-react';
import { Side } from 'graphite-core/dist/components/port/type';

const store = new GraphiteStore();

const nodeA: Node = new Node({
  name: 'A',
  size: Size.create(100, 100),
  coordinate: Coordinate.create(50, 50),
});

const nodeB: Node = new Node({
  name: 'B',
  size: Size.create(100, 100),
  coordinate: Coordinate.create(150, 150),
});

nodeA.addOutputs([{ nodeId: nodeB.id, side: Side.RIGHT }]);
nodeB.addInputs([{ nodeId: nodeA.id, side: Side.LEFT }]);

store.addNode(nodeA);
store.addNode(nodeB);

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

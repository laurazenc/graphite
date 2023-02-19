import Screen from '../Screen';

import '../../styles/style.css';
import Node from '../../components/Node/Node';
import Connector from '../../components/Connector/Connector';
import { Vertex } from '../../routing/path-finder';
import Rectangle from '../../routing/Rectangle';
import React from 'react';
import Grid from '../../components/Grid/Grid';
import GraphiteStoreProvider from '../../store/GraphiteStoreProvider';
import NodeRenderer from '../NodeRenderer/NodeRenderer';

const a: Vertex = {
  rect: Rectangle.fromRect({ left: 50, top: 50, height: 60, width: 90 }),
  side: 'LEFT',
};

const b: Vertex = {
  rect: Rectangle.fromRect({ left: 250, top: 100, height: 60, width: 90 }),
  side: 'BOTTOM',
};

const c: Vertex = {
  rect: Rectangle.fromRect({ left: 150, top: 200, height: 60, width: 90 }),
  side: 'BOTTOM',
};

const connectorAB = {
  source: a,
  target: b,
};

const connectorBC = {
  source: b,
  target: c,
};

const Graphite = () => {
  // const graph = createGraph({ nodes: [a, b, c], connectors: [connectorAB, connectorBC] });
  return (
    <div className="container">
      <GraphiteStoreProvider>
        <Grid />
        <Screen>
          <NodeRenderer />
          <Connector source={a} target={b} />
          <Connector source={b} target={c} />
        </Screen>
      </GraphiteStoreProvider>
    </div>
  );
};

Graphite.displayName = 'Graphite';

export default Graphite;

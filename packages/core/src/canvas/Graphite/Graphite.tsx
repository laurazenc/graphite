import { forwardRef } from 'react';
import Screen from '../Screen';

import '../../styles/style.css';
import Node from '../../components/Node';

const Graphite = forwardRef(() => {
  return (
    <div className="container">
      <Screen>
        <Node x={50} y={50}>
          Node 2
        </Node>
        <Node x={250} y={150}>
          Node 1
        </Node>
      </Screen>
    </div>
  );
});

Graphite.displayName = 'Graphite';

export default Graphite;

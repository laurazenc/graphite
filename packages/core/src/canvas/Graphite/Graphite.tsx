import Screen from '../Screen';

import '../../styles/style.css';
import Node from '../../components/Node';
import Connector from '../../components/Connector/Connector';
import { Vertex } from '../../routing/path-finder';
import Rectangle from '../../routing/Rectangle';

const source: Vertex = {
  rect: Rectangle.fromRect({ left: 50, top: 50, height: 60, width: 90 }),
  side: 'LEFT',
};

const target: Vertex = {
  rect: Rectangle.fromRect({ left: 250, top: 100, height: 60, width: 90 }),
  side: 'BOTTOM',
};

const Graphite = () => {
  return (
    <div className="container">
      <Screen>
        <Node x={source.rect.left} y={source.rect.top} id="1">
          Node 1
        </Node>
        <Node x={target.rect.left} y={target.rect.top} id="2">
          Node 2
        </Node>
        <Connector source={source} target={target} />
      </Screen>
    </div>
  );
};

Graphite.displayName = 'Graphite';

export default Graphite;

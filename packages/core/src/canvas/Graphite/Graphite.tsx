import Screen from '../Screen';

import '../../styles/style.css';
import Node from '../../components/Node/Node';
import Connector from '../../components/Connector/Connector';
import { Vertex } from '../../routing/path-finder';
import Rectangle from '../../routing/Rectangle';

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

const Graphite = () => {
  return (
    <div className="container">
      <Screen>
        <Node x={a.rect.left} y={a.rect.top} id="1" width={a.rect.width} height={a.rect.height}>
          Node 1
        </Node>
        <Node x={b.rect.left} y={b.rect.top} id="2" width={b.rect.width} height={b.rect.height}>
          Node 2
        </Node>

        <Node x={c.rect.left} y={c.rect.top} id="3" width={c.rect.width} height={c.rect.height}>
          Node 3
        </Node>

        <Connector source={a} target={b} />
        <Connector source={b} target={c} />
      </Screen>
    </div>
  );
};

Graphite.displayName = 'Graphite';

export default Graphite;

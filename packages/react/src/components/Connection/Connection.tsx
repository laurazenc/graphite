import { observer } from 'mobx-react-lite';
import { Connection as _Connection, CoordinateProps, pathFinder, Rectangle } from 'graphite-core';
import React from 'react';
import { useStore } from '../../store/useStore';
import { autorun } from 'mobx';
import { generateSVGPath, smoothStepCommand } from './utils';

const Connection = observer(({ connection }: { connection: _Connection }) => {
  const { store } = useStore();
  const [path, setPath] = React.useState<string>('');

  const fromNode = store.getNodeById(connection.from.node.id);
  const toNode = store.getNodeById(connection.to.node.id);
  const fromNodePosition = store.nodePositions.get(connection.from.node.id);
  const toNodePosition = store.nodePositions.get(connection.to.node.id);

  React.useEffect(() => {
    return autorun(() => {
      if (fromNode && toNode) {
        const fromElement = store.nodeElements.get(fromNode.id);
        const toElement = store.nodeElements.get(toNode.id);
        const fromPortSide = connection.from.side;
        const toPortSide = connection.to.side;
        if (fromElement && toElement) {
          const toRect = Rectangle.fromRect(toElement.getBoundingClientRect());
          const fromRect = Rectangle.fromRect(fromElement.getBoundingClientRect());
          const path = pathFinder({ side: fromPortSide, rect: fromRect }, { side: toPortSide, rect: toRect });
          setPath(generateSVGPath(path, smoothStepCommand));
        }
      }
    });
  }, [fromNodePosition, toNodePosition]);

  const handleClick = React.useCallback(() => {
    if (connection) {
      connection.dispose();
    }
  }, [connection]);

  return (
    <g>
      <path className="stroke-2 stroke-gray-300 hover:stroke-gray-400 hover:cursor-pointer" d={path} fill="none" />
    </g>
  );
});

Connection.displayName = 'Connection';

export { Connection };

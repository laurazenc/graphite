import { observer } from 'mobx-react-lite';
import { Connection as _Connection, CoordinateProps, pathFinder, Rectangle } from 'graphite-core';
import React from 'react';
import { useStore } from '../../store/useStore';
import { autorun } from 'mobx';
import { generateSVGPath, smoothStepCommand } from './utils';

const defaultPosition = { x: 0, y: 0 };

const Connection = observer(({ connection }: { connection: _Connection }) => {
  const { store } = useStore();
  const [path, setPath] = React.useState<string>('');
  const [from, setFrom] = React.useState<CoordinateProps>(defaultPosition);
  const [to, setTo] = React.useState<CoordinateProps>(defaultPosition);
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
          setFrom(fromRect.startPoint(toPortSide));
          setTo(toRect.startPoint(fromPortSide));
          const path = pathFinder({ side: toPortSide, rect: fromRect }, { side: fromPortSide, rect: toRect });
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

  const strokeColor = '#1e62ff';

  return (
    <g>
      <path
        className="port"
        d={`M${from.x},${from.y},${from.x + 2},${from.y}`}
        fill="none"
        strokeWidth="8"
        stroke={strokeColor}
        onClick={handleClick}
      />
      <path
        className="port"
        d={`M${to.x - 2},${to.y},${to.x},${to.y}`}
        fill="none"
        strokeWidth="8"
        stroke={strokeColor}
        onClick={handleClick}
      />
      <path className="connector" d={path} fill="none" strokeWidth="2" stroke={strokeColor} />
    </g>
  );
});

Connection.displayName = 'Connection';

export { Connection };

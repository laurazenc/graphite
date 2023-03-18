import React, { useRef } from 'react';
import { observer } from 'mobx-react-lite';
import Draggable, { DraggableEventHandler } from 'react-draggable';
import { NodeProps } from './types';
import { useStore } from '../../store/useStore';
import { Port } from '../Port/Port';

const Node = observer(({ node }: NodeProps) => {
  const nodeRef = useRef<HTMLDivElement>(null);
  const { store } = useStore();

  React.useEffect(() => {
    if (nodeRef.current) {
      store.addNodeElement(node.id, nodeRef.current);

      return () => {
        store.removeNodeElement(node.id);
      };
    }
  }, [nodeRef]);

  const handleOnDrag: DraggableEventHandler = React.useCallback(
    (e, { deltaX, deltaY }) => {
      e.preventDefault();
      e.stopPropagation();
      const { x, y } = store.nodePositions.get(node.id) || { x: 0, y: 0 };
      store.setNodePosition(node.id, {
        x: x + deltaX,
        y: y + deltaY,
      });
    },
    [node],
  );

  const position = store.nodePositions.get(node.id) || { x: 0, y: 0 };
  const ports = store.getNodePorts(node.id) || [];
  return (
    <Draggable nodeRef={nodeRef} onDrag={handleOnDrag} handle=".handle" position={{ x: position.x, y: position.y }}>
      <div ref={nodeRef} className="node handle">
        <div className="node-content">{node.name}</div>
        {ports.map(({ side }, index) => {
          return <Port key={index} side={side} />;
        })}
      </div>
    </Draggable>
  );
});

Node.displayName = 'Node';

export { Node };

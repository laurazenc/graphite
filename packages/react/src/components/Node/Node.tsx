import React, { useRef } from 'react';
import { observer } from 'mobx-react-lite';
import Draggable, { DraggableEventHandler } from 'react-draggable';

import { NodeProps } from './types';
import { useStore } from '../../store/useStore';

const Node = observer(({ node }: NodeProps) => {
  const nodeRef = useRef<HTMLDivElement>(null);
  const { store } = useStore();

  const handleOnDrag: DraggableEventHandler = React.useCallback(
    (e, { deltaX, deltaY }) => {
      e.preventDefault();
      e.stopPropagation();
      const storedNode = store.getNodeById(node.id);
      storedNode.coordinate.setX(storedNode.coordinate.x + deltaX);
      storedNode.coordinate.setY(storedNode.coordinate.y + deltaY);
    },
    [node],
  );

  return (
    <Draggable
      nodeRef={nodeRef}
      onDrag={handleOnDrag}
      handle=".handle"
      position={{ x: node.coordinate.x, y: node.coordinate.y }}
    >
      <div ref={nodeRef} className="node handle">
        <div className="node-content">{node.name}</div>
      </div>
    </Draggable>
  );
});

Node.displayName = 'Node';

export { Node };

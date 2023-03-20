import React, { useRef } from 'react';
import { observer } from 'mobx-react-lite';
import Draggable, { DraggableEventHandler } from 'react-draggable';
import { NodeProps } from './types';
import { useStore } from '../../store/useStore';
import { Port } from '../Port/Port';
import { nodeContentStyle, nodeStyle } from './Node.style';

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

  const handleOnClick = React.useCallback(() => {
    store.setSelectedNode(node);
  }, [node]);

  const position = store.nodePositions.get(node.id) || { x: 0, y: 0 };
  const isSelected = store.selectedNode === node;
  return (
    <Draggable nodeRef={nodeRef} onDrag={handleOnDrag} handle=".handle" position={{ x: position.x, y: position.y }}>
      <div
        ref={nodeRef}
        className="handle absolute bg-white rounded shadow shadow-md ring-1 ring-inset ring-gray-300 hover:bg-gray-50 cursor-grab z-10"
        onClick={handleOnClick}
      >
        <label
          className="node-content font-mono text-xs subpixel-antialiased text-gray-700 cursor-grab w-[120px] p-[16px 8px]"
          css={nodeContentStyle}
        >
          {node.name}
        </label>
        {store.getNodePorts(node.id).map((port) => {
          return <Port key={port.id} port={port} />;
        })}
      </div>
    </Draggable>
  );
});

Node.displayName = 'Node';

export { Node };

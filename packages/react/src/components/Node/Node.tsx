import React, { useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { NodeProps } from './types';
import { useStore } from '../../store/useStore';
import { Port } from '../Port/Port';
import { nodeContentStyle } from './Node.style';
import { drag } from 'd3-drag';
import { select } from 'd3-selection';

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

  useEffect(() => {
    if (nodeRef.current) {
      const dragInstance = drag().on('drag', (event) => {
        if (event.sourceEvent.target.classList.contains('node-content')) {
          const { x, y } = store.nodePositions.get(node.id) || { x: 0, y: 0 };
          store.setNodePosition(node.id, {
            x: x + event.dx / store.viewPortTransform.zoom,
            y: y + event.dy / store.viewPortTransform.zoom,
          });
        }
      });
      select(nodeRef.current as Element).call(dragInstance);
    }
  }, [nodeRef, store, store.viewPortTransform]);

  const handleOnClick = React.useCallback(() => {
    store.setSelectedNode(node);
  }, [node]);

  const position = store.nodePositions.get(node.id) || { x: 0, y: 0 };
  const isSelected = store.selectedNode === node;
  return (
    <div
      ref={nodeRef}
      className={`handle absolute bg-white rounded shadow shadow-md ring-1 ring-inset ring-gray-300 hover:bg-gray-50 pointer-events-none cursor-${
        isSelected ? 'grabbing' : 'grab'
      } z-0`}
      style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
    >
      <label
        className="node-content font-mono text-xs subpixel-antialiased text-gray-700 cursor-grab w-[120px] p-[16px 8px] pointer-events-auto "
        onClick={handleOnClick}
        css={nodeContentStyle}
        style={{ zIndex: 10 }}
      >
        {node.name}
      </label>
      {store.getNodePorts(node.id).map((port) => {
        return <Port key={port.id} port={port} />;
      })}
    </div>
  );
});

Node.displayName = 'Node';

export { Node };

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';
import Draggable, { DraggableEventHandler } from 'react-draggable';
import { NodeProps } from './types';
import { useStore } from '../../store/useStore';
import { Port } from '../Port/Port';
import { nodeContentStyle, nodeStyle } from './Node.style';

const Node = observer(({ node }: NodeProps) => {
  const nodeRef = useRef<HTMLDivElement>(null);
  const { store } = useStore();
  const nodeElement = store.nodeElements.get(node.id);
  const storedNode = store.nodes.get(node.id);

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

  const handleOnChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(
    (e) => {
      store.updateNode({ ...node, name: e.target.value });
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
        className={`node handle ${isSelected ? 'selected' : ''}`}
        css={nodeStyle}
        onClick={handleOnClick}
      >
        <label className="node-content" css={nodeContentStyle}>
          {node.name}
        </label>
        {store.getNodePorts(node.id).map((port, index) => {
          return <Port key={index} port={port} />;
        })}
      </div>
    </Draggable>
  );
});

Node.displayName = 'Node';

export { Node };

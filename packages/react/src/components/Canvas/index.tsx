import React from 'react';
import { observer } from 'mobx-react-lite';
import { NodeRenderer } from '../../canvas/NodeRenderer/NodeRenderer';
import { ConnectionRenderer } from '../../canvas/ConnectionRenderer/ConnectionRenderer';
import { useStore } from '../../store/useStore';

const Canvas = observer(() => {
  const { store } = useStore();

  return (
    <div className="screen">
      <NodeRenderer />
      <ConnectionRenderer />
    </div>
  );
});

export { Canvas };

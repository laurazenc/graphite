import React from 'react';
import { observer } from 'mobx-react-lite';
import { NodeRenderer } from '../../canvas/NodeRenderer/NodeRenderer';
import { ConnectionRenderer } from '../../canvas/ConnectionRenderer/ConnectionRenderer';
import { StatusBar } from '../../canvas/StatusBar/StatusBar';
import { Toolbar } from '../../canvas/Toolbar/Toolbar';

const Canvas = observer(() => {
  return (
    <div className="screen">
      <NodeRenderer />
      <ConnectionRenderer />
      <StatusBar />
      <Toolbar />
    </div>
  );
});

export { Canvas };

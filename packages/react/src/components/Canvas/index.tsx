import React, { useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { NodeRenderer } from '../../canvas/NodeRenderer/NodeRenderer';
import { ConnectionRenderer } from '../../canvas/ConnectionRenderer/ConnectionRenderer';
import { MainPane } from '../../canvas/MainPane/MainPane';
import { useStore } from '../../store/useStore';

const Canvas = observer(() => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const { store } = useStore();
  return (
    <div className="renderer w-full h-full relative z-0">
      <MainPane>
        <div ref={canvasRef} className={`pane screen  w-full h-full absolute top-0 left-0`} style={{ zIndex: 1 }}>
          <div
            className="viewport w-full h-full left-0 absolute top-0 pointer-events-none translate-x-0 translate-y-0"
            style={{
              zIndex: 2,
              transform: `translate(${store.viewPortTransform.x}px, ${store.viewPortTransform.y}px) scale(${store.viewPortTransform.zoom})`,
            }}
          >
            <NodeRenderer />
            <ConnectionRenderer />
          </div>
        </div>
      </MainPane>
    </div>
  );
});

export { Canvas };

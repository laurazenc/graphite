import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { useStore } from '../../store/useStore';
import { autorun } from 'mobx';
import { connectionDraftStyle } from './ConnectionDraft.style';
import { pathFinder, Rectangle, Side, Vertex } from 'graphite-core';
import { generateSVGPath, smoothStepCommand } from './utils';

export const ConnectionDraft = observer(() => {
  const [path, setPath] = useState<string>('');
  const { store } = useStore();
  useEffect(() => {
    return autorun(() => {
      if (store.draftConnection) {
        const fromElement = store.nodeElements.get(store.draftConnection.node.id);
        const fromSide = store.draftConnection.side;
        if (fromElement && fromSide) {
          const fromRect = Rectangle.fromRect(fromElement.getBoundingClientRect());
          const toRect: Vertex = store.magnetConnection || {
            side: Side.LEFT,
            rect: Rectangle.fromRect({
              height: 1,
              top: store.mousePosition.y,
              left: store.mousePosition.x,
              width: 1,
            }),
          };
          const path = pathFinder({ side: fromSide, rect: fromRect }, toRect);
          setPath(generateSVGPath(path, smoothStepCommand));
        }
      }
    });
  }, [store.draftConnection, store.mousePosition]);

  return (
    <g>
      <path
        className="connector-draft"
        d={path}
        css={connectionDraftStyle}
        fill={'node'}
        stroke="coral"
        strokeWidth="2"
      />
    </g>
  );
});
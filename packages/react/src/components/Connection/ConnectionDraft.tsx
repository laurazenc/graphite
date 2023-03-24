import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { useStore } from '../../store/useStore';
import { autorun } from 'mobx';
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
          const fromRect = Rectangle.fromRect(fromElement.getBoundingClientRect(), store.viewPortTransform);
          const toRect: Vertex = store.magnetConnection || {
            side: Side.BOTTOM,
            rect: Rectangle.fromRect(
              {
                height: 0,
                top: store.mousePosition.y,
                left: store.mousePosition.x,
                width: 0,
              },
              store.viewPortTransform,
            ),
          };
          const path = pathFinder({ side: fromSide, rect: fromRect }, toRect);
          setPath(generateSVGPath(path, smoothStepCommand));
        }
      }
    });
  }, [store.draftConnection, store.mousePosition, store.viewPortTransform]);

  return (
    <g>
      <path className="connector-draft stroke-2 stroke-red-400" fill={'none'} d={path} />
    </g>
  );
});

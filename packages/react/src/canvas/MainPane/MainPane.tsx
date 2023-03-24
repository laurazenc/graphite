import { ReactNode, useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { zoom } from 'd3-zoom';
import { select } from 'd3-selection';
import { useStore } from '../../store/useStore';

export const MainPane = observer(({ children }: { children: ReactNode }) => {
  const mainPaneRef = useRef<HTMLDivElement>(null);
  const { store } = useStore();

  useEffect(() => {
    let startX = 0;
    let startY = 0;
    if (mainPaneRef.current) {
      const zoomInstance = zoom()
        .scaleExtent([0, 5])
        .on('start', (event) => {
          startX = event.transform.x;
          startY = event.transform.y;

          if (store.draftConnection) {
            event.sourceEvent.preventDefault();
          }
        })
        .on('zoom', (event) => {
          if (event.sourceEvent.target.classList.contains('pane')) {
            const { x, y, k } = event.transform;
            // force zoom to be 1
            store.setViewportTransform({ x: x / k, y: y / k, zoom: 1 });
          }
        });
      select(mainPaneRef.current as Element).call(zoomInstance);
    }
  }, [store]);

  return (
    <div ref={mainPaneRef} className="main-pane w-full h-full absolute top-0 left-0 cursor-grab" style={{ zIndex: 4 }}>
      {children}
    </div>
  );
});

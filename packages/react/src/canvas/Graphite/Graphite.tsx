import React, { useCallback } from 'react';
import { observer } from 'mobx-react-lite';

import { Grid } from '../../components/Grid/Grid';
import { Canvas } from '../../components';
import { useStore } from '../../store/useStore';
import { StatusBar } from '../StatusBar/StatusBar';
import { Toolbar } from '../Toolbar/Toolbar';

const Graphite = observer(() => {
  const { store } = useStore();

  const handleOnMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.nativeEvent.clientX - rect.left;
    const y = e.nativeEvent.clientY - rect.top;

    store.setMousePosition({ x, y });
  }, []);

  const handleOnMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (store.draftConnection && store.magnetPosition) {
      store.endConnection(store.magnetPosition.port);
      store.setMagnetPosition(null);
    }

    if (store.selectedNode) {
      store.setSelectedNode(null);
    }
  }, []);

  return (
    <div className="app" onMouseMove={handleOnMouseMove} onMouseDown={handleOnMouseDown}>
      <Grid />
      <Canvas />
      <StatusBar />
      <Toolbar />
    </div>
  );
});

Graphite.displayName = 'Graphite';

export { Graphite };

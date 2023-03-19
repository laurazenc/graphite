import React, { useCallback } from 'react';

import { Grid } from '../../components/Grid/Grid';
import { observer } from 'mobx-react-lite';
import { Canvas } from '../../components';
import { useStore } from '../../store/useStore';

const Graphite = observer(() => {
  const { store } = useStore();

  const handleOnMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.nativeEvent.clientX - rect.left;
    const y = e.nativeEvent.clientY - rect.top;

    store.setMousePosition({ x, y });
  }, []);

  return (
    <div className="container" onMouseMove={handleOnMouseMove}>
      <Grid />
      <Canvas />
    </div>
  );
});

Graphite.displayName = 'Graphite';

export { Graphite };

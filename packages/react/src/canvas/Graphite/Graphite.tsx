import React from 'react';

import { Grid } from '../../components/Grid/Grid';
import { observer } from 'mobx-react-lite';
import { Canvas } from '../../components';

const Graphite = observer(() => {
  return (
    <div className="container">
      <Grid />
      <Canvas />
    </div>
  );
});

Graphite.displayName = 'Graphite';

export { Graphite };

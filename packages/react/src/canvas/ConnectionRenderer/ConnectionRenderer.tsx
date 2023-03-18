import { Connection as _Connection } from 'graphite-core';
import { Connection } from '../../components/Connection/Connection';
import { useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../store/useStore';

const ConnectionRenderer = observer(() => {
  const connectionRef = useRef<SVGSVGElement>(null);
  const { store } = useStore();

  return (
    <svg ref={connectionRef} id="connections" width="100%" height="100%">
      {store.connections.map((connection: _Connection) => {
        return <Connection connection={connection} key={connection.id} />;
      })}
    </svg>
  );
});

export { ConnectionRenderer };

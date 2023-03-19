import { useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { Connection as _Connection } from 'graphite-core';
import { useStore } from '../../store/useStore';
import { Connection } from '../../components/Connection/Connection';
import { ConnectionDraft } from '../../components/Connection/ConnectionDraft';

const ConnectionRenderer = observer(() => {
  const connectionRef = useRef<SVGSVGElement>(null);
  const { store } = useStore();

  return (
    <svg ref={connectionRef} id="connections" width="100%" height="100%">
      {store.connections.map((connection: _Connection) => {
        return <Connection connection={connection} key={connection.id} />;
      })}
      {store.draftConnection && <ConnectionDraft />}
    </svg>
  );
});

export { ConnectionRenderer };

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
    <svg ref={connectionRef} className="connections pointer-events-none absolute h-full w-full left-0 top-0 z-0">
      {store.connections.map((connection: _Connection) => {
        return <Connection connection={connection} key={connection.id} />;
      })}
      {store.draftConnection && <ConnectionDraft />}
    </svg>
  );
});

export { ConnectionRenderer };

import React, { useCallback } from 'react';
import { Port as _Port } from 'graphite-core';
import { observer } from 'mobx-react-lite';
import { portStyle } from './Port.style';
import { useStore } from '../../store/useStore';

export const Port = observer(({ port }: { port: _Port }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const { store } = useStore();
  const handleOnClick = useCallback(() => {
    if (store.draftConnection) {
      store.endConnection(port);
    } else {
      store.startConnection(port);
    }
  }, [port]);

  return <div ref={ref} className={`node-port`} css={portStyle(port.side)} onClick={handleOnClick} />;
});

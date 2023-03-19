import React, { useCallback } from 'react';
import { Port as _Port } from 'graphite-core';
import { observer } from 'mobx-react-lite';
import { portStyle } from './Port.style';
import { useStore } from '../../store/useStore';

export const Port = observer(({ port }: { port: _Port }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const { store } = useStore();
  const handleOnDown = useCallback(() => {
    if (store.draftConnection) {
      store.endConnection(port);
    } else {
      if (store.draftConnection !== port) store.startConnection(port);
    }
  }, []);

  const handleOnMouseUp = useCallback(() => {
    /*if (store.draftConnection) {
      store.endConnection(port);
    }*/
  }, [port]);

  return (
    <div
      ref={ref}
      className={`node-port`}
      css={portStyle(port.side)}
      onMouseDown={handleOnDown}
      onMouseUp={handleOnMouseUp}
    />
  );
});

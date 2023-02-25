import { FC, PropsWithChildren, useRef } from 'react';
import { StoreApi } from 'zustand/vanilla';
import StoreContext from './GraphiteStoreContext';
import { initStore } from './store';
import { GraphiteStore } from './types';

const GraphiteStoreProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
  const storeRef = useRef<StoreApi<GraphiteStore> | null>(null);

  if (!storeRef.current) {
    storeRef.current = initStore();
  }

  return <StoreContext.Provider value={storeRef.current}>{children}</StoreContext.Provider>;
};

GraphiteStoreProvider.displayName = 'GraphiteStoreProvider';

export { GraphiteStoreProvider };

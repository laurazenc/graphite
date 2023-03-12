import { FC, PropsWithChildren } from 'react';
import StoreContext from './GraphiteStoreContext';
import { GraphiteStore } from 'graphite-core';

const GraphiteProvider: FC<PropsWithChildren & { store: GraphiteStore }> = ({ children, store }) => {
  return <StoreContext.Provider value={{ store }}>{children}</StoreContext.Provider>;
};

GraphiteProvider.displayName = 'GraphiteStoreProvider';

export default GraphiteProvider;

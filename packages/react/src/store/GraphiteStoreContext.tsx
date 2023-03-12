import { createContext } from 'react';
import { GraphiteStore } from 'graphite-core';

export type StoreProviderValue = {
  store: GraphiteStore;
};

const defaultStoreProviderValue: StoreProviderValue = {
  store: new GraphiteStore(),
};

const StoreContext = createContext(defaultStoreProviderValue);

export default StoreContext;

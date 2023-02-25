import { useContext, useMemo } from 'react';
import StoreContext from './GraphiteStoreContext';

export const useStore = () => {
  const store = useContext(StoreContext);

  if (store === null) {
    throw new Error('Store cannot be found');
  }

  return useMemo(
    () => ({
      ...store,
    }),
    [store],
  );
};

import { useContext } from 'react';
import StoreContext from './GraphiteStoreContext';

export const useStore = () => {
  return useContext(StoreContext);
};

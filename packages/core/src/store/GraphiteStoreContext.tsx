import { createContext } from 'react';
import { initStore } from './store';

const StoreContext = createContext<ReturnType<typeof initStore> | null>(null);

export default StoreContext;

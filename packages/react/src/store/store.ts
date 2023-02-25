import { createStore } from 'zustand';
import { init } from './init';
import { GraphiteStore } from './types';

export const initStore = () =>
  createStore<GraphiteStore>((set, get) => ({
    ...init,
    reset: set({ ...init }),
  }));

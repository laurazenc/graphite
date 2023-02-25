import { Rectangle } from 'graphite-core';
import { GraphiteStore } from './types';

export const init: GraphiteStore = {
  nodes: [
    {
      rect: Rectangle.fromRect({ left: 50, top: 50, height: 60, width: 90 }),
      side: 'LEFT',
    },

    {
      rect: Rectangle.fromRect({ left: 250, top: 100, height: 60, width: 90 }),
      side: 'BOTTOM',
    },
    {
      rect: Rectangle.fromRect({ left: 150, top: 200, height: 60, width: 90 }),
      side: 'BOTTOM',
    },
  ],
  connectors: [],
};

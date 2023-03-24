import { Vertex } from 'graphite-core';
import { ConnectorProps } from '../components/Connection/types';

export type GraphiteStore = {
  nodes: Vertex[];
  connectors: ConnectorProps[];
};

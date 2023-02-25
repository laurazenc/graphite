import { Vertex } from 'graphite-core';
import { ConnectorProps } from '../components';

export type GraphiteStore = {
  nodes: Vertex[];
  connectors: ConnectorProps[];
};

import { ConnectorProps } from '../components/Connector/Connector';
import { Vertex } from '../routing/path-finder';

export type GraphiteStore = {
  nodes: Vertex[];
  connectors: ConnectorProps[];
};

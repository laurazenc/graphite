import { CoordinateProps, Vertex } from 'graphite-core';

export interface ConnectorProps {
  source: Vertex;
  target: Vertex;
}

export type CommandFn = (point: CoordinateProps, i: number, a: CoordinateProps[]) => string;

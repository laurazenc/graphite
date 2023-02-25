import { Coordinate, Vertex } from 'graphite-core';

export interface ConnectorProps {
  source: Vertex;
  target: Vertex;
}

export type CommandFn = (point: Coordinate, i: number, a: Coordinate[]) => string;

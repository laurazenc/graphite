import { Rectangle } from './rectangle';
import { Coordinate } from '../../components';
import { Side } from '../../components/port';

export interface Size {
  width: number;
  height: number;
}

export interface Rect extends Size {
  left: number;
  top: number;
}

export interface Connection {
  a: Coordinate;
  b: Coordinate;
}

export interface Line {
  a: Coordinate;
  b: Coordinate;
}

export interface Point {
  node: string;
  side: Side;
}

export type Direction = 'v' | 'h';

export interface Vertex {
  rect: Rectangle;
  side: Side;
}

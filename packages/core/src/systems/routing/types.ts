import { Rectangle } from './rectangle';
import { CoordinateProps } from '../../components';
import { Side } from '../../components';

export interface Size {
  width: number;
  height: number;
}

export interface Rect extends Size {
  left: number;
  top: number;
}

export interface Connection {
  a: CoordinateProps;
  b: CoordinateProps;
}

export interface Line {
  a: CoordinateProps;
  b: CoordinateProps;
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

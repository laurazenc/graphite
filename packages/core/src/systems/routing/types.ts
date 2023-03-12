import { Rectangle } from './rectangle';
import { Coordinate } from '../../components';

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

export type Side = keyof typeof SIDE;

export interface Point {
  node: string;
  side: Side;
}

export type Direction = 'v' | 'h';

export enum SIDE {
  LEFT = 'LEFT',
  TOP = 'TOP',
  RIGHT = 'RIGHT',
  BOTTOM = 'BOTTOM',
}

export interface Vertex {
  rect: Rectangle;
  side: Side;
}

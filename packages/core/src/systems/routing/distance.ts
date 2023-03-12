import { Coordinate } from '../../components';

function distance(a: Coordinate, b: Coordinate): number {
  return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
}

export { distance };
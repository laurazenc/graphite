import { CoordinateProps } from '../../components';

export function distance(a: CoordinateProps, b: CoordinateProps): number {
  return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
}

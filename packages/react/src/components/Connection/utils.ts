import { CoordinateProps, distance } from 'graphite-core';
import { CommandFn } from './types';

const RADIUS = 8;

export function generateSVGPath(points: CoordinateProps[], command: CommandFn): string {
  return points.reduce((acc, point, i, a) => {
    let segment: string;

    if (i > 0 && i < points.length - 1) {
      segment = `${acc} ${command(point, i, a)}`;
    } else {
      segment = `${i === 0 ? 'M' : 'L'}${point.x} ${point.y}`;
    }

    acc += segment;
    return acc;
  }, '');
}

const controlPoint = (current: CoordinateProps, previous: CoordinateProps, next: CoordinateProps, reverse: boolean) => {
  // When 'current' is the first or last point of the array
  // 'previous' or 'next' don't exist.
  // Replace with 'current'
  const p = previous || current;
  const n = next || current;
  // The smoothing ratio
  const smoothing = 0.2;
  // Properties of the opposed-line
  const o = line(p, n);
  // If is end-control-point, add PI to the angle to go backward
  const angle = o.angle + (reverse ? Math.PI : 0);
  const length = o.length * smoothing;
  // The control point position is relative to the current point
  const x = current.x + Math.cos(angle) * length;
  const y = current.y + Math.sin(angle) * length;
  return [x, y];
};

const line = (pointA: CoordinateProps, pointB: CoordinateProps) => {
  const lengthX = pointB.x - pointA.x;
  const lengthY = pointB.y - pointA.y;
  return {
    length: Math.sqrt(Math.pow(lengthX, 2) + Math.pow(lengthY, 2)),
    angle: Math.atan2(lengthY, lengthX),
  };
};

const lineCommand: CommandFn = (point: CoordinateProps) => `L ${point.x} ${point.y}`;

const bezierCommand: CommandFn = (point: CoordinateProps, i: number, a: CoordinateProps[]): string => {
  // start control point
  const [cpsX, cpsY] = controlPoint(a[i - 1], a[i - 2], point, false);
  // end control point
  const [cpeX, cpeY] = controlPoint(point, a[i - 1], a[i + 1], true);
  return `C ${cpsX},${cpsY} ${cpeX},${cpeY} ${point.x},${point.y}`;
};

const smoothStepCommand: CommandFn = (point: CoordinateProps, i: number, a: CoordinateProps[]): string => {
  const start: CoordinateProps = a[i - 1];
  const middle: CoordinateProps = point;
  const end: CoordinateProps = a[i + 1];

  const bendSize = Math.min(distance(start, middle) / 2, distance(middle, end) / 2, RADIUS);
  const { x, y } = middle;

  if ((start.x === x && x === end.x) || (start.y === y && y === end.y)) {
    return `L${x} ${y}`;
  }

  if (start.y === y) {
    const xDir = start.x < end.x ? -1 : 1;
    const yDir = start.y < end.y ? 1 : -1;
    return `L ${x + bendSize * xDir},${y}Q ${x},${y} ${x},${y + bendSize * yDir}`;
  }

  const xDir = start.x < end.x ? 1 : -1;
  const yDir = start.y < end.y ? -1 : 1;
  return `L ${x},${y + bendSize * yDir}Q ${x},${y} ${x + bendSize * xDir},${y}`;
};

export { lineCommand, bezierCommand, smoothStepCommand };

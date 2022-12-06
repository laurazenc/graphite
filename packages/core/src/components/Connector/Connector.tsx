import pathFinder, { Vertex } from '../../routing/path-finder';
import { Coordinate } from '../../routing/types';
import distance from '../../routing/distance';

export interface ConnectorProps {
  source: Vertex;
  target: Vertex;
}

type CommandFn = (point: Coordinate, i: number, a: Coordinate[]) => string;

const RADIUS = 8;

function generateSVGPath(points: Coordinate[], command: CommandFn): string {
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

const controlPoint = (current, previous, next, reverse) => {
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

const line = (pointA, pointB) => {
  const lengthX = pointB.x - pointA.x;
  const lengthY = pointB.y - pointA.y;
  return {
    length: Math.sqrt(Math.pow(lengthX, 2) + Math.pow(lengthY, 2)),
    angle: Math.atan2(lengthY, lengthX),
  };
};

const lineCommand: CommandFn = (point: Coordinate) => `L ${point.x} ${point.y}`;

const bezierCommand: CommandFn = (point: Coordinate, i: number, a: Coordinate[]): string => {
  console.log(point, i, a);
  // start control point
  const [cpsX, cpsY] = controlPoint(a[i - 1], a[i - 2], point);
  // end control point
  const [cpeX, cpeY] = controlPoint(point, a[i - 1], a[i + 1], true);
  return `C ${cpsX},${cpsY} ${cpeX},${cpeY} ${point.x},${point.y}`;
};

const smoothStepCommand: CommandFn = (point: Coordinate, i: number, a: Coordinate[]): string => {
  const start = a[i - 1];
  const middle = point;
  const end = a[i + 1];

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

export default function Connector({ source, target }: ConnectorProps) {
  const path = pathFinder(source, target);
  const svgPath = generateSVGPath(path, smoothStepCommand);

  return (
    <svg
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
      }}
    >
      <path d={svgPath} fill="none" stroke="grey" />
    </svg>
  );
}

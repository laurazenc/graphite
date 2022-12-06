import pathFinder, { Vertex } from '../../routing/path-finder';
import { Coordinate } from '../../routing/types';

export interface ConnectorProps {
  source: Vertex;
  target: Vertex;
}

function generateSVGPath(points: Coordinate[], command): string {
  const d = points.reduce((acc, point, i, a) => {
    console.log(acc);
    return i === 0 ? `M ${point.x},${point.y}` : `${acc} ${command(point, i, a)}`;
  }, '');
  /*const d = points
    .map((point, index) => {
      if (index === 0) {
        return `M ${point.x} ${point.y}`;
      }
      return `C ${point.x - 10} ${point.y - 10} ${point.x + 10} ${point.y + 10} ${point.x} ${point.y}`;
    })
    .join(' ');*/
  console.log(d);
  return d;
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

const lineCommand = (point: Coordinate) => `L ${point.x} ${point.y}`;

const bezierCommand = (point: Coordinate, i, a) => {
  console.log(point, i, a);
  // start control point
  const [cpsX, cpsY] = controlPoint(a[i - 1], a[i - 2], point);
  // end control point
  const [cpeX, cpeY] = controlPoint(point, a[i - 1], a[i + 1], true);
  return `C ${cpsX},${cpsY} ${cpeX},${cpeY} ${point.x},${point.y}`;
};

export default function Connector({ source, target }: ConnectorProps) {
  const path = pathFinder(source, target);
  const svgPath = generateSVGPath(path, lineCommand);

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

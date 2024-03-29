import { Vertex } from './types';
import { shortestPath } from './graph';
import { Rectangle } from './rectangle';
import { buildGraph } from './build-graph';
import { CoordinateProps } from '../../components';

const MIN_SPACE = 10;

function buildHorizontalRuler(rect: Rectangle): number[] {
  const minState = rect.isPoint() ? 0 : MIN_SPACE;
  const horizontalRulers: number[] = [];
  horizontalRulers.push(rect.top - minState);
  horizontalRulers.push(rect.top);
  horizontalRulers.push(rect.bottom - rect.height / 2);
  horizontalRulers.push(rect.bottom);
  horizontalRulers.push(rect.bottom + minState);
  return horizontalRulers;
}

function buildVerticalRuler(rect: Rectangle): number[] {
  const verticalRulers: number[] = [];
  const minState = rect.isPoint() ? 0 : MIN_SPACE;

  verticalRulers.push(rect.left - minState);
  verticalRulers.push(rect.left);
  verticalRulers.push(rect.left + rect.width / 2);
  verticalRulers.push(rect.right);
  verticalRulers.push(rect.right + minState);
  return verticalRulers;
}

function getRulers(source: Rectangle, target: Rectangle) {
  const horizontals: number[] = [...buildHorizontalRuler(source), ...buildHorizontalRuler(target)];
  const verticals: number[] = [...buildVerticalRuler(source), ...buildVerticalRuler(target)];
  horizontals.sort((a, b) => a - b);
  verticals.sort((a, b) => a - b);

  return [horizontals, verticals];
}

type BasicCardinalPoint = 'n' | 'e' | 's' | 'w';
type BendDirection = BasicCardinalPoint | 'unknown' | 'none';

function getBend(a: CoordinateProps, b: CoordinateProps, c: CoordinateProps): BendDirection {
  const equalX = a.x === b.x && b.x === c.x;
  const equalY = a.y === b.y && b.y === c.y;
  const segment1Horizontal = a.y === b.y;
  const segment1Vertical = a.x === b.x;
  const segment2Horizontal = b.y === c.y;
  const segment2Vertical = b.x === c.x;

  if (equalX || equalY) {
    return 'none';
  }

  if (!(segment1Vertical || segment1Horizontal) || !(segment2Vertical || segment2Horizontal)) {
    return 'unknown';
  }

  if (segment1Horizontal && segment2Vertical) {
    return c.y > b.y ? 's' : 'n';
  } else if (segment1Vertical && segment2Horizontal) {
    return c.x > b.x ? 'e' : 'w';
  }

  throw new Error('Nope');
}

function simplifyPath(points: CoordinateProps[]): CoordinateProps[] {
  if (points.length <= 2) {
    return points;
  }

  const r: CoordinateProps[] = [points[0]];
  for (let i = 1; i < points.length; i++) {
    const cur = points[i];

    if (i === points.length - 1) {
      r.push(cur);
      break;
    }

    const prev = points[i - 1];
    const next = points[i + 1];
    const bend = getBend(prev, cur, next);
    if (bend !== 'none') {
      r.push(cur);
    }
  }
  return r;
}

export function pathFinder(source: Vertex, target: Vertex) {
  const pointA = source.rect.startPoint(source.side);
  const pointB = target.rect.startPoint(target.side);
  const points: CoordinateProps[] = [];
  // Rulers
  const [horizontalRulers, verticalRulers] = getRulers(source.rect, target.rect);
  // Points
  for (const y of horizontalRulers) {
    for (const x of verticalRulers) {
      const point: CoordinateProps = { x, y };
      const collision = [source.rect, target.rect].filter((o) => o.contains(point));
      if (!collision.length) {
        points.push(point);
      }
    }
  }

  points.push(pointA);
  points.push(pointB);
  const { graph, connections } = buildGraph(points);
  const path = shortestPath(graph, pointA, pointB);

  if (path.length > 0) {
    return simplifyPath([pointA, ...shortestPath(graph, pointA, pointB), pointB]);
  } else {
    return [];
  }
}

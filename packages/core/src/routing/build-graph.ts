import { Coordinate, Line } from './types';
import PointGraph from './graph';

export function buildGraph(points: Coordinate[]): { graph: PointGraph; connections: Line[] } {
  const hotXs: number[] = [];
  const hotYs: number[] = [];
  const graph = new PointGraph();
  const connections: Line[] = [];

  points.forEach((p) => {
    const { x, y } = p;
    if (hotXs.indexOf(x) < 0) hotXs.push(x);
    if (hotYs.indexOf(y) < 0) hotYs.push(y);

    graph.add(p);
  });

  hotXs.sort((a, b) => a - b);
  hotYs.sort((a, b) => a - b);
  const inHotIndex = (p: Coordinate): boolean => graph.has(p);

  for (let i = 0; i < hotYs.length; i++) {
    for (let j = 0; j < hotXs.length; j++) {
      const b = { x: hotXs[j], y: hotYs[i] };

      if (!inHotIndex(b)) continue;

      if (j > 0) {
        const a = { x: hotXs[j - 1], y: hotYs[i] };

        if (inHotIndex(a)) {
          graph.connect(a, b);
          graph.connect(b, a);
          connections.push({ a, b });
        }
      }

      if (i > 0) {
        const a = { x: hotXs[j], y: hotYs[i - 1] };

        if (inHotIndex(a)) {
          graph.connect(a, b);
          graph.connect(b, a);
          connections.push({ a, b });
        }
      }
    }
  }

  return { graph, connections };
}

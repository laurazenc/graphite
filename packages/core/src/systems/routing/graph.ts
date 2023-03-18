import { Direction } from './types';
import { distance as calculateDistance } from './distance';
import { Coordinate, CoordinateProps } from '../../components';

class PointNode {
  public distance = Infinity;
  public shortestPath: PointNode[] = [];
  public adjacentNodes: Map<PointNode, number> = new Map();

  constructor(public data: CoordinateProps) {}
}

class PointGraph {
  private index: { [x: string]: { [y: string]: PointNode } } = {};

  add(p: CoordinateProps) {
    const { x, y } = p;
    const xs = x.toString(),
      ys = y.toString();

    if (!(xs in this.index)) {
      this.index[xs] = {};
    }
    if (!(ys in this.index[xs])) {
      this.index[xs][ys] = new PointNode(p);
    }
  }

  has(p: Coordinate): boolean {
    const { x, y } = p;
    const xs = x.toString(),
      ys = y.toString();
    return xs in this.index && ys in this.index[xs];
  }

  connect(a: Coordinate, b: Coordinate) {
    const nodeA = this.get(a);
    const nodeB = this.get(b);

    if (!nodeA || !nodeB) {
      throw new Error(`A point was not found`);
    }

    nodeA.adjacentNodes.set(nodeB, calculateDistance(a, b));
  }

  get(p: CoordinateProps): PointNode {
    const { x, y } = p;
    let point = null;
    const xs = x.toString(),
      ys = y.toString();

    if (xs in this.index && ys in this.index[xs]) {
      point = this.index[xs][ys];
    }

    if (!point) {
      throw new Error('Point dot not exist');
    }

    return point;
  }

  private getLowestDistanceNode(unsettledNodes: Set<PointNode>): PointNode {
    let lowestDistanceNode: PointNode | null = null;
    let lowestDistance = Number.MAX_SAFE_INTEGER;
    for (const node of unsettledNodes) {
      const nodeDistance = node.distance;
      if (nodeDistance < lowestDistance) {
        lowestDistance = nodeDistance;
        lowestDistanceNode = node;
      }
    }
    return lowestDistanceNode!;
  }

  private inferPathDirection(node: PointNode): Direction | null {
    if (node.shortestPath.length == 0) {
      return null;
    }

    return this.directionOfNodes(node.shortestPath[node.shortestPath.length - 1], node);
  }

  private directionOfNodes(a: PointNode, b: PointNode): Direction | null {
    return this.directionOf(a.data, b.data);
  }

  private directionOf(a: CoordinateProps, b: CoordinateProps): Direction | null {
    if (a.x === b.x) {
      return 'h';
    } else if (a.y === b.y) {
      return 'v';
    } else {
      return null;
    }
  }

  private calculateMinimumDistance(evaluationNode: PointNode, edgeWeigh: number, sourceNode: PointNode) {
    const sourceDistance = sourceNode.distance;
    const comingDirection = this.inferPathDirection(sourceNode);
    const goingDirection = this.directionOfNodes(sourceNode, evaluationNode);
    const changingDirection = comingDirection && goingDirection && comingDirection != goingDirection;
    const extraWeigh = changingDirection ? Math.pow(edgeWeigh + 1, 2) : 0;

    if (sourceDistance + edgeWeigh + extraWeigh < evaluationNode.distance) {
      evaluationNode.distance = sourceDistance + edgeWeigh + extraWeigh;
      const shortestPath: PointNode[] = [...sourceNode.shortestPath];
      shortestPath.push(sourceNode);
      evaluationNode.shortestPath = shortestPath;
    }
  }

  calculateShortestPathFromSource(graph: PointGraph, source: PointNode): PointGraph {
    source.distance = 0;

    const settledNodes: Set<PointNode> = new Set();
    const unsettledNodes: Set<PointNode> = new Set();

    unsettledNodes.add(source);

    while (unsettledNodes.size != 0) {
      const currentNode = this.getLowestDistanceNode(unsettledNodes);
      unsettledNodes.delete(currentNode);

      for (const [adjacentNode, edgeWeight] of currentNode.adjacentNodes) {
        if (!settledNodes.has(adjacentNode)) {
          this.calculateMinimumDistance(adjacentNode, edgeWeight, currentNode);
          unsettledNodes.add(adjacentNode);
        }
      }
      settledNodes.add(currentNode);
    }

    return graph;
  }
}

export function shortestPath(
  graph: PointGraph,
  origin: CoordinateProps,
  destination: CoordinateProps,
): CoordinateProps[] {
  const originNode = graph.get(origin);
  const destinationNode = graph.get(destination);

  if (!originNode) {
    throw new Error(`Origin node {${origin.x},${origin.y}} not found`);
  }

  if (!destinationNode) {
    throw new Error(`Origin node {${origin.x},${origin.y}} not found`);
  }

  graph.calculateShortestPathFromSource(graph, originNode);

  return destinationNode.shortestPath.map((n) => n.data);
}

export { PointGraph };

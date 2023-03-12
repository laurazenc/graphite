import { pathFinder } from './path-finder';
import { Rectangle } from './rectangle';
import { Vertex } from './types';
import { Coordinate } from '../../components';

const source: Vertex = {
  rect: Rectangle.fromRect({ left: 50, top: 50, height: 60, width: 90 }),
  side: 'LEFT',
};

const target: Vertex = {
  rect: Rectangle.fromRect({ left: 250, top: 100, height: 60, width: 90 }),
  side: 'BOTTOM',
};

describe('Path Finder', () => {
  it('should return the best path', () => {
    const expectedPath: Coordinate[] = [
      {
        x: 50,
        y: 80,
      },
      {
        x: 40,
        y: 80,
      },
      {
        x: 40,
        y: 170,
      },
      {
        x: 295,
        y: 170,
      },
      {
        x: 295,
        y: 160,
      },
    ] as Coordinate[];
    const path = pathFinder(source, target);
    expect(path).toEqual(expectedPath);
  });
});

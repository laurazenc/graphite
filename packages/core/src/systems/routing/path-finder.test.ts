import { pathFinder } from './path-finder';
import { Rectangle } from './rectangle';
import { Vertex } from './types';
import { CoordinateProps, Side } from '../../components';

const source: Vertex = {
  rect: Rectangle.fromRect({ left: 50, top: 50, height: 60, width: 90 }),
  side: Side.LEFT,
};

const target: Vertex = {
  rect: Rectangle.fromRect({ left: 250, top: 100, height: 60, width: 90 }),
  side: Side.BOTTOM,
};

describe('Path Finder', () => {
  it('should return the best path', () => {
    const expectedPath: CoordinateProps[] = [
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
    ];
    const path = pathFinder(source, target);
    expect(JSON.stringify(path)).toEqual(JSON.stringify(expectedPath));
  });

  it('should handle left turns', () => {
    const expectedPath: CoordinateProps[] = [
      { x: 295, y: 160 },
      { x: 295, y: 170 },
      { x: 40, y: 170 },
      { x: 40, y: 80 },
      { x: 50, y: 80 },
    ];
    const path = pathFinder(target, source);
    expect(JSON.stringify(path)).toEqual(JSON.stringify(expectedPath));
  });
});

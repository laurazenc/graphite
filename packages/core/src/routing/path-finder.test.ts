import pathFinder, { Vertex } from './path-finder';
import Rectangle from './Rectangle';

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
    console.log(pathFinder(source, target));
  });
});

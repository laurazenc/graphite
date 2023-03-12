import { Node } from './index';
import { Size } from '../size';
import { Coordinate } from '../coordinate';

describe('Node', () => {
  it('should handle inputs and outputs', () => {
    const node = new Node({
      name: 'My node',
      size: new Size({ width: 100, height: 100 }),
      coordinates: new Coordinate({ x: 40, y: 50 }),
    });

    expect(node.id).toBeDefined();
    expect(node.inputs).toEqual([]);
    expect(node.outputs).toEqual([]);
  });

  it('can update a node size', () => {
    const node = new Node({
      name: 'My node',
      size: new Size({ width: 100, height: 100 }),
      coordinates: new Coordinate({ x: 40, y: 50 }),
    });
    node.size.setWidth(600);
    expect(node.size.width).toEqual(600);
  });
});

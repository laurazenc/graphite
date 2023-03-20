import { Node } from './index';
import { Side, Type } from '../port';

const nodeA = new Node({
  name: 'A',
  inputs: [],
  outputs: [],
});

const nodeB = new Node({
  name: 'A',
  inputs: [],
  outputs: [],
});

describe('Node', () => {
  it('should handle inputs and outputs', () => {
    const node = new Node({
      name: 'My node',
    });

    expect(node.id).toBeDefined();
    expect(node.inputs).toEqual([]);
    expect(node.outputs).toEqual([]);
  });

  it('can update a node size', () => {
    const node = new Node({
      name: 'My node',
    });
    node.size.setWidth(600);
    expect(node.size.width).toEqual(600);
  });

  describe('Ports', () => {
    it('should return sides from ports in the same side', () => {
      const node = new Node({
        name: 'My node',

        inputs: [{ node: nodeA, side: Side.TOP, type: Type.INPUT }],
        outputs: [{ node: nodeB, side: Side.TOP, type: Type.OUTPUT }],
      });

      expect(node.getFilledSides()).toEqual([Side.TOP]);
    });
    it('should return sides from ports in different sides', () => {
      const node = new Node({
        name: 'My node',

        inputs: [
          { node: nodeA, side: Side.TOP, type: Type.INPUT },
          { node: nodeB, side: Side.RIGHT, type: Type.INPUT },
        ],
        outputs: [
          { node: nodeA, side: Side.BOTTOM, type: Type.OUTPUT },
          { node: nodeB, side: Side.LEFT, type: Type.OUTPUT },
        ],
      });

      expect(node.getFilledSides()).toEqual(expect.arrayContaining([Side.RIGHT, Side.LEFT, Side.BOTTOM, Side.TOP]));
    });
  });
});

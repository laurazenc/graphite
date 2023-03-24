import { Node } from './index';
import { Side } from '../port';

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
    expect(node.ports).toEqual([]);
  });

  describe('Ports', () => {
    it('should return sides from ports in the same side', () => {
      const node = new Node({
        name: 'My node',
        inputs: [{ node: nodeA, side: Side.TOP }],
        outputs: [{ node: nodeB, side: Side.TOP }],
      });

      expect(node.getFilledSides()).toEqual([Side.TOP]);
    });
    it('should return sides from ports in different sides', () => {
      const node = new Node({
        name: 'My node',
        inputs: [
          { node: nodeA, side: Side.TOP },
          { node: nodeB, side: Side.RIGHT },
        ],
        outputs: [
          { node: nodeA, side: Side.BOTTOM },
          { node: nodeB, side: Side.LEFT },
        ],
      });

      expect(node.getFilledSides()).toEqual(expect.arrayContaining([Side.RIGHT, Side.LEFT, Side.BOTTOM, Side.TOP]));
    });
  });
});

import { Node } from './index';
import { Side } from '../port/type';

describe('Node', () => {
  it('should handle inputs and outputs', () => {
    const node = new Node({
      name: 'My node',
      size: { width: 100, height: 100 },
      coordinate: { x: 40, y: 50 },
    });

    expect(node.id).toBeDefined();
    expect(node.inputs).toEqual([]);
    expect(node.outputs).toEqual([]);
  });

  it('can update a node size', () => {
    const node = new Node({
      name: 'My node',
      size: { width: 100, height: 100 },
      coordinate: { x: 40, y: 50 },
    });
    node.size.setWidth(600);
    expect(node.size.width).toEqual(600);
  });

  describe('Ports', () => {
    it('should return sides from ports in the same side', () => {
      const node = new Node({
        name: 'My node',
        size: { width: 100, height: 100 },
        coordinate: { x: 40, y: 50 },
        inputs: [{ nodeId: '1', side: Side.TOP }],
        outputs: [{ nodeId: '2', side: Side.TOP }],
      });

      expect(node.getFilledSides()).toEqual([Side.TOP]);
    });
    it('should return sides from ports in different sides', () => {
      const node = new Node({
        name: 'My node',
        size: { width: 100, height: 100 },
        coordinate: { x: 40, y: 50 },
        inputs: [
          { nodeId: '1', side: Side.TOP },
          { nodeId: '2', side: Side.RIGHT },
        ],
        outputs: [
          { nodeId: '3', side: Side.BOTTOM },
          { nodeId: '4', side: Side.LEFT },
        ],
      });

      expect(node.getFilledSides()).toEqual(expect.arrayContaining([Side.RIGHT, Side.LEFT, Side.BOTTOM, Side.TOP]));
    });
  });
});

import { useStore } from '../../store/useStore';
import Node from '../../components/Node/Node';

const NodeRenderer = () => {
  const { getState } = useStore();
  const nodes = getState().nodes;
  return (
    <div className="node-renderer">
      {nodes.map((node, i) => {
        return (
          <Node
            x={node.rect.left}
            y={node.rect.top}
            id={`node-${i}`}
            key={`node-${i}`}
            width={node.rect.width}
            height={node.rect.height}
          >
            {`Node ${i}`}
          </Node>
        );
      })}
    </div>
  );
};

export default NodeRenderer;

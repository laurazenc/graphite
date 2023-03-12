import { useStore } from '../../store/useStore';
import { Node as _Node } from 'graphite-core';
import { Node } from '../../components';

function NodeRenderer() {
  const { store } = useStore();
  const { nodes } = store;

  return (
    <>
      {Array.from(nodes.values()).map((node: _Node) => {
        return <Node node={node} key={node.id} />;
      })}
    </>
  );
}

export { NodeRenderer };

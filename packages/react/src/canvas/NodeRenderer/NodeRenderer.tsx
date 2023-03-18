import { Node as _Node } from 'graphite-core';
import { Node } from '../../components';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../store/useStore';

const NodeRenderer = observer(() => {
  const { store } = useStore();
  return (
    <>
      {Array.from(store.nodes.values()).map((node: _Node) => {
        return <Node node={node} key={node.id} />;
      })}
    </>
  );
});

export { NodeRenderer };

import { Node as _Node } from 'graphite-core';
import { Node } from '../../components';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../store/useStore';

const NodeRenderer = observer(() => {
  const { store } = useStore();
  return (
    <div className="h-full left-0 absolute top-0 w-full overflow-visible pointer-events-none">
      {Array.from(store.nodes.values()).map((node: _Node) => {
        return <Node node={node} key={node.id} />;
      })}
    </div>
  );
});

export { NodeRenderer };

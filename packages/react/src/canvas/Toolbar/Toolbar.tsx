import { toolbarStyle, toolStyle } from './Toolbar.style';
import NodeIcon from '../../styles/assets/svgs/node';
import { observer } from 'mobx-react-lite';
import { useCallback } from 'react';
import { useStore } from '../../store/useStore';

export const Toolbar = observer(() => {
  const { store } = useStore();
  const handleAddNewNode = useCallback(() => {
    store.addNode({
      name: 'New node',
      coordinates: { x: store.mousePosition.x - 200, y: store.mousePosition.y + 100 },
    });
  }, []);

  return (
    <div id="toolbar" css={toolbarStyle}>
      <div className=".tool" css={toolStyle} onClick={handleAddNewNode}>
        <NodeIcon width="24px" height="24px" color="#e2e8f0" />
      </div>
    </div>
  );
});

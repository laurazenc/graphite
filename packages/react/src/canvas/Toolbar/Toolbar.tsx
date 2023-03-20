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
    <div
      id="toolbar"
      className="absolute top-3 right-3 rounded-[8px] p-[8px] shadow-sm rounded-md p-2 flex flex-col items-start bg-white border border-gray-200"
    >
      <div
        className=".tool rounded-[8px] flex justify-center items-center hover:cursor-pointer"
        onClick={handleAddNewNode}
      >
        <NodeIcon className="fill-gray-600 w-[24px] h-[24px] hover:fill-gray-800" />
      </div>
    </div>
  );
});

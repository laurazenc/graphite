import { observer } from 'mobx-react-lite';
import { statusBarStyle } from './StatusBar.style';
import { useStore } from '../../store/useStore';

export const StatusBar = observer(() => {
  const { store } = useStore();
  return (
    <div id="status-bar" css={statusBarStyle}>
      Mouse position: x {store.mousePosition.x} y {store.mousePosition.y}
      Draft: {store.draftConnection ? store.draftConnection.node.name : null}
    </div>
  );
});

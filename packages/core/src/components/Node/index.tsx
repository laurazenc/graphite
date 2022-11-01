import { ReactNode, useCallback, useEffect, useRef } from 'react';
import { useMachine } from '@xstate/react';
import nodeDragAndDropMachine from '../../machines/nodeDragAndDropMachine';

interface NodeProps {
  children: ReactNode;
  x: number;
  y: number;
}

const Node = ({ children, x, y }: NodeProps) => {
  const nodeRef = useRef<HTMLDivElement>(null);
  const [state, send] = useMachine(nodeDragAndDropMachine);

  useEffect(() => {
    if (!nodeRef.current) return;
    send('SET_POS', { x, y });
  }, [x, y]);

  const onMouseDownHandler = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    send(event);
  };
  const onMouseLeaveHandler = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    if (state.value !== 'idle') {
      send(event);
    }
  };
  const onMouseUpHandler = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    send(event);
  };
  const onMouseMoveHandler = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    if (state.value !== 'idle') {
      send(event);
    }
  };

  return (
    <div
      className="node"
      ref={nodeRef}
      style={{
        left: state.context.x,
        top: state.context.y,
        cursor: state.value === 'dragging' ? 'grabbing' : 'pointer',
      }}
      role="button"
      onMouseDown={onMouseDownHandler}
      // onMouseEnter={onMouseEnterHandler}
      onMouseLeave={onMouseLeaveHandler}
      onMouseMove={onMouseMoveHandler}
      onMouseUp={onMouseUpHandler}
    >
      {children}
    </div>
  );
};

Node.displayName = 'Node';

export default Node;

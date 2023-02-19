import { ReactNode, useEffect, useRef, MouseEvent } from 'react';
import { useMachine } from '@xstate/react';
import nodeDragAndDropMachine from '../../machines/nodeDragAndDropMachine';

interface NodeProps {
  id: string;
  children: ReactNode;
  x: number;
  y: number;
  width: number;
  height: number;
}

const Node = ({ children, x, y, width, height, ...rest }: NodeProps) => {
  const nodeRef = useRef<HTMLDivElement>(null);
  const [state, send] = useMachine(nodeDragAndDropMachine);

  useEffect(() => {
    if (!nodeRef.current) return;
    send('SET_POS', { x, y });
  }, [send, x, y]);

  const onMouseDownHandler = (event: MouseEvent<HTMLDivElement, MouseEvent>): void => {
    send(event);
  };
  const onMouseLeaveHandler = (event: MouseEvent<HTMLDivElement, MouseEvent>): void => {
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
        width: `${width}px`,
        height: `${height}px`,
      }}
      role="button"
      onMouseDown={onMouseDownHandler}
      onMouseLeave={onMouseLeaveHandler}
      onMouseMove={onMouseMoveHandler}
      onMouseUp={onMouseUpHandler}
      {...rest}
    >
      {children}
    </div>
  );
};

Node.displayName = 'Node';

export default Node;

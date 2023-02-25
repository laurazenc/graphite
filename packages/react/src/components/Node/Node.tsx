import { useEffect, useRef, MouseEvent, MouseEventHandler, HTMLAttributes, DetailedHTMLProps } from 'react';
import { useMachine } from '@xstate/react';
import nodeDragAndDropMachine from '../../machines/nodeDragAndDropMachine';
import { NodeProps } from './types';

const Node = ({ children, x, y, width, height, ...rest }: NodeProps) => {
  const nodeRef = useRef<HTMLDivElement>(null);
  const [state, send] = useMachine(nodeDragAndDropMachine);

  useEffect(() => {
    if (!nodeRef.current) return;
    send('SET_POS', { x, y });
  }, [send, x, y]);

  const onMouseDownHandler = (event: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>): void => {
    send(event as any);
  };
  const onMouseLeaveHandler = (event: MouseEvent<HTMLDivElement, MouseEvent>): void => {
    if (state.value !== 'idle') {
      send(event as any);
    }
  };
  const onMouseUpHandler = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    send(event as any);
  };
  const onMouseMoveHandler = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    if (state.value !== 'idle') {
      send(event as any);
    }
  };

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
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
      onMouseDown={onMouseDownHandler as any}
      onMouseLeave={onMouseLeaveHandler as any}
      onMouseMove={onMouseMoveHandler as any}
      onMouseUp={onMouseUpHandler as any}
      {...rest}
    >
      {children}
    </div>
  );
};

Node.displayName = 'Node';

export { Node };

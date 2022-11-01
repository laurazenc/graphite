import { createMachine, assign } from 'xstate';

interface Event extends React.MouseEvent<HTMLDivElement, MouseEvent> {
  type: string;
  x?: number;
  y?: number;
}

const nodeDragAndDropMachine = createMachine(
  {
    id: 'drag-and-drop',
    schema: {
      events: {} as Event,
    },
    predictableActionArguments: true,
    initial: 'idle',
    context: {
      pointerX: 0,
      threshold: 20,
      pointerY: 0,
      x: 0,
      y: 0,
    },
    on: {
      SET_POS: {
        actions: ['setRefData'],
      },
    },
    states: {
      idle: {
        on: {
          mousedown: {
            target: 'dragging',
            actions: 'setMousePos',
          },
        },
      },
      dragging: {
        on: {
          mousemove: {
            target: 'dragging',
            actions: ['moveDraggable', 'setMousePos'],
          },
          mouseup: {
            target: 'idle',
          },
          mouseleave: {
            target: 'dragging',

            actions: ['moveDraggable', 'setMousePos'],
          },
        },
      },
    },
  },
  {
    actions: {
      setMousePos: assign((ctx, e) => {
        return {
          ...ctx,
          pointerX: e.clientX,
          pointerY: e.clientY,
        };
      }),
      setRefData: assign((ctx, e) => ({ ...ctx, ...{ x: e.x, y: e.y } })),
      moveDraggable: assign((ctx, e) => {
        const nextX = e.clientX - ctx.pointerX + ctx.x;
        const nextY = e.clientY - ctx.pointerY + ctx.y;

        return { ...ctx, x: nextX, y: nextY };
      }),
    },
  }
);

export default nodeDragAndDropMachine;

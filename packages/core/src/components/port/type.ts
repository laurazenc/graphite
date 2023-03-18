import { Node } from '../node';

export enum Side {
  TOP = 'top',
  RIGHT = 'right',
  BOTTOM = 'bottom',
  LEFT = 'left',
}

export type SideType = keyof typeof Side;
export type PortProps = { side: Side; node: Node };

import { Node } from '../node';

export enum Type {
  INPUT = 'input',
  OUTPUT = 'output',
}

export enum Side {
  TOP = 'top',
  RIGHT = 'right',
  BOTTOM = 'bottom',
  LEFT = 'left',
}

export type PortProps = { type: Type; side: Side; nodeId: Node['id'] };
export type InputPortProps = Omit<PortProps, 'type'>;
export type OutputPortProps = Omit<PortProps, 'type'>;

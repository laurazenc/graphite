import { v4 as uuid } from 'uuid';
import { Type, Side, PortProps } from './type';
import { Node } from '../node';

abstract class Port {
  static id = uuid();
  type: Type;
  side: Side;
  node: Node['id'];
  constructor({ type, side, nodeId }: PortProps) {
    this.type = type;
    this.side = side;
    this.node = nodeId;
  }
}

export default Port;

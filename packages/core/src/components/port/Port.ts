import { PortProps, Side } from './type';
import { v4 as uuid } from 'uuid';
import { Node } from '../node';
import { makeAutoObservable } from 'mobx';
import { Connection } from '../connection';

class Port {
  public id = uuid();
  side: Side;
  node: Node;
  connections: Connection[] = [];

  constructor({ side, node }: PortProps) {
    this.side = side;
    this.node = node;
    makeAutoObservable(this);
  }

  public connect(input: Port): Connection {
    if (input === this) {
      throw new Error("A port can't be connected to itself");
    }
    return new Connection({ from: this, to: input });
  }

  public getNode(): Node {
    return this.node;
  }
}

export default Port;

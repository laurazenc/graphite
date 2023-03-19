import { v4 as uuid } from 'uuid';
import { Port, Side } from '../port';
import { Size } from '../size';
import { makeAutoObservable } from 'mobx';
import { Connection } from '../connection';
import { NodeConstructorArgs } from './types';

class Node {
  id = uuid();
  name: string;
  ports: Port[] = [];
  size: Size;

  constructor({ name, size }: NodeConstructorArgs) {
    this.name = name;
    this.size = size ? new Size(size) : new Size({ width: 100, height: 100 });
    this.generatePorts();

    makeAutoObservable(this);
  }

  private generatePorts() {
    this.ports.push(new Port({ node: this, side: Side.TOP }));
    this.ports.push(new Port({ node: this, side: Side.RIGHT }));
    this.ports.push(new Port({ node: this, side: Side.BOTTOM }));
    this.ports.push(new Port({ node: this, side: Side.LEFT }));
  }

  public getPorts() {
    return this.ports;
  }

  public getFilledSides(): Side[] {
    const sides = new Map<Side, Side>();
    this.ports.forEach((port) => {
      sides.set(port.side, port.side);
    });
    return Array.from(sides.values());
  }

  public get connections(): Connection[] {
    return [...this.ports]
      .flatMap((port) => {
        return port.connections;
      })
      .map((connection) => {
        return connection;
      });
  }
}

export default Node;

import { v4 as uuid } from 'uuid';
import { Port } from 'components/port';
import { makeAutoObservable } from 'mobx';

export class Connection {
  public id: string = uuid();
  public from: Port;
  public to: Port;
  public name: string;

  constructor({ from, to, name }: { from: Port; to: Port; name?: string }) {
    this.from = from;
    this.to = to;
    this.name = name || '';

    this.from.connections.push(this);
    this.to.connections.push(this);

    makeAutoObservable(this);
  }

  public setName(name: string) {
    this.name = name;
  }

  public dispose() {}
}

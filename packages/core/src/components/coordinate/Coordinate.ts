import { CoordinateProps } from './type';
import { action, makeAutoObservable } from 'mobx';

export class Coordinate {
  x: number;
  y: number;

  constructor({ x, y }: CoordinateProps) {
    this.x = x;
    this.y = y;
    makeAutoObservable(this);
  }

  static create(x: number, y: number): Coordinate {
    return new Coordinate({ x, y });
  }

  @action setX(x: number) {
    this.x = x;
  }

  @action setY(y: number) {
    this.y = y;
  }
}

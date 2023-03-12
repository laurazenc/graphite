import { SizeProps } from './type';
import { makeAutoObservable } from 'mobx';

class Size {
  width: number;
  height: number;

  constructor({ width, height }: SizeProps) {
    this.width = width;
    this.height = height;
    makeAutoObservable(this);
  }

  static create(width: number, height: number): Size {
    return new Size({ width, height });
  }

  public setWidth(width: number) {
    this.width = width;
  }

  public setHeight(height: number) {
    this.height = height;
  }
}

export default Size;

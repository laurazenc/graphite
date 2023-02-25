import { Coordinate, Rect, Side } from './types';

class Rectangle {
  constructor(readonly left: number, readonly top: number, readonly width: number, readonly height: number) {}
  static fromRect(r: Rect): Rectangle {
    return new Rectangle(r.left, r.top, r.width, r.height);
  }

  static fromOrth(left: number, top: number, right: number, bottom: number): Rectangle {
    return new Rectangle(left, top, right - left, bottom - top);
  }

  startPoint(side: Side): Coordinate {
    let point = { x: 0, y: 0 };
    switch (side) {
      case 'TOP':
        point = { x: this.left + this.right / 2, y: this.top };
        break;
      case 'BOTTOM':
        point = { x: this.left + this.width / 2, y: this.bottom };
        break;
      case 'LEFT':
        point = { x: this.left, y: this.top + this.height / 2 };
        break;
      case 'RIGHT':
        point = { x: this.right, y: this.top + this.height / 2 };
        break;
    }
    return point;
  }

  contains(p: Coordinate): boolean {
    return p.x >= this.left && p.x <= this.right && p.y >= this.top && p.y <= this.bottom;
  }

  /*inflate(horizontal: number, vertical: number): Rectangle {
    return Rectangle.fromOrth(
      this.left - horizontal,
      this.top - vertical,
      this.right + horizontal,
      this.bottom + vertical,
    );
  }

  intersects(rectangle: Rectangle): boolean {
    const thisX = this.left;
    const thisY = this.top;
    const thisW = this.width;
    const thisH = this.height;
    const rectX = rectangle.left;
    const rectY = rectangle.top;
    const rectW = rectangle.width;
    const rectH = rectangle.height;
    return rectX < thisX + thisW && thisX < rectX + rectW && rectY < thisY + thisH && thisY < rectY + rectH;
  }

  union(r: Rectangle): Rectangle {
    const x = [this.left, this.right, r.left, r.right];
    const y = [this.top, this.bottom, r.top, r.bottom];
    return Rectangle.fromOrth(Math.min(...x), Math.min(...y), Math.max(...x), Math.max(...y));
  }*/

  /* get center(): Coordinate {
    return {
      x: this.left + this.width / 2,
      y: this.top + this.height / 2,
    };
  }
*/
  get right(): number {
    return this.left + this.width;
  }

  get bottom(): number {
    return this.top + this.height;
  }

  /*get location(): Coordinate {
    return { x: this.left, y: this.top };
  }

  get northEast(): Coordinate {
    return { x: this.right, y: this.top };
  }

  get southEast(): Coordinate {
    return { x: this.right, y: this.bottom };
  }

  get southWest(): Coordinate {
    return { x: this.left, y: this.bottom };
  }

  get northWest(): Coordinate {
    return { x: this.left, y: this.top };
  }

  get east(): Coordinate {
    return { x: this.right, y: this.center.y };
  }

  get north(): Coordinate {
    return { x: this.center.x, y: this.top };
  }

  get south(): Coordinate {
    return { x: this.center.x, y: this.bottom };
  }

  get west(): Coordinate {
    return { x: this.left, y: this.center.y };
  }

  get size(): Size {
    return { width: this.width, height: this.height };
  }*/
}

export { Rectangle };

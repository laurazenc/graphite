import { Rect, Size } from './types';
import { CoordinateProps, Side } from '../../components';
import { distance } from './distance';

const CLOSE_DISTANCE = 25;

class Rectangle {
  constructor(readonly left: number, readonly top: number, readonly width: number, readonly height: number) {}
  static fromRect(r: Rect, origin: { x: number; y: number; zoom: number } = { x: 0, y: 0, zoom: 1 }): Rectangle {
    const left = r.left - origin.x / origin.zoom;
    const top = r.top - origin.y / origin.zoom;

    return new Rectangle(left, top, r.width, r.height);
  }

  startPoint(side: Side): CoordinateProps {
    let point = { x: 0, y: 0 };
    switch (side) {
      case Side.TOP:
        point = { x: this.left + this.width / 2, y: this.top };
        break;
      case Side.BOTTOM:
        point = { x: this.left + this.width / 2, y: this.bottom };
        break;
      case Side.LEFT:
        point = { x: this.left, y: this.top + this.height / 2 };
        break;
      case Side.RIGHT:
        point = { x: this.right, y: this.top + this.height / 2 };
        break;
    }

    return { x: point.x, y: point.y };
  }

  contains(p: CoordinateProps): boolean {
    return p.x >= this.left && p.x <= this.right && p.y >= this.top && p.y <= this.bottom;
  }

  isPoint(): boolean {
    return this.width === 1 && this.height === 1;
  }

  closeTo(p: CoordinateProps): Side | null {
    if (distance(p, this.north) < CLOSE_DISTANCE) {
      return Side.TOP;
    }
    if (distance(p, this.east) < CLOSE_DISTANCE) {
      return Side.RIGHT;
    }
    if (distance(p, this.south) < CLOSE_DISTANCE) {
      return Side.BOTTOM;
    }
    if (distance(p, this.west) < CLOSE_DISTANCE) {
      return Side.LEFT;
    }
    return null;
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

  /*
  }
*/

  get center(): CoordinateProps {
    return {
      x: this.left + this.width / 2,
      y: this.top + this.height / 2,
    };
  }

  get right(): number {
    return this.left + this.width;
  }

  get bottom(): number {
    return this.top + this.height;
  }

  /* get location(): Coordinate {
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
  }*/

  get east(): CoordinateProps {
    return { x: this.right, y: this.center.y };
  }

  get north(): CoordinateProps {
    return { x: this.center.x, y: this.top };
  }

  get south(): CoordinateProps {
    return { x: this.center.x, y: this.bottom };
  }

  get west(): CoordinateProps {
    return { x: this.left, y: this.center.y };
  }

  get size(): Size {
    return { width: this.width, height: this.height };
  }
}

export { Rectangle };

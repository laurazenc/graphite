class Size {
  width: number;
  height: number;

  constructor({ width, height }: { width: number; height: number }) {
    this.width = width;
    this.height = height;
  }

  static create(width: number, height: number): Size {
    return new Size({ width, height });
  }

  setWidth(width: number) {
    this.width = width;
  }

  setHeight(height: number) {
    this.height = height;
  }
}

export default Size;

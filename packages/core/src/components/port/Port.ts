import { v4 as uuid } from 'uuid';
import { Type } from './type';

abstract class Port {
  static id = uuid();
  type: Type;
  constructor({ type }: { type: Type }) {
    this.type = type;
  }
}

export default Port;

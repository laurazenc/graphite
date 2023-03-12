import Port from './Port';
import { InputPortProps, Type } from './type';

class InputPort extends Port {
  type = Type.INPUT;
  constructor(props: InputPortProps) {
    super({ ...props, type: Type.INPUT });
  }
}

export default InputPort;

import Port from './Port';
import { OutputPortProps, Type } from './type';

class OutputPort extends Port {
  type = Type.OUTPUT;
  constructor(props: OutputPortProps) {
    super({ ...props, type: Type.OUTPUT });
  }
}

export default OutputPort;

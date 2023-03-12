import { v4 as uuid } from 'uuid';
import { InputPort, OutputPort } from '../port';
import { Size, SizeProps } from '../size';
import { Coordinate, CoordinateProps } from '../coordinate';
import { action, makeObservable, observable } from 'mobx';
import { InputPortProps, OutputPortProps, Side } from '../port/type';

class Node {
  id = uuid();
  name: string;
  inputs: InputPort[] = [];
  outputs: OutputPort[] = [];
  size: Size;
  coordinate: Coordinate;

  constructor({
    name,
    inputs = [],
    outputs = [],
    size,
    coordinate,
  }: {
    name: string;
    inputs?: InputPortProps[];
    outputs?: OutputPortProps[];
    size: SizeProps;
    coordinate: CoordinateProps;
  }) {
    this.name = name;
    this.addInputs(inputs);
    this.addOutputs(outputs);
    this.size = new Size(size);
    this.coordinate = new Coordinate(coordinate);

    makeObservable(this, {
      id: observable,
      name: observable,
      inputs: observable,
      outputs: observable,
      size: observable,
      coordinate: observable,
      getInputs: action,
      getOutputs: action,
    });
  }

  private addInputs(inputs: InputPortProps[] = []) {
    inputs.forEach((input: InputPortProps) => {
      this.inputs.push(new InputPort(input));
    });
  }

  private addOutputs(outputs: OutputPortProps[]) {
    outputs.forEach((output: OutputPortProps) => {
      this.outputs.push(new OutputPort(output));
    });
  }

  public getInputs() {
    return this.inputs;
  }

  public getOutputs() {
    return this.outputs;
  }

  public getFilledSides(): Side[] {
    const sides = new Map<Side, Side>();
    this.inputs.forEach((port) => {
      sides.set(port.side, port.side);
    });
    this.outputs.forEach((port) => {
      sides.set(port.side, port.side);
    });
    return Array.from(sides.values());
  }
}

export default Node;

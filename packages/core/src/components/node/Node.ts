import { v4 as uuid } from 'uuid';
import { InputPort, OutputPort } from '../port';
import { Size } from '../size';
import { Coordinate } from '../coordinate';
import { action, makeObservable, observable } from 'mobx';

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
    inputs?: InputPort[];
    outputs?: OutputPort[];
    size: Size;
    coordinate: Coordinate;
  }) {
    this.name = name;
    this.addInputs(inputs);
    this.addOutputs(outputs);
    this.size = size;
    this.coordinate = coordinate;

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

  private addInputs(inputs: InputPort[] = []) {
    inputs.forEach((input: InputPort) => {
      this.inputs.push(new InputPort(input));
    });
  }

  private addOutputs(outputs: OutputPort[]) {
    outputs.forEach((output: OutputPort) => {
      this.outputs.push(new OutputPort(output));
    });
  }

  public getInputs() {
    return this.inputs;
  }

  public getOutputs() {
    return this.outputs;
  }
}

export default Node;

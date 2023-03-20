import { CoordinateProps } from '../coordinate';
import { PortProps } from '../port';

export type NodeConstructorArgs = {
  name: string;
  inputs?: PortProps[];
  outputs?: PortProps[];
};

export interface NodeProps extends NodeConstructorArgs {
  coordinates: CoordinateProps;
}

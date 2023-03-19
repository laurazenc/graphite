import { CoordinateProps } from '../coordinate';
import { PortProps } from '../port';
import { SizeProps } from '../size';

export type NodeConstructorArgs = {
  name: string;
  inputs?: PortProps[];
  outputs?: PortProps[];
  size?: SizeProps;
};

export interface NodeProps extends NodeConstructorArgs {
  coordinates: CoordinateProps;
}

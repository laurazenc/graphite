import { ReactNode } from 'react';

export interface NodeProps {
  id: string;
  children: ReactNode;
  x: number;
  y: number;
  width: number;
  height: number;
}

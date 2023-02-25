import React from 'react';
import { ScreenProps } from './types';

const Screen = ({ children }: ScreenProps) => {
  return <div className="screen">{children}</div>;
};

export { Screen };

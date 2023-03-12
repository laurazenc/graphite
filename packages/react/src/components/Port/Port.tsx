import React, { FC } from 'react';
import { portStyle } from './Port.style';
import { Side } from 'graphite-core';
import { observer } from 'mobx-react-lite';

interface PortProps {
  side: Side;
}

export const Port: FC<PortProps> = observer(({ side }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  return <div ref={ref} className="node-port" css={portStyle(side)} />;
});

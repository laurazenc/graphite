import { css, CSSObject } from '@emotion/react';
import { Side } from 'graphite-core';

export const PORT_SIZE = 10;
const PORT_SIZE_OFFSET = PORT_SIZE / 2;

const positions: Record<Side, CSSObject> = {
  top: { top: `-${PORT_SIZE_OFFSET}px`, left: `calc(50% - ${PORT_SIZE_OFFSET}px)` },
  right: { right: `-${PORT_SIZE_OFFSET}px`, top: `calc(50% - ${PORT_SIZE_OFFSET}px)` },
  bottom: { bottom: `-${PORT_SIZE_OFFSET}px`, left: `calc(50% - ${PORT_SIZE_OFFSET}px)` },
  left: { left: `-${PORT_SIZE_OFFSET}px`, top: `calc(50% - ${PORT_SIZE_OFFSET}px)` },
};

const calculatePosition = (side: Side): CSSObject => {
  return positions[side];
};

export const portStyle = (side: Side) => css`
  width: ${PORT_SIZE}px;
  height: ${PORT_SIZE}px;
  user-select: all;
  pointer-events: all;
  ${calculatePosition(side)}

  z-index: 20;
`;

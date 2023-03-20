import { css } from '@emotion/react';

export const nodeStyle = css`
  background-color: #fafafa;
  position: absolute;
  -webkit-user-select: none;
  user-select: none;
  transition: all 0.2s cubic-bezier(0.075, 0.82, 0.165, 1);
  border-radius: 8px;
  padding: 0;
  margin: 0;
  z-index: 9;

  &.react-draggable-dragging {
    .node-content {
      cursor: grabbing;
    }
  }

  &.selected {
    border-color: mediumturquoise;
  }
`;

export const nodeContentStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 16px 8px;
  width: 120px;

  :focus {
    outline: none;
  }
`;

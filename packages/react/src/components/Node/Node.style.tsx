import { css } from '@emotion/react';

export const nodeStyle = css`
  box-shadow: rgba(13, 38, 76, 0.19) 0px 1px 5px;
  background-color: #fafafa;

  &:hover {
    cursor: move;
  }

  .node-content {
    &:hover {
      cursor: text;
    }
  }
`;

export const nodeContentStyle = css`
  min-width: 100px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

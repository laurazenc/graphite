import { css } from '@emotion/react';

export const toolbarStyle = css`
  position: absolute;
  top: 24px;
  right: 24px;
  width: 48px;
  min-height: 48px;
  background-color: #111827;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 8px 0;
`;

export const toolStyle = css`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;

  :hover {
    cursor: pointer;
    background-color: #1f2937;
  }
`;

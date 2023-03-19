import * as React from 'react';

function NodeIcon(props: any) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" height="1em" width="1em" {...props}>
      <path d="M9 10V8h2v2h2v2h-2v2H9v-2H7v-2h2zM0 3c0-1.1.9-2 2-2h16a2 2 0 012 2v14a2 2 0 01-2 2H2a2 2 0 01-2-2V3zm2 2v12h16V5H2z" />
    </svg>
  );
}

export default NodeIcon;

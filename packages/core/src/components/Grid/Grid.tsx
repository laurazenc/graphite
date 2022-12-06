import { memo } from 'react';

const gridPatternId = 'pattern-id';
const size = 16;
const dotSize = 0.65;

function Grid() {
  return (
    <svg className="grid" style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0 }}>
      <pattern
        id={gridPatternId}
        x={0}
        y={0}
        width={size}
        height={size}
        patternUnits="userSpaceOnUse"
        patternTransform={`translate(-${size / 2},-${size / 2})`}
      >
        <circle cx={dotSize} cy={dotSize} r={dotSize} fill="#CBD5E0" />
      </pattern>
      <rect x="0" y="0" width="100%" height="100%" fill={`url(#${gridPatternId})`} />
    </svg>
  );
}

export default memo(Grid);

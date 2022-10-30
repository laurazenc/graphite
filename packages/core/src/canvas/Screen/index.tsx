import type { ReactNode } from 'react';

interface ScreenProps {
  children: ReactNode;
}

function Screen({ children }: ScreenProps) {
  return (
    <div>
      screen
      {children}
    </div>
  );
}

export default Screen;

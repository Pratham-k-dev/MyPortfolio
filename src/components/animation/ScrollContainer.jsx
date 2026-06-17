import React, { forwardRef } from 'react';

export const ScrollContainer = forwardRef(({ background, children, height = '500vh', className = '' }, ref) => {
  return (
    <section
      ref={ref}
      className={`relative w-full ${className}`}
      style={{ height }}
    >
      <div className="fixed top-0 h-screen w-full overflow-hidden pointer-events-none">
        {background}
      </div>
      <div className="relative w-full z-10 pointer-events-auto">
        {children}
      </div>
    </section>
  );
});

ScrollContainer.displayName = 'ScrollContainer';

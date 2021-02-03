import * as React from 'react'

interface PropsContainer {}

export function Container({ children }: React.PropsWithChildren<PropsContainer>) {
  // <!-- We've used 3xl here, but feel free to try other max-widths based on your needs -->
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">{children}</div>
    </div>
  );
}
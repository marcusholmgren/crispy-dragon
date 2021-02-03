import * as React from 'react'

interface PropsBasicCard {}

export function BasicCard({ children }: React.PropsWithChildren<PropsBasicCard>) {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">{children}</div>
    </div>
  );
}

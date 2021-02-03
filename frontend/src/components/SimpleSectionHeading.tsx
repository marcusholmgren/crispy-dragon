import * as React from 'react'

export function SimpleSectionHeading(props: {heading: string}) {
  return (
    <div className="pb-5 border-b border-gray-200">
      <h3 className="text-lg leading-6 font-medium text-gray-900">
        {props.heading}
      </h3>
    </div>
  );
}
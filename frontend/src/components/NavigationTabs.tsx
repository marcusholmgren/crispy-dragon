import { NavLink } from 'react-router-dom';
import React from 'react';

export function NavigationTabs({
  activeTab,
}: {
  activeTab: 'home' | 'add' | undefined;
}) {
  const defaultStyle =
    'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm';
  const activeStyle =
    'border-indigo-500 text-indigo-600 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm';

  return (
    <div>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        <select
          id="tabs"
          name="tabs"
          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option>Your movies</option>
          <option>Add movie</option>
        </select>
      </div>
      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            <NavLink
              to="/"
              className={activeTab === 'home' ? activeStyle : defaultStyle}
              aria-current={activeTab === 'home' ? 'true': 'page'}
            >
              Your movies
            </NavLink>
            <NavLink
              to="/add"
              className={activeTab === 'add' ? activeStyle : defaultStyle}
              aria-current={activeTab === 'add' ? 'true': 'page'}
            >
              Add movie
            </NavLink>
          </nav>
        </div>
      </div>
    </div>
  );
}

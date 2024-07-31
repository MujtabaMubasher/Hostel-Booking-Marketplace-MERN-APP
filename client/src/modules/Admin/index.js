import React from 'react'
import Admin from './Admin'
import { Link, Route, Routes } from 'react-router-dom'
import OwnerDetail from './ownerdetail'
import Dashboard from './Dashboard'
import Hostals from './Hostals'

/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
const tabs = [
  { name: 'Dashboard', href: '#', current: true },
  { name: 'Requests', href: '#', current: false },
  { name: 'Hostals', href: '#', current: false },
  { name: 'Billing', href: '#', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function Example({ selectedTab, setSelectedTab }) {
  console.log(selectedTab, 'selectedTab')
  return (
    <div className=' w-[800px] mx-auto mt-10'>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
        <select
          id="tabs"
          name="tabs"
          className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          defaultValue={tabs.find((tab) => tab.name === selectedTab).name}
          onChange={(event) => {
            setSelectedTab(tabs.find((tab) => tab.name === event.target.value).name)
          }}
        >
          {tabs.map((tab) => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <nav className="isolate flex divide-x divide-gray-200 rounded-lg shadow" aria-label="Tabs">
          {tabs.map((tab, tabIdx) => (
            <div
              key={tab.name}
              className={classNames(
                tab.name === selectedTab ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700',
                tabIdx === 0 ? 'rounded-l-lg' : '',
                tabIdx === tabs.length - 1 ? 'rounded-r-lg' : '',
                'group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-center text-sm font-medium hover:bg-gray-50 focus:z-10 cursor-pointer'
              )}
              onClick={() => setSelectedTab(tab.name)}
            >
              <span>{tab.name}</span>
              <span
                aria-hidden="true"
                className={classNames(
                  tab.name === selectedTab ? 'bg-indigo-500' : 'bg-transparent',
                  'absolute inset-x-0 bottom-0 h-0.5'
                )}
              />
            </div>
          ))}
        </nav>
      </div>
    </div>
  )
}

const renderComponent = (tab) => {
  switch (tab) {
    case 'Dashboard':
      return <Dashboard />
    case 'Requests':
      return <Admin />
    case 'Hostals':
      return <Hostals />
    default:
      return <Admin />
  }
}


const Index = () => {
  const [selectedTab, setSelectedTab] = React.useState(tabs[0].name)
  return (
    <Dashboard />
    )
    {/*
    <div className='flex flex-col w-full mx-auto text-center'>
       <Link to="/admin/dashboard" className="bg-blue-500 text-white p-2 rounded-md ml-4 mt-8 z-10 w-[200px]">
        Dashboard
      </Link>
      <Link to="/admin/requests" className="bg-blue-500 text-white p-2 rounded-md ml-4 mt-8 z-10 w-[200px]">
        Pending Verifications
      </Link> 
      <Example selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      { renderComponent(selectedTab) }
      </div>
    */}
}

export default Index
import React, { useEffect, useState } from 'react'

const people = [
  {
    name: 'Lindsay Walton',
    title: 'Front-end Developer',
    department: 'Optimization',
    email: 'lindsay.walton@example.com',
    role: 'Member',
    image:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  // More people...
]

export default function Dashboard() {
  const [hostels, setHostels] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchHostels = async () => {
      const res = await fetch("http://localhost:8000/api/hostels");
      const data = await res.json();
      setHostels(data?.hostels);
      // setLoading(false);
    };
    fetchHostels();
  }, [])

  console.log(hostels, 'hostels')

  return (
    <div className="px-4 sm:px-6 lg:px-8 max-w-[1200px] w-full mx-auto">
      <div className="mt-8 flow-root border p-5 rounded-md shadow-sm">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                    Hostel name
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Address
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Gender
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Price
                  </th>
                  {/* <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Edit</span>
                  </th> */}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {hostels?.map((hostel) => (
                  <tr key={hostel.hostelName}>
                    <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0" style={{width:'200px'}}>
                      <div className="flex items-center" style={{width:'200px'}}>
                        <div className="h-11 w-11 flex-shrink-0">
                          <img className="h-15 w-15 rounded-full" src={hostel?.hostelPics?.url} alt="" />
                        </div>
                        <div className="ml-4">
                          <div className="font-medium text-gray-900"></div>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500 truncate" style={{width:'200px'}}>
                    <div className="text-left text-gray-900 truncate" style={{width:'200px'}}>{hostel.hostelName} </div>
                    {/*
                       <div className="mt-1 text-gray-500">{hostel.department}</div>
                     */}
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                        {hostel.gender}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">{hostel.hostelPrice}</td>
                    {/* <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      <a href="#" className="text-indigo-600 hover:text-indigo-900">
                        Edit<span className="sr-only">, {hostel.name}</span>
                      </a>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

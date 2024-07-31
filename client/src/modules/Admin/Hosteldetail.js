import React, { useEffect, useState } from 'react'
import { useParams , useNavigate } from "react-router-dom";
 

const OwnerDetail = () => {
  const [hostels, setHostels] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id  } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHostels = async () => {
      const res = await fetch(`http://localhost:8000/api/hostels/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        }
      });
      const data = await res.json();
      console.log(data?.hostel, 'data')
      setHostels(data?.hostel);
      setLoading(false);
    }
    fetchHostels();
  }, [])

  const approveHostel = async (id) => {
    console.log(id, 'id')
    const res = await fetch(`http://localhost:8000/api/requests/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      }
    });
    if(!res.ok) {
      alert(`An error has occured: ${res.status}`);
    }
    navigate("/admin");

    // setHostels(hostels.filter((item) => item._id !== id));
  }

  if (loading) {
    return <div className=" h-[43vh] flex justify-center items-center text-6xl font-bold">
      {
        [1, 2, 3, 4, 5].map((item) => {
          return (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-500 animate-pulse" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16z" clip-rule="evenodd" />
              <path
                fill-rule="evenodd"
                d="M13.707 7.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-2-2a1 1 0 111.414-1.414L9 10.586l3.293-3.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>

          )
        })
      }
    </div>
  }

  return (
    <div>
      <section class="text-gray-600 body-font overflow-hidden">
        <div class="container px-5 py-24 mx-auto">
          <div class="lg:w-4/5 mx-auto   flex flex-wrap">
            <div class="lg:w-1/2  w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
              <h2 class="text-3xl title-font  text-red-900    tracking-widest">
                {" "}
                Hostel Detail
              </h2>
              <h2 class="text-xl title-font font-normal tracking-widest">
                Name :{" "}
                <span className="text-gray-400">
                  {` ${hostels?.hostelName}  `}{" "}
                </span>{" "}
              </h2>
              <h2 class="text-xl title-font font-normal tracking-widest">
                Phone :{" "}
                <span className="text-gray-400">{hostels?.contactNo} </span>{" "}
              </h2>

              <h2 class="text-xl title-font font-normal tracking-widest">
                City : <span className="text-gray-400">{hostels?.city} </span>{" "}
              </h2>
              <h2 class="text-xl title-font font-normal tracking-widest">
                State :{" "}
                <span className="text-gray-400">{hostels?.stateProvince} </span>{" "}
              </h2>
              <h2 class="text-xl title-font font-normal tracking-widest">
                Country :{" "}
                <span className="text-gray-400">{hostels?.country} </span>{" "}
              </h2>
              <h2 class="text-xl title-font font-normal tracking-widest">
                Address :{" "}
                <span className="text-gray-400">{hostels?.hostelAddress} </span>{" "}
              </h2>
            </div>
            <div class="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
              <h2 class="text-3xl title-font text-red-900   tracking-widest">
                {" "}
                Details
              </h2>
              <h2 class="text-xl title-font text-gray-500 tracking-widest">
                {" "}
                {` Beds  :${hostels?.beds}  `}
              </h2>
              <h2 class="text-xl title-font text-gray-500 tracking-widest">{` SqFt  :${hostels?.sqFt}   `}</h2>
              <h2 class="text-xl title-font text-gray-500 tracking-widest">
                {" "}
                {` Baths :${hostels?.baths}  `}
              </h2>
              <h2 class="text-xl title-font text-gray-500 tracking-widest">
                {" "}
                {`Price  :${hostels?.hostelPrice}  `}
              </h2>
              <h2 class="text-xl title-font text-gray-500 tracking-widest">
                {" "}
                {`Gender :  ${
                  hostels?.gender ? hostels?.gender : "Boys Hostel"
                }  `}
              </h2>
              <h2 class="text-xl title-font text-transparent tracking-widest  ">{`  s`}</h2>
              <h2 class="text-xl title-font text-transparent tracking-widest  ">{`  s`}</h2>
              <h2 class="text-xl title-font text-transparent tracking-widest  ">{`  s`}</h2>
            </div>
            <div class="flex flex-wrap border-t border-red-900 py-6 -m-4">
              {hostels?.hostelPics?.map(({ url }) => (
                <div class="xl:w-1/3 md:w-1/2 p-4">
                  <div class="bg-gray-100 p-4 rounded-lg">
                    <img
                      class="h-60 rounded w-full object-cover object-center mb-6"
                      src={url}
                      alt="content"
                    />
                  </div>
                </div>
              ))}
            </div>
            <div class="flex flex-row-reverse  mt-5">
              {hostels?.confirmed === false && (
                <button
                  onClick={() => approveHostel(hostels?._id)}
                  class="flex   text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded"
                >
                  Approve
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
      {/* <section class="text-gray-600 body-font">
        <div class="container px-5 py-24 mx-auto flex">
          {
            hostels.length === 0 ? <div className=" h-[43vh] flex justify-center items-center text-4xl font-bold text-center">
              <h1>No Unverified Hostels Find</h1>
            </div> : hostels.map((item, index) => {
              return (
                <div class="p-4 md:w-1/3">
                  <div class="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
                    <div class="flex items-center mb-3">
                      <div class="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-red-500 text-white flex-shrink-0">
                        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                          <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                        </svg>
                      </div>
                      <h2 class="text-gray-900 text-lg title-font font-medium">{item?.hostelName}</h2>
                    </div>
                    <div class="flex-grow">
                      <p class="leading-relaxed text-base"><span className=' font-bold'>Address:</span> {item?.hostelAddress}</p>
                      <p class="leading-relaxed text-base"><span className=' font-bold'>First Name:</span> {item?.firstName}</p>
                      <p class="leading-relaxed text-base"><span className=' font-bold'>Last Name:</span> {item?.lastName}</p>
                      <p class="leading-relaxed text-base"><span className=' font-bold'>Email:</span> {item?.email}</p>
                      <div className='flex justify-around '>
                      <button onClick={() => approveHostel(item?._id)} class="flex mt-10 text-white bg-blue-500 border-0 py-1 px-4 focus:outline-none hover:bg-blue-600 rounded text-md">Show details</button>
                      <button onClick={() => approveHostel(item?._id)} class="flex mt-10 text-white bg-green-500 border-0 py-1 px-4 focus:outline-none hover:bg-green-600 rounded text-md">Approve</button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
        </section>*/}
    </div>
  );
}

export default OwnerDetail
import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";

const Admin = ({ approved }) => {
  const [hostels, setHostels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHostels = async () => {
      const res = await fetch("http://localhost:8000/api/requests", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      const data = await res.json();
      console.log(data?.requests, "data");
      let requests = data?.requests;
      requests = requests.filter((item) =>
        approved === true ? item.confirmed === true : item.confirmed === false
      );
      console.table(requests);
      setHostels(requests);
      setLoading(false);
    };
    fetchHostels();
  }, []);

  const approveHostel = async (id) => {
    console.log(id, "id");
    const res = await fetch(`http://localhost:8000/api/requests/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    if (!res.ok) {
      alert(`An error has occured: ${res.status}`);
    }
    setHostels(hostels.filter((item) => item._id !== id));
  };

  if (loading) {
    return (
      <div className=" h-[43vh] flex justify-center items-center text-6xl font-bold">
        {[1, 2, 3, 4, 5].map((item) => {
          return (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-blue-500 animate-pulse"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16z"
                clip-rule="evenodd"
              />
              <path
                fill-rule="evenodd"
                d="M13.707 7.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-2-2a1 1 0 111.414-1.414L9 10.586l3.293-3.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          );
        })}
      </div>
    );
  }

  return (
    <div>
      <section class="text-gray-600 body-font">
        <div class="container px-5 py-24 mx-auto flex flex-wrap ">
          {hostels.length === 0 ? (
            <div className=" h-[43vh] flex justify-center items-center text-4xl font-bold text-center">
              <h1>No Unverified Hostels Find</h1>
            </div>
          ) : (
            hostels
              .sort((a, b) => a?.confirmed - b?.confirmed)
              .map((item, index) => {
                return (
                  <div class="p-4 md:w-1/3">
                    <div class="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
                      <div class="flex items-center mb-3">
                        <div class="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-red-500 text-white flex-shrink-0">
                          <svg
                            fill="none"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            class="w-5 h-5"
                            viewBox="0 0 24 24"
                          >
                            <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                          </svg>
                        </div>
                        <h2 class="text-gray-900 text-lg title-font font-medium">
                          {item?.hostelName}
                        </h2>
                      </div>
                      <div class="grid justify-items-start">
                        <p class="leading-relaxed text-base">
                          <span className=" font-bold ">First Name:</span>{" "}
                          {item?.firstName}
                        </p>
                        <p class="leading-relaxed text-base">
                          <span className=" font-bold">Last Name:</span>{" "}
                          {item?.lastName}
                        </p>
                        <p class="leading-relaxed truncate  text-base">
                          <span className=" font-bold">Email:</span>{" "}
                          {item?.email}
                        </p>
                        <p class="leading-relaxed text-base">
                          <span className=" font-bold">Address:</span>{" "}
                          {item?.hostelAddress}
                        </p>
                        <div className="flex   ">
                          <Link className=" " to={`/admin/${item?._id}`}>
                            <button class="flex mt-10 text-white bg-blue-500 border-0 py-1 px-4 focus:outline-none hover:bg-blue-600 rounded text-md">
                              Show details
                            </button>
                          </Link>

                          {item?.confirmed === false && (
                            <button
                              onClick={() => approveHostel(item?._id)}
                              class="mx-2 flex mt-10 text-white bg-green-500 border-0 py-1 px-4 focus:outline-none hover:bg-green-600 rounded text-md"
                            >
                              Approve
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
          )}
        </div>
      </section>
    </div>
  );
};

export default Admin
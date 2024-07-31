import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import bgImg from "../../assets/bgImg.jpg";
import Card from "../../components/Card";
import { data } from "./data";
import Footer from "../../components/Footer";
import { inputFields } from "./data";

// Haversine formula to calculate distance between two points
function calculateDistance(lat1, lon1, lat2, lon2) {
  const earthRadius = 6371; // in kilometers

  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = earthRadius * c;

  return distance;
}

// Helper function to convert degrees to radians
function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}

// Function to check if hostel is within a specified radius from the customer's location
function isHostelWithinRadius(customerLocation, hostelLocation, radius) {
  const { latitude, longitude } = customerLocation;
  const { lat, lng } = hostelLocation || {};

  if(lat, lng) {
    const distance = calculateDistance(latitude, longitude, lat, lng);
    console.log(distance <= radius)
    return distance <= radius;
  } else {
    console.log('no lat lng')
    return false
  }

}

const Main = ({ gender, setGender }) => {
  const [showForm, setShowForm] = useState(false);
  const [hostels, setHostels] = useState([]);
  // const [filteredHostel, setFilteredHostel] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nearMe, setNearMe] = useState(false);

  const [searchFilter, setSearchFilter] = useState({
    hostelName: "",
    city: "",
    country: "",
    type: "",
  });

  // this is  old  code which was  use for only store data in localstorage frontend
  // useEffect(() => {
  //   const localStorageData = JSON.parse(localStorage.getItem("data")) || [];
  //   if (localStorageData.length === 0) {
  //     localStorage.setItem("data", JSON.stringify(data));
  //   }
  // }, [data]);

  useEffect(() => {
    const fetchHostels = async () => {
      const res = await fetch("http://localhost:8000/api/hostels");
      const data = await res.json();
      if(gender === 'All') {
        setHostels(data?.hostels);;
      } else {
        const filterOutGender = data?.hostels.filter(hostel => hostel.gender === gender);
        setHostels(filterOutGender)
      }
      setLoading(false);
    };
    fetchHostels();
  }, [gender])

  useEffect(() => {
    const fetchHostels = async () => {
      const res = await fetch("http://localhost:8000/api/hostels");
      const data = await res.json();
      if(gender === 'All') {
        setHostels(data?.hostels);;
      } else {
        const filterOutGender = data?.hostels.filter(hostel => hostel.gender === gender);
        setHostels(filterOutGender)
      }
      setLoading(false);
    };
    if(!nearMe) fetchHostels();
  }, [nearMe])

  const handleFind = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { hostelName, city, country, type } = searchFilter;
    const res = await fetch(
      `http://localhost:8000/api/hostels/search?hostelName=${hostelName}&city=${city}&country=${country}&type=${type}`
    );

    if (!res.ok) {
      alert(`An error has occurred: ${res.status}`);
    } else {
      const data = await res.json();
      setHostels(data);
    }
    setLoading(false);
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setSearchFilter((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleNearBy = () => {
    if(nearMe) {
      setNearMe(false)
      setLoading(true)
    } else {
      setNearMe(true)
      try {
        setLoading(true)
        const getPosition = navigator.geolocation.getCurrentPosition((data)=>{
          const { latitude, longitude } = data?.coords || {}
          const filteredHostelNearBy = hostels?.filter((hostel) =>  isHostelWithinRadius({latitude, longitude}, hostel?.location, 5));
          console.log(filteredHostelNearBy, 'filteredHostelNearBy')
          setHostels(filteredHostelNearBy)
          setLoading(false)
        }, ()=>alert('You must allow location to use this feature'))

      } catch (error) {
        setLoading(false)
        console.log(error, 'error')
      }
    }
  }

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("submit", e.target.elements);
  //   const { tag, title, address, price, name, beds, bath, sqft, image } =
  //     e.target.elements;
  //   const checkEmpty = [tag, title, address, price, name];
  //   const isEmpty = checkEmpty.some((item) => item.value === "");
  //   if (isEmpty) {
  //     alert("Please fill all the fields");
  //   } else {
  //     const appendDataInLocalStorage = () => {
  //       const item = {
  //         tag: tag.value,
  //         title: title.value,
  //         address: address.value,
  //         price: price.value,
  //         image: image.value,
  //         agent: {
  //           name: name.value,
  //         },
  //         features: {
  //           beds: beds.value,
  //           bath: bath.value,
  //           sqft: sqft.value,
  //         },
  //       };
  //       const items = JSON.parse(localStorage.getItem("data")) || [];
  //       const isItemExist = items.some((item) => item.title === title.value);
  //       if (isItemExist) {
  //         alert("Hostel already exist");
  //       } else {
  //         items.push(item);
  //         data.push(item);
  //         localStorage.setItem("data", JSON.stringify(items));
  //         setShowForm(false);
  //       }
  //     };
  //     appendDataInLocalStorage();
  //   }
  // };

  return (
    <>
      {/* Background */}
      <div
        style={{ backgroundImage: `url(${bgImg})` }}
        className="bg-cover bg-center bg-no-repeat h-[600px]"
      ></div>

      {/* Input Fields Section */}
      <div
        className="drop-shadow-lg  mx-auto mb-[100px] py-20 max-w-[1440px] mt-[-100px] flex justify-center items-center"
        style={{ backgroundColor: "#d3d3d38c" }}
      >
        <form
          className="flex justify-center items-center w-[70%]"
          onSubmit={(e) => handleFind(e)}
        >
          {inputFields.map((inputField, index) => (
            <div className="flex flex-col mr-4 w-[250px]" key={index}>
              <label className="text-red-900 font-bold">
                {inputField.label}
              </label>
              <input
                type="text"
                className="border border-gray-300 rounded-md p-2 mt-2"
                placeholder={inputField.placeholder}
                name={inputField.name}
                onChange={handleChange}
              />
            </div>
          ))}
          <button className="bg-red-500 text-white p-2 rounded-md ml-4 mt-8 z-10 w-[200px]">
            Find
          </button>
        </form>
          <button onClick={() => handleNearBy()} className="bg-blue-500 text-white p-2 rounded-md ml-4 mt-8 z-10 w-[200px]">
            { nearMe ? 'Show all' : 'Find near me' }
          </button>
      </div>

      {/* Card section */}
      {loading ? (
        <div className="flex justify-center">Loading...</div>
      ) : (
        <div className="flex items-center justify-between flex-wrap max-w-[1440px] mx-auto mb-[100px]">
          <div className=" flex justify-between items-center flex-wrap w-full">
            {hostels.length > 0 ? (
              hostels.map((item, index) => {
                return <Card key={index} {...item} />;
              })
            ) : (
              <div>No Hostels Found</div>
            )}
          </div>
        </div>
      )}

      {/* Section */}
      <div className=" bg-red-200 py-16 mb-[100px]">
        <div className=" flex justify-between items-center mx-auto max-w-[1440px]">
          <div className=" max-w-[770px] mr-16">
            <div className="text-4xl font-bold mb-4 text-red-900">
              Find your hostel
            </div>
            <div className="text-2xl text-red-700">
              Lorem ipsum paragraph is a dummy text used by designers to fill
              the space in the design. Lorem ipsum paragraph is a dummy text
              used by designers to fill the space in the design. Lorem ipsum
              paragraph is a dummy text used by designers to fill the space in
              the design. Lorem ipsum paragraph is a dummy text used by
              designers to fill the space in the design.
            </div>
          </div>
          <div className="w-[500px]">
            <img src={bgImg} alt={"Section"} />
          </div>
        </div>
      </div>

      {/* Section */}
      <div className=" py-12 bg-red-100 ">
        <div className=" max-w-[1440px] mx-auto flex items-center justify-between">
          <div className="text-4xl font-bold text-red-900">
            Get more Information about news and offers
          </div>
          <div className="">
            <input
              type="text"
              className="border border-gray-300 rounded-md p-2 ml-4 w-[300px]"
              placeholder="Enter your email"
            />
            <button className="bg-white p-2 rounded-md ml-4 w-[100px]">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;

import React from "react";
import bgImg from "../../assets/bgImg.jpg";
import { Link } from "react-router-dom";
const Card = ({
  _id,
  hostelPics,
  id,
  tag = "Farm",
  hostelName = "Luxury Apartment ocean view",
  hostelAddress = "153 Adriniana Mews Suite 247",
  image = "",
  beds = 4,
  baths = 2,
  sqFt = 2100,
  contactNo = "0900780087",
  hostelPrice = 12340,
  agent = {
    name: "Eleneor French",
    date: "2 Days ago",
  },
}) => {
  return (
    <Link to={`/hostel/${_id}`}>
      <div className="w-[400px] border mb-12">
        <div className=" px-6 py-6">
          <div className=" text-sm text-blue-500">Hostel</div>
          <div className=" text-xl mb-2">{hostelName}</div>
          <div className=" text-md text-gray-700">{hostelAddress}</div>
        </div>
        <div className=" h-[250px] bg-black">
          <img
            src={hostelPics[0]?.url || bgImg}
            alt={hostelName}
            className={"w-full h-full"}
          />
        </div>
        <div className=" px-6 pt-6">
          <div className=" text-md text-gray-700 pb-2 border-b border-black">
            Beds: {beds} / Bath: {baths} / Sq Ft: {sqFt}
          </div>
          <div className=" text-2xl text-gray-800 my-4">Rs:{hostelPrice}</div>
        </div>
        <div className=" bg-gray-100 flex justify-between items-center p-6 ">
          <div>{contactNo}</div>
          <div>{agent?.date}</div>
        </div>
      </div>
    </Link>
  );
};

export default Card;

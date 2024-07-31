import React, { useState } from "react";
import "../../App.css";
import { inputFields, checkBox } from "./data.js";
import { uploadImage } from "../../utils/functions";

const Form = ({ isSignin }) => {
  const [selectedOption, setSelectedOption] = useState('');
  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e.target.elements, "e.target.elements");
    const {
      hostelName,
      hostelPrice,
      baths,
      beds,
      city,
      contactNo,
      country,
      hostelAddress,
      sqFt,
      stateProvince,
      hostelPics,
      description,
    } = e.target.elements;
    const fields = {
      hostelName,
      hostelPrice,
      baths,
      beds,
      city,
      contactNo,
      country,
      hostelAddress,
      hostelPics,
      sqFt,
      stateProvince,
      description,
    };
    const isEmpty = Object.values(fields).some((item) => item.value === "");
    if (isEmpty) {
      alert("Please fill all the fields");
    } else
    {
      const fieldsData = Object.values(fields).reduce((acc, item) => {
        acc[item.name] = item.value;
        return acc;
      }, {});
      fieldsData.gender = selectedOption; // gender

      console.log("hostelPics ", hostelPics, hostelPics.files);
      let arr = Object.values(hostelPics.files);
      console.log("hostelPics ", arr);
      const hostelPicsUrls = await Promise.all(
        arr.map(async (file) => await uploadImage(file, "kcfbvaww"))
      );
      console.log("hostelPicsUrls :>> ", hostelPicsUrls);
      fieldsData.hostelPics = hostelPicsUrls;
      // return;
      // const hostelPicsUrl = await uploadImage(hostelPics.files[0], "kcfbvaww");
      // fieldsData.hostelPics = hostelPicsUrl;

      // return;
      const response = await fetch("http://localhost:8000/api/add-hostel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
        body: JSON.stringify(fieldsData),
      });
      if (!response.ok) {
        alert(`An error has occured: ${response.status}`);
      } else {
        alert("Hostel added successfully");
        document.getElementById("addHostelForm").reset();
      }
    }
  };

  return (
    <>
      <section className="text-gray-600 body-font relative">
        <div className="w-3/4 pt-8 pb-8 mt-8 mx-auto border rounded-lg drop-shadow">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-3xl text-2xl font-medium title-font  text-red-500">
              Add Hostel
            </h1>
          </div>
          <div className="lg:w-3/4 md:w-2/3 mx-auto">
            <form
              className=" mx-auto space-y-4 "
              id="addHostelForm"
              onSubmit={(e) => handleSubmit(e)}
            >
              <div className="flex flex-wrap -m-2">
                {inputFields.map(({ label, type, id, name, className,multiple }) => (
                  <div className={`p-2 ${className} `}>
                    <div className="relative">
                      <label
                        for="name"
                        className="leading-7 text-sm text-gray-600"
                      >
                        {label}
                      </label>
                      <input
                        type={type}
                        id={id}
                        name={name}
                        multiple={multiple}
                        className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      />
                    </div>
                  </div>
                ))}
                <div className="    p-2 w-1/2">
                  <div className="relative">
                    <label className="leading-7 text-sm text-gray-600">
                      Hostel :
                    </label>

                    <div className="flex  items-center mt-3 pt-1">
                      {checkBox.map((inputField, index) => (
                        <div className="flex  mx-4 w-[50px]" key={index}>
                          <input
                            type="radio"
                            name="gender"     
                           checked={selectedOption === inputField.label}
                            onChange={handleChange}

                            value={inputField.label}
                          />
                          <label className=" font-bold mx-2">
                            {inputField.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-2 w-full">
                  <button
                    type="submit"
                    className="flex mx-auto text-white bg-red-500 border-0 py-2 px-8 focus:outline-none hover:bg-red-600 rounded text-lg"
                  >
                    Send
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Form;

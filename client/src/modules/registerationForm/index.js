import React, { useEffect, useState } from "react";
import "../../App.css";
import { useNavigate } from "react-router-dom";
import { inputFields, checkBox } from "./data.js";
import AddHostel from '../addHostal'
import { uploadImage } from "../../utils/functions";

const Form = ({ isSignin }) => {
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const [images, setImages] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!(['manager', 'admin'].includes(JSON.parse(localStorage.getItem("user"))?.userType))) {
      navigate("/");
    } else if (JSON.parse(localStorage.getItem("user"))?.isApproved) {
      setIsApproved(true);
      setLoading(false);
    } else {
      const fetchVerifyStatus = async () => {
        const response = await fetch("http://localhost:8000/api/verify-status", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
          },
        });
        if (!response.ok) {
          alert(`An error has occured: ${response.status}`);
        } else {
          const data = await response.json();
          const user = JSON.parse(localStorage.getItem("user"));
          if (data?.status === "verified") {
            setIsApproved(true);
            user.isApproved = true;
            localStorage.setItem("user", JSON.stringify(user));
          } else if (data?.status === "not-verified") {
            setIsApproved(false);
            setIsSubmitted(true);
          } else {
            setIsApproved(false);
            setIsSubmitted(false);
          }
        }
        setLoading(false);
      }
      fetchVerifyStatus();
    }
  }, [])
  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const { cnicPicFront,cnicPicBack,policeVerificationCert,verificationCert,govtLicense,hostelPics, addressLine2, addressLines, city, cnic, contactNo, country, email, firstName, hostelAddress, hostelName, lastName, stateProvince, zipCode } = e.target.elements;
     
 
     
    const fields = { addressLine2, addressLines,  city,cnicPicFront,cnicPicBack,policeVerificationCert,verificationCert,govtLicense,hostelPics,cnic,  contactNo, country, email, firstName, hostelAddress, hostelName, lastName, stateProvince, zipCode };
    const isEmpty = Object.values(fields).some((item) => item.value === "");
    if (isEmpty) {
      alert("Please fill all the fields");
    } else {
      const fieldsData = Object.values(fields).reduce((acc, item) => {
        acc[item.name] = item.value;
        return acc;
      }, {});
      console.log("fieldsData", fieldsData);
      const cnicPicFrontUrl = await uploadImage(cnicPicFront.files[0], "kcfbvaww");
      const cnicPicBackUrl = await uploadImage(cnicPicBack.files[0], "kcfbvaww");
      const policeVerificationCertUrl = await uploadImage(policeVerificationCert.files[0], "kcfbvaww");
      const hostelPicsUrl = await uploadImage(hostelPics.files[0], "kcfbvaww");
      const verificationCertUrl = await uploadImage(verificationCert.files[0], "kcfbvaww");
      const govtLicenseUrl = await uploadImage(govtLicense.files[0], "kcfbvaww");
      fieldsData.cnicPicFront = cnicPicFrontUrl
      fieldsData.hostelPics =   hostelPicsUrl
      fieldsData.cnicPicBack =      cnicPicBackUrl
      fieldsData.policeVerificationCert = policeVerificationCertUrl
      fieldsData.govtLicense =      govtLicenseUrl
      fieldsData.verificationCert = verificationCertUrl
      fieldsData.gender = selectedOption // gender

       
      const response = await fetch("http://localhost:8000/api/verify-hostel", {
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
        setIsSubmitted(true);
      }
    }
  };

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

  if (isSubmitted) {
    return <div className=" h-[43vh] flex justify-center items-center text-2xl font-bold">
      <div className=" flex flex-col max-w-[500px] text-center justify-center items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500 animate-pulse" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16z" clip-rule="evenodd" />
          <path
            fill-rule="evenodd"
            d="M13.707 7.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-2-2a1 1 0 111.414-1.414L9 10.586l3.293-3.293a1 1 0 011.414 0z"
            clip-rule="evenodd"
          />
        </svg>
        Your request has been submitted. Please wait for the approval.
      </div>
    </div>
  }

  if (isApproved) {
    return <AddHostel />
  }

  return (
    <>
      <section className="text-gray-600 body-font relative">
        <div className="w-3/4 pt-8 pb-8 mt-8 mx-auto border rounded-lg drop-shadow">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-3xl text-2xl font-medium title-font  text-red-500">
              Hostel Owner Registration
            </h1>
          </div>
          <div className="lg:w-3/4 md:w-2/3 mx-auto">
            <form className=" mx-auto space-y-4 " onSubmit={(e) => handleSubmit(e)}>
              <div className="flex flex-wrap -m-2">
                {inputFields.map(({ label, type, id, name }) => (
                  <div className="p-2 w-1/3">
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
                       accept={type === 'file' && "image/*" } 

                        name={name}
                        className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      />
                    </div>
                  </div>
                ))}
                <div className="p-2 w-1/3">
                <div className="relative">
                  <label
                    for="name"
                    className="leading-7 text-sm text-gray-600"
                  >
                    image
                  </label>
                  <input
                    type='file'
                    id='image'
                    accept= "image/*" 
                    name='image'
                    onChange={(e)=> console.log('e.target.files[0] >> ', e.target.files[0])}
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
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
                  <button type="submit" className="flex mx-auto text-white bg-red-500 border-0 py-2 px-8 focus:outline-none hover:bg-red-600 rounded text-lg">
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

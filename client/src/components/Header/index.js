import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Form from "../../modules/Form";
import Modal from "../Modal/index";

const Header = ({ gender, setGender }) => {
  const token = localStorage.getItem("token");
  let user = localStorage.getItem("user");
  const username = localStorage.getItem("user.username");
  const userType = localStorage.getItem("user.userType");
  user = JSON.parse(user);
  const [showModel, setShowModel] = useState(false);
  const [loginSignUp, setLoginSignUp] = useState(true);
  const menus = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "About",
      link: "/about-us",
    },
    {
      name: "Hostels",
      link: "/hostels",
    },
    ...(["manager", "admin"].includes(
      JSON.parse(localStorage.getItem("user"))?.userType
    )
      ? [
          {
            name: "Add Hostel",
            link: "/add-hostel",
          },
        ]
      : []),
    {
      name: "Clients Testimonials",
      link: "/clients-testimonials",
    },
    {
      name: "Contact",
      link: "/contact-us",
    },
  ];

  const checkBox = [
    {
      label: "Boys",
    },
    {
      label: "Girls",
    },
    {
      label: "All",
    }
  ];
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear(); // clear the localStorage
    // perform other logout tasks, such as redirecting to the login page
    navigate("/");
    // window.location.reload();
  };
  const toggle = (isLogin) => {
    setShowModel(!showModel);
    isLogin === "register" ? setLoginSignUp(false) : setLoginSignUp(true);
  };

  const handleGenderFilter = (e) => {
    console.log(e.target.value);
    setGender(e.target.value)
  }

  return (
    <div>
      <div className=" h-8 w-screen bg-red-300 flex items-center px-16">
        <div className="mr-12">Call us: 0900393743</div>
        <div>Chat us: area.wa</div>
        <div className=" ml-auto">
          {token ? (
            <>
              <span className="cursor-pointer" onClick={handleLogout}>
                {user?.userType === "admin" ? "Admin" : user?.username}
              </span>{" "}
              /{" "}
              <span className=" cursor-pointer" onClick={handleLogout}>
                Logout
              </span>
            </>
          ) : (
            <>
              <span className=" cursor-pointer" onClick={() => toggle("login")}>
                Login
              </span>{" "}
              /{" "}
              <span
                className=" cursor-pointer"
                onClick={() => toggle("register")}
              >
                Register
              </span>
            </>
          )}
        </div>
      </div>
      <div className="bg-white shadow-sm py-6 px-16 flex items-center justify-between">
        <div className=" text-6xl text-red-900 font-medium">HBM</div>
        <div className="flex item-center justify-evenly">
          {menus.map((menu, index) => (
            <div
              className="text-red-900 text-xl font-semibold ml-6"
              key={index}
            >
              <Link to={menu.link}>{menu.name}</Link>
            </div>
          ))}
        </div>
        <div className="  flex justify-center items-center flex-wrap">
          <div>
            <label className="text-red-900 font-bold mx-2">Hostels :</label>
          </div>

          {checkBox.map((inputField, index) => (
            <div className="flex  mr-4 w-[50px]" key={index}>
              <input type="radio" name="gender" checked={inputField.label === gender} onChange={(e)=> handleGenderFilter(e)} value={inputField.label} />
              <label className="text-red-900 font-bold mx-2">
                {inputField.label}
              </label>
            </div>
          ))}
        </div>
      </div>
      {showModel && (
        <Modal closeModel={toggle}>
          <Form
            isSignin={loginSignUp ? true : false}
            setShowModel={setShowModel}
          />
        </Modal>
      )}
    </div>
  );
};

export default Header;

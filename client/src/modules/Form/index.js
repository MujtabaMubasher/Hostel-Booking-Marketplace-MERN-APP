import React, { useState } from "react";
import "../../App.css";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/Modal";

const Form = ({ isSignin, setShowModel }) => {
  const [isSignIn, setIsSignIn] = useState(isSignin);
  const [loginSignUp, setLoginSignUp] = useState(true);
  const navigate = useNavigate();
  const toggle = (isLogin) => {
    isLogin === "register" ? setIsSignIn(false) : setIsSignIn(true);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password, repeatPassword, email, userType } =
      e.target.elements;
    const checkEmpty = isSignIn
      ? [username, password]
      : [username, password, repeatPassword, email];
    const isEmpty = checkEmpty.some((item) => item.value === "");
    if (isEmpty) {
      alert("Please fill all the fields");
    } else {
      if (!isSignIn && password.value !== repeatPassword.value) {
        alert("Password does not match");
      } else if (!isSignIn) {
        const user = {
          username: username.value,
          password: password.value,
          email: email.value,
          userType: userType.value,
        };
        // const appendDataInLocalStorage = () => {
        //   const users = JSON.parse(localStorage.getItem("users")) || [];
        //   const isUserExist = users.some(
        //     (item) => item.username === username.value
        //   );
        //   if (isUserExist) {
        //     alert("User already exist");
        //   } else {

        //     users.push(user);
        //     localStorage.setItem("users", JSON.stringify(users));
        //     navigate("/login");
        //   }
        // };
        // appendDataInLocalStorage();
        const response = await fetch("http://localhost:8000/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });
        if (!response.ok) {
          alert(`An error has occured: ${response.status}`);
        } else {
          toggle("login")
        }
      } else {
        // const checkUser = () => {
        //   const users = JSON.parse(localStorage.getItem("users")) || [];
        //   const isUserExist = users.some(
        //     (item) =>
        //       item.username === username.value &&
        //       item.password === password.value
        //   );
        //   if (isUserExist) {
        //     const user = users.find(
        //       (item) =>
        //         item.username === username.value &&
        //         item.password === password.value
        //     );
        //     alert("Logged in successfully");
        //     localStorage.setItem("user", JSON.stringify(user));
        //     navigate("/");
        //   } else {
        //     alert("Invalid username or password");
        //   }
        // };
        // checkUser();
        const user = {
          email: username.value,
          password: password.value,
        }
        const response = await fetch("http://localhost:8000/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });
        if (!response.ok) {
          alert(`User or password incorrect`);
        } else {
          const data = await response.json();
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", JSON.stringify(data.token));
          setShowModel(false);
          navigate("/");
        }
      }
    }
  };

  return (
    <>
      <div className=" h-screen flex justify-center items-center rounded-md ">
        <div className=" w-[450px] flex flex-col p-24 pt-10 bg-cover bg-center relative form h-[700px] rounded-[20px]">
          <div className=" flex text-2xl font-semibold text-white mb-8 relative">
            <div
              className={`mr-6 cursor-pointer ${
                isSignIn && " text-white underline"
              }`}
              onClick={() => toggle("login")}
            >
              SIGN IN
            </div>
            <div
              className={`cursor-pointer ${
                !isSignIn && " text-white underline"
              }`}
              onClick={() => toggle("register")}
            >
              SIGN UP
            </div>
          </div>
          <form className="relative" onSubmit={(e) => handleSubmit(e)}>
            <div className="flex flex-col w-full mb-4">
              <label className="text-white font-medium">USERNAME</label>
              <input
                name="username"
                type="text"
                className="border border-gray-300 rounded-full py-[10px] px-4 mt-2"
                placeholder="Enter Username"
                required
              />
            </div>
            <div className="flex flex-col w-full mb-4">
              <label className="text-white font-medium">PASSWORD</label>
              <input
                name="password"
                type="password"
                className="border border-gray-300 rounded-full py-[10px] px-4 mt-2"
                placeholder="Enter Password"
                required
              />
            </div>
            {!isSignIn && (
              <>
                <div className="flex flex-col w-full mb-4">
                  <label className="text-white font-medium">
                    REPEAT PASSWORD
                  </label>
                  <input
                    name="repeatPassword"
                    type="password"
                    className="border border-gray-300 rounded-full py-[10px] px-4 mt-2"
                    placeholder="Repeat Password"
                    required
                  />
                </div>
                <div className="flex flex-col w-full mb-4">
                  <label className="text-white font-medium">
                    EMAIL ADDRESS
                  </label>
                  <input
                    name="email"
                    type="email"
                    className="border border-gray-300 rounded-full py-[10px] px-4 mt-2"
                    placeholder="Enter Email Address"
                    required
                  />
                </div>
                <div className="text-white font-medium mb-2">SIGN UP AS A</div>
                <div className="inline-block radio">
                  <input
                    name="userType"
                    type="radio"
                    id="user"
                    hidden="hidden"
                    value="user"
                    checked
                  />
                  <label
                    htmlFor="user"
                    className="px-2 py-1 rounded-lg flex justify-center items-center text-sm font-bold cursor-pointer border mr-3"
                  >
                    User
                  </label>
                </div>
                <div className="inline-block radio">
                  <input
                    name="userType"
                    type="radio"
                    id="manager"
                    hidden="hidden"
                    value="manager"
                  />
                  <label
                    htmlFor="manager"
                    className="px-2 py-1 rounded-lg flex justify-center items-center text-sm font-bold cursor-pointer border"
                  >
                  Hostel owner
                  </label>
                </div>
              </>
            )}
            {isSignIn && (
              <div className="flex justify-between items-center mt-8">
                <div className="flex items-center">
                  <input id="remember" type="checkbox" className="mr-2" />
                  <label htmlFor="remember" className="text-white font-medium">
                    Keep me logged in
                  </label>
                </div>
              </div>
            )}
            <button
              type="submit"
              className="bg-red-500 text-white py-[10px] px-4 rounded-full mt-12 w-full"
            >
              {isSignIn ? "SIGN IN" : "SIGN UP"}
            </button>
          </form>
          {/* <div
            className="text-white font-medium cursor-pointer relative text-center pt-12 mt-16 text-lg border-t-2 border-white"
            onClick={() => navigate(isSignIn ? "/register" : "/login")}
          >
            {isSignIn ? "Create new account?" : "Already member?"}
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Form;

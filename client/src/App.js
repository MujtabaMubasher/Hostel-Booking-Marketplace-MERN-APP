import { Route, Routes } from "react-router-dom";
import AboutUs from "./modules/AboutUs/AboutUs";
import ContactUs from "./modules/ContactUs/ContactUs";
import Privacy from "./modules/Privacy/Privacy";
import Form from "./modules/Form";
import Main from "./modules/Main";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HostelRegistrationForm from "./modules/registerationForm/index.js";
import Hostels from "./modules/Hostels/index";
import HostelDetails from "./modules/Hostels/hosteldetail";
import Admin from "./modules/Admin/index";
import Requests from './modules/Admin/Admin'
import OwnerDetail from "./modules/Admin/ownerdetail";
import Hosteldetail from "./modules/Admin/Hosteldetail";
import Billing from "./modules/Billing";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import Dashboard from "./modules/Admin/Dashboard";

const stripePromise = loadStripe("pk_test_51JN4dxHOzHyuclVj5UNRExugNOSrBHWSTTzw73nS9IWp5KKkQxG3rp51Kt3EPbXthQGiCQbGbti9k2alREKZWbeS00fdg9jQ4X");

function App() {
  const [gender, setGender] = useState('All')
  const { userType } = JSON.parse(localStorage.getItem("user"))
    ? JSON.parse(localStorage.getItem("user"))
    : "";
  const currentPath = window.location.pathname;
console.log('userType :>> ', userType);
  return (
    <>

    {userType === "admin" && currentPath === "/admin" ? "" : <Header gender={gender} setGender={setGender} />}
      <Routes>
        <Route path="/" element={<Main gender={gender} setGender={setGender} />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/add-hostel" element={<HostelRegistrationForm />} />
        <Route path="/hostel/:id" element={<HostelDetails />} />
        <Route path="/checkout/:id" element={<Billing stripePromise={stripePromise} />} />
        <Route path="/hostels" element={<Hostels />} />
        <Route path="*" element={<h1>404: Not Found</h1>} />
        <Route path="/admin" element={JSON.parse(localStorage.getItem('user'))?.userType === 'admin' ? <Admin/> : <h1>404: Not Found</h1>} />
        <Route path="/admin/requests" element={JSON.parse(localStorage.getItem('user'))?.userType === 'admin' ? <Requests/> : <h1>404: Not Found</h1>} />
        <Route path="/admin/dashboard" element={JSON.parse(localStorage.getItem('user'))?.userType === 'admin' ? <Dashboard/> : <h1>404: Not Found</h1>} />
        <Route path="/admin/:id" element={JSON.parse(localStorage.getItem('user'))?.userType === 'admin' ? <OwnerDetail/> : <h1>404: Not Found</h1>} />
        <Route path="/admin/hostel/:id" element={JSON.parse(localStorage.getItem('user'))?.userType === 'admin' ? <Hosteldetail/> : <h1>404: Not Found</h1>} />
      </Routes>
      {userType === "admin" && currentPath === "/admin" ? "" : <Footer />}
    </>
  );
}

export default App;

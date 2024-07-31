import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./dashboard.css";
import { navigationItems } from "./data.js";
import Admin from "./Admin";
import OwnerDetail from "./ownerdetail";
import Hostels from "./Hostals";
const Dashboard = () => {
  const [isMenuActive, setMenuActive] = useState(false);
  const [switchComponent, setSwitchComponent] = useState("");
  const [whichComponent, setWhichComponent] = useState("");
  const [counts, setCounts] = useState({
    ownersCount: "",
    UsersCount: "",
    HostelsCount: "",
  });
  const navigate = useNavigate();
  const handleMouseOver = (e) => {
    const list = document.querySelectorAll(".navigation li");
    list.forEach((item) => {
      item.classList.remove("hovered");
    });
    e.target.classList.add("hovered");
  };
  const handleLogout = (isLogOut) => {
    isLogOut === "logOut" && localStorage.clear(); // clear the localStorage
    // perform other logout tasks, such as redirecting to the login page
    navigate("/");
    window.location.reload();
  };
  useEffect(() => {
    console.log("data");
    const fetchHostels = async () => {
      const res = await fetch("http://localhost:8000/api/counts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      const { ownersCount, UsersCount, HostelsCount } = await res.json();
      setCounts({ ...counts, ownersCount, UsersCount, HostelsCount });
      setWhichComponent("Registrations");

      // let requests = data?.requests;
    };
    fetchHostels();
  }, []);

  const showOverview = (title) => {
    setWhichComponent(title);
    setSwitchComponent("");
  };

  const handleToggle = () => {
    setMenuActive(!isMenuActive);
  };
  const { ownersCount, UsersCount, HostelsCount } = counts;
  return (
    <div class="dashboardRow ">
      <div className="navigation">
        <ul>
          {navigationItems.map(({ id, link, icon, title }) => (
            <li key={id} onClick={() => setSwitchComponent(title)}>
              <Link to={"/admin"}>
                <span className="icon">
                  <span name={icon} />
                </span>
                <span className="title">{title}</span>
              </Link>
            </li>
          ))}
          <li onClick={() => handleLogout("logOut")}>
            <Link to={"/"}>
              <span className="icon">
                <span />
              </span>
              <span className="title"> Sign Out</span>
            </Link>
          </li>
          <li onClick={handleLogout}>
            <Link to={"/"}>
              <span className="icon">
                <span />
              </span>
              <span className="title"> Go Home</span>
            </Link>
          </li>
        </ul>
      </div>
      {/* <!-- ========================= Main ==================== --> */}
      <div class="main">
        {/*        <!-- ======================= Cards ================== --> */}

        <div class="cardBox">
          <div class="card">
            <div>
              <div class="numbers">{HostelsCount}</div>
              <div class="cardName">Hostels</div>
            </div>

            <div class="iconBx">
              <ion-icon name="eye-outline"></ion-icon>
            </div>
          </div>

          <div class="card">
            <div>
              <div class="numbers">
                {UsersCount - (UsersCount - ownersCount)}
              </div>
              <div class="cardName">Users</div>
            </div>

            <div class="iconBx">
              <ion-icon name="cart-outline"></ion-icon>
            </div>
          </div>

          <div class="card">
            <div>
              <div class="numbers">{UsersCount - ownersCount}</div>
              <div class="cardName">Managers</div>
            </div>

            <div class="iconBx">
              <ion-icon name="chatbubbles-outline"></ion-icon>
            </div>
          </div>

          <div class="card">
            <div>
              <div class="numbers">{UsersCount}</div>
              <div class="cardName">Total Sign up</div>
            </div>

            <div class="iconBx">
              <ion-icon name="cash-outline"></ion-icon>
            </div>
          </div>
        </div>

        {/* 

  <!-- ================ Order Details List ================= -->
*/}
        <div class="details">
          <div class="recentOrders">
            <div class="cardHeader">
              <h2>
                {" "}
                {switchComponent === "" ? "Registrations" : switchComponent}
              </h2>
            </div>
            {switchComponent === "" && <Admin approved={true} />}
            {switchComponent &&
              (() => {
                switch (switchComponent) {
                  case "Registrations":
                    return <Admin approved={true} />;
                  case "Requests":
                    return <Admin approved={false} />;

                  case "Hostels":
                    return <Hostels />;

                  default:
                    return <Admin approved={true} />;
                }
              })()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { getPersonalDetails } from "../../store/UserStore/Profile/action";
import Address from "./Address/address";
import Appointments from "./Appointments/Appointments";
import ChangePassword from "./ChangePassword";
import Orders from "./orders/order";
import PersonalDetails from "./personalDetails";
import Pet from "./pet/pet";

const Profile = () => {
  const [active, setActive] = useState("profile");
  const profileDetails = useSelector((state) => state.Profile);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPersonalDetails());
  }, []);

  useEffect(() => {
    if (history?.location?.tab) {
      setActive(history?.location?.tab);
    }
  }, [history?.location?.tab]);

  useEffect(() => {
    document.title = active?.charAt(0).toUpperCase() + active?.slice(1);
  }, [history?.location?.pathname, active]);

  return (
    <div className="main-content">
      <div className="row">
        <div petwalker="" className="menu-ct">
          <div petwalker="" className="container">
            <div petwalker="" className="scrollmenu">
              <a
                petwalker=""
                className={`cursor-pointer ${
                  active == "profile" ? "active-sm" : null
                }`}
                onClick={() =>
                  active == "profile" ? null : setActive("profile")
                }
              >
                My Profile
              </a>
              <a
                petwalker=""
                className={`cursor-pointer ${
                  active == "addresses" ? "active-sm" : null
                }`}
                onClick={() =>
                  active == "addresses" ? null : setActive("addresses")
                }
              >
                My Address
              </a>
              <a
                petwalker=""
                className={`cursor-pointer ${
                  active == "pets" ? "active-sm" : null
                }`}
                onClick={() => (active == "pets" ? null : setActive("pets"))}
              >
                My Pets
              </a>

              <a
                petwalker=""
                className={`cursor-pointer ${
                  active == "appointments" ? "active-sm" : null
                }`}
                onClick={() =>
                  active == "appointments" ? null : setActive("appointments")
                }
              >
                My Appointments
              </a>
              <a
                petwalker=""
                className={`cursor-pointer ${
                  active == "orders" ? "active-sm" : null
                }`}
                onClick={() =>
                  active == "orders" ? null : setActive("orders")
                }
              >
                My Orders
              </a>
            </div>
          </div>
        </div>
        <div className="container mt-40">
          {active == "profile" ? (
            <PersonalDetails profileDetails={profileDetails} />
          ) : active == "pets" ? (
            <Pet />
          ) : active == "addresses" ? (
            <Address />
          ) : active == "orders" ? (
            <Orders />
          ) : active == "appointments" ? (
            <Appointments />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Profile;

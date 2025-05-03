import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect, useHistory, useLocation } from "react-router";
import { getLocalStorage, removeItem } from "../../helpers/utils";
import { logoutUser } from "../../store/UserStore/Login/action";
const CarerHeader = ({ setNavopen, navopen }) => {
  const location = useLocation();

  const [show, setshow] = useState(false);
  const [profileshow, setprofileshow] = useState(false);
  const [breadcrumbClass, setBreadcrumbClass] = useState(
    "breadcrumb-content-hide"
  );

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const breadCrumbtoggle = () => {
    setshow(!show);
  };

  const history = useHistory();

  const dispatch = useDispatch();

  const auth = getLocalStorage("AUTH_DETAILS");

  const logout = () => {
    dispatch(
      logoutUser({
        data: { access_token: auth?.access_token },
        callback: () => {
          removeItem("AUTH_DETAILS");
          history.push("/carer/login");
        },
      })
    );
  };

  return (
    <header className="header">
      {/* <div className="header__overlay open"></div> */}

      <div className="header-nav">
        <nav
          id="menuzord-right"
          className="menuzord  no-bg menuzord-responsive "
        >
          <a
            // href="#"
            onClick={() => {
              setNavopen(!navopen);
            }}
            className="showhide opens cursor-pointer"
          >
            <em></em>
            <em></em>
            <em></em>
          </a>
          <div
            className={`menuzord-menu menuzord-right menuzord-indented scrollable display  ${
              show ? "breadcrumb-content-show" : "breadcrumb-content-hide"
            }`}
          >
            <li className="mr-4">
              <a
                style={{ cursor: "pointer", textTransform: "none" }}
                onClick={() => setprofileshow(!profileshow)}
                className="d-flex pb-1"
              >
                <span
                  className="fa fa-user"
                  style={{ fontSize: "25px", color: "#37bc9b" }}
                ></span>
                <p className="ml-2 mt-2">Hi {auth?.user?.first_name}</p>
                <span className="indicator mt-2 ml-2">
                  <i className="fa fa-angle-down"></i>
                </span>
              </a>
              <ul className={`dropdown ${profileshow ? "show" : ""}`}>
                <li>
                  <a
                    className="pt-2 pr-0"
                    style={{ cursor: "pointer" }}
                    onClick={() => logout()}
                  >
                    Logout
                  </a>
                </li>
              </ul>
            </li>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default CarerHeader;

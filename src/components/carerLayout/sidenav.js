import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import logo from "../../assets/images/logo_172.png";
import { getLocalStorage } from "../../helpers/utils";
import { getCarerPersonalDetails } from "../../store/carer/action";
// import logo from "../../assets/images/logo.jpg";

const Sidenav = ({ open }) => {
  const dispatch = useDispatch();
  const [show, setshow] = useState(false);
  const location = useLocation();
  const auth = getLocalStorage("AUTH_DETAILS");

  return (
    <>
      {auth?.user?.admin_approved && auth?.user?.profile_completed ? (
        <nav className={`pcoded-navbar ${open ? "mob-open" : ""}`}>
          {/* <nav className="pcoded-navbar mob-open"> */}
          <div className="navbar-wrapper">
            <div className=" header-logo mb-3 mt-3">
              <a
                href={`${
                  auth?.user?.role == "seller"
                    ? "/carer/seller/dashboard"
                    : "/carer/clinic/dashboard"
                }`}
                class
                className="bbrand"
              >
                <div className="text-center">
                  <img src={logo} width="250px" />
                </div>
              </a>
              {/* <a className="mobile-menu" id="mobile-collapse" href="javascript:">
            <span></span>
          </a> */}
            </div>
            <div className="navbar-content scroll-div">
              <ul className="nav pcoded-inner-navbar">
                <li
                  className={`nav-item ${
                    location.pathname.includes("/dashboard")
                      ? "active"
                      : "pcoded-hasmenu"
                  } `}
                >
                  <a
                    href={`${
                      auth?.user?.role == "seller"
                        ? "/carer/seller/dashboard"
                        : "/carer/clinic/dashboard"
                    }`}
                    className="nav-link "
                  >
                    <span className="pcoded-micon">
                      <i
                        className="fa fa-home text-white"
                        style={{ fontSize: "20px" }}
                      ></i>
                    </span>
                    <span className="pcoded-mtext">Dashboard</span>
                  </a>
                </li>

                <li
                  className={`nav-item ${
                    location.pathname.includes("/profile")
                      ? "active"
                      : "pcoded-hasmenu"
                  } `}
                >
                  {" "}
                  <a href="/carer/profile" className="nav-link ">
                    <span className="pcoded-micon">
                      <i
                        className="fa fa-user text-white"
                        style={{ fontSize: "20px" }}
                      ></i>{" "}
                    </span>
                    <span className="pcoded-mtext">Profile</span>
                  </a>
                </li>

                {/* <ul
                      className={`pcoded-submenu ${
                        show ? "display-block" : "display-none"
                      }`}
                    >
                      <li className="">
                        <a href="/carer/seller/product-management" className="">
                          Products
                        </a>
                      </li>
                      <li className="">
                        <a href="/carer/seller/order-management" className="">
                          Orders
                        </a>
                      </li>
                    </ul> */}

                {auth?.user?.role == "seller" ? (
                  <>
                    <li
                      className={`nav-item ${
                        location.pathname.includes("/product")
                          ? "active"
                          : "pcoded-hasmenu"
                      } `}
                    >
                      <a
                        className="nav-link cursor-pointer"
                        href="/carer/seller/product-management"
                      >
                        <span className="pcoded-micon">
                          <i
                            className="fa fa-shopping-cart text-white"
                            style={{ fontSize: "20px" }}
                          ></i>{" "}
                        </span>
                        <span className="pcoded-mtext">Product Management</span>
                      </a>
                    </li>

                    <li
                      className={`nav-item ${
                        location.pathname.includes("/order")
                          ? "active"
                          : "pcoded-hasmenu"
                      } `}
                    >
                      <a
                        className="nav-link cursor-pointer"
                        href="/carer/seller/order-management"
                      >
                        <span className="pcoded-micon">
                          <i
                            className="fas fa-shopping-bag text-white"
                            style={{ fontSize: "20px" }}
                          ></i>{" "}
                        </span>
                        <span className="pcoded-mtext">Order Management</span>
                      </a>
                    </li>
                  </>
                ) : auth?.user?.role == "clinic" ? (
                  <>
                    <li
                      className={`nav-item ${
                        location.pathname.includes("slot")
                          ? "active"
                          : "pcoded-hasmenu"
                      } `}
                    >
                      {" "}
                      <a
                        href="/carer/clinic/slots"
                        className="nav-link cursor-pointer"
                        onClick={() => setshow(!show)}
                      >
                        <span className="pcoded-micon">
                          <i
                            className="fa fa-clock text-white"
                            style={{ fontSize: "20px" }}
                          ></i>{" "}
                        </span>
                        <span className="pcoded-mtext">Slot Management</span>
                      </a>
                    </li>
                    <li
                      className={`nav-item ${
                        location.pathname.includes("appointment")
                          ? "active"
                          : "pcoded-hasmenu"
                      } `}
                    >
                      {" "}
                      <a
                        href="/carer/clinic/appointments"
                        className="nav-link cursor-pointer"
                        onClick={() => setshow(!show)}
                      >
                        <span className="pcoded-micon">
                          <i
                            className="fa fa-calendar text-white"
                            aria-hidden="true"
                            style={{ fontSize: "20px" }}
                          ></i>
                        </span>
                        <span className="pcoded-mtext">
                          Appointment Management
                        </span>
                      </a>
                    </li>

                    <li
                      className={`nav-item ${
                        location.pathname.includes("doctor")
                          ? "active"
                          : "pcoded-hasmenu"
                      } `}
                    >
                      {" "}
                      <a
                        href="/carer/clinic/doctors"
                        className="nav-link cursor-pointer"
                        onClick={() => setshow(!show)}
                      >
                        <span className="pcoded-micon">
                          <i
                            className="fa fa-user-md text-white"
                            aria-hidden="true"
                            style={{ fontSize: "20px" }}
                          ></i>
                        </span>
                        <span className="pcoded-mtext">Doctor Management</span>
                      </a>
                    </li>

                    <li
                      className={`nav-item ${
                        location.pathname.includes("service")
                          ? "active"
                          : "pcoded-hasmenu"
                      } `}
                    >
                      {" "}
                      <a
                        href="/carer/clinic/services"
                        className="nav-link cursor-pointer"
                        onClick={() => setshow(!show)}
                      >
                        <span className="pcoded-micon">
                          <i
                            className="flaticon-pet-play text-white"
                            aria-hidden="true"
                            style={{ fontSize: "24px" }}
                          ></i>
                        </span>
                        <span className="pcoded-mtext">Service Management</span>
                      </a>
                    </li>
                  </>
                ) : null}
              </ul>
            </div>
          </div>
        </nav>
      ) : null}
    </>
  );
};

export default Sidenav;

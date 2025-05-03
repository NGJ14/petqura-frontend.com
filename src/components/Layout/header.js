import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";
import { Link } from "react-router-dom";
import logo from "../../assets/images/petqura-logo/logo-2.png";
import { getLocalStorage, removeItem } from "../../helpers/utils";
import Login from "../../pages/Login";
import {
  getCartDetails,
  getGuestCart,
} from "../../store/UserStore/Cart/action";
import { logoutUser, resetErrors } from "../../store/UserStore/Login/action";
import CartIcon from "../CartIcon";
const Header = () => {
  const LoginData = useSelector((state) => state.Login);
  const [show, setshow] = useState(false);
  const [profileshow, setprofileshow] = useState(false);
  const [profileContentshow, setprofileContentshow] = useState(false);
  const [breadcrumbClass, setBreadcrumbClass] = useState(
    "breadcrumb-content-hide"
  );
  let [custError, setCustError] = useState("");
  const toggle = () => {
    setModal(!modal);
    dispatch(resetErrors());
    setCustError("");
  };
  const [modal, setModal] = useState(false);

  const history = useHistory();

  const Cart = useSelector((state) => state.Cart);
  const auth = getLocalStorage("AUTH_DETAILS");

  useEffect(() => {
    if (auth && auth?.user?.role == "pet_owner") {
      dispatch(getCartDetails());
    } else if (auth && auth?.guest_id) {
      dispatch(getGuestCart({ data: { guest_id: auth?.guest_id } }));
    }
  }, []);
  const breadCrumbtoggle = () => {
    setshow(!show);
  };

  const dispatch = useDispatch();

  const logout = () => {
    dispatch(
      logoutUser({
        data: { access_token: auth?.access_token },
        callback: () => {
          removeItem("AUTH_DETAILS");
          history.push("/home");
        },
      })
    );
  };

  const location = useLocation();

  return (
    <>
      {location?.pathname.includes("/carer") ? (
        <header>
          <Link to="/">
            <img src={logo} />
          </Link>
        </header>
      ) : (
        <header
          className={`header orange-background ${
            location?.pathname.includes("/home") ? "fixed-header" : ""
          }  `}
        >
          <div className="header-nav">
            <div className="header-nav-wrapper navbar-scrolltofixed bg-white scroll-to-fixed-fixed cust-header ">
              <div className=" row header-container ">
                <nav
                  id="menuzord-right"
                  className="menuzord orange no-bg menuzord-responsive"
                >
                  <Link
                    className="menuzord-brand pull-left flip cust-image "
                    to={"/"}
                  >
                    <img height={40} width={120} src={logo} />
                  </Link>
                  <a
                    onClick={() => {
                      breadCrumbtoggle();
                    }}
                    className="showhide cursor-pointer"
                  >
                    <em></em>
                    <em></em>
                    <em></em>
                  </a>

                  <ul
                    className={`menuzord-menu menuzord-right menuzord-indented scrollable display ${
                      show
                        ? "breadcrumb-content-show"
                        : "breadcrumb-content-hide"
                    }`}
                  >
                    {/* Home */}

                    <li
                      className={
                        location.pathname.includes("/home") ? `active` : ""
                      }
                    >
                      <Link to={"/"}>Home</Link>
                    </li>

                    <li
                      className={
                        location.pathname.includes("/clinic") ? `active` : ""
                      }
                    >
                      <Link to={"/clinic"}>Clinic</Link>
                    </li>

                    <li
                      className={
                        location.pathname.includes("/store") ? `active` : ""
                      }
                    >
                      <Link to={"/store"}>Store</Link>
                    </li>

                    {/* Doctors */}

                    <li
                      className={
                        location.pathname.includes("/contact-us")
                          ? `active`
                          : ""
                      }
                    >
                      <Link className="cursor-pointer" to={"contact-us"}>
                        Contact Us
                      </Link>
                    </li>

                    {getLocalStorage("AUTH_DETAILS") &&
                    (auth?.user?.role == "seller" ||
                      auth?.user?.role == "clinic" ||
                      auth?.user?.role == "carer") ? (
                      <li>
                        <a
                          href={`/carer/${auth?.user?.role}/dashboard`}
                          target="_blank"
                          className="cust-seller-login-btn"
                          rel="noreferrer"
                        >
                          Dashboard
                        </a>
                      </li>
                    ) : null}

                    {auth && auth?.user?.role == "pet_owner" ? null : (
                      <li>
                        <a
                          style={{ cursor: "pointer", textTransform: "none" }}
                          onMouseEnter={() => setprofileshow(true)}
                          onMouseLeave={() => setprofileshow(false)}
                          onClick={() =>
                            setprofileContentshow(
                              profileContentshow == true ? false : true
                            )
                          }
                        >
                          Login
                          <span className="indicator">
                            <i className="fa fa-angle-down"></i>
                          </span>
                        </a>
                        <ul
                          className={`dropdown ${
                            profileshow || profileContentshow ? "show" : ""
                          }`}
                          onClick={() => {
                            setprofileContentshow(
                              profileContentshow == true ? false : true
                            );
                          }}
                          onMouseEnter={() => setprofileContentshow(true)}
                          onMouseLeave={() => setprofileContentshow(false)}
                        >
                          <li>
                            <a
                              className="cursor-pointer dropdown-user"
                              onClick={() => setModal(true)}
                            >
                              PawWalkers
                            </a>
                          </li>
                          <li>
                            <a
                              className="cursor-pointer dropdown-user"
                              href="/carer/login"
                              target="_blank"
                            >
                              Partners
                            </a>
                          </li>
                        </ul>
                      </li>
                    )}
                    {auth && auth?.user?.role == "pet_owner" ? (
                      <li>
                        <a
                          style={{ cursor: "pointer", textTransform: "none" }}
                          onMouseEnter={() => setprofileshow(true)}
                          onMouseLeave={() => setprofileshow(false)}
                          onClick={() =>
                            setprofileContentshow(
                              profileContentshow == true ? false : true
                            )
                          }
                        >
                          Hi,{auth?.user?.first_name}
                          <span className="indicator">
                            <i className="fa fa-angle-down"></i>
                          </span>
                        </a>
                        <ul
                          className={`dropdown ${
                            profileshow || profileContentshow ? "show" : ""
                          }`}
                          onClick={() => {
                            setprofileContentshow(
                              profileContentshow == true ? false : true
                            );
                          }}
                          onMouseEnter={() => setprofileContentshow(true)}
                          onMouseLeave={() => setprofileContentshow(false)}
                        >
                          <li>
                            <a href="/profile">Profile</a>
                          </li>
                          <li>
                            <a
                              style={{ cursor: "pointer" }}
                              onClick={() => logout()}
                            >
                              Logout
                            </a>
                          </li>
                        </ul>
                      </li>
                    ) : auth?.guest_id ? (
                      <li>
                        <a>Hi,Guest</a>
                      </li>
                    ) : null}

                    {getLocalStorage("AUTH_DETAILS") &&
                      (auth?.user?.role == "pet_owner" || auth?.guest_id) && (
                        <li>
                          <CartIcon count={Cart?.ShopCart?.total} />
                        </li>
                      )}
                  </ul>
                </nav>
              </div>
            </div>
          </div>
          <Login
            modal_center={modal}
            setmodal_center={setModal}
            login_toggle={toggle}
            pass={true}
            setCustError={setCustError}
            custError={custError}
          />
        </header>
      )}
    </>
  );
};

export default Header;

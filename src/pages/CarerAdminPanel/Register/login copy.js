import React, { useState } from "react";
import { Redirect, useHistory } from "react-router";
import { getLocalStorage } from "../../../helpers/utils";
import logo from "../../../assets/images/logo.jpg";
import logoImg from "../../../assets/images/pawwalker_white_text.png";
import { useDispatch, useSelector } from "react-redux";
import { carerLoginUser } from "../../../store/carer/action";
const CarerLogin = () => {
  const Carer = useSelector((state) => state.Carer);
  const dispatch = useDispatch();
  let [showPwd, setShowPwd] = useState(false);
  const showPasswordClass = "fa fa-eye-slash";
  const hidePasswordClass = "fa fa-eye";
  let [loginPhone, setLoginPhone] = useState();
  let [loginPassword, setLoginPassword] = useState();

  const history = useHistory();
  const handleCarerValidLoginSubmit = (e, v) => {
    e.preventDefault();
    dispatch(
      carerLoginUser({
        data: { phone: `+91${loginPhone}`, password: loginPassword },
        callback: () => {
          if (!getLocalStorage("AUTH_DETAILS")?.user?.profile_completed) {
            history.push("/carer/complete-profile");
          } else if (!getLocalStorage("AUTH_DETAILS")?.user?.admin_approved) {
            history.push("/carer/under-verification");
          } else if (getLocalStorage("AUTH_DETAILS")?.user?.role == "seller")
            history.push("/carer/seller/dashboard");
          else if (getLocalStorage("AUTH_DETAILS")?.user?.role == "clinic")
            history.push("/carer/clinic/dashboard");
          setLoginPhone("");
          setLoginPassword("");
        },
      })
    );
  };

  return getLocalStorage("AUTH_DETAILS") &&
    getLocalStorage("AUTH_DETAILS")?.user?.role == "seller" ? (
    <Redirect to="/carer/seller/dashboard" />
  ) : getLocalStorage("AUTH_DETAILS")?.user?.role == "clinic" ? (
    <Redirect to="/carer/clinic/dashboard" />
  ) : (
    <div className="container-height">
      {/* <header className="d-flex header-container justify-content-between">
        <a href="/">
          <img src={logo} />{" "}
        </a>

        <a href="/" className="text-dark mt-4 mr-4 pt-2">
          Return to home
        </a>
      </header> */}
      <section className=" divider parallax layer-overlay overlay-dark-8">
        <div className="container-fluid p-0">
          <div className="row">
            <div className="col-md-6">
              <img
                src={logoImg}
                style={{
                  backgroundSize: "contain",
                }}
              />
            </div>
            <div className="col-md-6 bg-light ">
              <div className="row">
                <div className="col-8">
                  <button
                    type="button"
                    className="btn btn-light mt-4 mr-30 pt-2 pull-right"
                  >
                    <a href="/" className="text-dark  font-weight-normal">
                      Return to home
                    </a>
                  </button>
                </div>
              </div>
              <div className="#carer-login-form " style={{ bottom: "0" }}>
                <div className="row">
                  <div
                    className="col-md-10 custom-seller-login-page pl-40"
                    style={{ marginTop: "104px" }}
                  >
                    <h3 className="mt-0 line-height-1 mb-40 ">
                      <span className="ml-0">
                        Login As{" "}
                        <span className="orange-font ml-0">
                          Service Provider
                        </span>
                      </span>
                    </h3>

                    <form onSubmit={handleCarerValidLoginSubmit}>
                      <div className="row">
                        <div className="col-sm-7 col-lg-7 col-xs-10">
                          <div className="form-group mb-20">
                            <input
                              name="phone"
                              className="custom-form-control"
                              type="number"
                              required
                              placeholder="Enter Phone Number"
                              aria-required="true"
                              value={loginPhone}
                              onChange={(e) => setLoginPhone(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="col-sm-7 col-lg-7 col-xs-10">
                          <div className="form-group mb-20 cust-login-fieldWrapper">
                            <input
                              name="form_date"
                              className="custom-form-control"
                              type={showPwd ? "text" : "password"}
                              placeholder="Password"
                              aria-required="true"
                              value={loginPassword}
                              onChange={(e) => setLoginPassword(e.target.value)}
                            />
                            <div
                              className="cust-pwd-eye"
                              onClick={() => setShowPwd(!showPwd)}
                              data-testid="component-login-passwordMask"
                            >
                              <i
                                className={
                                  showPwd
                                    ? hidePasswordClass
                                    : showPasswordClass
                                }
                                aria-hidden="true"
                              ></i>
                            </div>
                          </div>
                        </div>
                      </div>
                      {Carer?.error && (
                        <p className="mandatory">{Carer?.error}</p>
                      )}

                      <div className="form-group mb-0 mt-10 ml-2">
                        <input
                          id="form_botcheck"
                          name="form_botcheck"
                          className="form-control"
                          type="hidden"
                          defaultValue
                        />
                        <button
                          type="submit"
                          className="
              btn btn-dark btn-theme-colored
              text-uppercase"
                          data-loading-text="Please wait..."
                        >
                          Login
                        </button>
                        <h5 className="mt-4">
                          New to PawWalker?{" "}
                          <a
                            href="/carer/register"
                            className="text-info"
                            style={{ cursor: "pointer" }}
                          >
                            Sign Up
                          </a>
                        </h5>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <Footer /> */}
    </div>
  );
};

export default CarerLogin;

import React, { useEffect, useState, useRef } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation, withRouter } from "react-router";
import { Modal } from "reactstrap";
import logo from "../../assets/images/logo.jpg";
import Register from "../Register";
import { loginUser, resetErrors } from "../../store/UserStore/Login/action";
import ForgetPassword from "./forgetPassword";
import { getCartDetails } from "../../store/UserStore/Cart/action";
import { resetUserRegisterErrors } from "../../store/UserRegister/action";

const Login = ({
  modal_center,
  login_toggle,
  setmodal_center,
  custError,
  setCustError,
  productLogin,
  productId,
  product_variant_id,
  quantity,
  clientedetail,
}) => {
  let [showPwd, setShowPwd] = useState(false);
  const showPasswordClass = "fa fa-eye-slash";
  const hidePasswordClass = "fa fa-eye";
  const wrapperRef = useRef(null);
  const [modalReg, setRegModal] = useState(false);
  let [customError, setCustomError] = useState("");
  let [errorMessage, setErrorMessage] = useState(false);
  let [passwordError, setPasswordError] = useState(false);

  const toggle = () => {
    setRegModal(!modalReg);
    dispatch(resetUserRegisterErrors());
    setErrorMessage("");
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setPassword("");
    setCustomError("");
    setConfirmPassword("");
  };
  const [modalForget, setForgetModal] = useState(false);
  const dispatch = useDispatch();
  const LoginData = useSelector((state) => state.Login);
  let [phonenum, setphonenum] = useState();
  let [loginpassword, setLoginPassword] = useState();

  let [firstname, setFirstName] = useState("");
  let [lastname, setLastName] = useState("");
  let [email, setEmail] = useState("");
  let [phone, setPhone] = useState("");
  let [password, setPassword] = useState("");
  let [confirmPassword, setConfirmPassword] = useState("");
  let [checked, setChecked] = useState(false);
  const location = useLocation();
  const history = useHistory();

  const handleValidSubmit = (e) => {
    e.preventDefault();
    if (!phonenum || !loginpassword) {
      return setCustError("Username and Password Required");
    } else {
      setCustError("");
      dispatch(
        loginUser({
          user: { phone: `+91${phonenum}`, password: loginpassword },
          productLogin: productLogin,
          cart: {
            product_id: productId,
            product_variant_id: product_variant_id,
            quantity: quantity,
          },
          callback: () => {
            dispatch(getCartDetails());
            setmodal_center(false);
            if (clientedetail) {
              clientedetail();
            }
            if (
              location?.pathname?.includes("/checkout/address") ||
              location?.pathname?.includes("/cart") ||
              location?.pathname?.includes("/checkout/summary") ||
              location?.pathname?.includes("/store/success")
            ) {
              history?.push("/store");
            }
          },
        })
      );
    }
  };

  const handleKeyDown = () => {
    window.addEventListener(
      "keydown",
      function (e) {
        if (["Space", "ArrowUp", "ArrowDown"].indexOf(e.code) > -1) {
          e.preventDefault();
        }
      },
      false
    );
  };

  return (
    <>
      <Modal isOpen={modal_center} centered={true} toggle={login_toggle}>
        <div className="modal-header mb-5 text-center">
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
            onClick={() => {
              setmodal_center(false);
              dispatch(resetErrors());
            }}
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>

        <div className="modal-body">
          <div className="d-flex flex-column text-center">
            <form onSubmit={handleValidSubmit}>
              <div className="form-title text-center">
                <h3>
                  <img src={logo} width="200px" />
                </h3>
                <h3>For Pet Parents</h3>
              </div>
              <div
                className="form-group"
                style={{
                  margin: "15px 20px",
                  padding: "0px 20px",
                }}
              >
                <input
                  type="number"
                  className="form-control "
                  id="phone"
                  placeholder="Phone Number"
                  style={{ fontSize: "1.5rem" }}
                  onChange={(e) => setphonenum(e.target.value)}
                  onKeyDown={handleKeyDown}
                  maxLength={10}
                />
              </div>
              <div
                className="form-group cust-login-fieldWrapper"
                style={{
                  margin: "15px 20px",
                  padding: "0px 20px",
                }}
              >
                <input
                  type={showPwd ? "text" : "password"}
                  className="form-control"
                  id="password1"
                  placeholder=" Password"
                  style={{ fontSize: "1.5rem" }}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
                <div
                  className="cust-user-eye"
                  onClick={() => setShowPwd(!showPwd)}
                  data-testid="component-login-passwordMask"
                >
                  <i
                    className={showPwd ? hidePasswordClass : showPasswordClass}
                    aria-hidden="true"
                  ></i>
                </div>
              </div>
              {LoginData?.error ? (
                LoginData?.error ==
                "User not found, please try signup" ? null : (
                  <p className="text-danger">{LoginData?.error}</p>
                )
              ) : null}
              {custError && <p className="mr-4 mandatory">{custError}</p>}
              <button
                type="submit"
                className="btn btn-info  btn-round"
                style={{
                  padding: "5px 80px",
                  fontWeight: "bold",
                  fontSize: "13px",
                }}
              >
                Login
              </button>
              <h5 className="mt-3">
                <a
                  className="text-info"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setmodal_center(false);
                    setForgetModal(true);
                    dispatch(resetErrors());
                  }}
                >
                  Forget Password
                </a>
              </h5>
            </form>
          </div>
        </div>
        <div className="modal-footer  justify-content-center">
          <div className="signup-section">
            <h5>
              Not a member yet?{" "}
              <a
                className="text-info"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setmodal_center(false);
                  setCustError("");
                  dispatch(resetErrors());
                  toggle();
                }}
              >
                Sign Up
              </a>
            </h5>
          </div>{" "}
        </div>
      </Modal>
      <Register
        setmodal_center={setmodal_center}
        modal_center={modal_center}
        setregmodal_center={setRegModal}
        modalreg_center={modalReg}
        reg_toggle={toggle}
        showPassword={false}
        customError={customError}
        setCustomError={setCustomError}
        firstname={firstname}
        lastname={lastname}
        email={email}
        phone={phone}
        password={password}
        setFirstName={setFirstName}
        setLastName={setLastName}
        setEmail={setEmail}
        setPhone={setPhone}
        setPassword={setPassword}
        pass
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
        passwordError={passwordError}
        setPasswordError={setPasswordError}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
        setChecked={setChecked}
        checked={checked}
      />

      <ForgetPassword
        setmodal_center={setmodal_center}
        modal_center={modal_center}
        setforgetmodal_center={setForgetModal}
        modalforget_center={modalForget}
      />
    </>
  );
};

export default Login;

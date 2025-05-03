import React, { useEffect, useState, useRef } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router";
import { Modal } from "reactstrap";
import logo from "../../assets/images/logo.jpg";
import Register from "../Register";
import {
  forgotPassword,
  forgotVerifyPassword,
  resetErrors,
} from "../../store/UserStore/Login/action";
import ForgetPasswordSuccess from "./forgetPasswordSuccess";

const ForgetPasswordConfirm = ({
  modalChangePassword,
  setChangePasswordModal,
  setmodal_center,
}) => {
  const Login = useSelector((state) => state.Login);

  const [modalChangePasswordSuccess, setChangePasswordSuccessModal] =
    useState(false);

  const dispatch = useDispatch();

  let [password, setpassword] = useState();
  let [confirmPassword, setconfirmPassword] = useState();
  let [disableLogin, setDisableLogin] = useState(true);
  const [ErrorAlert, setErrorAlert] = useState(false);
  const [customErrorAlert, setcustomErrorAlert] = useState("");
  useEffect(() => {
    if (password == "" || confirmPassword == "") {
      setDisableLogin(true);
      setErrorAlert(false);
    } else {
      setDisableLogin(false);
    }
  }, [password, confirmPassword, ErrorAlert]);

  const handleValidSubmit = (e) => {
    e.preventDefault();
    if (password != confirmPassword) {
      return setcustomErrorAlert("Password does not match");
    } else {
      setcustomErrorAlert("");
      setErrorAlert(false);
      dispatch(
        forgotVerifyPassword({
          data: {
            phone: Login?.user?.phone,
            new_password: password,
            user_type: "pet_owner",
          },
          callback: () => {
            setChangePasswordModal(false);
            setChangePasswordSuccessModal(true);
            setpassword("");
            setconfirmPassword("");
          },
        })
      );
    }
  };

  return (
    <>
      <Modal isOpen={modalChangePassword} centered={true}>
        <div className="modal-header mb-5 text-center">
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
            onClick={() => {
              setChangePasswordModal(false);
              dispatch(resetErrors());
              setpassword("");
              setconfirmPassword("");
              setcustomErrorAlert("");
              setErrorAlert(false);
            }}
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div className="modal-body">
          <div className="d-flex flex-column text-center">
            <form onSubmit={handleValidSubmit}>
              <div className="form-title text-center">
                <h2>Change Password</h2>
              </div>
              <div
                className="form-group"
                style={{
                  margin: "15px 20px",
                  padding: "0px 20px",
                }}
              >
                <input
                  type="password"
                  className="form-control "
                  id="phone"
                  placeholder="Password"
                  style={{ fontSize: "1.5rem" }}
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                />
              </div>
              <div
                className="form-group"
                style={{
                  margin: "15px 20px",
                  padding: "0px 20px",
                }}
              >
                <input
                  type="password"
                  className="form-control "
                  id="phone"
                  placeholder="Confirm Password"
                  style={{ fontSize: "1.5rem" }}
                  value={confirmPassword}
                  onChange={(e) => setconfirmPassword(e.target.value)}
                />
              </div>

              {customErrorAlert && (
                <p className="text-danger">{customErrorAlert}</p>
              )}

              <button
                type="submit"
                className="btn btn-info  btn-round"
                style={{
                  padding: "5px 80px",
                  fontWeight: "bold",
                  fontSize: "13px",
                }}
                disabled={disableLogin ? true : false}
                // onClick={() => {
                //   setChangePasswordModal(false);
                // }}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </Modal>
      <ForgetPasswordSuccess
        modalChangePasswordSuccess={modalChangePasswordSuccess}
        setChangePasswordSuccessModal={setChangePasswordSuccessModal}
        setmodal_center={setmodal_center}
      />
    </>
  );
};

export default ForgetPasswordConfirm;

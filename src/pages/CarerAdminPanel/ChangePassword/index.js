import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Modal, ModalBody } from "reactstrap";
import SuccessConfirmationAlert from "../../../components/SuccessConfirmationAlert";
import { changePassword } from "../../../store/UserStore/Profile/action";

const ChangePassword = ({
  toggle,
  modal_center,
  currentPassword,
  setCurrentPassword,
  newPassword,
  setNewPassword,
  confirmPassword,
  setConfirmPassword,
  setError,
  error,
}) => {
  const Profile = useSelector((state) => state.Profile);
  const [modalsuccess, setModalSuccess] = useState(false);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentPassword == "" || newPassword == "" || confirmPassword == "") {
      return setError("Please enter all the field");
    } else if (currentPassword == newPassword) {
      return setError("Current Password and New Password cannot be same");
    } else {
      setError("");
      dispatch(
        changePassword({
          data: {
            current_password: currentPassword,
            new_password: newPassword,
            confirm_new_password: confirmPassword,
          },
          callback: () => {
            setModalSuccess(true);
          },
        })
      );
    }
  };

  const okHandleClick = () => {
    setModalSuccess(false);
    toggle();
  };

  return (
    <Modal
      isOpen={modal_center}
      toggle={toggle}
      style={{ maxWidth: "700px", width: "100%" }}
      centered
    >
      <ModalBody>
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 my-3">
          {" "}
          <div className="mb-5  ">
            <span className="font-weight-bold h3 ">Change Password</span>
          </div>
          <form onSubmit={handleSubmit}>
            <div style={{ background: "#fff" }} className="my-5">
              <input
                className="custom-inputs "
                type="text"
                placeholder="Current Password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
              {Profile?.error == "Incorrect Password" && error == "" ? (
                <p className="mt-3 ml-1 mandatory">{Profile?.error}</p>
              ) : (
                <div className="mt-40 "></div>
              )}
            </div>
            <div style={{ background: "#fff" }} className="my-5">
              <input
                type="text"
                className="custom-inputs"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            <div style={{ background: "#fff" }}>
              <input
                type="text"
                className="custom-inputs"
                placeholder="Confirm Password."
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            {error ||
            (Profile?.error && Profile?.error != "Incorrect Password") ? (
              <p className="mt-3 ml-1 mandatory">{error || Profile?.error}</p>
            ) : null}
            <button
              //   disabled={disabled}
              type="submit"
              className="btn ok-button mt-4"
            >
              Update
              {Profile?.loading ? (
                <i
                  className="fa fa-spinner fa-spin ml-1"
                  aria-hidden="true"
                ></i>
              ) : null}
            </button>
          </form>
          <SuccessConfirmationAlert
            modal_center={modalsuccess}
            setmodal_center={setModalSuccess}
            content="Password Updated Successfully"
            okHandle={true}
            okHandleClick={okHandleClick}
          />
        </div>
      </ModalBody>
    </Modal>
  );
};

export default ChangePassword;

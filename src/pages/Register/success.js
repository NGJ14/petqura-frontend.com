import React from "react";
import { connect, useDispatch } from "react-redux";
import { Modal } from "reactstrap";
import { getLocalStorage } from "../../helpers/utils";

import { resetUserRegisterErrors } from "../../store/UserRegister/action";

const Success = ({
  modalsuccess,
  setModalSuccess,
  setmodal_center,
  successMessage,
  backbuttonTitle,
  is_clinic,
}) => {
  const dispatch = useDispatch();
  const auth = getLocalStorage("AUTH_DETAILS");
  return (
    <>
      <Modal isOpen={modalsuccess} centered={true}>
        <div className="modal-header mb-5 text-center">
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
            onClick={() => {
              setModalSuccess(false);
              dispatch(resetUserRegisterErrors());
            }}
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div className="modal-body">
          <div className="d-flex flex-column text-center">
            <div className="form-title text-center">
              <h2>
                <i
                  className="fa fa-check bg-info rounded-circle text-white"
                  style={{ fontSize: "20px", padding: "5px" }}
                  aria-hidden="true"
                ></i>{" "}
                Success
              </h2>
              {successMessage ? (
                <h5>{successMessage}</h5>
              ) : (
                <h5>New Account Created Successfully</h5>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-info  btn-round  mb-3"
              style={{
                padding: "5px 80px",
                fontWeight: "bold",
                fontSize: "13px",
              }}
              onClick={() => {
                setModalSuccess(false);
                if (!auth?.guest_id && !is_clinic) {
                  setmodal_center(true);
                }
                dispatch(resetUserRegisterErrors());
              }}
            >
              {backbuttonTitle ? backbuttonTitle : "Back to Login"}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Success;

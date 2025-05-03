import React, { useState } from "react";
import { Modal } from "reactstrap";
import Login from "../Login";
import logo from "../../assets/images/logo.jpg";
import { addGuest, guestResetErrors } from "../../store/UserStore/Guest/action";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import Register from "../Register";
import BookSlot from "../clinics/BookSlot";
import { removeItem } from "../../helpers/utils";
import { resetErrors } from "../../store/UserStore/Login/action";
import Success from "../Register/success";

const UserSelectionAlert = ({
  modal_center,
  setmodal_center,
  backbuttonTitle,
  productId,
  product_variant_id,
  quantity,
  clientedetail,
  guest_id,
}) => {
  const [modal, setModal] = useState(false);
  const loginToggle = () => {
    setModal(!modal);
    dispatch(resetErrors());
    setCustError("");
  };
  let [custError, setCustError] = useState("");

  const dispatch = useDispatch();
  const [modalReg, setRegModal] = useState(false);

  const [modalsuccess, setModalSuccess] = useState(false);

  const addGuestDetails = () => {
    dispatch(
      addGuest({
        productLogin: true,
        cart: {
          product_id: productId,
          product_variant_id: product_variant_id,
          quantity: quantity,
        },
        callback: () => {
          setmodal_center(false);
          setRegModal(true);
          clientedetail();
        },
      })
    );
  };

  return (
    <>
      <Modal isOpen={modal_center} centered={true}>
        <div className="modal-header mb-5 text-center">
          <h5 className="modal-title mt-0">Authentication Required</h5>
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
            onClick={() => {
              setmodal_center(false);
            }}
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>

        <div className="modal-body text-center">
          <div className="form-title text-center">
            <h3>
              <img src={logo} width="150px" />
            </h3>
          </div>
          <div>
            <a
              className="cursor-pointer mb-3"
              onClick={() => {
                setmodal_center(false);
                setModal(true);
                removeItem("AUTH_DETAILS");
                dispatch(guestResetErrors());
              }}
            >
              Login
            </a>
          </div>
          <p className="my-4"> or</p>
          <div className="mb-5">
            <a
              className="cursor-pointer "
              onClick={() => {
                addGuestDetails();
                setmodal_center(false);
                // setModalSuccess(true);
              }}
              // onClick={addGuestDetails}
            >
              Continue as Guest
            </a>
          </div>
        </div>
      </Modal>
      <Login
        modal_center={modal}
        setmodal_center={setModal}
        login_toggle={loginToggle}
        pass={true}
        setCustError={setCustError}
        custError={custError}
        productLogin={true}
        productId={productId}
        product_variant_id={product_variant_id}
        quantity={quantity}
        clientedetail={clientedetail}
      />

      <Success
        modalsuccess={modalsuccess}
        setModalSuccess={setModalSuccess}
        setmodal_center={setmodal_center}
        successMessage="Your Details Recorded Successfully"
        backbuttonTitle={backbuttonTitle}
        productLogin={true}
        productId={productId}
        product_variant_id={product_variant_id}
        quantity={quantity}
        clientedetail={clientedetail}
        guest_id={guest_id}
      />
    </>
  );
};

export default UserSelectionAlert;

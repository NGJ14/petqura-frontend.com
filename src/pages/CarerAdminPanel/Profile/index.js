import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { Row, UncontrolledAlert } from "reactstrap";
import SuccessConfirmationAlert from "../../../components/SuccessConfirmationAlert";
import Loader from "../../../components/UI/Loader";
import {
  checkIfValidIndianMobileNumber,
  getLocalStorage,
} from "../../../helpers/utils";
import {
  getCarerPersonalDetails,
  updateCarer,
} from "../../../store/carer/action";
import { resetPersonalError } from "../../../store/UserStore/Profile/action";
import ChangePassword from "../../Profile/ChangePassword";
import "react-phone-number-input/style.css";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";

const CarerProfile = () => {
  const carerDetails = useSelector((state) => state?.Carer);
  const dispatch = useDispatch();
  const history = useHistory();
  const [modal, setModal] = useState(false);
  const toggle = () => {
    setModal(!modal);
  };
  const [modalpopUp, setModalpopUp] = useState(false);

  const modalPopuptoggle = () => {
    setModalpopUp(!modalpopUp);
    setCurrentPassword("");
    setConfirmPassword("");
    setNewPassword("");
    setError("");
    dispatch(resetPersonalError());
  };

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  let [address1, setAddress1] = useState();
  let [address2, setAddress2] = useState();
  let [city, setCity] = useState();
  let [state, setState] = useState();
  let [pin, setPin] = useState();
  let [alternatePhn, setAlternatePhn] = useState();
  let [altPhone, setaltPhone] = useState("");
  let [altPhoneValild, setaltPhoneValid] = useState(true);
  let [name, setName] = useState();
  let [AccountIDPayTM, setAccountIDPayTM] = useState("");
  // let [description, setDescription] = useState();
  const [img, setImg] = useState(null);
  const [imageChanged, setImageChange] = useState(false);
  const [phoneError, setPhoneError] = useState("");

  useEffect(() => {
    dispatch(getCarerPersonalDetails());
  }, []);

  useEffect(() => {
    console.log(carerDetails)
    carerDetails?.carer?.address_line_1 &&
      setAddress1(carerDetails?.carer?.address_line_1);
    carerDetails?.carer?.address_line_2 &&
      setAddress2(carerDetails?.carer?.address_line_2);
    carerDetails?.carer?.city && setCity(carerDetails?.carer?.city);
    carerDetails?.carer?.state && setState(carerDetails?.carer?.state);
    carerDetails?.carer?.pincode && setPin(carerDetails?.carer?.pincode);
    carerDetails?.carer?.alternative_phone &&
    setaltPhone(carerDetails?.carer?.alternative_phone);
    carerDetails?.carer?.display_name &&
      setName(carerDetails?.carer?.display_name);
    // carerDetails?.carer?.services &&
    //   setDescription(carerDetails?.carer?.services);
    carerDetails?.carer?.clinic_image &&
      setImg(carerDetails?.carer?.clinic_image);
    carerDetails?.carer?.accountid_paytm &&
    setAccountIDPayTM(carerDetails?.carer?.accountid_paytm);

  }, [carerDetails?.carer?.address_line_1]);

  const handleSubmit = (e) => {  
    e.preventDefault();
    if (
      alternatePhn?.length > 0 &&
      !checkIfValidIndianMobileNumber(alternatePhn)
    ) {
      return setPhoneError("Invalid Phone Number");
    }
    setPhoneError("");
    const formData = new FormData();
    if (typeof img == "object") {
      formData.append("image", img);
    }

    dispatch(
      updateCarer({
        data: {
          address_line_1: address1,
          address_line_2: address2,
          city: city,
          state: state,
          pincode: pin,
          bank_account_number:
            carerDetails?.carer?.user_details?.bank_account_number,
          bank_ifsc: carerDetails?.carer?.user_details?.bank_ifsc,
          beneficiary_name: carerDetails?.carer?.user_details?.beneficiary_name,
          display_name: name,
          alternative_phone: altPhone,
          // service_description: description,
          accountid_paytm: AccountIDPayTM,
        },
        image: formData,
        isImage: img == null || img == undefined,
        imageChanged: imageChanged,
        callback: () => {
          toggle();
          dispatch(getCarerPersonalDetails());
        },
      })
    );
  };
  const altphoneChangeHandler = (value) => {
    if (value) {
      setaltPhone(value);
      if (isValidPhoneNumber(value)) {
        setaltPhoneValid(true);
      }
    }
  };
  const altphoneOnBlurHandler = () => {
    if (!isValidPhoneNumber(altPhone)) {
      setaltPhoneValid(false);
    }
  };
  const auth = getLocalStorage("AUTH_DETAILS");

  const fileName =
    img && typeof img === "string"
      ? img?.slice(52)
      : img && typeof img == "object"
      ? img?.name
      : img == null
      ? "No file chosen"
      : "No file chosen";

  return !auth?.user?.profile_completed ? (
    <Redirect to="/carer/complete-profile" />
  ) : !auth?.user?.admin_approved ? (
    <Redirect to="/carer/under-verification" />
  ) : (
    <div
      className="page-content cust-page  justify-content-center align-items-center"
      data-testid="component-faqAddNew"
    >
      <div className="main-content ">
        {/* Top seller-navbar */}

        {/* Header */}

        {/* Page content */}
        <div className="seller-container-fluid mt--7">
          <div className="row">
            <div className="col-xl-12 order-xl-1">
              <div className="seller-card bg-secondary shadow">
                <div className="seller-card-header bg-white border-0">
                  <div className="row align-items-center">
                    {(carerDetails?.error || carerDetails?.success) && (
                      <div>
                        <UncontrolledAlert
                          color={carerDetails?.error ? "danger" : "success"}
                          className="alert-dismissible fade show"
                          role="alert"
                        >
                          {carerDetails?.error || carerDetails?.success}
                        </UncontrolledAlert>
                      </div>
                    )}
                    <div className="col-lg-9 d-flex justify-content-between">
                      <h3 className="mb-0 ml-3 mt-3">Edit Profile</h3>
                      <button
                        className="btn mt-3 orange-background text-white"
                        onClick={modalPopuptoggle}
                      >
                        Change Password
                      </button>
                    </div>
                    {/* <div className="seller-col-4 text-right">
                      <a
                        href="#!"
                        className="seller-btn seller-btn-sm seller-btn-primary"
                      >
                        Settings
                      </a>
                    </div> */}
                  </div>
                </div>
                <div className="seller-card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="pl-lg-4">
                      <div className="row">
                        <div className="seller-col-lg-6">
                          <div className="seller-form-group focused">
                            <label
                              className="seller-form-control-label h5"
                              htmlFor="input-first-name"
                            >
                              First name
                            </label>
                            <input
                              type="text"
                              id="input-first-name"
                              className="seller-form-control seller-form-control-alternative"
                              value={carerDetails?.carer?.first_name}
                              disabled={true}
                            />
                          </div>
                        </div>
                        <div className="seller-col-lg-6">
                          <div className="seller-form-group focused">
                            <label
                              className="seller-form-control-label h5"
                              htmlFor="input-last-name"
                            >
                              Last name
                            </label>
                            <input
                              type="text"
                              id="input-last-name"
                              className="seller-form-control seller-form-control-alternative"
                              value={carerDetails?.carer?.last_name}
                              disabled={true}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="seller-col-lg-6">
                          <div className="seller-form-group focused">
                            <label
                              className="seller-form-control-label h5"
                              htmlFor="input-username"
                            >
                              Phone Number
                            </label>
                            <input
                              type="text"
                              id="input-username"
                              className="seller-form-control seller-form-control-alternative"
                              value={carerDetails?.carer?.phone}
                              disabled={true}
                            />
                          </div>
                        </div>
                        <div className="seller-col-lg-6">
                          <div className="seller-form-group">
                            <label
                              className="seller-form-control-label h5"
                              htmlFor="input-email"
                            >
                              Email address
                            </label>
                            <input
                              type="email"
                              id="input-email"
                              className="seller-form-control seller-form-control-alternative"
                              value={carerDetails?.carer?.email}
                              disabled={true}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr className="my-4" />
                    {/* Contact information */}
                    <h6 className=" text-muted mb-4">Contact information</h6>
                    <div className="pl-lg-4">
                      <div className="row">
                        <div className="seller-col-lg-6">
                          <div className="seller-form-group focused">
                            <label
                              className="seller-form-control-label h5"
                              htmlFor="input-address"
                            >
                              Address Line 1
                            </label>
                            <input
                              id="input-address"
                              className="seller-form-control seller-form-control-alternative"
                              placeholder="Home Address"
                              //   defaultValue="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                              type="text"
                              value={address1}
                              onChange={(e) => setAddress1(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="seller-col-lg-6">
                          <div className="seller-form-group focused">
                            <label
                              className="seller-form-control-label h5"
                              htmlFor="input-address"
                            >
                              Address Line 2
                            </label>
                            <input
                              id="input-address"
                              className="seller-form-control seller-form-control-alternative"
                              placeholder="Home Address"
                              //   defaultValue="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                              type="text"
                              value={address2}
                              onChange={(e) => setAddress2(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="seller-col-lg-4">
                          <div className="seller-form-group focused">
                            <label
                              className="seller-form-control-label h5"
                              htmlFor="input-city"
                            >
                              City
                            </label>
                            <input
                              type="text"
                              id="input-city"
                              className="seller-form-control seller-form-control-alternative"
                              placeholder="City"
                              value={city}
                              onChange={(e) => setCity(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="seller-col-lg-4">
                          <div className="seller-form-group focused">
                            <label
                              className="seller-form-control-label h5"
                              htmlFor="input-state"
                            >
                              State
                            </label>
                            <input
                              type="text"
                              id="input-state"
                              className="seller-form-control seller-form-control-alternative"
                              placeholder="State"
                              value={state}
                              onChange={(e) => setState(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="seller-col-lg-4">
                          <div className="seller-form-group">
                            <label
                              className="seller-form-control-label h5"
                              htmlFor="input-pin"
                            >
                              Pin code
                            </label>
                            <input
                              type="number"
                              id="input-pin"
                              className="seller-form-control seller-form-control-alternative"
                              placeholder="Pin code"
                              value={pin}
                              onChange={(e) => setPin(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="seller-col-lg-4">
                          <div className="seller-form-group">
                            <label
                              className="seller-form-control-label h5"
                              htmlFor="input-pin"
                            >
                              Alternative Phone Number
                            </label>
                            {/* <input
                              type="number"
                              id="input-pin"
                              className="seller-form-control seller-form-control-alternative"
                              placeholder="Phone Number without +91"
                              value={alternatePhn}
                              onChange={(e) => setAlternatePhn(e.target.value)}
                            /> */}
                            <PhoneInput
                              international={false}
                              addInternationalOption={false}
                              id="phone"
                              defaultCountry="IN"
                              placeholder="Mobile number"
                              value={altPhone}
                              onChange={altphoneChangeHandler}
                              onBlur={altphoneOnBlurHandler}
                              className={
                                !altPhoneValild
                                  ? "InvalidPhoneInput loginPhoneInput"
                                  : "loginPhoneInput"
                              }
                            />
                          </div>
                        </div>
                        {phoneError && (
                          <p className="mandatory mt-1 ml-4">{phoneError}</p>
                        )}
                      </div>
                    </div>

                    <>
                      <hr className="my-4" />
                      <h6 className=" text-muted mb-4">Detailed info </h6>
                      <div className="pl-lg-4">
                        <div className="row">
                          {auth?.user?.role == "clinic" ? (
                            <>
                              <Row className="ml-4 my-4">
                                <label className="text-left mb-3 font-weight-normal">
                                  Choose Profile Image
                                  <span className="mandatory">*</span>
                                </label>
                                <div className="edit-file">
                                  <input
                                    className="pe-auto noselect"
                                    type="file"
                                    name="image"
                                    accept="image/x-png,image/jpeg"
                                    onChange={(e) => {
                                      setImageChange(true);
                                      setImg(e.target.files[0]);
                                    }}
                                  />
                                  <span
                                    style={{
                                      position: "absolute",
                                      top: "3px",
                                      left: "105px",
                                      transition: "right 0.2s",
                                    }}
                                  >
                                    {fileName}
                                  </span>
                                </div>
                              </Row>
                            </>
                          ) : null}
                          <div className="seller-col-lg-4">
                            <div className="seller-form-group focused">
                              <label
                                className="seller-form-control-label h5"
                                htmlFor="input-state"
                              >
                                {auth?.user?.role?.slice(0, 1).toUpperCase()}
                                {auth?.user?.role?.slice(1)}'s Name (Display
                                Name)
                              </label>
                              <input
                                type="text"
                                id="input-state"
                                className="seller-form-control seller-form-control-alternative"
                                placeholder={`${auth?.user?.role} name`}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="seller-col-lg-4">
                            <div className="seller-form-group focused">
                              <label
                                className="seller-form-control-label h5"
                                htmlFor="input-state"
                              >
                                AccountID [PayTm]
                              </label>
                              <input
                                type="text"
                                id="input-accountid"
                                className="seller-form-control seller-form-control-alternative"
                                placeholder="Account ID for PayTm"
                                value={AccountIDPayTM}
                                onChange={(e) => setAccountIDPayTM(e.target.value)}
                              />
                            </div>
                          </div>
                          {/* <div className="seller-col-lg-6">
                            <div className="seller-form-group focused">
                              <label
                                className="seller-form-control-label h5"
                                htmlFor="input-address"
                                placeholder="description"
                              >
                                Description
                              </label>
                              <textarea
                                rows={10}
                                id="input-address"
                                className="seller-text-area  seller-form-control"
                                placeholder="description"
                                //   defaultValue="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                              />
                            </div>
                          </div> */}
                        </div>
                      </div>
                    </>

                    <button
                      type="submit"
                      className="btn ok-button mt-4 ml-4 mb-5"
                    >
                      Save Changes
                    </button>
                    {/* <hr className="my-4" /> */}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SuccessConfirmationAlert
        modal_center={modal}
        setmodal_center={setModal}
        content="Profile Updated Successfully"
        toggle={toggle}
      />
      {carerDetails?.loading && <Loader />}

      <ChangePassword
        modal_center={modalpopUp}
        toggle={modalPopuptoggle}
        currentPassword={currentPassword}
        setCurrentPassword={setCurrentPassword}
        newPassword={newPassword}
        setNewPassword={setNewPassword}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
        error={error}
        setError={setError}
      />
    </div>
  );
};

export default CarerProfile;

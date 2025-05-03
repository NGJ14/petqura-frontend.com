import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import SuccessConfirmationAlert from "../../components/SuccessConfirmationAlert";
import {
  editPersonalDetails,
  getPersonalDetails,
  resetPersonalError,
} from "../../store/UserStore/Profile/action";
import ChangePassword from "./ChangePassword";
import "react-phone-number-input/style.css";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";

const PersonalDetails = ({ profileDetails }) => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);

  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [primarynumber, setprimarynumber] = useState("");
  const [primarynumberValild, setprimarynumberValid] = useState(true);
  const [secondarynumber, setsecondarynumber] = useState("");
  const [secondarynumberValild, setsecondarynumberValid] = useState(true);
  const [whatsappnumber, setwhatsappnumber] = useState("");
  const [whatsappnumbernumberValild, setwhatsappnumbernumberValild] =
    useState(true);
  const [email, setEmail] = useState("");
  const [modalsuccess, setModalSuccess] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const toggle = () => {
    setModal(!modal);
    setCurrentPassword("");
    setConfirmPassword("");
    setNewPassword("");
    setError("");
    dispatch(resetPersonalError());
  };

  useEffect(() => {
    if (firstname == "" || lastname == "" || primarynumber == "") {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [firstname, lastname, primarynumber]);

  const primarynumberChangeHandler = (value) => {
    if (value) {
      setprimarynumber(value);
      if (isValidPhoneNumber(value)) {
        setprimarynumberValid(true);
      }
    }
  };
  const primarynumberOnBlurHandler = () => {
    if (!isValidPhoneNumber(primarynumber)) {
      setprimarynumberValid(false);
    }
  };

  const secondarynumberChangeHandler = (value) => {
    if (value) {
      setsecondarynumber(value);
      if (isValidPhoneNumber(value)) {
        setsecondarynumberValid(true);
      }
    }
  };
  const secondarynumberOnBlurHandler = () => {
    if (!isValidPhoneNumber(secondarynumber)) {
      setsecondarynumberValid(false);
    }
  };

  const whatsappnumbernumberChangeHandler = (value) => {
    if (value) {
      setwhatsappnumber(value);
      if (isValidPhoneNumber(value)) {
        setwhatsappnumbernumberValild(true);
      }
    }
  };
  const whatsappnumbernumberOnBlurHandler = () => {
    if (!isValidPhoneNumber(whatsappnumber)) {
      setwhatsappnumbernumberValild(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (firstname && lastname && primarynumber) {
      dispatch(
        editPersonalDetails({
          user: {
            first_name: firstname,
            last_name: lastname,
            primary_number: primarynumber,
            alternate_number: secondarynumber,
            whatsapp_number: whatsappnumber,
            email,
          },
          callBack: () => {
            setModalSuccess(true);
            dispatch(getPersonalDetails());
          },
        })
      );
    }
  };

  useEffect(() => {
    profileDetails?.user?.first_name &&
      setfirstname(profileDetails?.user?.first_name);
    profileDetails?.user?.last_name &&
      setlastname(profileDetails?.user?.last_name);
    profileDetails?.user?.phone &&
      setprimarynumber(profileDetails?.user?.phone);
    profileDetails?.user?.alternate_number &&
      setsecondarynumber(profileDetails?.user?.alternate_number);
    profileDetails?.user?.whatsapp_number &&
      setwhatsappnumber(profileDetails?.user?.whatsapp_number);
    profileDetails?.user?.email && setEmail(profileDetails?.user?.email);
  }, [profileDetails?.user?.first_name]);

  return (
    <div className="col-lg-12  margin-auto">
      <div className="mb-5 col-lg-11 pl-0 personal-content-header">
        <span className="font-weight-bold h3 ml-0">
          Total Coins Earned :{" "}
          <span className="orange-font">
            {profileDetails?.user?.reward_points}
            {console.log(primarynumber)}
          </span>
        </span>
        <div className=" mt-4">
          <button className="btn orange-background text-white" onClick={toggle}>
            Change Password
          </button>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div
          className=" input-group input-group-icon form-group"
          style={{ background: "#fff" }}
        >
          <label class="control-label" for="email-address">
            First name
          </label>
          <input
            className="custom-inputs "
            type="text"
            placeholder="First Name"
            value={firstname}
            onChange={(e) => setfirstname(e.target.value)}
          />
          <div className="input-icon-profile">
            <i className="fa fa-user" />
          </div>
        </div>
        <div
          className=" input-group input-group-icon"
          style={{ background: "#fff" }}
        >
          <label for="email-address">Last name</label>
          <input
            type="text"
            className="custom-inputs"
            placeholder="Last Name"
            value={lastname}
            onChange={(e) => setlastname(e.target.value)}
          />
          <div className="input-icon-profile">
            <i className="fa fa-user" />
          </div>
        </div>

        <div
          className="input-group input-group-icon "
          style={{ background: "#fff" }}
        >
          {/* <input
            type="number"
            className="custom-inputs"
            placeholder="Phone number"
            value={primarynumber}
            onChange={(e) => setprimarynumber(e.target.value)}
          />
          <div className="input-icon">
            <i className="fa fa-phone" />
          </div> */}
          <label for="primary-mobile-number">Primary Mobile number</label>
          <PhoneInput
            international={false}
            addInternationalOption={false}
            defaultCountry="IN"
            placeholder="Enter Mobile number"
            value={primarynumber}
            onChange={primarynumberChangeHandler}
            onBlur={primarynumberOnBlurHandler}
            className={
              !primarynumberValild
                ? "InvalidPhoneInput custom-inputs"
                : "custom-inputs"
            }
          />
        </div>
        <div
          className="input-group input-group-icon "
          style={{ background: "#fff" }}
        >
          {/* <input
            type="number"
            className="custom-inputs"
            placeholder="Alternate number"
            value={secondarynumber}
            onChange={(e) => setsecondarynumber(e.target.value)}
          />
          <div className="input-icon">
            <i className="fa fa-phone" />
          </div> */}
          <label for="secondary-mobile-number">Secondary Mobile number</label>
          <PhoneInput
            international={false}
            addInternationalOption={false}
            defaultCountry="IN"
            placeholder="Enter Mobile number"
            value={secondarynumber}
            onChange={secondarynumberChangeHandler}
            onBlur={secondarynumberOnBlurHandler}
            className={
              !secondarynumberValild
                ? "InvalidPhoneInput custom-inputs"
                : "custom-inputs"
            }
          />
        </div>
        <div
          className="input-group input-group-icon "
          style={{ background: "#fff" }}
        >
          {/* <input
            type="number"
            className="custom-inputs"
            placeholder="Whatsapp number"
            value={whatsappnumber}
            onChange={(e) => setwhatsappnumber(e.target.value)}
          />
          <div className="input-icon">
            <i className="fa fa-whatsapp" />
          </div> */}
          <label for="whatsapp-mobile-number">Whatsapp number</label>
          <PhoneInput
            international={false}
            addInternationalOption={false}
            defaultCountry="IN"
            placeholder="Enter Mobile number"
            value={whatsappnumber}
            onChange={whatsappnumbernumberChangeHandler}
            onBlur={whatsappnumbernumberOnBlurHandler}
            className={
              !whatsappnumbernumberValild
                ? "InvalidPhoneInput custom-inputs"
                : "custom-inputs"
            }
          />
        </div>
        <div
          className="input-group input-group-icon "
          style={{ background: "#fff" }}
        >
          <label for="email-address">Email address</label>
          <input
            type="text"
            className="custom-inputs"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="input-icon-profile">
            <i className="fa fa-envelope" />
          </div>
        </div>
        <button
          type="submit"
          className="btn ok-button mt-4"
          disabled={disabled}
        >
          Save Changes
        </button>
      </form>
      <SuccessConfirmationAlert
        modal_center={modalsuccess}
        setmodal_center={setModalSuccess}
        content="Personal Details Updated Successfully"
      />
      <ChangePassword
        modal_center={modal}
        toggle={toggle}
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

export default PersonalDetails;

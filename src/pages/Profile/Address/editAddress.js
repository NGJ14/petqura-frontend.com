import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router";
import BackButton from "../../../components/UI/BackButton";
import "react-phone-number-input/style.css";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import {
  editAddressDetails,
  getAddressById,
} from "../../../store/UserStore/Address/action";
// import { editPersonalDetails } from "../../store/Profile/action";

const EditAddress = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [pin, setPin] = useState("");
  const [addressType, setAddressType] = useState("");
  const [city, setCity] = useState("");
  // const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneValild, setphoneValid] = useState(true);

  const [disableSubmit, setDisableSubmit] = useState(false);

  const addressDetail = useSelector((state) => state.Address);
  const history = useHistory();
  useEffect(() => {
    dispatch(getAddressById({ data: { id: params.id } }));
  }, []);

  const phoneChangeHandler = (value) => {
    if (value) {
      setPhone(value);
      if (isValidPhoneNumber(value)) {
        setphoneValid(true);
      }
    }
  };
  const phoneOnBlurHandler = () => {
    if (!isValidPhoneNumber(phone)) {
      setphoneValid(false);
    }
  };

  useEffect(() => {
    addressDetail?.address?.address &&
      setAddress(addressDetail?.address?.address);
    addressDetail?.address?.address_type &&
      setAddressType(addressDetail?.address?.address_type);
    addressDetail?.address?.city && setCity(addressDetail?.address?.city);
    addressDetail?.address?.fullname &&
      setName(addressDetail?.address?.fullname);
    // addressDetail?.address?.phone &&
    //   setPhone(addressDetail?.address?.phone?.slice(3) * 1);
    addressDetail?.address?.phone && setPhone(addressDetail?.address?.phone);
    addressDetail?.address?.pin && setPin(addressDetail?.address?.pin);
    addressDetail?.address?.state && setState(addressDetail?.address?.state);
    addressDetail?.address?.email && setEmail(addressDetail?.address?.email);
  }, [addressDetail?.address]);

  useEffect(() => {
    if (
      name == "" ||
      address == "" ||
      state == "" ||
      pin == "" ||
      city == "" ||
      phone == "" ||
      email == ""
    ) {
      setDisableSubmit(true);
    } else {
      setDisableSubmit(false);
    }
  }, [name, address, state, phone, pin, city, email]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      editAddressDetails({
        address: {
          id: params?.id,
          fullname: name,
          address: address,
          state: state,
          pin: pin,
          address_type: addressType,
          city: city,
          // phone: `+91${phone}`,
          phone: phone,
          email: email,
        },
        callback: () =>
          history.push({ pathname: "/profile", tab: "addresses" }),
      })
    );
  };

  return (
    <div className="common-container main-content">
      <div className="container custom-personal ">
        <div className="text-right">
          <button
            className="btn orange-background text-white"
            onClick={() =>
              history?.location?.from == "address-list"
                ? history.push({ pathname: "/profile", tab: "addresses" })
                : history.push({ pathname: `/view-address/${params?.id}` })
            }
          >
            {history?.location?.from == "address-list"
              ? "<< Back To Addresses"
              : "<< Back To Address Details"}
          </button>
        </div>
        <h3 className="mb-50">EDIT ADDRESS</h3>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6">
              <div className=" input-group input-group-icon ">
                <input
                  className="pet-custom-inputs w-100"
                  type="text"
                  placeholder="Full Name *"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <div className="input-icon">
                  <i className="fa fa-user" />
                </div>
              </div>

              <div className=" input-group input-group-icon ">
                <input
                  className="pet-custom-inputs w-100"
                  type="text"
                  placeholder="State *"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
                <div className="input-icon">
                  <i className="fa fa-map-marker" />
                </div>
              </div>

              <div className=" input-group input-group-icon ">
                <input
                  className="pet-custom-inputs w-100"
                  type="number"
                  placeholder="PIN *"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                />
                <div className="input-icon">
                  <i className="fa fa-map-pin" />
                </div>
              </div>
              <div className="input-group input-group-icon ">
                <textarea
                  className="pet-custom-inputs w-100"
                  placeholder="Address *"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-6 ">
              <div className=" input-group input-group-icon">
                {/* <input
                  className="pet-custom-inputs w-100"
                  type="number"
                  maxLength={10}
                  placeholder="Mobile *"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <div className="input-icon">
                  <i className="fa fa-phone" />
                </div> */}
                <PhoneInput
                  international={false}
                  defaultCountry="IN"
                  placeholder="Enter Mobile number"
                  value={phone}
                  onChange={phoneChangeHandler}
                  onBlur={phoneOnBlurHandler}
                  className={
                    !phoneValild
                      ? "InvalidPhoneInput pet-custom-inputs w-100"
                      : "pet-custom-inputs w-100"
                  }
                />
              </div>

              <div className=" input-group input-group-icon">
                <input
                  className="pet-custom-inputs w-100"
                  type="text"
                  placeholder="City *"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
                <div className="input-icon">
                  <i className="fa  fa-building" />
                </div>
              </div>
              <div className="input-group input-group-icon text-start">
                <select
                  className="w-100"
                  name="address-type"
                  id="pet-select"
                  value={addressType}
                  onChange={(e) => setAddressType(e.target.value)}
                >
                  <option value="Home">Home</option>
                  <option value="Work">Work</option>
                </select>
              </div>
              <div className=" input-group input-group-icon ">
                <input
                  className="pet-custom-inputs w-100"
                  type="text"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className="input-icon">
                  <i className="fa fa-envelope" />
                </div>
              </div>
            </div>
            {/* <div className="col-md-12">
              
            </div> */}
          </div>
          <button
            type="submit"
            className="btn ok-button mt-4 ml-4"
            disabled={disableSubmit}
          >
            SAVE
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditAddress;

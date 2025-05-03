import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router";
import {
  checkIfValidEmail,
  checkIfValidIndianMobileNumber,
  getLocalStorage,
} from "../../helpers/utils";
import {
  addAddressDetails,
  editAddressDetails,
  getAddressById,
  getAddressDetails,
} from "../../store/UserStore/Address/action";
import { getDeliveryDetails } from "../../store/UserStore/delivery/action";
import {
  addGuestAddressDetails,
  getGuestAddressDetails,
} from "../../store/UserStore/Guest/action";
import { getPersonalDetails } from "../../store/UserStore/Profile/action";
import { checkPincode } from "../../store/UserStore/Shop/action";

const CheckOutAddress = () => {
  const dispatch = useDispatch();
  const auth = getLocalStorage("AUTH_DETAILS");
  const addressDetails = useSelector((state) => state.Address);
  const Delivery = useSelector((state) => state.Delivery);
  const guest = useSelector((state) => state.Guest);
  const Cart = useSelector((state) => state.Cart);
  const ShopDetails = useSelector((state) => state.Shop);

  const [activeAddress, setaActiveAddress] = useState("address1");
  const [addressId, setAddressId] = useState("");
  const [addressHide, setAddressHide] = useState(false);
  const [addNewAddress, setAddNewAddress] = useState(false);
  const [showAddAddressBtn, setShowAddAddressBtn] = useState(true);
  const [fullname, setFullname] = useState("");
  const [pin, setPin] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [addressType, setAddressType] = useState("Home");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [deliveryMode, setDeliveryMode] = useState("");
  const [guestAddress, setGuestAddress] = useState(false);
  const [editAddress, setEditAddress] = useState(false);
  const [disableSubmit, setDisableSubmit] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    addressDetails?.address_pin && setPin(addressDetails?.address_pin);
    addressDetails?.id && setAddressId(addressDetails?.id);
  }, [addressDetails?.address_pin, addressDetails?.id]);

  const history = useHistory();
  useEffect(() => {
    // addressDetails?.addresses &&
    //   addressDetails?.addresses[0]?.id &&
    //   setAddressId(addressDetails?.addresses[0]?.id);

    Delivery?.Delivery?.mode1?.id &&
      Cart?.ShopCart?.order_amount < 999 &&
      setDeliveryMode(Delivery?.Delivery?.mode1?.id);
  }, [addressDetails, Delivery?.Delivery]);

  useEffect(() => {
    guest?.addresses?.id && setAddressId(guest?.addresses?.id);
    guest?.addresses?.address && setAddress(guest?.addresses?.address);
    guest?.addresses?.fullname && setFullname(guest?.addresses?.fullname);
    guest?.addresses?.address_type &&
      setAddressType(guest?.addresses?.address_type);
    guest?.addresses?.state && setState(guest?.addresses?.state);
    guest?.addresses?.pin && setPin(guest?.addresses?.pin);
    guest?.addresses?.city && setCity(guest?.addresses?.city);
    guest?.addresses?.id && setAddressId(guest?.addresses?.id);
    guest?.addresses?.email && setEmail(guest?.addresses?.email);
    guest?.addresses?.phone && setPhone(guest?.addresses?.phone?.slice(3) * 1);
  }, [guest?.addresses]);

  useEffect(() => {
    addressDetails?.address?.address &&
      setAddress(addressDetails?.address?.address);
    addressDetails?.address?.address_type &&
      setAddressType(addressDetails?.address?.address_type);
    addressDetails?.address?.city && setCity(addressDetails?.address?.city);
    addressDetails?.address?.fullname &&
      setFullname(addressDetails?.address?.fullname);
    addressDetails?.address?.phone &&
      setPhone(addressDetails?.address?.phone?.slice(3) * 1);
    addressDetails?.address?.email && setEmail(addressDetails?.address?.email);
    addressDetails?.address?.pin && setPin(addressDetails?.address?.pin);
    addressDetails?.address?.state && setState(addressDetails?.address?.state);
    addressDetails?.addresses?.id &&
      setAddressId(addressDetails?.addresses?.id);
  }, [addressDetails?.address]);

  useEffect(() => {
    if (auth?.user?.role == "pet_owner") {
      dispatch(getDeliveryDetails());
      dispatch(getAddressDetails({ data: { address_use: "shipping" } }));
      dispatch(getPersonalDetails());
    }
    if (auth?.guest_id) {
      dispatch(getGuestAddressDetails({ data: { guest_id: auth?.guest_id } }));
      dispatch(getDeliveryDetails());
    }
  }, []);

  const clearFields = () => (
    setAddNewAddress(false),
    setShowAddAddressBtn(true),
    setFullname(""),
    setAddress(""),
    setState(""),
    setPin(""),
    setCity(""),
    setPhone(""),
    setEmail(""),
    setAddressType("Home")
  );

  useEffect(() => {
    if (
      fullname == "" ||
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

    // if (phone?.length > 0 && !checkIfValidIndianMobileNumber(phone)) {
    //   setPhoneError("Invalid Phone Number");
    //   return setDisableSubmit(true);
    // } else {
    //   setPhoneError("");
    //   setDisableSubmit(false);
    // }
    // if (email?.length > 0 && !checkIfValidEmail(email)) {
    //   setEmailError("Invalid Email Address");
    //   return setDisableSubmit(true);
    // } else {
    //   setEmailError("");
    //   setDisableSubmit(false);
    // }
  }, [fullname, address, state, pin, city, phone, email]);

  const handleEditAddress = (e) => {
    e.preventDefault();
    if (phone?.length > 0 && !checkIfValidIndianMobileNumber(phone)) {
      setPhoneError("Invalid Phone Number");
      return setDisableSubmit(true);
    } else {
      setPhoneError("");
      setDisableSubmit(false);
    }
    if (email?.length > 0 && !checkIfValidEmail(email)) {
      setEmailError("Invalid Email Address");
      return setDisableSubmit(true);
    } else {
      setEmailError("");
      setDisableSubmit(false);
    }
    dispatch(
      editAddressDetails({
        address: {
          id: addressId,
          fullname: fullname,
          address: address,
          state: state,
          pin: pin,
          address_type: addressType,
          city: city,
          phone: `+91${phone}`,
          email: email,
        },
        callback: () => {
          dispatch(getAddressDetails({ data: { address_use: "shipping" } }));
          setAddNewAddress(false);
          setShowAddAddressBtn(true);
          clearFields();
          setEditAddress(false);
        },
      })
    );
  };

  const handleAddAddress = (e) => {
    e.preventDefault();
    dispatch(checkPincode({ pin: pin }));
    if (phone?.length > 0 && !checkIfValidIndianMobileNumber(phone)) {
      setPhoneError("Invalid Phone Number");
      return setDisableSubmit(true);
    } else {
      setPhoneError("");
      setDisableSubmit(false);
    }
    if (email?.length > 0 && !checkIfValidEmail(email)) {
      setEmailError("Invalid Email Address");
      return setDisableSubmit(true);
    } else {
      setEmailError("");
      setDisableSubmit(false);
    }
    if (auth?.user?.role == "pet_owner") {
      dispatch(
        addAddressDetails({
          address: {
            user_id: 2,
            fullname: fullname,
            address: address,
            state: state,
            pin: pin,
            address_type: addressType,
            city: city,
            phone: `+91${phone}`,
            email: email,
          },
          callback: () => {
            dispatch(getAddressDetails());
            setAddNewAddress(false);
            setShowAddAddressBtn(true);
            clearFields();
            setAddressHide(false);
            setEditAddress(false);
          },
        })
      );
    } else if (auth?.guest_id) {
      dispatch(
        addGuestAddressDetails({
          address: {
            guest_id: auth?.guest_id,
            fullname: fullname,
            address: address,
            state: state,
            pin: pin,
            address_type: addressType,
            city: city,
            phone: `+91${phone}`,
            email: email,
          },
          callback: () =>
            dispatch(
              getGuestAddressDetails({ data: { guest_id: auth?.guest_id } })
            ),
          clearFields: clearFields,
        })
      );
    }
  };

  const handleSubmit = () => {
    dispatch(
      checkPincode({
        pin: { pincode: pin },
        callback: () => {
          history.push({
            pathname: `/checkout/summary/${addressId}`,
            state: { deliveryMode: deliveryMode, from: "address" },
          });
        },
      })
    );
  };

  return (
    <div className="main-content">
      <div className="container progress-bars  pt-60 pb-60">
        <ul className="text-center mb-50">
          <li className="line-stage line-stage-active">CART</li>
          <li className="line-stage line-stage-active">SHIPPING</li>
          <li className="line-stage">CHECKOUT</li>
          <li className="line-stage ">PAYMENT</li>
        </ul>

        <div className="col-lg-9">
          <h4>Select Delivery Address</h4>
          <div className="content-body">
            <div className="inner row">
              <div className="col col-5">
                {addressDetails?.addresses?.length ? (
                  addressDetails?.addresses?.map((address, index) => (
                    <div
                      style={{
                        display: addressHide ? "none" : "block",
                      }}
                      className={` pl-3 cursor-pointer my-3 ${
                        !addressHide && addressId == address?.id
                          ? "activeAddress"
                          : "inactiveAddress"
                      }`}
                      onClick={() => {
                        setaActiveAddress(`address${index + 1}`);
                        // setAddNewAddress(false);
                        setAddressId(address?.id);
                        // setShowAddAddressBtn(true);
                      }}
                    >
                      <div className="d-flex flex-row py-3">
                        <h4>{address?.fullname}</h4>
                        <span className="ml-3 mt-3 address-type-span">
                          {address?.address_type}
                        </span>
                        <p className="ml-3 mt-3">{address?.phone}</p>{" "}
                      </div>
                      <p>{address?.address}</p>
                      <div className="d-flex flex-row">
                        <p>{address?.pin}</p>
                        <p className="ml-2">{address?.state}</p>
                      </div>
                      {(activeAddress == `address${index + 1}` ||
                        addressId == address?.id) &&
                      !addressHide ? (
                        <div className="my-3">
                          <button
                            className="btn btn-dark mt-3 cursor-pointer text-white font-weight-bold"
                            onClick={() => {
                              setAddNewAddress(true);
                              setShowAddAddressBtn(false);
                              setAddressHide(true);
                              // setGuestAddress(true);
                              setEditAddress(true);

                              dispatch(
                                getAddressById({ data: { id: address?.id } })
                              );
                            }}
                          >
                            Edit Address
                          </button>
                        </div>
                      ) : null}
                    </div>
                  ))
                ) : guest?.addresses?.fullname && !guestAddress ? (
                  <div className={` pl-3 cursor-pointer my-3 activeAddress`}>
                    <div className="d-flex flex-row py-3">
                      <h4>{guest?.addresses?.fullname}</h4>
                      <span className="ml-3 mt-3 address-type-span">
                        {guest?.addresses?.address_type}
                      </span>
                      <p className="ml-3 mt-3">{address?.phone}</p>{" "}
                    </div>
                    <p>{guest?.addresses?.address}</p>
                    <div className="d-flex flex-row">
                      <p>{guest?.addresses?.pin}</p>
                      <p className="ml-2">{guest?.addresses?.state}</p>
                    </div>
                  </div>
                ) : null}
                {showAddAddressBtn ? (
                  <p
                    className=" mt-3 cursor-pointer orange-font font-weight-bold  py-5 px-4 "
                    onClick={() => {
                      setAddNewAddress(true);
                      setShowAddAddressBtn(false);
                      setAddressHide(true);
                      setGuestAddress(true);
                      guest?.addresses?.fullname == "" && console.log("hi");
                    }}
                  >
                    {guest?.addresses?.fullname
                      ? "Edit Address"
                      : "+ Add New Address"}
                  </p>
                ) : null}
                {ShopDetails?.pincodeData?.message ==
                "Currently we are not available at your location" ? (
                  <h5 className="mandatory">
                    {ShopDetails?.pincodeData?.message}
                  </h5>
                ) : null}
                {addNewAddress ? (
                  <div className="col-md-6">
                    <div className="billing-details">
                      <h3 className="mb-30">Billing Details</h3>
                      <div className="row">
                        <form
                          onSubmit={
                            editAddress ? handleEditAddress : handleAddAddress
                          }
                        >
                          <div className="form-group col-md-12">
                            <label htmlFor="checkuot-form-fname">
                              Full Name
                            </label>
                            <input
                              id="checkuot-form-fname"
                              type="text"
                              className="form-control"
                              placeholder="Full Name"
                              value={fullname}
                              onChange={(e) => setFullname(e.target.value)}
                            />
                          </div>

                          <div className="col-md-12">
                            <div className="form-group">
                              <label htmlFor="checkuot-form-address">
                                Address
                              </label>
                              <textarea
                                rows={5}
                                id="checkuot-form-address"
                                className="form-control"
                                placeholder="Address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                              />
                            </div>
                            <div className="col-md-12 pl-0">
                              <label htmlFor="checkuot-form-address mr-5">
                                Address Type
                              </label>
                              <div className="form-group">
                                <select
                                  className="py-2"
                                  name="address-type"
                                  id="pet-select"
                                  value={addressType}
                                  onChange={(e) =>
                                    setAddressType(e.target.value)
                                  }
                                >
                                  <option value="Home">Home</option>
                                  <option value="Work">Work</option>
                                </select>
                              </div>
                            </div>
                            <label for="pet-select ">State</label>

                            <div className="form-group">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="State"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                              />
                            </div>
                            <label for="pet-select ">Phone</label>

                            <div className="form-group">
                              <input
                                type="number"
                                className="form-control"
                                placeholder="Phone without +91"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                              />
                              {phoneError && (
                                <p className="mandatory mt-1">{phoneError}</p>
                              )}
                            </div>
                            <label for="pet-select ">Email Address</label>

                            <div className="form-group">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Email Address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                              />
                              {emailError && (
                                <p className="mandatory mt-1">{emailError}</p>
                              )}
                            </div>
                          </div>
                          <div className="form-group col-md-6">
                            <label htmlFor="checkuot-form-city">City</label>
                            <input
                              id="checkuot-form-city"
                              type="text"
                              className="form-control"
                              placeholder="City"
                              value={city}
                              onChange={(e) => setCity(e.target.value)}
                            />
                          </div>

                          <div className="form-group col-md-6">
                            <label htmlFor="checkuot-form-zip">Pin Code</label>
                            <input
                              id="checkuot-form-zip"
                              type="text"
                              className="form-control"
                              placeholder="Pin Code"
                              value={pin}
                              onChange={(e) => setPin(e.target.value)}
                            />
                          </div>

                          <button
                            className=" btn btn-default font-weight-bold px-5 py-3 mr-4 ml-3 my-4 "
                            type="submit"
                            onClick={() => {
                              setaActiveAddress(
                                `address${
                                  addressDetails?.addresses?.length + 1
                                }`
                              );
                              setAddressHide(false);
                              setGuestAddress(false);
                            }}
                            style={{
                              background: "#138496",
                              color: "#fff",
                              fontSize: "15px",
                            }}
                            disabled={disableSubmit}
                          >
                            {editAddress ? "Update" : "Save"}
                          </button>

                          <button
                            className=" btn btn-default font-weight-bold px-5 py-3 mr-4 ml-3 my-4 "
                            type="submit"
                            onClick={() => {
                              setShowAddAddressBtn(true);
                              setAddNewAddress(false);
                              setAddressHide(false);
                              setGuestAddress(false);
                              clearFields();
                              setEditAddress(false);
                            }}
                            style={{
                              background: "#138496",
                              color: "#fff",
                              fontSize: "15px",
                            }}
                          >
                            Cancel
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
            {Cart?.ShopCart?.order_amount < 999 ? (
              <div>
                <h4 className="my-5">Select Delivery Mode</h4>
                <select onChange={(e) => setDeliveryMode(e.target.value)}>
                  <option
                    value={Delivery?.Delivery?.mode1?.id}
                  >{`${Delivery?.Delivery?.mode1?.title} - Rs.${Delivery?.Delivery?.mode1?.fees}`}</option>
                  <option
                    value={Delivery?.Delivery?.mode2?.id}
                  >{`${Delivery?.Delivery?.mode2?.title} - Rs.${Delivery?.Delivery?.mode2?.fees}`}</option>
                </select>
              </div>
            ) : null}
            {guest?.addresses?.fullname || addressDetails?.addresses?.length ? (
              Cart?.ShopCart?.order_amount > 999 ? (
                <div className="text-right">
                  <a
                    className=" btn btn-default cust-payment-btn font-weight-bold px-5 py-3 mr-4 mb-4 mt-4"
                    type="submit"
                    // href={`/checkout/summary/${addressId}`}
                    // onClick={() =>
                    //   history.push({
                    //     pathname: `/checkout/summary/${addressId}`,
                    //     state: { deliveryMode: deliveryMode },
                    //   })
                    // }
                    onClick={handleSubmit}
                  >
                    SUBMIT
                    {address?.loading ? (
                      <i
                        className="fa fa-spinner fa-spin ml-3"
                        aria-hidden="true"
                      ></i>
                    ) : null}
                  </a>
                </div>
              ) : (
                <div className="text-right">
                  <a
                    className=" btn btn-default cust-payment-btn font-weight-bold px-5 py-3 mr-4 mb-4 mt-4"
                    type="submit"
                    // href={`/checkout/summary/${addressId}`}
                    onClick={handleSubmit}
                  >
                    SUBMIT
                    {address?.loading ? (
                      <i
                        className="fa fa-spinner fa-spin ml-3"
                        aria-hidden="true"
                      ></i>
                    ) : null}
                  </a>
                </div>
              )
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOutAddress;

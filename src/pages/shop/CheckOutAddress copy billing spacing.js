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
  getBillingAddressById,
  getAddressDetails,
  getBillingAddressDetails,
  deleteAddressDetails,
} from "../../store/UserStore/Address/action";
import { getDeliveryDetails } from "../../store/UserStore/delivery/action";
import {
  addGuestAddressDetails,
  getGuestAddressDetails,
  getGuestBillingAddressDetails,
} from "../../store/UserStore/Guest/action";
import { getPersonalDetails } from "../../store/UserStore/Profile/action";
import { checkPincode } from "../../store/UserStore/Shop/action";
import DeleteAddressPopUp from "./DeleteAddressPopUp";
import ConfirmationAlert from "../../components/confiramtionAlert";

import "react-phone-number-input/style.css";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";

const CheckOutAddress = () => {
  const dispatch = useDispatch();
  const auth = getLocalStorage("AUTH_DETAILS");
  const addressDetails = useSelector((state) => state.Address);
  const Delivery = useSelector((state) => state.Delivery);
  const guest = useSelector((state) => state.Guest);
  const Cart = useSelector((state) => state.Cart);
  const ShopDetails = useSelector((state) => state.Shop);

  const [deleteaddressPopUp, setDeleteAddressPopUp] = useState(false);
  let [deleteaddressId, setDeleteAddressId] = useState("");
  const [promptMessage, setPromptMessage] = useState({});
  const [showPromptPopUp, setShowPromptPopUp] = useState(false);

  const [activeAddress, setaActiveAddress] = useState("address1");
  let [addressId, setAddressId] = useState("");
  const [addressHide, setAddressHide] = useState(false);
  const [addNewAddress, setAddNewAddress] = useState(false);
  const [showAddAddressBtn, setShowAddAddressBtn] = useState(true);
  const [fullname, setFullname] = useState("");
  const [pin, setPin] = useState("");
  const [pinCopy, setPinCopy] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [addressType, setAddressType] = useState("Home");
  const [city, setCity] = useState("");
  const [deliveryphone, setDeliveryPhone] = useState("");
  const [DeliveryPhoneValild, setDeliveryPhoneValild] = useState(true);
  const [email, setEmail] = useState("");
  const [deliveryMode, setDeliveryMode] = useState("");
  const [guestAddress, setGuestAddress] = useState(false);
  const [editAddress, setEditAddress] = useState(false);
  const [disableSubmit, setDisableSubmit] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [error, setError] = useState("");

  //********* Billing Address Settings
  const [showbillingaddress, setShowBillingAddress] = useState(false);
  const [activeBillingAddress, setaActiveBillingAddress] =
    useState("billlingaddress1");
  let [billingaddressId, setBillingAddressId] = useState("");
  const [billingaddressHide, setBillingAddressHide] = useState(false);
  const [billingfullname, setBillingFullname] = useState("");
  const [billingaddress, setBillingAddress] = useState("");
  const [billingstate, setBillingState] = useState("");
  const [billingpin, setBillingPin] = useState("");
  const [billingaddressType, setBillingAddressType] = useState("Home");
  const [billingcity, setBillingCity] = useState("");
  const [billingphone, setBillingPhone] = useState("");
  const [BillingPhoneValild, setBillingPhoneValild] = useState(true);
  const [billingemail, setBillingEmail] = useState("");
  const [addNewBillingAddress, setAddNewBillingAddress] = useState(false);
  const [disableBillingSubmit, setDisableBillingSubmit] = useState(false);
  const [billingerror, setBillingError] = useState("");
  const [editBillingAddress, seteditBillingAddress] = useState(false);
  const [listBillingAddress, setlistBillingAddress] = useState(false);
  const [emailBillingError, setBillingEmailError] = useState("");
  const [ShowAddNewBillingAddressBtn, setShowAddNewBillingAddressBtn] =
    useState(false);
  const [guestBillingAddress, setGuestBillingAddress] = useState(false);
  // const [checked, setChecked] = useState(true);

  const deliveryphoneChangeHandler = (value) => {
    if (value) {
      setDeliveryPhone(value);
      if (isValidPhoneNumber(value)) {
        setDeliveryPhoneValild(true);
      }
    }
  };
  const deliveryphoneOnBlurHandler = () => {
    if (!isValidPhoneNumber(deliveryphone)) {
      setDeliveryPhoneValild(false);
    }
  };
  const billingphoneChangeHandler = (value) => {
    if (value) {
      setBillingPhone(value);
      if (isValidPhoneNumber(value)) {
        setBillingPhoneValild(true);
      }
    }
  };
  const billingphoneOnBlurHandler = () => {
    if (!isValidPhoneNumber(deliveryphone)) {
      setBillingPhoneValild(false);
    }
  };

  useEffect(() => {
    addressDetails?.address_pin && setPin(addressDetails?.address_pin);
    addressDetails?.id && setAddressId(addressDetails?.id);
    addressDetails?.billing_address_pin &&
      setBillingPin(addressDetails?.billing_address_pin);
    // addressDetails?.billing_address_id &&
    //   setBillingAddressId(addressDetails?.billing_address_id);
  }, [
    addressDetails?.address_pin,
    addressDetails?.id,
    addressDetails?.billing_address_id,
    addressDetails?.billing_address_pin,
  ]);

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
    guest?.addresses?.pin && setPinCopy(guest?.addresses?.pin);
    guest?.addresses?.city && setCity(guest?.addresses?.city);
    guest?.addresses?.id && setAddressId(guest?.addresses?.id);
    guest?.addresses?.email && setEmail(guest?.addresses?.email);
    guest?.addresses?.phone && setDeliveryPhone(guest?.addresses?.phone);
  }, [guest?.addresses]);

  useEffect(() => {
    guest?.billing_addresses?.id &&
      setBillingAddressId(guest?.billing_addresses?.id);
    guest?.billing_addresses?.address &&
      setBillingAddress(guest?.billing_addresses?.address);
    guest?.billing_addresses?.fullname &&
      setBillingFullname(guest?.billing_addresses?.fullname);
    guest?.billing_addresses?.address_type &&
      setBillingAddressType(guest?.billing_addresses?.address_type);
    guest?.billing_addresses?.state &&
      setBillingState(guest?.billing_addresses?.state);
    guest?.billing_addresses?.pin &&
      setBillingPin(guest?.billing_addresses?.pin);
    guest?.billing_addresses?.city &&
      setBillingCity(guest?.billing_addresses?.city);
    guest?.billing_addresses?.email &&
      setBillingEmail(guest?.billing_addresses?.email);
    guest?.billing_addresses?.phone &&
      setBillingPhone(guest?.billing_addresses?.phone);
  }, [guest?.billing_addresses]);

  useEffect(() => {
    addressDetails?.address?.address &&
      setAddress(addressDetails?.address?.address);
    addressDetails?.address?.address_type &&
      setAddressType(addressDetails?.address?.address_type);
    addressDetails?.address?.city && setCity(addressDetails?.address?.city);
    addressDetails?.address?.fullname &&
      setFullname(addressDetails?.address?.fullname);
    addressDetails?.address?.phone &&
      setDeliveryPhone(addressDetails?.address?.phone);
    addressDetails?.address?.email && setEmail(addressDetails?.address?.email);
    addressDetails?.address?.pin && setPin(addressDetails?.address?.pin);
    addressDetails?.address?.pin && setPinCopy(addressDetails?.address?.pin);
    addressDetails?.address?.state && setState(addressDetails?.address?.state);
    addressDetails?.addresses?.id &&
      setAddressId(addressDetails?.addresses?.id);
    console.log(addressDetails);
  }, [addressDetails?.address]);

  useEffect(() => {
    addressDetails?.billing_address?.address &&
      setBillingAddress(addressDetails?.billing_address?.address);
    addressDetails?.billing_address?.address_type &&
      setBillingAddressType(addressDetails?.billing_address?.address_type);
    addressDetails?.billing_address?.city &&
      setBillingCity(addressDetails?.billing_address?.city);
    addressDetails?.billing_address?.fullname &&
      setBillingFullname(addressDetails?.billing_address?.fullname);
    addressDetails?.billing_address?.phone &&
      setBillingPhone(addressDetails?.billing_address?.phone);
    addressDetails?.billing_address?.email &&
      setBillingEmail(addressDetails?.billing_address?.email);
    addressDetails?.billing_address?.pin &&
      setBillingPin(addressDetails?.billing_address?.pin);
    addressDetails?.billing_address?.state &&
      setBillingState(addressDetails?.billing_address?.state);
    addressDetails?.billing_address?.id &&
      setBillingAddressId(addressDetails?.billing_address?.id);
    console.log(addressDetails);
  }, [addressDetails?.billing_address]);

  useEffect(() => {
    if (auth?.user?.role == "pet_owner") {
      dispatch(getDeliveryDetails());
      dispatch(getAddressDetails({ data: { address_use: "shipping" } }));
      dispatch(getBillingAddressDetails({ data: { address_use: "billing" } }));
      dispatch(getPersonalDetails());
    }
    if (auth?.guest_id) {
      dispatch(
        getGuestAddressDetails({
          data: { guest_id: auth?.guest_id, address_use: "shipping" },
        })
      );
      dispatch(
        getGuestBillingAddressDetails({
          data: { guest_id: auth?.guest_id, address_use: "billing" },
        })
      );
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
    setDeliveryPhone(""),
    setEmail(""),
    setAddressType("Home")
  );

  const clearBillingAddressFields = () => (
    setAddNewBillingAddress(false),
    setShowAddNewBillingAddressBtn(true),
    setBillingFullname(""),
    setBillingAddress(""),
    setBillingState(""),
    setBillingPin(""),
    setBillingCity(""),
    setBillingPhone(""),
    setBillingEmail(""),
    setBillingAddressType("Home")
  );

  useEffect(() => {
    if (
      fullname == "" ||
      address == "" ||
      state == "" ||
      pin == "" ||
      city == "" ||
      deliveryphone == "" ||
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
  }, [fullname, address, state, pin, city, deliveryphone, email]);
  useEffect(() => {
    if (
      billingfullname == "" ||
      billingaddress == "" ||
      billingstate == "" ||
      billingpin == "" ||
      billingcity == "" ||
      billingphone == "" ||
      billingemail == ""
    ) {
      setDisableBillingSubmit(true);
    } else {
      setDisableBillingSubmit(false);
    }
  }, [
    billingfullname,
    billingaddress,
    billingstate,
    billingpin,
    billingcity,
    billingphone,
    billingemail,
  ]);
  const handleEditAddress = (e) => {
    e.preventDefault();
    dispatch(checkPincode({ data: { pincode: pin } }));
    if (deliveryphone?.length > 0 && !isValidPhoneNumber(deliveryphone)) {
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
          phone: deliveryphone,
          email: email,
          address_use: "shipping",
        },
        callback: () => {
          dispatch(getAddressDetails({ data: { address_use: "shipping" } }));
          setAddNewAddress(false);
          setShowAddAddressBtn(true);
          //clearFields();
          setEditAddress(false);
        },
      })
    );
  };

  const handleAddAddress = (e) => {
    e.preventDefault();
    dispatch(checkPincode({ data: { pincode: pin } }));
    if (deliveryphone?.length > 0 && !isValidPhoneNumber(deliveryphone)) {
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
            // user_id: 2,
            fullname: fullname,
            address: address,
            state: state,
            pin: pin,
            address_type: addressType,
            city: city,
            phone: deliveryphone,
            email: email,
            address_use: "shipping",
          },
          callback: () => {
            dispatch(getAddressDetails({ data: { address_use: "shipping" } }));
            setAddNewAddress(false);
            setShowAddAddressBtn(true);
            // clearFields();
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
            phone: deliveryphone,
            email: email,
            address_use: "shipping",
          },
          callback: () =>
            dispatch(
              getGuestAddressDetails({
                data: { guest_id: auth?.guest_id, address_use: "shipping" },
              })
            ),
          clearFields: clearFields,
        })
      );
    }
  };

  const handleAddBillingAddress = (e) => {
    e.preventDefault();

    if (!isValidPhoneNumber(billingphone)) {
      setBillingPhoneValild(false);
      return setDisableBillingSubmit(true);
    }
    if (billingemail?.length > 0 && !checkIfValidEmail(billingemail)) {
      setBillingEmailError("Invalid Email Address");
      return setDisableBillingSubmit(true);
    } else {
      setBillingEmailError("");
      setDisableBillingSubmit(false);
    }
    if (auth?.user?.role == "pet_owner") {
      dispatch(
        addAddressDetails({
          address: {
            fullname: billingfullname,
            address: billingaddress,
            state: billingstate,
            pin: billingpin,
            address_type: billingaddressType,
            city: billingcity,
            phone: billingphone,
            email: billingemail,
            address_use: "billing",
          },
          callback: () => {
            dispatch(
              getBillingAddressDetails({ data: { address_use: "billing" } })
            );
            setAddNewBillingAddress(false);
            setShowAddNewBillingAddressBtn(true);
            clearBillingAddressFields();
            setBillingAddressHide(false);
            seteditBillingAddress(false);
            setlistBillingAddress(true);
            setShowBillingAddress(true);
          },
        })
      );
    } else if (auth?.guest_id) {
      dispatch(
        addGuestAddressDetails({
          address: {
            guest_id: auth?.guest_id,
            fullname: billingfullname,
            address: billingaddress,
            state: billingstate,
            pin: billingpin,
            address_type: billingaddressType,
            city: billingcity,
            phone: billingphone,
            email: billingemail,
            address_use: "billing",
          },
          callback: () =>
            dispatch(
              getGuestBillingAddressDetails({
                data: { guest_id: auth?.guest_id, address_use: "billing" },
              })
            ),
          clearFields: clearBillingAddressFields,
        })
      );
    }
  };

  const handleEditBillingAddress = (e) => {
    e.preventDefault();
    // dispatch(checkPincode({ data: { pincode: billingpin } }));
    if (billingphone?.length > 0 && !isValidPhoneNumber(billingphone)) {
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
          id: billingaddressId,
          fullname: billingfullname,
          address: billingaddress,
          state: billingstate,
          pin: billingpin,
          address_type: billingaddressType,
          city: billingcity,
          phone: billingphone,
          email: billingemail,
          address_use: "billing",
        },
        callback: () => {
          dispatch(
            dispatch(
              getBillingAddressDetails({ data: { address_use: "billing" } })
            )
          );
          setAddNewBillingAddress(false);
          setShowAddNewBillingAddressBtn(true);
          clearBillingAddressFields();
          seteditBillingAddress(false);
          setlistBillingAddress(true);
          setShowBillingAddress(true);
        },
      })
    );
  };

  const handleSubmit = () => {
    if (billingaddressId == "") billingaddressId = addressId;
    dispatch(
      checkPincode({
        data: { pincode: pin },
        callback: () => {
          history.push({
            pathname: `/checkout/summary/${addressId}/${billingaddressId}`,
            state: { deliveryMode: deliveryMode, from: "address" },
          });
        },
      })
    );
  };

  const deletePromptHandler = (id) => {
    setShowPromptPopUp(!showPromptPopUp);
    setPromptMessage({
      id: id,
      title: "Delete Address",
      content: "Are you sure you want to delete this address",
      type: "delete",
    });
  };
  const okHandler = () => {
    if (promptMessage?.type == "delete") {
      dispatch(
        deleteAddressDetails({
          address: { id: promptMessage?.id },
          callback: () => {
            dispatch(getAddressDetails({ data: { address_use: "shipping" } }));
            dispatch(
              getBillingAddressDetails({ data: { address_use: "billing" } })
            );
          },
        })
      );
    }
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
                        setPin(address?.pin);
                        setPinCopy(address?.pin);
                        // setShowAddAddressBtn(true);
                        // setShowAddNewBillingAddressBtn(true);
                        // setAddNewBillingAddress(false);
                        // console.log("From Div Area: " + checked);
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
                        <>
                          <div className="my-3">
                            <button
                              className="btn btn-dark mt-3 cursor-pointer text-white font-weight-bold"
                              onClick={() => {
                                setAddNewAddress(true);
                                setShowAddAddressBtn(false);
                                setAddressHide(true);
                                // setGuestAddress(true);
                                setPin(address?.pin);
                                setPinCopy(address?.pin);
                                console.log(pin);
                                setEditAddress(true);
                                dispatch(
                                  getAddressById({ data: { id: address?.id } })
                                );
                              }}
                            >
                              Edit Address
                            </button>
                            <button
                              className="btn mt-3 cursor-pointer font-weight-bold"
                              // onClick={() => {
                              //   setDeleteAddressId(address?.id);
                              //   setDeleteAddressPopUp(true);
                              // }}

                              onClick={() => deletePromptHandler(address?.id)}
                            >
                              Delete
                            </button>
                          </div>
                          <div class="d-flex flex-row bd-highlight">
                            <div class="p-2 bd-highlight">
                              <input
                                className="billingaddress-checkbox d-block"
                                type="checkbox"
                                id="billingCheck"
                                // defaultChecked={checked}
                                onChange={() => {
                                  // setChecked(!checked);
                                  // console.log("From Input Area: " + checked);
                                  var checkBox =
                                    document.getElementById("billingCheck");
                                  if (checkBox.checked == true) {
                                    setShowBillingAddress(true);
                                    setlistBillingAddress(true);
                                    setShowAddNewBillingAddressBtn(true);
                                  } else {
                                    setShowBillingAddress(false);
                                    setShowAddNewBillingAddressBtn(true);
                                    setShowAddAddressBtn(true);
                                  }
                                }}
                              />{" "}
                            </div>
                            <div class="p-2 bd-highlight flex-grow-1">
                              <p className="">
                                Billing address is different from delivery
                                address
                              </p>
                            </div>
                            {/* <div class="p-2 flex-shrink-1 bd-highlight">
                              <span
                                onClick={() => {
                                  setDeleteAddressId(address?.id);
                                  setDeleteAddressPopUp(true);
                                }}
                              >
                                <i
                                  style={{ color: "red" }}
                                  class="fa fa-trash"
                                  aria-hidden="true"
                                ></i>
                              </span>
                            </div> */}
                          </div>
                          <div className="d-flex flex-row">&nbsp;&nbsp;</div>
                        </>
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
                    <div className="d-flex flex-row">
                      <input
                        className="billingaddress-checkbox"
                        type="checkbox"
                        id="guestbillingCheck"
                        // defaultChecked={checked}
                        onChange={() => {
                          // setChecked(!checked);
                          // console.log("From Input Area: " + checked);
                          var checkBox =
                            document.getElementById("guestbillingCheck");
                          if (checkBox.checked == true) {
                            setShowBillingAddress(true);
                            setlistBillingAddress(true);
                            setShowAddNewBillingAddressBtn(true);
                          } else {
                            setShowBillingAddress(false);
                            setShowAddNewBillingAddressBtn(true);
                            setShowAddAddressBtn(true);
                          }
                        }}
                      />{" "}
                      &nbsp;&nbsp;
                      <p className="pt-4">
                        Billing address is different from delivery address
                      </p>
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
                      // clearFields();
                      guest?.addresses?.fullname == "" && console.log("hi");
                    }}
                  >
                    {guest?.addresses?.fullname
                      ? "Edit Address"
                      : "+ Add New Delivery Address"}
                  </p>
                ) : null}

                {addNewAddress ? (
                  <div className="col-md-6">
                    <div className="billing-details">
                      <h3 className="mb-30">Shipping Address Details</h3>
                      <div className="row">
                        <form
                          onSubmit={
                            editAddress ? handleEditAddress : handleAddAddress
                          }
                        >
                          <div className="form-group ">
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
                          <div className="form-group">
                            <label htmlFor="checkuot-form-address mr-5">
                              Address Type
                            </label>

                            <select
                              className="py-2"
                              name="address-type"
                              id="pet-select"
                              value={addressType}
                              onChange={(e) => setAddressType(e.target.value)}
                            >
                              <option value="Home">Home</option>
                              <option value="Work">Work</option>
                            </select>
                          </div>
                          <div className="form-row">
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
                              <label htmlFor="checkuot-form-zip">
                                Pin Code
                              </label>
                              <input
                                id="checkuot-form-zip"
                                type="text"
                                className="form-control deliveryPin"
                                placeholder="Pin Code"
                                value={pin}
                                onChange={(e) => setPin(e.target.value)}
                              />
                            </div>
                          </div>
                          <label htmlFor="pet-select ">State</label>

                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="State"
                              value={state}
                              onChange={(e) => setState(e.target.value)}
                            />
                          </div>
                          <label htmlFor="pet-select ">Phone</label>

                          <div className="form-group">
                            {/* <input
                                type="number"
                                className="form-control"
                                placeholder="Phone without +91"
                                value={deliveryphone}
                                onChange={(e) =>
                                  setDeliveryPhone(e.target.value)
                                }
                              /> */}
                            <PhoneInput
                              international={false}
                              addInternationalOption={false}
                              id="billingphone"
                              defaultCountry="IN"
                              placeholder="Mobile number"
                              value={deliveryphone}
                              onChange={deliveryphoneChangeHandler}
                              onBlur={deliveryphoneOnBlurHandler}
                              className={
                                !DeliveryPhoneValild
                                  ? "InvalidPhoneInput loginPhoneInput"
                                  : "loginPhoneInput"
                              }
                            />
                            {phoneError && (
                              <p className="mandatory mt-1">{phoneError}</p>
                            )}
                          </div>
                          <label htmlFor="pet-select ">Email Address</label>

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
                            type="button"
                            onClick={() => {
                              setAddNewAddress(false);
                              setShowAddAddressBtn(true);
                              setAddressHide(false);
                              setGuestAddress(false);
                              setEditAddress(false);
                              setPin(pinCopy);
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
          </div>
        </div>
        <div className="col-lg-9">
          <div className="content-body">
            {showbillingaddress ? (
              <div className="inner row">
                <div className="col col-5">
                  {listBillingAddress ? (
                    <>
                      <h4>Select Billing Address</h4>
                      {addressDetails?.billing_addresses?.length ? (
                        addressDetails?.billing_addresses?.map(
                          (billingaddress, billingindex) => (
                            <div
                              style={{
                                display: billingaddressHide ? "none" : "block",
                              }}
                              className={` pl-3 cursor-pointer my-3 ${
                                !billingaddressHide &&
                                billingaddressId == billingaddress?.id
                                  ? "activeAddress"
                                  : "inactiveAddress"
                              }`}
                              onClick={() => {
                                setaActiveBillingAddress(
                                  `billingaddress${billingindex + 1}`
                                );

                                // setAddNewAddress(false);
                                setBillingAddressId(billingaddress?.id);
                                // setShowAddAddressBtn(true);
                                setShowAddNewBillingAddressBtn(true);
                                // setAddNewBillingAddress(false);
                                // console.log("From Div Area: " + checked);
                              }}
                            >
                              <div className="d-flex flex-row py-3">
                                <h4>{billingaddress?.fullname}</h4>
                                <span className="ml-3 mt-3 address-type-span">
                                  {billingaddress?.address_type}
                                </span>
                                <p className="ml-3 mt-3">
                                  {billingaddress?.phone}
                                </p>{" "}
                              </div>
                              <p>{billingaddress?.address}</p>
                              <div className="d-flex flex-row">
                                <p>{billingaddress?.pin}</p>
                                <p className="ml-2">{billingaddress?.state}</p>
                              </div>
                              {(activeBillingAddress ==
                                `billlingaddress${billingindex + 1}` ||
                                billingaddressId == billingaddress?.id) &&
                              !billingaddressHide ? (
                                <>
                                  <div className="my-3">
                                    <button
                                      className="btn btn-dark mt-3 cursor-pointer text-white font-weight-bold"
                                      onClick={() => {
                                        setAddNewBillingAddress(true);
                                        setShowAddNewBillingAddressBtn(false);
                                        setBillingAddressHide(true);
                                        // setBillingAddressHide(true);
                                        // setGuestAddress(true);
                                        seteditBillingAddress(true);
                                        setlistBillingAddress(false);
                                        setGuestBillingAddress(true);
                                        dispatch(
                                          getBillingAddressById({
                                            data: { id: billingaddress?.id },
                                          })
                                        );
                                      }}
                                    >
                                      Edit Address
                                    </button>
                                    <button
                                      className="btn mt-3 cursor-pointer font-weight-bold"
                                      // onClick={() => {
                                      //   setDeleteAddressId(billingaddress?.id);
                                      //   setDeleteAddressPopUp(true);
                                      // }}
                                      onClick={() =>
                                        deletePromptHandler(billingaddress?.id)
                                      }
                                    >
                                      Delete
                                    </button>
                                  </div>
                                </>
                              ) : null}
                            </div>
                          )
                        )
                      ) : guest?.billing_addresses?.fullname &&
                        !guestBillingAddress ? (
                        <div
                          className={` pl-3 cursor-pointer my-3 activeAddress`}
                        >
                          <div className="d-flex flex-row py-3">
                            <h4>{guest?.billing_addresses?.fullname}</h4>
                            <span className="ml-3 mt-3 address-type-span">
                              {guest?.billing_addresses?.address_type}
                            </span>
                            <p className="ml-3 mt-3">
                              {guest?.billing_addresses?.phone}
                            </p>{" "}
                          </div>
                          <p>{guest?.billing_addresses?.address}</p>
                          <div className="d-flex flex-row">
                            <p>{guest?.billing_addresses?.pin}</p>
                            <p className="ml-2">
                              {guest?.billing_addresses?.state}
                            </p>
                          </div>
                        </div>
                      ) : null}
                      {ShowAddNewBillingAddressBtn ? (
                        <p
                          className=" mt-3 cursor-pointer orange-font font-weight-bold  py-5 px-4 "
                          onClick={() => {
                            setAddNewBillingAddress(true);
                            setShowAddNewBillingAddressBtn(false);
                            setBillingAddressHide(true);
                            setlistBillingAddress(false);

                            setGuestBillingAddress(true);
                            // guest?.addresses?.fullname == "" && console.log("hi");
                          }}
                        >
                          {guest?.billing_addresses?.fullname
                            ? "Edit Address"
                            : "+ Add New Billing Address"}
                        </p>
                      ) : null}
                    </>
                  ) : null}

                  {addNewBillingAddress ? (
                    <div className="col-md-6">
                      <div className="billing-details">
                        <h3 className="mb-30">Billing Address Details</h3>
                        <div className="row">
                          <form
                            onSubmit={
                              editBillingAddress
                                ? handleEditBillingAddress
                                : handleAddBillingAddress
                            }
                          >
                            <div className="form-group">
                              <label htmlFor="checkuot-form-fname">
                                Full Name
                              </label>
                              <input
                                id="checkuot-form-fname"
                                type="text"
                                className="form-control"
                                placeholder="Full Name"
                                value={billingfullname}
                                onChange={(e) =>
                                  setBillingFullname(e.target.value)
                                }
                              />
                            </div>

                            <div className="form-group">
                              <label htmlFor="checkuot-form-address">
                                Address
                              </label>
                              <textarea
                                rows={5}
                                id="checkuot-form-address"
                                className="form-control"
                                placeholder="Address"
                                value={billingaddress}
                                onChange={(e) =>
                                  setBillingAddress(e.target.value)
                                }
                              />
                            </div>

                            <label htmlFor="checkuot-form-address mr-5">
                              Address Type
                            </label>
                            <div className="form-group">
                              <select
                                className="py-2"
                                name="address-type"
                                id="pet-select"
                                value={billingaddressType}
                                onChange={(e) =>
                                  setBillingAddressType(e.target.value)
                                }
                              >
                                <option value="Home">Home</option>
                                <option value="Work">Work</option>
                              </select>
                            </div>
                            <div className="form-row">
                              <div className="form-group col-md-6">
                                <label htmlFor="checkuot-form-city">City</label>
                                <input
                                  id="checkuot-form-city"
                                  type="text"
                                  className="form-control"
                                  placeholder="City"
                                  value={billingcity}
                                  onChange={(e) =>
                                    setBillingCity(e.target.value)
                                  }
                                />
                              </div>

                              <div className="form-group col-md-6">
                                <label htmlFor="checkuot-form-zip">
                                  Pin Code
                                </label>
                                <input
                                  id="checkuot-form-zip"
                                  type="text"
                                  className="form-control"
                                  placeholder="Pin Code"
                                  value={billingpin}
                                  onChange={(e) =>
                                    setBillingPin(e.target.value)
                                  }
                                />
                              </div>
                            </div>
                            <label htmlFor="pet-select ">State</label>

                            <div className="form-group">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="State"
                                value={billingstate}
                                onChange={(e) =>
                                  setBillingState(e.target.value)
                                }
                              />
                            </div>
                            <label htmlFor="pet-select ">Phone</label>

                            <div className="form-group">
                              <PhoneInput
                                international={false}
                                addInternationalOption={false}
                                id="billingphone"
                                defaultCountry="IN"
                                placeholder="Mobile number"
                                value={billingphone}
                                onChange={billingphoneChangeHandler}
                                onBlur={billingphoneOnBlurHandler}
                                className={
                                  !BillingPhoneValild
                                    ? "InvalidPhoneInput loginPhoneInput"
                                    : "loginPhoneInput"
                                }
                              />
                              {/* {phoneError && (
                                <p className="mandatory mt-1">{phoneError}</p>
                              )} */}
                            </div>
                            <label htmlFor="pet-select ">Email Address</label>

                            <div className="form-group">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Email Address"
                                value={billingemail}
                                onChange={(e) =>
                                  setBillingEmail(e.target.value)
                                }
                              />
                              {emailBillingError && (
                                <p className="mandatory mt-1">
                                  {emailBillingError}
                                </p>
                              )}
                            </div>

                            <button
                              className=" btn btn-default font-weight-bold px-5 py-3 mr-4 ml-3 my-4 "
                              type="submit"
                              onClick={() => {
                                setaActiveBillingAddress(
                                  `billingaddress${
                                    addressDetails?.billing_addresses?.length +
                                    1
                                  }`
                                );
                                setBillingAddressHide(false);
                                console.log(activeBillingAddress);
                                setGuestBillingAddress(false);
                              }}
                              style={{
                                background: "#138496",
                                color: "#fff",
                                fontSize: "15px",
                              }}
                              disabled={disableBillingSubmit}
                            >
                              {editBillingAddress ? "Update" : "Save"}
                            </button>

                            <button
                              className=" btn btn-default font-weight-bold px-5 py-3 mr-4 ml-3 my-4 "
                              type="button"
                              onClick={() => {
                                setShowAddNewBillingAddressBtn(true);
                                setAddNewBillingAddress(false);
                                setBillingAddressHide(false);
                                setGuestBillingAddress(false);
                                if (!guest?.billing_addresses?.fullname)
                                  clearBillingAddressFields();
                                seteditBillingAddress(false);
                                setlistBillingAddress(true);
                                // setChecked(!checked);
                                // document.getElementsByClassName(
                                //   "billingaddress-checkbox"
                                // )[0].checked = false;
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
            ) : null}
            {ShopDetails?.pincodeData?.message ==
            "Currently we are not available at your location" ? (
              <h5 className="mandatory">{ShopDetails?.pincodeData?.message}</h5>
            ) : null}

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
      <DeleteAddressPopUp
        modal_center={deleteaddressPopUp}
        setmodal_center={setDeleteAddressPopUp}
        deletingaddress={deleteaddressId}
        okText={"Yes"}
        cancelText={"No"}
        title={"Delete Address"}
      />
      <ConfirmationAlert
        {...promptMessage}
        modal_center={showPromptPopUp}
        setmodal_center={setShowPromptPopUp}
        onOK={okHandler}
      />
    </div>
  );
};

export default CheckOutAddress;

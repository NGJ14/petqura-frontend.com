import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import Loader from "../../components/UI/Loader";

import {
  getLocalStorage,
  getMid,
  getWebPayTm,
  checkIfValidEmail,
} from "../../helpers/utils";
import {
  changeGuestQuantity,
  changeQuantity,
  getCartDetails,
  getGuestCart,
} from "../../store/UserStore/Cart/action";

//For Shipping Address Details
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
  addCheckoutPrepaidOrder,
  getCheckoutPrepaidOrder,
  getRewardPoints,
} from "../../store/UserStore/checkout/action";
import {
  addGuestAddressDetails,
  addGuestShopPayment,
  getGuestAddressDetails,
  getGuestBillingAddressDetails,
  initiateGuestShopPayment,
} from "../../store/UserStore/Guest/action";
import { getPersonalDetails } from "../../store/UserStore/Profile/action";
import { checkPincode } from "../../store/UserStore/Shop/action";
import ConfirmationAlert from "../../components/confiramtionAlert";
import { resetErrors } from "../../store/UserStore/Login/action";
import SuccessConfirmationAlert from "../../components/SuccessConfirmationAlert";

import "react-phone-number-input/style.css";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import delete_icon from "../../assets/icons/delete_icon.svg";

import {
  addCouponDetails,
  removeCouponDetails,
} from "../../store/UserStore/Coupon/action";
import Login from "../Login";

const ShopCart = () => {
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const history = useHistory();
  const Cart = useSelector((state) => state.Cart);
  const Checkout = useSelector((state) => state.Checkout);
  const couponDetails = useSelector((state) => state.Coupon);

  const auth = getLocalStorage("AUTH_DETAILS");

  const [modal, setModal] = useState(false);
  const toggle = () => {
    setModal(!modal);
    dispatch(resetErrors());
    setCustError("");
  };

  // For Shipping Address Details
  const Delivery = useSelector((state) => state.Delivery);
  const guest = useSelector((state) => state.Guest);
  const addressDetails = useSelector((state) => state.Address);

  const ShopDetails = useSelector((state) => state.Shop);

  const [promptMessage, setPromptMessage] = useState({});
  const [showPromptPopUp, setShowPromptPopUp] = useState(false);

  const [isCartOpen, setIsCartOpen] = useState(true);
  const [isShipOpen, setIsShipOpen] = useState(false);

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
  let [custError, setCustError] = useState("");

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

  //******** Checkout Settings */

  const [useReward, setuseReward] = useState(false);
  const [useCoupon, setuseCoupon] = useState(false);
  const [removeCoupon, setremoveCoupon] = useState(false);
  const [couponamt, setcouponamt] = useState();
  const [couponname, setcouponname] = useState();
  const [couponcode, setcouponcode] = useState();
  const [payableamt, setpayableamt] = useState();
  const [rewardamt, setrewardamt] = useState();
  const [showRewardCheck, setShowRewardCheck] = useState(true);
  const [showCoupon, setshowCoupon] = useState(true);
  const [showpayment, setShowPayment] = useState(false);
  const [showPlaceOrder, setShowPlaceOrder] = useState(true);
  const [checkoutModal, setCheckoutModal] = useState(false);
  const checkoutToggle = () => setCheckoutModal(!checkoutModal);

  const profileDetails = useSelector((state) => state.Profile);

  useEffect(() => {
    couponDetails?.couponamount && setcouponamt(couponDetails?.couponamount);
    couponDetails?.couponname && setcouponname(couponDetails?.couponname);
    if (!useReward)
      couponDetails?.payableamount &&
        setpayableamt(couponDetails?.payableamount);
    else
      couponDetails?.payableamount &&
        setpayableamt(
          Math.round(
            (Cart?.ShopCart?.order_amount -
              (Checkout?.rewardPoints?.usable_reward +
                couponDetails?.couponamount)) *
              100
          ) / 100
        );
  }, [couponDetails?.couponamount, couponDetails?.payableamount]);
  useEffect(() => {
    setpayableamt(Cart?.ShopCart?.order_amount);
    setrewardamt(Checkout?.rewardPoints?.reward_points);
  }, [Cart?.ShopCart, Checkout?.rewardPoints]);
  const handleReward = (e) => {
    let coupon_discount = 0;
    coupon_discount = couponamt == undefined ? 0 : couponamt;
    if (e.target.checked) {
      setpayableamt(
        Math.round(
          (Cart?.ShopCart?.order_amount -
            (Checkout?.rewardPoints?.usable_reward + coupon_discount)) *
            100
        ) / 100
      );

      setrewardamt(0);
      setuseReward(true);
      setshowCoupon(false);
    } else {
      setpayableamt(
        Math.round((Cart?.ShopCart?.order_amount - coupon_discount) * 100) / 100
      );
      setrewardamt(Checkout?.rewardPoints?.usable_reward);
      setuseReward(false);
      setshowCoupon(true);
    }
  };
  const applyCoupon = (e) => {
    e.preventDefault();
    dispatch(
      addCouponDetails({
        Coupon: {
          coupon_code: couponcode,
        },
        callback: () => {
          setuseCoupon(true);
          setShowRewardCheck(false);
        },
      })
    );
  };

  const handleremoveCoupon = (e) => {
    e.preventDefault();
    setremoveCoupon(true);
    setShowRewardCheck(true);
    dispatch(
      removeCouponDetails({
        Coupon: {
          coupon_code: couponcode,
        },
        callback: () => {
          setuseCoupon(false);
          setcouponamt("");
        },
      })
    );
  };
  // if (profileDetails.user?.active) {
  //   dispatch(
  //     getCheckoutPrepaidOrder({
  //       data,
  //       callback: () => {
  //         setShowPayment(true);
  //         setShowRewardCheck(false);
  //         setShowPlaceOrder(false);
  //       },
  //     })
  //   );
  // } else if (auth?.guest_id) {
  //   dispatch(
  //     addGuestShopPayment({
  //       data: {
  //         guest_id: auth?.guest_id,
  //         delivery_mode: history?.location?.state?.deliveryMode,
  //       },
  //       callback: () => {
  //         setShowPayment(true);
  //         setShowPlaceOrder(false);
  //       },
  //     })
  //   );
  // }
  useEffect(() => {
    if (auth?.user?.role === "pet_owner") {
      // dispatch(getAddressById({ data: { id: params.id } }));
      // dispatch(
      //   getBillingAddressById({ data: { id: params.billingaddressid } })
      // );
      dispatch(getPersonalDetails());
      dispatch(getRewardPoints());
      dispatch(getDeliveryDetails());
    }
    if (auth?.guest_id) {
      // dispatch(getGuestAddressDetails({ data: { guest_id: auth?.guest_id } }));
      dispatch(
        getGuestAddressDetails({
          data: { guest_id: auth?.guest_id, address_use: "shipping" },
        })
      );
      // if (params.billingaddressid == params.id)
      //   dispatch(
      //     getGuestBillingAddressDetails({
      //       data: { guest_id: auth?.guest_id, address_use: "shipping" },
      //     })
      //   );
      // else
      //   dispatch(
      //     getGuestBillingAddressDetails({
      //       data: { guest_id: auth?.guest_id, address_use: "billing" },
      //     })
      //   );
      dispatch(getDeliveryDetails());
    }
  }, []);

  useEffect(() => {
    couponDetails?.couponamount && setcouponamt(couponDetails?.couponamount);
    couponDetails?.couponname && setcouponname(couponDetails?.couponname);
    if (!useReward)
      couponDetails?.payableamount &&
        setpayableamt(couponDetails?.payableamount);
    else
      couponDetails?.payableamount &&
        setpayableamt(
          Math.round(
            (Cart?.ShopCart?.order_amount -
              (Checkout?.rewardPoints?.usable_reward +
                couponDetails?.couponamount)) *
              100
          ) / 100
        );
  }, [couponDetails?.couponamount, couponDetails?.payableamount]);

  const makePayment = (payment_id, paytm_token, amount) => {
    var config = {
      root: "",
      style: {
        bodyBackgroundColor: "#fafafb",
        bodyColor: "",
        themeBackgroundColor: "#0FB8C9",
        themeColor: "#ffffff",
        headerBackgroundColor: "#284055",
        headerColor: "#ffffff",
        errorColor: "",
        successColor: "",
        card: {
          padding: "",
          backgroundColor: "",
        },
      },
      data: {
        orderId: payment_id,
        token: paytm_token,
        tokenType: "TXN_TOKEN",
        amount: amount,
      },
      payMode: {
        labels: {},
        filter: {
          exclude: [],
        },
        order: ["CC", "DC", "NB", "UPI", "PPBL", "PPI", "BALANCE"],
      },
      website: getWebPayTm(),
      flow: "DEFAULT",
      merchant: {
        mid: getMid(),
        redirect: false,
      },
      handler: {
        transactionStatus: function transactionStatus(response) {
          // response["delivery_mode"] = history?.location?.state?.deliveryMode;
          response["address_id"] = addressId;
          response["billingaddress_id"] = billingaddressId;
          if (auth?.guest_id) {
            response["guest_id"] = auth?.guest_id;
            dispatch(
              initiateGuestShopPayment(
                response,
                window.Paytm.CheckoutJS.close(),
                window.scrollTo({ top: 0, behavior: "smooth" }),
                history
              )
            );
          } else {
            dispatch(
              addCheckoutPrepaidOrder(
                response,
                window.Paytm.CheckoutJS.close(),
                window.scrollTo({ top: 0, behavior: "smooth" }),
                history
              )
            );
          }
        },
        notifyMerchant: function notifyMerchant(eventName, data) {
          console.log("Closed");
        },
      },
    };

    if (window.Paytm && window.Paytm.CheckoutJS) {
      window.Paytm.CheckoutJS.init(config)
        .then(function onSuccess() {
          window.Paytm.CheckoutJS.invoke();
        })
        .catch(function onError(error) {
          console.log("Error => ", error);
        });
    }
  };

  const handleCheckout = () => {
    let data;
    if (history?.location?.state?.deliveryMode !== "select") {
      data = {
        use_reward: useReward,
        use_coupon: useCoupon,
        coupon_code: couponcode,
        delivery_mode: history?.location?.state?.deliveryMode,
      };
    } else {
      data = {
        use_reward: useReward,
      };
    }

    if (profileDetails.user?.active) {
      dispatch(
        getCheckoutPrepaidOrder({
          data,
          callback: (payment_id, paytm_token, amount) => {
            setShowPayment(true);
            setShowRewardCheck(false);
            setShowPlaceOrder(false);
            makePayment(payment_id, paytm_token, amount);
          },
        })
      );
    } else if (auth?.guest_id) {
      dispatch(
        addGuestShopPayment({
          data: {
            guest_id: auth?.guest_id,
            delivery_mode: history?.location?.state?.deliveryMode,
          },
          callback: (payment_id, paytm_token, amount) => {
            setShowPayment(true);
            setShowPlaceOrder(false);
            makePayment(payment_id, paytm_token, amount);
          },
        })
      );
    }
  };

  //******** Checkout Settings End ************** */

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

  useEffect(() => {
    // addressDetails?.addresses &&
    //   addressDetails?.addresses[0]?.id &&
    //   setAddressId(addressDetails?.addresses[0]?.id);

    Delivery?.Delivery?.mode1?.id &&
      Cart?.ShopCart?.order_amount <
        Delivery?.Delivery?.min_free_shipping_amount &&
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
    if (billingaddressId === "") billingaddressId = addressId;
    dispatch(
      checkPincode({
        data: { pincode: pin },
        callback: () => {
          // history.push({
          //   pathname: `/checkout/summary/${addressId}/${billingaddressId}`,
          //   state: { deliveryMode: deliveryMode, from: "address" },
          // });
          handleCheckout();
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
    <div>
      {Cart?.ShopCart?.cart?.length ? (
        <div>
          <div className=" mb-1 ml-50 mt-30">
            <h4 className="">
              My Shopping Cart ({Cart?.ShopCart?.total} items)
            </h4>
            {Cart?.ShopCart?.order_amount <
            Delivery?.Delivery?.min_free_shipping_amount ? (
              <h4 className="orange-font font-weight-bold">
                Free Delivery for order above{" "}
                {Delivery?.Delivery?.min_free_shipping_amount}
              </h4>
            ) : null}
          </div>
          {/* <div className="container mt-20 mb-4">
            <ul className="text-center ">
              <li className="line-stage line-stage-active">CART</li>
              <li className="line-stage">SHIPPING</li>
              <li className="line-stage">CHECKOUT</li>
              <li className="line-stage ">PAYMENT</li>
            </ul>
          </div> */}
          <section>
            <div className="custom-container">
              <div className="section-content">
                <div className="row">
                  <div className="col-md-9 col-lg-9 col-sm-6">
                    <div className="accordian">
                      <details id="cart" open={isCartOpen}>
                        <summary>1. Cart</summary>
                        <div className="acc-content">
                          <div className="row">
                            <div className="col-md-12 col-lg-12 col-sm-12">
                              <div
                                className="table-responsive "
                                style={{ overflowX: "hidden" }}
                              >
                                <table className="table tbl-shopping-cart ">
                                  <tbody className="">
                                    {Cart?.ShopCart?.cart?.length &&
                                      Cart?.ShopCart?.cart?.map((item) => (
                                        <div className="col-lg-12 col-md-12">
                                          <div className="icon-box  pt-5  card-pet-cust ">
                                            <div className="d-flex justify-content-between  custom-cart-item-flex">
                                              <div className="col-lg-3 col-md-3 col-sm-3">
                                                <img
                                                  src={
                                                    item?.product_variant
                                                      ?.product_image_1
                                                  }
                                                  width="150px"
                                                  // height="138px"
                                                  className="cust-image-responsive"
                                                />
                                              </div>
                                              <div className="product-quantity mt-1 col-lg-6 col-md-6 col-sm-6">
                                                <div className="">
                                                  <div className="icon-box-title font-weight-600 mt-2 mb-1">
                                                    {item.product.product_name}
                                                  </div>
                                                  <p className="py-1 my-1  pl-0">
                                                    {item?.product?.brand_name}
                                                  </p>

                                                  <span className="seller-data pl-0 ml-0">
                                                    Sold by:{" "}
                                                    {item?.product?.added_by}
                                                  </span>

                                                  <p className="my-1">
                                                    variant:{" "}
                                                    {
                                                      item?.product_variant
                                                        .variant_name
                                                    }
                                                  </p>
                                                  <p className="py-1 my-1  pl-0">
                                                    Price:{" "}
                                                    {(
                                                      parseFloat(
                                                        item?.total_price
                                                      ) /
                                                      parseFloat(item?.quantity)
                                                    ).toFixed(2)}
                                                  </p>

                                                  {/* <p className="">Qty: {item?.quantity}</p> */}
                                                </div>
                                              </div>
                                              <div className="col-lg-3 col-md-3 col-sm-3">
                                                <h5
                                                  className=" orange-font"
                                                  style={{ fontSize: "14px" }}
                                                >
                                                  Total Price:{" "}
                                                  <span className="blue-font">
                                                    Rs.
                                                    {parseFloat(
                                                      item?.total_price
                                                    ).toFixed(2)}
                                                  </span>
                                                </h5>
                                                <div className="quantity buttons_added d-flex ">
                                                  <span className="mt-4 font-weight-normal">
                                                    Qty:
                                                  </span>
                                                  <span
                                                    className="btn mx-0 px-3"
                                                    onClick={() =>
                                                      auth &&
                                                      auth.guest_id != undefined
                                                        ? dispatch(
                                                            changeGuestQuantity(
                                                              {
                                                                data: {
                                                                  guest_id:
                                                                    auth?.guest_id,
                                                                  cart_id:
                                                                    item?.cart_id,
                                                                  action:
                                                                    "less",
                                                                },
                                                                callback: () =>
                                                                  dispatch(
                                                                    getGuestCart(
                                                                      {
                                                                        data: {
                                                                          guest_id:
                                                                            auth?.guest_id,
                                                                        },
                                                                      }
                                                                    )
                                                                  ),
                                                              }
                                                            )
                                                          )
                                                        : dispatch(
                                                            changeQuantity({
                                                              data: {
                                                                cart_id:
                                                                  item?.cart_id,
                                                                action: "less",
                                                              },
                                                              callback: () =>
                                                                dispatch(
                                                                  getCartDetails()
                                                                ),
                                                            })
                                                          )
                                                    }
                                                    style={{ fontSize: "22px" }}
                                                  >
                                                    -
                                                  </span>
                                                  <input
                                                    className="add-qty"
                                                    type="text"
                                                    value={item?.quantity}
                                                    onChange={(e) =>
                                                      setQty(e.target.value)
                                                    }
                                                    disabled={true}
                                                  />
                                                  <span
                                                    className="btn mx-0  px-3"
                                                    onClick={() =>
                                                      auth &&
                                                      auth.guest_id != undefined
                                                        ? dispatch(
                                                            changeGuestQuantity(
                                                              {
                                                                data: {
                                                                  guest_id:
                                                                    auth?.guest_id,
                                                                  cart_id:
                                                                    item?.cart_id,
                                                                  action: "add",
                                                                },
                                                                callback: () =>
                                                                  dispatch(
                                                                    getGuestCart(
                                                                      {
                                                                        data: {
                                                                          guest_id:
                                                                            auth?.guest_id,
                                                                        },
                                                                      }
                                                                    )
                                                                  ),
                                                              }
                                                            )
                                                          )
                                                        : dispatch(
                                                            changeQuantity({
                                                              data: {
                                                                cart_id:
                                                                  item?.cart_id,
                                                                action: "add",
                                                              },
                                                              callback: () =>
                                                                dispatch(
                                                                  getCartDetails()
                                                                ),
                                                            })
                                                          )
                                                    }
                                                    style={{ fontSize: "22px" }}
                                                  >
                                                    +
                                                  </span>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-md-12 col-lg-12 col-sm-12">
                              <div className="pull-right">
                                <a
                                  className=" btn btn-default cust-payment-btn font-weight-bold mr-4 mb-4 "
                                  onClick={(e) => {
                                    setIsCartOpen((prev) => !prev);
                                    if (isShipOpen === false)
                                      setIsShipOpen(!isShipOpen);
                                  }}
                                >
                                  PROCEED TO SHIPPING
                                  {Cart?.loading ? (
                                    <i
                                      className="fa fa-spinner fa-spin ml-3"
                                      aria-hidden="true"
                                    ></i>
                                  ) : null}
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </details>
                      <details
                        id="ship"
                        open={isShipOpen}
                        // onClick={(e) => {
                        //   setIsShipOpen(!isShipOpen);
                        // }}
                      >
                        <summary
                        // onClick={(e) => {
                        //   setIsShipOpen(!isShipOpen);
                        // }}
                        >
                          2. Shipping Address
                        </summary>
                        <div className="acc-content">
                          <div className="row" style={{ padding: "15px" }}>
                            {showAddAddressBtn ? (
                              <>
                                <div className="col-md-6 col-lg-6 col-sm-6">
                                  <h5 className="orange-font font-weight-bold ">
                                    Select Delivery Address
                                  </h5>
                                </div>
                                <div className="col-md-6 col-lg-6 col-sm-6">
                                  <h5
                                    className="cursor-pointer orange-font font-weight-bold pull-right"
                                    onClick={() => {
                                      setAddNewAddress(true);
                                      setShowAddAddressBtn(false);
                                      setAddressHide(true);
                                      setGuestAddress(true);
                                      // clearFields();
                                      guest?.addresses?.fullname == "" &&
                                        console.log("hi");
                                    }}
                                  >
                                    {guest?.addresses?.fullname
                                      ? "Edit Address"
                                      : "+ New Delivery Address"}
                                  </h5>
                                </div>
                              </>
                            ) : null}
                            <div className="col-md-12 col-lg-12 col-sm-12">
                              {addressDetails?.addresses?.length ? (
                                addressDetails?.addresses?.map(
                                  (address, index) => (
                                    <div
                                      style={{
                                        display: addressHide ? "none" : "block",
                                        position: "relative",
                                      }}
                                      className={` pl-3 cursor-pointer my-3 ${
                                        !addressHide && addressId == address?.id
                                          ? "activeAddress"
                                          : "inactiveAddress"
                                      }`}
                                      onClick={() => {
                                        setaActiveAddress(
                                          `address${index + 1}`
                                        );
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
                                      <div className="card-body">
                                        <h5 className="card-title text-left">
                                          {address?.fullname}&nbsp;
                                          <span class="badge badge-pill badge-secondary">
                                            {address?.address_type}
                                          </span>
                                        </h5>
                                        <p className="text-left">
                                          {address?.phone}
                                        </p>{" "}
                                        <p className="card-text text-left">
                                          {address?.address}
                                        </p>
                                        <p className="card-text text-left">
                                          Pin {address?.pin}, {address?.state}
                                        </p>
                                        {(activeAddress ==
                                          `address${index + 1}` ||
                                          addressId == address?.id) &&
                                        !addressHide ? (
                                          <>
                                            <button
                                              className="btn btn-outline-dark mt-3 cursor-pointer font-weight-bold"
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
                                                  getAddressById({
                                                    data: {
                                                      id: address?.id,
                                                    },
                                                  })
                                                );
                                              }}
                                              style={{
                                                position: "absolute",
                                                top: "0",
                                                right: "45px",
                                              }}
                                            >
                                              <i
                                                class="fas fa-edit"
                                                style={{
                                                  marginRight: "0px",
                                                }}
                                              ></i>
                                            </button>
                                            <button
                                              className="btn btn-outline-dark mt-3 cursor-pointer font-weight-bold"
                                              onClick={() =>
                                                deletePromptHandler(address?.id)
                                              }
                                              style={{
                                                position: "absolute",
                                                top: "0",
                                                right: "0",
                                              }}
                                            >
                                              <i
                                                class="fas fa-trash"
                                                style={{
                                                  marginRight: "0px",
                                                }}
                                              ></i>
                                            </button>
                                            <p className="card-text text-left mt-1">
                                              <input
                                                className="billingaddress-checkbox "
                                                type="checkbox"
                                                id="billingCheck"
                                                // defaultChecked={checked}
                                                style={{ width: "15px" }}
                                                onChange={() => {
                                                  // setChecked(!checked);
                                                  // console.log("From Input Area: " + checked);
                                                  var checkBox =
                                                    document.getElementById(
                                                      "billingCheck"
                                                    );
                                                  if (
                                                    checkBox.checked == true
                                                  ) {
                                                    setShowBillingAddress(true);
                                                    setlistBillingAddress(true);
                                                    setShowAddNewBillingAddressBtn(
                                                      true
                                                    );
                                                  } else {
                                                    setShowBillingAddress(
                                                      false
                                                    );
                                                    setShowAddNewBillingAddressBtn(
                                                      true
                                                    );
                                                    setShowAddAddressBtn(true);
                                                  }
                                                }}
                                              />{" "}
                                              Billing address is different from
                                              delivery address
                                            </p>
                                          </>
                                        ) : null}
                                      </div>
                                    </div>
                                  )
                                )
                              ) : guest?.addresses?.fullname &&
                                !guestAddress ? (
                                <>
                                  <div
                                    className={`cursor-pointer my-3 activeAddress`}
                                  >
                                    <div className="card-body">
                                      <h5 className="card-title text-left">
                                        {guest?.addresses?.fullname}&nbsp;
                                        <span className="badge badge-pill badge-secondary">
                                          {guest?.addresses?.address_type}
                                        </span>
                                      </h5>
                                      <p className="text-left">
                                        {guest?.addresses?.phone}
                                      </p>
                                      <p className="text-left">
                                        {guest?.addresses?.address}
                                      </p>
                                      <p className="text-left">
                                        {guest?.addresses?.pin},{" "}
                                        {guest?.addresses?.state}
                                      </p>
                                      <p className="card-text text-left mt-1">
                                        <input
                                          className="billingaddress-checkbox"
                                          type="checkbox"
                                          id="guestbillingCheck"
                                          // defaultChecked={checked}
                                          onChange={() => {
                                            // setChecked(!checked);
                                            // console.log("From Input Area: " + checked);
                                            var checkBox =
                                              document.getElementById(
                                                "guestbillingCheck"
                                              );
                                            if (checkBox.checked == true) {
                                              setShowBillingAddress(true);
                                              setlistBillingAddress(true);
                                              setShowAddNewBillingAddressBtn(
                                                true
                                              );
                                            } else {
                                              setShowBillingAddress(false);
                                              setShowAddNewBillingAddressBtn(
                                                true
                                              );
                                              setShowAddAddressBtn(true);
                                            }
                                          }}
                                        />{" "}
                                        Billing address is different from
                                        delivery address
                                      </p>
                                    </div>
                                  </div>
                                </>
                              ) : null}
                            </div>
                            {addNewAddress ? (
                              <div className="col-md-12">
                                <div className="billing-details">
                                  <div className="row">
                                    <div className="col-md-12">
                                      <h5 className="mb-20 orange-font">
                                        Shipping Address Details
                                      </h5>
                                    </div>

                                    <form
                                      onSubmit={
                                        editAddress
                                          ? handleEditAddress
                                          : handleAddAddress
                                      }
                                    >
                                      <div className="form-group col-md-6 col-12  col-sm-12">
                                        <label htmlFor="checkuot-form-fname">
                                          Full Name
                                        </label>
                                        <input
                                          id="checkuot-form-fname"
                                          type="text"
                                          className="form-control"
                                          placeholder="Full Name"
                                          value={fullname}
                                          onChange={(e) =>
                                            setFullname(e.target.value)
                                          }
                                        />
                                      </div>

                                      <div className="form-group col-md-6 col-12 col-sm-12">
                                        <label htmlFor="checkuot-form-address">
                                          Address
                                        </label>
                                        <textarea
                                          rows={2}
                                          id="checkuot-form-address"
                                          className="form-control"
                                          placeholder="Address"
                                          value={address}
                                          onChange={(e) =>
                                            setAddress(e.target.value)
                                          }
                                        />
                                      </div>

                                      <div className="form-group col-md-3 col-6 col-sm-6">
                                        <label htmlFor="checkuot-form-address mr-5">
                                          Address Type
                                        </label>

                                        <select
                                          className="py-2 form-control"
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

                                      <div className="form-group col-md-3 col-sm-6">
                                        <label htmlFor="checkuot-form-city">
                                          City
                                        </label>
                                        <input
                                          id="checkuot-form-city"
                                          type="text"
                                          className="form-control"
                                          placeholder="City"
                                          value={city}
                                          onChange={(e) =>
                                            setCity(e.target.value)
                                          }
                                        />
                                      </div>

                                      <div className="form-group col-md-3 col-sm-6">
                                        <label htmlFor="checkuot-form-zip">
                                          Pin Code
                                        </label>
                                        <input
                                          id="checkuot-form-zip"
                                          type="text"
                                          className="form-control deliveryPin"
                                          placeholder="Pin Code"
                                          value={pin}
                                          onChange={(e) =>
                                            setPin(e.target.value)
                                          }
                                        />
                                      </div>

                                      <div className="form-group col-md-3 col-sm-6">
                                        <label htmlFor="pet-select ">
                                          State
                                        </label>
                                        <input
                                          type="text"
                                          className="form-control"
                                          placeholder="State"
                                          value={state}
                                          onChange={(e) =>
                                            setState(e.target.value)
                                          }
                                        />
                                      </div>

                                      <div className="form-group col-md-6">
                                        <label htmlFor="pet-select ">
                                          Phone
                                        </label>
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
                                          <p className="mandatory mt-1">
                                            {phoneError}
                                          </p>
                                        )}
                                      </div>

                                      <div className="form-group col-md-6">
                                        <label htmlFor="pet-select ">
                                          Email Address
                                        </label>
                                        <input
                                          type="text"
                                          className="form-control"
                                          placeholder="Email Address"
                                          value={email}
                                          onChange={(e) =>
                                            setEmail(e.target.value)
                                          }
                                        />
                                        {emailError && (
                                          <p className="mandatory mt-1">
                                            {emailError}
                                          </p>
                                        )}
                                      </div>
                                      <div className="form-group col-md-6 col-12  col-sm-12">
                                        <button
                                          className=" btn btn-default font-weight-bold mr-4 "
                                          type="submit"
                                          onClick={() => {
                                            setaActiveAddress(
                                              `address${
                                                addressDetails?.addresses
                                                  ?.length + 1
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
                                          className=" btn btn-default font-weight-bold mr-4 "
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
                                      </div>
                                    </form>
                                  </div>
                                </div>
                              </div>
                            ) : null}
                          </div>

                          {showbillingaddress ? (
                            <div className="row" style={{ padding: "15px" }}>
                              {listBillingAddress ? (
                                <>
                                  <div className="col-md-6 col-lg-6 col-sm-6 ">
                                    <h5 className="orange-font font-weight-bold">
                                      Select Billing Address
                                    </h5>
                                  </div>
                                  <div className="col-md-6 col-lg-6 col-sm-6">
                                    {ShowAddNewBillingAddressBtn ? (
                                      <h5
                                        className="cursor-pointer orange-font font-weight-bold pull-right"
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
                                          : "+ New Billing Address"}
                                      </h5>
                                    ) : null}
                                  </div>
                                  <div className="col-md-12 col-lg-12 col-sm-12">
                                    {addressDetails?.billing_addresses
                                      ?.length ? (
                                      addressDetails?.billing_addresses?.map(
                                        (billingaddress, billingindex) => (
                                          <div
                                            style={{
                                              display: billingaddressHide
                                                ? "none"
                                                : "block",
                                              position: "relative",
                                            }}
                                            className={` pl-3 cursor-pointer my-3 ${
                                              !billingaddressHide &&
                                              billingaddressId ==
                                                billingaddress?.id
                                                ? "activeAddress"
                                                : "inactiveAddress"
                                            }`}
                                            onClick={() => {
                                              setaActiveBillingAddress(
                                                `billingaddress${
                                                  billingindex + 1
                                                }`
                                              );

                                              // setAddNewAddress(false);
                                              setBillingAddressId(
                                                billingaddress?.id
                                              );
                                              // setShowAddAddressBtn(true);
                                              setShowAddNewBillingAddressBtn(
                                                true
                                              );
                                              // setAddNewBillingAddress(false);
                                              // console.log("From Div Area: " + checked);
                                            }}
                                          >
                                            <div className="card-body">
                                              <h5 className="card-title text-left">
                                                {billingaddress?.fullname}
                                                &nbsp;
                                                <span class="badge badge-pill badge-secondary">
                                                  {billingaddress?.address_type}
                                                </span>
                                              </h5>
                                              <p className="text-left">
                                                {billingaddress?.phone}
                                              </p>
                                              <p className="card-text text-left">
                                                {billingaddress?.address}
                                              </p>
                                              <p className="card-text text-left">
                                                Pin {billingaddress?.pin},{" "}
                                                {billingaddress?.state}
                                              </p>
                                              {(activeBillingAddress ==
                                                `billlingaddress${
                                                  billingindex + 1
                                                }` ||
                                                billingaddressId ==
                                                  billingaddress?.id) &&
                                              !billingaddressHide ? (
                                                <>
                                                  <button
                                                    className="btn btn-outline-dark mt-3 cursor-pointer font-weight-bold"
                                                    style={{
                                                      position: "absolute",
                                                      top: "0",
                                                      right: "45px",
                                                    }}
                                                    onClick={() => {
                                                      setAddNewBillingAddress(
                                                        true
                                                      );
                                                      setShowAddNewBillingAddressBtn(
                                                        false
                                                      );
                                                      setBillingAddressHide(
                                                        true
                                                      );
                                                      // setBillingAddressHide(true);
                                                      // setGuestAddress(true);
                                                      seteditBillingAddress(
                                                        true
                                                      );
                                                      setlistBillingAddress(
                                                        false
                                                      );
                                                      setGuestBillingAddress(
                                                        true
                                                      );
                                                      dispatch(
                                                        getBillingAddressById({
                                                          data: {
                                                            id: billingaddress?.id,
                                                          },
                                                        })
                                                      );
                                                    }}
                                                  >
                                                    <i
                                                      class="fas fa-edit"
                                                      style={{
                                                        marginRight: "0px",
                                                      }}
                                                    ></i>
                                                  </button>
                                                  <button
                                                    className="btn btn-outline-dark mt-3 cursor-pointer font-weight-bold"
                                                    onClick={() =>
                                                      deletePromptHandler(
                                                        billingaddress?.id
                                                      )
                                                    }
                                                    style={{
                                                      position: "absolute",
                                                      top: "0",
                                                      right: "0",
                                                    }}
                                                  >
                                                    <i
                                                      class="fas fa-trash"
                                                      style={{
                                                        marginRight: "0px",
                                                      }}
                                                    ></i>
                                                  </button>
                                                </>
                                              ) : null}
                                            </div>
                                          </div>
                                        )
                                      )
                                    ) : guest?.billing_addresses?.fullname &&
                                      !guestBillingAddress ? (
                                      <div
                                        className={` pl-3 cursor-pointer my-3 activeAddress`}
                                      >
                                        <div className="card-body">
                                          <h5 className="card-title text-left">
                                            {guest?.billing_addresses?.fullname}
                                            &nbsp;
                                            <span className="badge badge-pill badge-secondary">
                                              {
                                                guest?.billing_addresses
                                                  ?.address_type
                                              }
                                            </span>
                                          </h5>
                                          <p className="text-left">
                                            {guest?.billing_addresses?.phone}
                                          </p>
                                          <p className="text-left">
                                            {guest?.billing_addresses?.address}
                                          </p>
                                          <p className="text-left">
                                            {guest?.billing_addresses?.pin},{" "}
                                            {guest?.billing_addresses?.state}
                                          </p>
                                        </div>
                                      </div>
                                    ) : null}
                                  </div>
                                </>
                              ) : null}

                              {addNewBillingAddress ? (
                                <div className="col-md-12 col-lg-12 col-sm-12">
                                  <div className="billing-details">
                                    <div className="row">
                                      <div className="col-md-12 col-lg-12 col-sm-12">
                                        <h5 className="mb-20 orange-font">
                                          Billing Address Details
                                        </h5>
                                      </div>
                                      <form
                                        onSubmit={
                                          editBillingAddress
                                            ? handleEditBillingAddress
                                            : handleAddBillingAddress
                                        }
                                      >
                                        <div className="form-group col-md-6 col-12  col-sm-12">
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

                                        <div className="form-group col-md-6 col-12  col-sm-12">
                                          <label htmlFor="checkuot-form-address">
                                            Address
                                          </label>
                                          <textarea
                                            rows={2}
                                            id="checkuot-form-address"
                                            className="form-control"
                                            placeholder="Address"
                                            value={billingaddress}
                                            onChange={(e) =>
                                              setBillingAddress(e.target.value)
                                            }
                                          />
                                        </div>

                                        <div className="form-group col-md-3 col-6 col-sm-6">
                                          <label htmlFor="checkuot-form-address mr-5">
                                            Address Type
                                          </label>
                                          <select
                                            className="py-2 form-control"
                                            name="address-type"
                                            id="pet-select"
                                            value={billingaddressType}
                                            onChange={(e) =>
                                              setBillingAddressType(
                                                e.target.value
                                              )
                                            }
                                          >
                                            <option value="Home">Home</option>
                                            <option value="Work">Work</option>
                                          </select>
                                        </div>

                                        <div className="form-group col-md-3 col-12  col-sm-12">
                                          <label htmlFor="checkuot-form-city">
                                            City
                                          </label>
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

                                        <div className="form-group col-md-3 col-12  col-sm-12">
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

                                        <div className="form-group col-md-3 col-12  col-sm-12">
                                          <label htmlFor="pet-select ">
                                            State
                                          </label>
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

                                        <div className="form-group col-md-6 col-12  col-sm-12">
                                          <label htmlFor="pet-select">
                                            Phone
                                          </label>
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

                                        <div className="form-group col-md-6 col-12  col-sm-12">
                                          <label htmlFor="pet-select ">
                                            Email Address
                                          </label>

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
                                        <div className="form-group col-md-6 col-12  col-sm-12">
                                          <button
                                            className=" btn btn-default font-weight-bold mr-4 "
                                            type="submit"
                                            onClick={() => {
                                              setaActiveBillingAddress(
                                                `billingaddress${
                                                  addressDetails
                                                    ?.billing_addresses
                                                    ?.length + 1
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
                                            {editBillingAddress
                                              ? "Update"
                                              : "Save"}
                                          </button>

                                          <button
                                            className=" btn btn-default font-weight-bold  mr-4 "
                                            type="button"
                                            onClick={() => {
                                              setShowAddNewBillingAddressBtn(
                                                true
                                              );
                                              setAddNewBillingAddress(false);
                                              setBillingAddressHide(false);
                                              setGuestBillingAddress(false);
                                              if (
                                                !guest?.billing_addresses
                                                  ?.fullname
                                              )
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
                                        </div>
                                      </form>
                                    </div>
                                  </div>
                                </div>
                              ) : null}
                            </div>
                          ) : null}
                          {ShopDetails?.pincodeData?.message ==
                          "Currently we are not available at your location" ? (
                            <h5 className="mandatory">
                              {ShopDetails?.pincodeData?.message}
                            </h5>
                          ) : null}

                          {guest?.addresses?.fullname ||
                          addressDetails?.addresses?.length ? (
                            <div className="row ">
                              <div className="col-md-12 col-lg-12 col-sm-12">
                                <a
                                  className=" btn btn-default cust-payment-btn font-weight-bold mb-4 mr-4 pull-right"
                                  type="submit"
                                  // href={`/checkout/summary/${addressId}`}
                                  onClick={handleSubmit}
                                >
                                  PROCEED TO CHECKOUT
                                  {address?.loading ? (
                                    <i
                                      className="fa fa-spinner fa-spin ml-3"
                                      aria-hidden="true"
                                    ></i>
                                  ) : null}
                                </a>
                              </div>
                            </div>
                          ) : null}
                        </div>
                      </details>
                    </div>
                  </div>

                  <div className="col-md-3 col-lg-3 col-sm-6">
                    <div className="accordian">
                      <details open>
                        <summary>Payment Summary</summary>
                        <div className="acc-content">
                          <div className="row">
                            <div className="col-md-12 mt-5 mx-4">
                              <div className="form-group row">
                                <div className="form-group col-md-6 col-sm-6 col-xs-6">
                                  Sub Total:{" "}
                                </div>
                                <div className="form-group col-md-6 col-sm-6 col-xs-6">
                                  Rs. {Cart?.ShopCart?.order_amount?.toFixed(2)}
                                </div>
                              </div>
                              <div className="form-group row ">
                                <div className="form-group col-md-6 col-12  col-sm-6 col-xs-6">
                                  Shipping Charge:
                                </div>
                                <div className="form-group col-md-6 col-12  col-sm-6 col-xs-6">
                                  Rs.{" "}
                                  {Cart?.ShopCart?.shipping_charge?.toFixed(2)}
                                </div>
                              </div>

                              {Checkout?.rewardPoints?.reward_points &&
                              showRewardCheck ? (
                                <div className="form-group row ">
                                  <div className="form-group col-md-6 col-12  col-sm-6 col-xs-6">
                                    Total Coins:
                                  </div>
                                  <div className="form-group col-md-6 col-12  col-sm-6 col-xs-6">
                                    {Checkout?.rewardPoints?.reward_points}{" "}
                                    Coins
                                  </div>
                                </div>
                              ) : null}
                              {Checkout?.rewardPoints?.reward_points &&
                              showRewardCheck ? (
                                <div className="form-group row ">
                                  <div className="form-group col-md-6 col-12  col-sm-6 col-xs-6">
                                    Usable Coins:
                                  </div>
                                  <div className="form-group col-md-6 col-12  col-sm-6 col-xs-6">
                                    Rs. {Checkout?.rewardPoints?.usable_reward}
                                  </div>
                                </div>
                              ) : null}
                              {Checkout?.rewardPoints?.usable_reward &&
                              showRewardCheck ? (
                                <div className="form-group row ">
                                  <div className="form-group col-md-12 col-12  col-sm-6 col-xs-6">
                                    <p className="text-left mt-1 mb-2">
                                      <input
                                        type="checkbox"
                                        id="scales"
                                        name="scales"
                                        className="mr-4 pt-6 reward-check"
                                        onClick={(e) => handleReward(e)}
                                        style={{ width: "15px" }}
                                      />
                                      &nbsp;Use Coins
                                    </p>
                                  </div>
                                </div>
                              ) : null}
                              {showCoupon && !useCoupon && !auth?.guest_id && (
                                <form onSubmit={applyCoupon}>
                                  <div className="form-group row ">
                                    <div className="form-group col-md-6 col-12  col-sm-6 col-xs-6">
                                      <input
                                        type="text"
                                        class="form-control mb-2"
                                        id="inlineFormInput"
                                        placeholder="Enter Code"
                                        onChange={(e) =>
                                          setcouponcode(e.target.value)
                                        }
                                      />
                                    </div>
                                    <div className="form-group col-md-6 col-12  col-sm-6 col-xs-6">
                                      <button
                                        type="submit"
                                        class="btn btn-default mb-2"
                                      >
                                        Apply
                                      </button>
                                    </div>
                                    {couponDetails?.error && (
                                      <>
                                        <span className="mandatory">
                                          {couponDetails?.error}
                                        </span>
                                      </>
                                    )}
                                  </div>
                                </form>
                              )}
                              {useReward && (
                                <div className="form-group row ">
                                  <div className="form-group col-md-6 col-12  col-sm-6 col-xs-6">
                                    Discount:
                                  </div>
                                  <div className="form-group col-md-6 col-12  col-sm-6 col-xs-6">
                                    - Rs.{" "}
                                    {Checkout?.rewardPoints?.usable_reward}
                                  </div>
                                </div>
                              )}
                              {useCoupon && (
                                <div className="form-group row ">
                                  <div className="form-group col-md-6 col-12  col-sm-6 col-xs-6">
                                    Coupon Applied (<b>{couponname}</b>) :
                                  </div>
                                  <div className="form-group col-md-6 col-12  col-sm-6 col-xs-6">
                                    {" "}
                                    - Rs.{couponamt}&nbsp;&nbsp;
                                    <img
                                      src={delete_icon}
                                      width="16px"
                                      onClick={(e) => {
                                        handleremoveCoupon(e);
                                      }}
                                      style={{ cursor: "pointer" }}
                                    />
                                  </div>
                                </div>
                              )}
                              <div className="form-group row">
                                <div className="form-group col-md-6 col-12  col-sm-6 col-xs-6">
                                  <b>Order Total:</b>
                                  <label className="text-dark font-weight-normal">
                                    (Price incl. of tax)
                                  </label>
                                </div>
                                <div className="form-group col-md-6 col-12  col-sm-6 col-xs-6">
                                  <b>
                                    Rs.{" "}
                                    {Cart?.ShopCart?.order_total_with_shipping?.toFixed(
                                      2
                                    )}
                                    {/* Rs.
                                    {(payableamt * 1).toFixed(2)} */}
                                  </b>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </details>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      ) : (
        !Cart?.loading && (
          <section style={{ display: "grid" }}>
            <div
              className="container text-center mb-50"
              style={{ alignSelf: "center", justifyContent: "center" }}
            >
              <h3 className="mb-4">Cart is empty</h3>
              <a className="cart-empty-btn " href="/store">
                Go back to shop page
              </a>
            </div>
          </section>
        )
      )}
      {Cart?.loading && <Loader />}
      <Login modal_center={modal} setmodal_center={setModal} toggle={toggle} />
      {Checkout?.loading && <Loader />}
      {guest?.loading && <Loader />}

      <SuccessConfirmationAlert
        modal_center={checkoutModal}
        setmodal_center={setCheckoutModal}
        content="Order Placed Successfully"
        toggle={checkoutToggle}
        setCustError={setCustError}
        custError={custError}
      />
    </div>
  );
};

export default ShopCart;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router";
import SessionExpiredAlert from "../../components/sessionExpiredAlert";
import Loader from "../../components/UI/Loader";
import { getLocalStorage, getMid, getWebPayTm } from "../../helpers/utils";
import { getAddressDetails } from "../../store/UserStore/Address//action";
import {
  getClinicBookingFee,
  getClinicPayment,
  initiateClinicPayment,
  processClinicPayment,
  bookClinicAppointment,
} from "../../store/UserStore/Clinic/action";
import { getPersonalDetails } from "../../store/UserStore/Profile/action";
import {
  addClinicCouponDetails,
  removeClinicCouponDetails,
} from "../../store/UserStore/Coupon/action";
import Login from "../Login";
import logo from "../../assets/images/logo.jpg";
import { resetErrors } from "../../store/UserStore/Login/action";
import delete_icon from "../../assets/icons/delete_icon.svg";

const BookingPayment = () => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const toggle = () => {
    setModal(!modal);
    dispatch(resetErrors());
    setCustError("");
  };

  const params = useParams();

  const [checkoutModal, setCheckoutModal] = useState(false);
  const [phone, setPhone] = useState("");
  let [custError, setCustError] = useState("");

  const [useCoupon, setuseCoupon] = useState(false);
  const [removeCoupon, setremoveCoupon] = useState(false);
  const [couponamt, setcouponamt] = useState();
  const [couponname, setcouponname] = useState();
  const [couponcode, setcouponcode] = useState();
  const [payableamt, setpayableamt] = useState();

  const Clinic = useSelector((state) => state.Clinic);
  const profileDetails = useSelector((state) => state.Profile);
  const couponDetails = useSelector((state) => state.Coupon);

  const auth = getLocalStorage("AUTH_DETAILS");
  useEffect(() => {
    auth?.user?.role == "pet_owner" &&
      dispatch(getAddressDetails({ data: { address_use: "shipping" } }));
    auth?.user?.role == "pet_owner" && dispatch(getPersonalDetails());
    dispatch(getClinicBookingFee());
    dispatch(getClinicPayment({ data: { payment_id: params?.id } }));
  }, []);

  const location = useLocation();
  console.log(couponDetails);
  console.log(Clinic);
  useEffect(() => {
    // if (useCoupon) {
    couponDetails?.couponamount && setcouponamt(couponDetails?.couponamount);
    couponDetails?.couponname && setcouponname(couponDetails?.couponname);
    couponDetails?.payableamount && setpayableamt(couponDetails?.payableamount);
    // } else
    // couponDetails?.payableamount &&
    //   setpayableamt(Clinic?.paymentData?.consultation_fee);
  }, [couponDetails?.couponamount, couponDetails?.payableamount]);

  useEffect(() => {
    Clinic?.paymentData?.amount && setpayableamt(Clinic?.paymentData?.amount);
    Clinic?.paymentData?.coupon_id && setuseCoupon(true);
    Clinic?.paymentData?.coupon_amount_used &&
      setcouponamt(Clinic?.paymentData?.coupon_amount_used);
    Clinic?.paymentData?.coupon_name &&
      setcouponname(Clinic?.paymentData?.coupon_name);
  }, [Clinic?.paymentData?.amount]);

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
          dispatch(
            processClinicPayment(
              response,
              payment_id,
              history,
              window.Paytm.CheckoutJS.close(),
              window.scrollTo({ top: 0, behavior: "smooth" })
            )
          );
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

  const handleBookPayment = (e) => {
    e.preventDefault();
    dispatch(
      bookClinicAppointment({
        data: { payment_id: params?.id },
        callback: () => {
          history?.push({
            pathname: `/clinic/success/${params?.id}`,
            state: { from: "payment" },
          });
        },
      })
    );
  };

  const handleClinicPayment = (e) => {
    // const paymentObject = new window.Razorpay(options);
    e.preventDefault();
    // paymentObject.open();
    // makePayment();
    dispatch(
      initiateClinicPayment({
        data: { payment_id: params?.id },
        callback: (payment_id, paytm_token, amount) => {
          makePayment(payment_id, paytm_token, amount);
        },
      })
    );
  };

  const applyCoupon = (e) => {
    e.preventDefault();
    dispatch(
      addClinicCouponDetails({
        Coupon: {
          coupon_code: couponcode,
          payment_id: params?.id,
        },
        callback: () => {
          setuseCoupon(true);
        },
      })
    );
  };

  const handleremoveCoupon = (e) => {
    e.preventDefault();
    setremoveCoupon(true);
    dispatch(
      removeClinicCouponDetails({
        Coupon: {
          coupon_code: couponcode,
          payment_id: params?.id,
        },
        callback: () => {
          setuseCoupon(false);
          setcouponamt("");
        },
      })
    );
  };

  useEffect(() => {
    profileDetails?.user?.phone && setPhone(profileDetails?.user?.phone);
  }, [profileDetails?.user]);

  const history = useHistory();

  return (
    <div className="main-content">
      <div>
        {Clinic?.paymentData?.status == "prepaid" ? (
          <div className="mt-60 pb-100 text-center">
            {/* <img src={logo} width="100px" /> */}

            <h2 className="text-center">Oops! Something went wrong</h2>
            <p>Please try again or report an issue to support</p>
            <a href="/clinic" className="orange-font font-weight-bold">
              Go Back To Clinic Section
            </a>
          </div>
        ) : (
          <div className="container payement-container pt-30 pb-60">
            {Clinic?.paymentData ? (
              <>
                <div className="col-lg-9 mt-">
                  {getLocalStorage("AUTH_DETAILS") &&
                  getLocalStorage("AUTH_DETAILS")?.user?.role == "pet_owner" ? (
                    <div className=" approve-content-header">
                      <h4 className="">
                        <span className="approve-number ml-4">1</span>
                        <span className="approve-heading">Login</span>
                        <span className="text-success"> ✔</span>
                      </h4>
                      <div className="d-flex">
                        <h5 className="font-weight-500 text-dark ml-50 margin-right">
                          {profileDetails?.user?.first_name}{" "}
                          {profileDetails?.user?.last_name}
                        </h5>
                        <h5 className="font-weight-500 text-dark ml-50 margin-right">
                          {profileDetails?.user?.phone}
                        </h5>
                      </div>
                    </div>
                  ) : (
                    <div className=" approve-content-header">
                      <h4 className="">
                        <span className="approve-number ml-4">1</span>
                        <span className="approve-heading">Login</span>
                        <span className="text-success "> ✔</span>
                      </h4>
                    </div>
                  )}
                </div>

                {/* Address  */}

                <div className="col-lg-9">
                  <h4 className="content-header">
                    <span className="number ml-4">2</span>
                    <span className="heading">Booking Details</span>
                  </h4>
                  <div className="">
                    <div className="inner row">
                      <div className="col col-5 mt-3">
                        <div className="d-flex">
                          <p className="col-md-6 col-xs-5">Parent Name:</p>
                          <p className="col-md-6 col-xs-5">
                            {" "}
                            {auth?.first_name || auth?.user?.first_name}{" "}
                            {auth?.last_name || auth?.user?.last_name}
                          </p>
                        </div>
                        <div className="d-flex">
                          <p className="col-md-6 col-xs-5">Pet Name:</p>
                          <p className="col-md-6 col-xs-5">
                            {" "}
                            {Clinic?.paymentData?.appointment_details?.pet_name}
                          </p>
                        </div>
                        <div className="d-flex">
                          <p className="col-md-6 col-xs-5">Pet Age:</p>
                          <p className="col-md-6 col-xs-5">
                            {" "}
                            {Clinic?.paymentData?.appointment_details?.pet_age}
                          </p>
                        </div>
                        {Clinic?.paymentData?.appointment_details?.pet_breed ? (
                          <div className="d-flex">
                            <p className="col-md-6 col-xs-5">Breed Type :</p>
                            <p className="col-md-6 col-xs-5">
                              {" "}
                              {
                                Clinic?.paymentData?.appointment_details
                                  ?.pet_breed
                              }
                            </p>
                          </div>
                        ) : null}
                        <div className="d-flex">
                          <p className="col-md-6 col-xs-5">
                            Medical Description:
                          </p>
                          <p className="col-md-6 col-xs-5">
                            {Clinic?.paymentData?.appointment_details?.service}
                          </p>
                        </div>
                        <div className="d-flex">
                          <p className="col-md-6 col-xs-5">Doctor Name:</p>
                          <p className="col-md-6 col-xs-5">
                            {" "}
                            {Clinic?.paymentData?.appointment_details?.doctor}
                          </p>
                        </div>
                        <div className="d-flex">
                          <p className="col-md-6 col-xs-5">Clinic Name:</p>
                          <p className="col-md-6 col-xs-5">
                            {" "}
                            {Clinic?.paymentData?.clinic_details?.clinic_name}
                          </p>
                        </div>
                        <div className="d-flex">
                          <p className="col-md-6 col-xs-5">Clinic Address:</p>
                          <p className="col-md-6 col-xs-5">
                            {" "}
                            {
                              Clinic?.paymentData?.clinic_details
                                ?.clinic_address_line_1
                            }
                            ,
                            {
                              Clinic?.paymentData?.clinic_details
                                ?.clinic_address_line_2
                            }
                            ,
                            <p className="col-md-6 col-xs-5 pl-0">
                              {" "}
                              {Clinic?.paymentData?.clinic_details?.clinic_city}
                              ,
                              {
                                Clinic?.paymentData?.clinic_details
                                  ?.clinic_state
                              }
                              ,
                              {
                                Clinic?.paymentData?.clinic_details
                                  ?.clinic_pincode
                              }
                            </p>
                          </p>
                        </div>
                        <div className="d-flex">
                          <p className="col-md-6 col-xs-5">Visited Clinic:</p>
                          <p className="col-md-6 col-xs-5">
                            {Clinic?.paymentData?.appointment_details
                              ?.visited === true
                              ? "Yes"
                              : "No"}
                          </p>
                        </div>
                        <div className="d-flex">
                          <p className="col-md-6 col-xs-5">Appointment Date:</p>
                          <p className="col-md-6 col-xs-5">
                            {
                              Clinic?.paymentData?.appointment_details
                                ?.appointment_date
                            }
                          </p>
                        </div>
                        <div className="d-flex">
                          <p className="col-md-6 col-xs-5">Appointment Time:</p>
                          <p className="col-md-6 col-xs-5">
                            {" "}
                            {
                              Clinic?.paymentData?.appointment_details
                                ?.start_time
                            }
                            {/* {Clinic?.paymentData?.appointment_details?.end_time}{" "} */}
                          </p>
                        </div>
                        <div className="d-flex">
                          <p className="col-md-6 col-xs-5">Consultation Fee:</p>
                          <p className="col-md-6 col-xs-5">
                            ₹{" "}
                            <strong>
                              {Clinic?.paymentData?.consultation_fee}
                            </strong>
                          </p>
                        </div>

                        {/* <div className="d-flex">
                          <p className="col-md-6 col-xs-5">Booking Fee:</p>
                          <p className="col-md-6 col-xs-5">
                            ₹ {Clinic?.bookingFee?.Booking_fee}
                          </p>
                        </div> */}

                        {/* <p className="ml-3 my-2 font-weight-bold pl-2">
                          To make convenient yet affordable pet care services a
                          reality, the booking fee is just ₹{""}
                          {Clinic?.bookingFee?.Booking_fee}.
                        </p> */}
                        {/* {!useCoupon && (
                          <div className="d-flex">
                            <p className="col-md-6 col-xs-6 hidden-xs">
                              Coupon code:
                            </p>
                            <h4 className="col-md-6 col-xs-12">
                              <form onSubmit={applyCoupon}>
                                <div class="form-row align-items-center">
                                  <input
                                    type="text"
                                    class="form-control mb-2 ml-2"
                                    id="inlineFormInput"
                                    placeholder="Enter coupon code"
                                    onChange={(e) =>
                                      setcouponcode(e.target.value)
                                    }
                                    style={{ width: "150px" }}
                                  />
                                  <button
                                    type="submit"
                                    class="btn btn-default mb-2"
                                  >
                                    Apply
                                  </button>
                                </div>
                              </form>
                              {couponDetails?.error && (
                                <>
                                  <p className="mandatory">
                                    {couponDetails?.error}
                                  </p>
                                </>
                              )}
                            </h4>
                          </div>
                        )} */}
                        {/* {useCoupon && (
                          <div className="d-flex">
                            <p className="col-md-6 col-xs-5">
                              Coupon Applied(<b>{couponname}</b>){" "}
                            </p>
                            <p className="col-md-6 col-xs-12">
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
                            </p>
                          </div>
                        )} */}

                        {/* <div className="d-flex">
                          <h4 className="col-md-6 col-xs-5">
                            Net Payable Amount:
                          </h4>
                          <h4 className="col-md-6 col-xs-5">₹ {payableamt}</h4>
                        </div> */}

                        <div className="text-right">
                          <button
                            className=" btn btn-default font-weight-bold px-5 py-3 mr-4 ml-3 my-4 "
                            type="submit"
                            onClick={handleBookPayment}
                            style={{
                              background: "#138496",
                              color: "#fff",
                              fontSize: "14px",
                            }}
                          >
                            BOOK NOW
                          </button>{" "}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : null}
          </div>
        )}
      </div>
      <Login
        modal_center={modal}
        setmodal_center={setModal}
        toggle={toggle}
        setCustError={setCustError}
        custError={custError}
      />
      {Clinic?.loading && <Loader />}

      <SessionExpiredAlert modal_center={checkoutModal} />
    </div>
  );
};

export default BookingPayment;

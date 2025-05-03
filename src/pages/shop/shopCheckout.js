import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { Row } from "reactstrap";
import SuccessConfirmationAlert from "../../components/SuccessConfirmationAlert";
import Loader from "../../components/UI/Loader";
import { getLocalStorage, getMid, getWebPayTm } from "../../helpers/utils";
import {
  getAddressById,
  getBillingAddressById,
} from "../../store/UserStore/Address//action";
import {
  addCheckoutPrepaidOrder,
  getCheckoutPrepaidOrder,
  getRewardPoints,
} from "../../store/UserStore/checkout/action";
import { getDeliveryDetails } from "../../store/UserStore/delivery/action";
import {
  addGuestShopPayment,
  getGuestAddressDetails,
  getGuestBillingAddressDetails,
  initiateGuestShopPayment,
} from "../../store/UserStore/Guest/action";
import { resetErrors } from "../../store/UserStore/Login/action";
import { getPersonalDetails } from "../../store/UserStore/Profile/action";
import {
  addCouponDetails,
  removeCouponDetails,
} from "../../store/UserStore/Coupon/action";
import Login from "../Login";

import delete_icon from "../../assets/icons/delete_icon.svg";

const ShopCheckout = () => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const toggle = () => {
    setModal(!modal);
    dispatch(resetErrors());
    setCustError("");
  };

  const couponDetails = useSelector((state) => state.Coupon);

  const [checkoutModal, setCheckoutModal] = useState(false);
  const checkoutToggle = () => setCheckoutModal(!checkoutModal);
  const profileDetails = useSelector((state) => state.Profile);
  const Delivery = useSelector((state) => state.Delivery);
  const Address = useSelector((state) => state.Address);
  const Checkout = useSelector((state) => state.Checkout);
  const Cart = useSelector((state) => state.Cart);
  const guest = useSelector((state) => state.Guest);
  const [payableamt, setpayableamt] = useState();
  const [rewardamt, setrewardamt] = useState();
  const [showpayment, setShowPayment] = useState(false);
  const [useReward, setuseReward] = useState(false);
  const [useCoupon, setuseCoupon] = useState(false);
  const [removeCoupon, setremoveCoupon] = useState(false);
  const [couponamt, setcouponamt] = useState();
  const [couponname, setcouponname] = useState();
  const [couponcode, setcouponcode] = useState();
  const [deliveryFee, setDeliveryFee] = useState();
  const [showRewardCheck, setShowRewardCheck] = useState(true);
  const [showCoupon, setshowCoupon] = useState(true);
  const [showPlaceOrder, setShowPlaceOrder] = useState(true);
  const auth = getLocalStorage("AUTH_DETAILS");
  let [custError, setCustError] = useState("");
  let [checked, setChecked] = useState(false);
  let [disable, setDisable] = useState(false);

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
    if (auth?.user?.role == "pet_owner") {
      dispatch(getAddressById({ data: { id: params.id } }));
      dispatch(
        getBillingAddressById({ data: { id: params.billingaddressid } })
      );
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
      if (params.billingaddressid === params.id)
        dispatch(
          getGuestBillingAddressDetails({
            data: { guest_id: auth?.guest_id, address_use: "shipping" },
          })
        );
      else
        dispatch(
          getGuestBillingAddressDetails({
            data: { guest_id: auth?.guest_id, address_use: "billing" },
          })
        );
      dispatch(getDeliveryDetails());
    }
  }, []);

  useEffect(() => {
    if (
      Delivery?.Delivery?.mode1?.id == history?.location?.state?.deliveryMode
    ) {
      return setDeliveryFee(Delivery?.Delivery?.mode1?.fees);
    } else if (
      Delivery?.Delivery?.mode2?.id == history?.location?.state?.deliveryMode
    ) {
      return setDeliveryFee(Delivery?.Delivery?.mode2?.fees);
    } else if (
      Delivery?.Delivery?.mode3?.id == history?.location?.state?.deliveryMode
    ) {
      return setDeliveryFee(Delivery?.Delivery?.mode3?.fees);
    }
  }, [Delivery?.Delivery]);

  useEffect(() => {
    setpayableamt(Cart?.ShopCart?.order_amount);
    setrewardamt(Checkout?.rewardPoints?.reward_points);
  }, [Cart?.ShopCart, Checkout?.rewardPoints]);

  const handleCheckout = (e) => {
    let data;
    e.preventDefault();
    if (history?.location?.state?.deliveryMode != "select") {
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
          callback: () => {
            setShowPayment(true);
            setShowRewardCheck(false);
            setShowPlaceOrder(false);
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
          callback: () => {
            setShowPayment(true);
            setShowPlaceOrder(false);
          },
        })
      );
    }
  };

  const handlePrePaidPayment = (e) => {
    e.preventDefault();
    makePayment();
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

  const history = useHistory();
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

  useEffect(() => {
    if (auth?.guest_id) {
      if (checked) {
        setDisable(false);
      } else {
        setDisable(true);
      }
    } else {
      setDisable(false);
    }
  }, [checked]);

  const params = useParams();

  const makePayment = () => {
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
        orderId:
          Checkout?.ShopCart?.payment_id || guest?.paymentData?.payment_id,
        token:
          Checkout?.ShopCart?.paytm_token || guest?.paymentData?.paytm_token,
        tokenType: "TXN_TOKEN",
        amount: Checkout?.ShopCart?.amount || guest?.paymentData?.amount,
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
          response["delivery_mode"] = history?.location?.state?.deliveryMode;
          response["address_id"] = params?.id;
          response["billingaddress_id"] = params?.billingaddressid;
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

  return (
    <div className="main-content">
      <div className="text-center">
        {Checkout?.error ==
        "We are facing some technical issue, please try after sometime" ? (
          <p className="font-16 mandatory font-weight-bold">
            {Checkout?.error}
          </p>
        ) : null}
      </div>
      {history?.location?.state?.from !== "address" ? (
        history.push("/cart")
      ) : (
        <div>
          <div className="custom-container progress-bars  pt-60 pb-60">
            <ul className="text-center">
              <li className="line-stage line-stage-active">CART</li>
              <li className="line-stage line-stage-active">SHIPPING</li>
              <li className="line-stage  line-stage-active">CHECKOUT</li>
              <li
                className={`line-stage ${
                  showpayment ? "line-stage-active" : ""
                }`}
              >
                PAYMENT
              </li>
            </ul>

            <Row>
              <div className="col-lg-9 col-md-11 col-sm-11">
                <h3>Review Your Orders</h3>
                <div className=" border-1px">
                  <div className="  pt-10 pl-10  card-pet-cust ">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="ml-4 mt-5 ">
                          <p className="font-weight-bold">Shipping Address</p>

                          <p className="py-1 my-1  pl-0">
                            {Address?.address?.fullname ||
                              guest?.addresses?.fullname}{" "}
                          </p>

                          <p className="py-1 my-1  pl-0">
                            {Address?.address?.address ||
                              guest?.addresses?.address}{" "}
                          </p>
                          <p className="py-1 my-1  pl-0">
                            {Address?.address?.state || guest?.addresses?.state}{" "}
                            {Address?.address?.pin || guest?.addresses?.pin}
                          </p>
                          <p className="py-1 my-1  pl-0">
                            Phone:{" "}
                            {Address?.address?.phone || guest?.addresses?.phone}
                          </p>

                          {/* <p className="">Qty: {item?.quantity}</p> */}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="ml-4 mt-5 ">
                          {params.billingaddressid ? (
                            <>
                              <p className="font-weight-bold">
                                Billing Address
                              </p>

                              <p className="py-1 my-1  pl-0">
                                {Address?.billing_address?.fullname ||
                                  guest?.billing_addresses?.fullname}{" "}
                              </p>

                              <p className="py-1 my-1  pl-0">
                                {Address?.billing_address?.address ||
                                  guest?.billing_addresses?.address}{" "}
                              </p>
                              <p className="py-1 my-1  pl-0">
                                {Address?.billing_address?.state ||
                                  guest?.billing_addresses?.state}{" "}
                                {Address?.billing_address?.pin ||
                                  guest?.billing_addresses?.pin}
                              </p>
                              <p className="py-1 my-1  pl-0">
                                Phone:{" "}
                                {Address?.billing_address?.phone ||
                                  guest?.billing_addresses?.phone}
                              </p>

                              {/* <p className="">Qty: {item?.quantity}</p> */}
                            </>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="content-body">
                  <div className="inner row">
                    <div className="col col-5">
                      {Cart?.ShopCart?.cart?.length &&
                        Cart?.ShopCart?.cart?.map((item) => (
                          <div className=" border-1px">
                            <div className="pb-10  pt-10 pl-10  card-pet-cust ">
                              <div className="d-flex justify-content-between custom-cart-item-flex">
                                <img
                                  src={item?.product_variant?.product_image_1}
                                  width="150px"
                                  className="cust-image-responsive"
                                />
                                <div className="ml-4 mt-5 col-lg-8 custom-checkout-products">
                                  <div className="icon-box-title font-weight-600 mt-2 mb-1 ">
                                    {item.product?.product_name}
                                  </div>
                                  <p
                                    className="py-1 my-1  pl-0"
                                    title={item?.product?.brand_name}
                                  >
                                    {item?.product?.brand_name}
                                  </p>
                                  <span className="seller-data ">
                                    Sold by: {item?.product?.added_by}
                                  </span>

                                  <p className="my-1">
                                    Variant:{" "}
                                    {item?.product_variant?.variant_name}
                                  </p>
                                </div>
                                <div className="product-quantity mt-5 pr-3">
                                  <h5 style={{ fontSize: "16px" }}>
                                    Rs.{(item?.total_price).toFixed(2)}
                                  </h5>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-2 ml-5">
                {showPlaceOrder ? (
                  <div>
                    <button
                      className=" btn btn-default font-weight-bold px-5 py-3   my-4 "
                      type="submit"
                      onClick={handleCheckout}
                      style={{
                        background: "#138496",
                        color: "#fff",
                        fontSize: "14px",
                        // width: "100%",
                      }}
                      disabled={disable}
                      title={`${
                        disable ? "Please accept the Terms of Services" : ""
                      }`}
                    >
                      PLACE YOUR ORDER
                    </button>
                  </div>
                ) : null}

                {Cart?.ShopCart?.order_amount ? (
                  <div>
                    <p className="font-weight-bold mt-5">Order Summary </p>
                    <tr>
                      <td className="pr-2" width={"60%"}>
                        <p>Order Amount: </p>
                      </td>
                      <td width={"40%"}>
                        Rs.{Cart?.ShopCart?.order_amount.toFixed(2)}
                      </td>
                    </tr>
                    <tr>
                      <td className="pr-2">
                        <p>Shipping Fee:</p>
                      </td>
                      <td>
                        <p> Rs.{deliveryFee === undefined ? 0 : deliveryFee}</p>
                      </td>
                    </tr>

                    {Checkout?.rewardPoints?.reward_points &&
                    showRewardCheck ? (
                      <tr>
                        <td>
                          <p>Total Coins :</p>
                        </td>
                        <td>
                          <p>Rs.{Checkout?.rewardPoints?.reward_points}</p>
                        </td>
                      </tr>
                    ) : null}
                    {Checkout?.rewardPoints?.reward_points &&
                    showRewardCheck ? (
                      <tr>
                        <td>
                          <p>Usable Coins :</p>
                        </td>
                        <td>
                          <p>Rs. {Checkout?.rewardPoints?.usable_reward}</p>
                        </td>
                      </tr>
                    ) : null}
                    <tr>
                      <td>
                        {Checkout?.rewardPoints?.usable_reward &&
                        showRewardCheck ? (
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
                        ) : null}
                      </td>
                    </tr>
                    {showCoupon && !useCoupon && !auth?.guest_id && (
                      <tr>
                        <td colSpan={2}>
                          <form onSubmit={applyCoupon}>
                            <div class="form-row align-items-center">
                              <div class="col-xs-6 col-lg-10">
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

                              <div class="col-xs-6 col-lg-2">
                                <button
                                  type="submit"
                                  class="btn btn-default mb-2"
                                >
                                  Apply
                                </button>
                              </div>
                            </div>
                          </form>

                          {couponDetails?.error && (
                            <>
                              <span className="mandatory">
                                {couponDetails?.error}
                              </span>
                            </>
                          )}
                        </td>
                      </tr>
                    )}

                    {useReward && (
                      <tr>
                        <td className="pr-2">
                          <p>Discount :</p>
                        </td>
                        <td>
                          <p> - Rs.{Checkout?.rewardPoints?.usable_reward}</p>
                        </td>
                      </tr>
                    )}
                    {useCoupon && (
                      <tr>
                        <td className="pr-2 ">
                          <p>
                            Coupon Applied(<b>{couponname}</b>) :
                          </p>
                        </td>
                        <td>
                          <p>
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
                        </td>
                      </tr>
                    )}

                    <tr>
                      <td className="pr-2 orange-font">
                        <h4>Total: </h4>
                        <span className="text-dark">(Price incl. of tax)</span>
                      </td>

                      <td className="orange-font">
                        <h4 className="mb-1">
                          Rs.
                          {(
                            payableamt * 1 +
                            (deliveryFee === undefined ? 0 : deliveryFee * 1)
                          ).toFixed(2)}
                        </h4>
                      </td>
                    </tr>
                  </div>
                ) : null}
                {auth?.guest_id && showPlaceOrder ? (
                  <p className="text-left mt-1 mb-2">
                    <input
                      type="checkbox"
                      id="terms"
                      name="terms"
                      value={checked}
                      className="mr-4 reward-check"
                      onChange={(e) => setChecked(e.target.checked)}
                    />
                    I agree to the{" "}
                    <a
                      href="/terms-of-service"
                      className="orange-font"
                      target="_blank"
                    >
                      Terms of Services
                    </a>
                  </p>
                ) : null}
                {showpayment ? (
                  <div className="text-left">
                    <button
                      className=" btn btn-default cust-payment-btn font-weight-bold px-5 py-3   my-4 "
                      type="submit"
                      onClick={handlePrePaidPayment}
                      style={{
                        background: "#138496",
                        color: "#fff",
                        fontSize: "14px",
                        // width: "100%",
                      }}
                    >
                      PAY NOW
                    </button>
                  </div>
                ) : null}
              </div>
            </Row>
          </div>
        </div>
      )}
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

export default ShopCheckout;

import React, { useEffect, useState } from "react";
import productPlaceholder from "../../assets/images/product-placeholder.png";
// import quick from "../../assets/images/user/quick.png";
import quick from "../../assets/images/user/Fa6SolidTruckFast.svg";
// import delivery from "../../assets/images/user/delivery.png";
import delivery from "../../assets/images/user/Fa6SolidTruck.svg";
// import returns from "../../assets/images/user/return.svg";
import returns from "../../assets/images/user/Fa6SolidArrowsRotate.svg";

import { useDispatch, useSelector } from "react-redux";
import {
  checkPincode,
  getUserProductById,
  getUserProductDetails,
  getUserVariantById,
} from "../../store/UserStore/Shop/action";
import { useHistory, useParams } from "react-router";
import { Input, Row } from "reactstrap";
import {
  addCartDetails,
  getCartDetails,
  getGuestCart,
} from "../../store/UserStore/Cart/action";
import { getLocalStorage } from "../../helpers/utils";
import {
  addReviews,
  getLoggedUserReviews,
  getReviews,
} from "../../store/UserStore/Reviews/action";
import StarRating from "../../components/StarRating";
import Loader from "../../components/UI/Loader";
import UserSelectionAlert from "./UserSelection";
import ImageMagnifier from "../../components/ImageMagnifier";
const ProductDetails = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const ShopDetails = useSelector((state) => state.Shop);
  const Reviews = useSelector((state) => state.Reviews);
  const [qty, setQty] = useState(1);
  const [pin, setPin] = useState("");
  const [variant, setVariant] = useState();
  const [modal, setModal] = useState(false);
  const [img, setImg] = useState();
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewDescription, setReviewDescription] = useState("");
  const toggle = () => setModal(!modal);
  const [stars, setStars] = useState([1, 2, 3, 4, 5]);
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [selectedIcon, setSelectedIcon] = useState("★");
  const [deselectedIcon, setDeselectedIcon] = useState("☆");
  const [enableAddReviewForm, setEnableAddReviewForm] = useState(false);
  const [enableAddReviewBtn, setEnableAddReviewBtn] = useState(true);
  const [disableSubmit, setDisableSubmit] = useState(false);
  const [disablePin, setDisablePin] = useState(false);

  const history = useHistory();
  useEffect(() => {
    document.title = ShopDetails?.userProductDetails?.product_name;
  }, [history?.location?.pathname]);

  const changeRating = (newRating) => {
    setRating(newRating);
  };

  const hoverRating = (rating) => {
    setHovered(rating);
  };

  useEffect(() => {
    if (pin?.length != 6) {
      setDisablePin(true);
    } else {
      setDisablePin(false);
    }
  }, [pin]);

  useEffect(() => {
    Reviews?.userReview?.review_title &&
      setReviewTitle(Reviews?.userReview?.review_title);
    Reviews?.userReview?.review_content &&
      setReviewDescription(Reviews?.userReview?.review_content);
    Reviews?.userReview?.review_star_count &&
      setRating(Reviews?.userReview?.review_star_count);
  }, [Reviews?.userReview]);

  // const basicRequest = {
  //   page: 1,
  //   page_count: 9,
  //   keyword: "",
  //   ideal_for: "Dogs",
  //   sort: "popular",
  //   category_name: ShopDetails?.userProductDetails?.category_name,
  // };
  // const [request, setRequest] = useState({ ...basicRequest });
  // useEffect(() => {
  //   request && dispatch(getUserProductDetails({ request: { ...request } }));
  // }, [request]);

  useEffect(() => {
    dispatch(getUserProductById({ data: { pid: params?.id } }));
    dispatch(getUserVariantById({ data: { pid: params?.id } }));
    dispatch(getReviews({ data: { pid: params?.id } }));
  }, []);

  useEffect(() => {
    ShopDetails?.firstVariant && setVariant(ShopDetails?.firstVariant);
  }, [ShopDetails?.firstVariant]);

  useEffect(() => {
    if (rating == 0 || reviewTitle == "" || reviewDescription == "") {
      setDisableSubmit(true);
    } else {
      setDisableSubmit(false);
    }
  }, [rating, reviewTitle, reviewDescription]);

  let auth = getLocalStorage("AUTH_DETAILS");

  const handleAddToCart = () => {
    if (!auth || (auth?.user?.role != "pet_owner" && !auth?.guest_id)) {
      return setModal(true);
    }

    auth?.user?.role == "pet_owner"
      ? dispatch(
          addCartDetails({
            Cart: {
              product_id: params?.id,
              product_variant_id: variant,
              quantity: qty,
            },
            callback: () => {
              dispatch(getCartDetails());
              // setShowPopup(true);
              clientedetail();
            },
          })
        )
      : dispatch(
          addCartDetails({
            Cart: {
              guest_id: auth?.guest_id,
              product_id: params?.id,
              product_variant_id: variant,
              quantity: qty,
            },
            callback: () => {
              dispatch(getGuestCart({ data: { guest_id: auth?.guest_id } }));
              // setShowPopup(true);
              clientedetail();
            },
          })
        );
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    dispatch(
      addReviews({
        reviews: {
          pid: params.id,
          review_title: reviewTitle,
          review_content: reviewDescription,
          review_star_count: rating,
        },
        callback: () => {
          dispatch(getReviews({ data: { pid: params?.id } }));
          setEnableAddReviewForm(false);
          setEnableAddReviewBtn(true);
        },
      })
    );
  };

  const handleReviewEnableClick = () => {
    setEnableAddReviewForm(true);
    setEnableAddReviewBtn(false);
    dispatch(getLoggedUserReviews({ data: { pid: params?.id } }));
  };

  function clientedetail() {
    var el = document.getElementById("guardadoC");
    el.classList.add("animating");
    var listener = el.addEventListener("animationend", function () {
      el.classList.remove("animating");
      el.removeEventListener("animationend", listener);
    });
  }

  const handlePincode = () => {
    dispatch(checkPincode({ data: { pincode: pin } }));
  };

  const handleKeyDown = () => {
    window.addEventListener(
      "keydown",
      function (e) {
        if (["Space", "ArrowUp", "ArrowDown"].indexOf(e.code) > -1) {
          e.preventDefault();
        }
      },
      false
    );
  };

  return (
    <div>
      <section>
        <div className="custom-container mx-5">
          <div className="section-content">
            {ShopDetails?.userProductDetails && ShopDetails?.variant?.price ? (
              <div className="row">
                <div className="product">
                  <div className="col-lg-4 col-md-4 col-sm-6 mb-4">
                    {ShopDetails?.variant?.product_image_1 && (
                      <div className="mt-5" style={{ position: "relative" }}>
                        <ImageMagnifier
                          width={"350px"}
                          style={{
                            width: "350px",
                            height: "auto",
                            margin: "auto",
                            padding: "10px",
                            position: "relative",
                          }}
                          // src="https://img0.junaroad.com/uiproducts/15020374/zoom_0-1523095717.jpg"
                          src={
                            img ? img : ShopDetails?.variant?.product_image_1
                          }
                        />
                      </div>
                      // <div className="mt-5">
                      //   <img
                      //     className="col-lg-10"
                      //     src={`${
                      //       img ? img : ShopDetails?.variant?.product_image_1
                      //     }`}
                      //     alt=""
                      //   />
                      // </div>
                    )}

                    <div
                      style={{
                        verticalAlign: "middle",
                        textAlign: "center",
                      }}
                    >
                      {ShopDetails?.variant?.product_image_1 && (
                        <img
                          style={{
                            border: "ridge",
                            height: "100px",
                            objectFit: "contain",
                          }}
                          className="mt-15 p-10 cursor-pointer"
                          src={ShopDetails?.variant?.product_image_1}
                          width="80px"
                          onClick={() =>
                            setImg(ShopDetails?.variant?.product_image_1)
                          }
                        />
                      )}
                      {ShopDetails?.variant?.product_image_2 && (
                        <img
                          src={ShopDetails?.variant?.product_image_2}
                          width="80px"
                          style={{
                            border: "ridge",
                            height: "100px",
                            objectFit: "contain",
                          }}
                          className="mt-15 ml-3 p-10 cursor-pointer"
                          onClick={() =>
                            setImg(ShopDetails?.variant?.product_image_2)
                          }
                        />
                      )}
                      {ShopDetails?.variant?.product_image_3 && (
                        <img
                          src={ShopDetails?.variant?.product_image_3}
                          width="80px"
                          style={{
                            border: "ridge",
                            height: "100px",
                            objectFit: "contain",
                          }}
                          className="mt-15 ml-3 p-10 cursor-pointer"
                          onClick={() =>
                            setImg(ShopDetails?.variant?.product_image_3)
                          }
                        />
                      )}
                      {ShopDetails?.variant?.product_image_4 && (
                        <img
                          src={ShopDetails?.variant?.product_image_4}
                          width="80px"
                          style={{
                            border: "ridge",
                            height: "100px",
                            objectFit: "contain",
                          }}
                          className="mt-15 ml-3 p-10 cursor-pointer"
                          onClick={() =>
                            setImg(ShopDetails?.variant?.product_image_4)
                          }
                        />
                      )}
                      {ShopDetails?.variant?.product_image_5 && (
                        <img
                          src={ShopDetails?.variant?.product_image_5}
                          width="80px"
                          style={{
                            border: "ridge",
                            height: "100px",
                            objectFit: "contain",
                          }}
                          className="mt-15 ml-3 p-10 cursor-pointer"
                          onClick={() =>
                            setImg(ShopDetails?.variant?.product_image_5)
                          }
                        />
                      )}
                    </div>
                    <div
                      style={{
                        verticalAlign: "middle",
                        textAlign: "center",
                      }}
                    >
                      <h4 className="pt-10 pl-15">
                        {ShopDetails?.userProductDetails?.added_by}
                      </h4>
                    </div>
                  </div>
                  <div className="col-lg-8 col-md-6 col-sm-6">
                    <div className="product-summary">
                      <h3 className="product-title pt-4">
                        {ShopDetails?.userProductDetails?.product_name}
                      </h3>
                      <div className="product_review">
                        <ul className="review_text list-inline">
                          {Reviews.reviewData.average_rating == 0 ? null : (
                            <li className=" rating-btn">
                              {Reviews.reviewData.average_rating}{" "}
                              <i className="fa fa-star"></i>
                            </li>
                          )}
                          <li>
                            <a
                              href="#reviews"
                              className="text-muted "
                              style={{ fontSize: "14px" }}
                            >
                              {!Reviews?.loading && Reviews?.reviewData
                                ? Reviews?.reviewData?.reviews?.length
                                  ? Reviews?.reviewData?.reviews?.length == 1
                                    ? "1 Review"
                                    : `${Reviews?.reviewData?.reviews?.length} Reviews`
                                  : "No Reviews"
                                : null}
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <ul>
                          <h4 className="font-18 mt-4 mb-3">Features</h4>
                          {ShopDetails?.userProductDetails?.product_info
                            ?.features?.length
                            ? ShopDetails?.userProductDetails?.product_info?.features?.map(
                                (feature) => (
                                  <li className="mt-3 mb-3">
                                    {feature?.description}
                                  </li>
                                )
                              )
                            : null}
                        </ul>
                      </div>
                      <div className="cart-form-wrapper mt-20">
                        <table className="table variations no-border">
                          <tbody>
                            <tr>
                              <div className="number ">
                                <span
                                  className="btn pl-0"
                                  onClick={() => {
                                    qty == 1 ? setQty(qty) : setQty(qty - 1);
                                  }}
                                  style={{ fontSize: "20px" }}
                                >
                                  -
                                </span>
                                <input
                                  className="add-qty"
                                  type="text"
                                  value={qty}
                                  onChange={(e) => setQty(e.target.value)}
                                  disabled={true}
                                />
                                <span
                                  className="btn"
                                  onClick={() => {
                                    qty == 30 ? setQty(qty) : setQty(qty + 1);
                                  }}
                                  style={{ fontSize: "20px" }}
                                >
                                  +
                                </span>
                              </div>
                            </tr>
                          </tbody>
                        </table>
                        <div className="mt-5 custom-variant-container">
                          {ShopDetails?.userProductDetails?.variants?.length &&
                            ShopDetails?.userProductDetails?.variants?.map(
                              (variant) => (
                                <button
                                  title={
                                    parseInt(variant?.stock) == 0
                                      ? "Out of stock"
                                      : variant?.variant_name
                                  }
                                  className={`btn variant-btn ${
                                    variant?.variant_name ==
                                    ShopDetails?.variant?.variant_name
                                      ? "variant-active"
                                      : "variant-inactive"
                                  }`}
                                  onClick={() => {
                                    setVariant(variant?.product_variant_id);
                                    dispatch(
                                      getUserVariantById({
                                        data: {
                                          pvid: variant?.product_variant_id,
                                        },
                                      })
                                    );
                                  }}
                                  disabled={
                                    parseInt(variant?.stock) == 0 ? true : false
                                  }
                                >
                                  {variant?.variant_name}
                                </button>
                              )
                            )}
                        </div>
                      </div>

                      <div className="shop-price-container">
                        <div className="price custom-price mt-4">
                          {/* {
                            ShopDetails?.variant?.dispaly_discount_percentage >
                            0 ?
                          <span
                            className="mb-5"
                            style={{ display: "block", color: "#00419D" }}
                          >
                            special price
                          </span>
:null                          } */}
                          <ins className="ml-0">
                            <span
                              style={{
                                fontSize: "38px",
                                color: "#212121",
                                lineHeight: "2rem",
                                fontWeight: "500",
                              }}
                            >
                              <span className="ml-0">₹</span>&nbsp;
                              {ShopDetails?.variant
                                ?.dispaly_discount_percentage > 0
                                ? (ShopDetails?.variant?.discounted_price).toFixed(
                                    2
                                  )
                                : (ShopDetails?.variant?.price).toFixed(2)}
                            </span>
                          </ins>{" "}
                          {ShopDetails?.variant?.dispaly_discount_percentage >
                            0 && (
                            <del className="ml-3">
                              <span className="amount font-16">
                                ₹{ShopDetails?.variant?.non_discount_price}
                              </span>
                            </del>
                          )}
                          {ShopDetails?.variant?.dispaly_discount_percentage >
                            0 && (
                            <span className="text-success font-weight-bold h4 ml-2">
                              {
                                ShopDetails?.variant
                                  ?.dispaly_discount_percentage
                              }
                              % off
                            </span>
                          )}
                          <div className="fast-delivery">
                            {!ShopDetails?.variant?.delivery_in_24 ? (
                              <h5 className="orange-font   mt-3">
                                Fast Delivery Available
                              </h5>
                            ) : null}
                          </div>
                        </div>

                        <div className="custom-add-to-cart">
                          <div>
                            <button
                              className=" btn btn-default font-weight-bold px-5 py-3 mr-4 ml-0"
                              type="submit"
                              onClick={handleAddToCart}
                              style={{
                                background: "#FF670F",
                                color: "#fff",
                                fontSize: "15px",
                              }}
                            >
                              ADD TO CART
                            </button>
                          </div>
                          <h5
                            className={`mb-4 ml-0 ${
                              ShopDetails?.variant?.delivery_in_24
                                ? "mt-3"
                                : "mt-2"
                            } mt-0 orange-font `}
                          >
                            Usually Delivered in{" "}
                            {ShopDetails?.variant?.delivery_in_72
                              ? `${3}`
                              : null}
                            {ShopDetails?.variant?.custom_delivery_days} days
                          </h5>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-3">
                        <div className="ibtBU6 _3t6eWY">
                          <input
                            placeholder="Enter delivery pincode"
                            type="text"
                            pattern="\d*"
                            maxlength="6"
                            autocomplete="off"
                            className="cfnctZ"
                            value={pin}
                            onChange={(e) => setPin(e.target.value)}
                            style={{ fontSize: "15.5px" }}
                            onKeyDown={handleKeyDown}
                          />
                          <button
                            className={`UgLoKg pull-right ${
                              disablePin ? " jlIjY-" : ""
                            }`}
                            onClick={handlePincode}
                            disabled={disablePin}
                          >
                            Check
                          </button>
                        </div>
                      </div>
                      <div className="col-md-6">
                        {ShopDetails.pincodeData?.message && (
                          <p className="orange-font font-weight-bold">
                            {ShopDetails.pincodeData?.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className=" offer-zone pt-3">
                      <div className="mx-5 ml-sm-0 ">
                        <img
                          src={delivery}
                          width="40px"
                          className="delivery-img"
                        />
                        <h5 className="icon-box-title orange-font   ">
                          Normal Delivery
                        </h5>
                      </div>
                      <div className="mx-5 ml-sm-0 ">
                        <img
                          src={quick}
                          width="40px"
                          className=" delivery-img"
                        />
                        <h5 className="icon-box-title orange-font  ">
                          Quick Delivery
                        </h5>
                      </div>
                      <div className="ml-70 ml-sm-0 exchange-offer">
                        <img
                          src={returns}
                          width="32px"
                          className="delivery-img "
                        />
                        <h5 className="icon-box-title orange-font  ">
                          Exchange or Returns
                        </h5>
                      </div>
                    </div>

                    {/* <div className="col-lg-2 px-0 d-flex">
                      <input
                        className="form-control "
                        placeholder="Enter p
                        -incode"
                        type="number"
                      />
                    </div>
                    <a className=" ml-2 my-4 orange-font font-weight-bold">
                      Submit
                    </a> */}
                  </div>
                  <div className=" col-lg-10 col-md-12 col-sm-12 ml-5">
                    <div>
                      <div>
                        <div>
                          <h3 className="mt-60 mb-5">Product Info </h3>
                          <p>
                            {
                              ShopDetails?.userProductDetails
                                ?.product_description
                            }
                          </p>
                        </div>
                        <div>
                          <h3 className="mb-5 ml-0">Specifications</h3>
                          <table className="table">
                            <tbody>
                              <tr>
                                <th>Brand</th>
                                <td>
                                  <p>
                                    {
                                      ShopDetails?.userProductDetails
                                        ?.brand_name
                                    }
                                  </p>
                                </td>
                              </tr>
                              <tr>
                                <th>Variant</th>
                                <td>
                                  <p>{ShopDetails?.variant?.variant_name}</p>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <div id="reviews">
                          <h3>Reviews</h3>
                          <ul>
                            <li>
                              <div>
                                {Reviews?.reviewData?.reviews?.length ? (
                                  Reviews?.reviewData?.reviews?.map(
                                    (review) => (
                                      <div className="">
                                        <ul className="review_text list-inline mt-5">
                                          <li className="d-flex justify-content-between">
                                            <div className="d-flex  responsive-review-container">
                                              <li className=" rating-btn  pro-btn">
                                                {review?.review_star_count}{" "}
                                                <i className="fa fa-star"></i>
                                              </li>
                                              <span className=" font-weight-bold mt-1 ml-0 font-17">
                                                {review?.review_title}
                                              </span>{" "}
                                            </div>
                                            <p className="text-muted text-right font-15">
                                              {review?.time_created?.slice(5)}
                                            </p>
                                          </li>
                                          <li className="mt-3  ml-2">
                                            <span className="ml-0 font-16">
                                              {review?.review_content}
                                            </span>{" "}
                                            <div className="d-flex justify-content-between mt-3 font-16">
                                              <p className="text-muted d-flex">
                                                {review?.certified_user ? (
                                                  <div className="font-15">
                                                    <i class="fas fa-check-circle"></i>{" "}
                                                    <span className="ml-1 mr-1">
                                                      Certified Buyer,
                                                    </span>{" "}
                                                  </div>
                                                ) : null}
                                                <p className="font-15">
                                                  {review?.user}
                                                </p>
                                              </p>
                                            </div>
                                          </li>
                                        </ul>
                                      </div>
                                    )
                                  )
                                ) : (
                                  <p className="ml-3 mt-3">No Reviews</p>
                                )}
                              </div>
                            </li>
                            {auth &&
                            auth?.user?.role == "pet_owner" &&
                            enableAddReviewBtn ? (
                              <button
                                className=" btn btn-default font-weight-bold px-5 py-3 mr-4  my-4 "
                                type="submit"
                                onClick={handleReviewEnableClick}
                                style={{
                                  background: "#138496",
                                  color: "#fff",
                                  fontSize: "13px",
                                }}
                              >
                                ADD REVIEW
                              </button>
                            ) : null}

                            {enableAddReviewForm ? (
                              <div className="mt-5">
                                <span>Rate the Product</span>

                                <StarRating
                                  stars={stars}
                                  rating={rating}
                                  hovered={hovered}
                                  deselectedIcon={deselectedIcon}
                                  selectedIcon={selectedIcon}
                                  changeRating={changeRating}
                                  hoverRating={hoverRating}
                                />
                                <div className="mt-4">
                                  <Input
                                    className="mb-3"
                                    type="text"
                                    placeholder="Enter title"
                                    value={reviewTitle}
                                    onChange={(e) =>
                                      setReviewTitle(e.target.value)
                                    }
                                  />
                                  <Input
                                    className="mb-3"
                                    type="textarea"
                                    rows="8"
                                    placeholder="Enter Content"
                                    value={reviewDescription}
                                    onChange={(e) =>
                                      setReviewDescription(e.target.value)
                                    }
                                  />
                                </div>
                                <button
                                  className=" btn btn-default font-weight-bold px-5 py-3 mr-4 ml-3 my-4 "
                                  type="submit"
                                  onClick={handleAddReview}
                                  style={{
                                    background: "#138496",
                                    color: "#fff",
                                    fontSize: "13px",
                                  }}
                                  disabled={disableSubmit}
                                >
                                  Submit
                                </button>
                                <button
                                  className=" btn btn-default font-weight-bold px-5 py-3 mr-4 ml-3 my-4 "
                                  type="submit"
                                  onClick={() => {
                                    setEnableAddReviewForm(false);
                                    setEnableAddReviewBtn(true);
                                    setReviewDescription("");
                                    setReviewTitle("");
                                    setRating(0);
                                  }}
                                  style={{
                                    background: "#138496",
                                    color: "#fff",
                                    fontSize: "13px",
                                  }}
                                >
                                  Cancel
                                </button>
                              </div>
                            ) : null}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <h3 className="mb-5 ml-3 pl-1">Related Products</h3>
                <div className=" common-container products">
                  <div className="row multi-row-clearfix ">
                    {ShopDetails?.userProductDetails?.related_products?.length
                      ? ShopDetails?.userProductDetails?.related_products
                          // ?.slice(0.6)
                          ?.map((product, i) =>
                            product?.product_id == params?.id ? null : (
                              <div className=" col-sm-4 col-md-4 col-lg-3 mb-30 col-xs-6 pl-0">
                                <a
                                  href={`/product/${product?.product_id}`}
                                  style={{ textDecoration: "none" }}
                                >
                                  <div className="product col-lg-7">
                                    <div className="product-thumb product-img">
                                      <img
                                        alt
                                        src={
                                          product?.variants[0]?.product_image_1
                                            ? product?.variants[0]
                                                ?.product_image_1
                                            : productPlaceholder
                                        }
                                        style={{
                                          height: "100%",
                                          width: "100%",
                                          objectFit: "contain",
                                        }}
                                        className="img-responsive img-fullwidth product-hover  cust-size"
                                      />
                                      <div className="overlay" />
                                    </div>
                                    <div className="product-details ml-4 ">
                                      <h5 className="product-brand text-dark">
                                        {/* {product?.product_name?.slice(0, 23)} */}
                                        {product?.product_name}
                                      </h5>
                                      <h6 className="text-dark">
                                        {product?.brand_name}
                                      </h6>
                                      {product?.variants?.length &&
                                        product?.variants
                                          ?.slice(0, 1)
                                          ?.map((variant) => (
                                            <>
                                              <div className="price ml-0">
                                                <span className="amount text-dark font-weight-bold ml-0">
                                                  Rs.{variant?.price}
                                                </span>
                                                <del className="ml-3">
                                                  <span className="amount">
                                                    Rs.{variant?.price * 2}
                                                  </span>
                                                </del>
                                              </div>
                                              <span className=" orange-font">
                                                {variant?.dispaly_discount_percentage >
                                                0 ? (
                                                  <span className=" orange-font">
                                                    (
                                                    {
                                                      variant?.dispaly_discount_percentage
                                                    }
                                                    % OFF)
                                                  </span>
                                                ) : null}{" "}
                                              </span>
                                            </>
                                          ))}
                                    </div>
                                  </div>
                                </a>
                              </div>
                            )
                          )
                      : null}
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ height: "100vh" }}></div>
            )}
          </div>
        </div>
      </section>
      <UserSelectionAlert
        modal_center={modal}
        setmodal_center={setModal}
        toggle={toggle}
        backbuttonTitle="Back To Product Section"
        productId={params?.id}
        product_variant_id={variant}
        quantity={qty}
        clientedetail={clientedetail}
        guest_id={auth?.guest_id}
      />

      <div id="guardadoC" className="shop-popup  d-flex ">
        <p className=" mr-5 mt-2">Item Added To Cart</p>
        <a className="btn shop-popup-bn mr-2 " href="/cart">
          <u>Go To Cart</u>
        </a>
      </div>
      {ShopDetails?.loading && <Loader />}
    </div>
  );
};

export default ProductDetails;

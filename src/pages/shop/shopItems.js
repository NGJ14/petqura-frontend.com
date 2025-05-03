import React, { useEffect, useState } from "react";
import ShopPagination from "../../components/ShopPagination";
import productPlaceholder from "../../assets/images/product-placeholder.png";
// import cart from "../../assets/images/icons8-buy.gif";
import cart from "../../assets/images/cartIcon.png";

import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductBrands,
  getUserProductCategoryDetails,
  getUserProductDetails,
} from "../../store/UserStore/Shop/action";

import { getLocalStorage } from "../../helpers/utils";
import {
  addCartDetails,
  getCartDetails,
  getGuestCart,
} from "../../store/UserStore/Cart/action";
import UserSelectionAlert from "./UserSelection";

import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import StoreBanner from "./store-banner";
import { config } from "../../config/config";

// <a target="_blank" href="https://icons8.com/icon/5oZaluNJrRzV/shopping-cart">Shopping Cart</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>

const ShopItems = () => {
  const [sidebar, setSidebar] = useState(true);
  const dispatch = useDispatch();
  const [bfilter, setbfilter] = useState([]);
  const [filter, setfilter] = useState([]);
  const [index, setIndex] = useState(0);
  const [discountedPrice, setDiscountedPrice] = useState(0);
  const [nondiscountedPrice, setNonDiscountedPrice] = useState(0);
  const [discountpercentage, setDiscountPercentage] = useState(0);
  const [productIndex, setProductIndex] = useState(0);
  const [productvariantIndex, setProductVariantIndex] = useState(0);
  const [productIdtoCart, setProductIdtoCart] = useState("");
  const [productVariantIdtoCart, setProductVariantIdtoCart] = useState("");
  const showSidebar = () => setSidebar(!sidebar);
  const shopContent = useSelector((state) => state.Shop);
  const basicRequest = {
    page: 1,
    page_count: 12,
    keyword: "",
    ideal_for: "Dogs",
    sort: "popular",
  };

  const [request, setRequest] = useState({ ...basicRequest });
  const toggle = () => {
    setModal(!modal);
  };
  const [modal, setModal] = useState(false);

  let auth = getLocalStorage("AUTH_DETAILS");

  const handleAddToCart = (
    productId,
    productVariantId,
    loopindex,
    featureselectedon
  ) => {
    console.log("clicked");
    let variant_x = "";
    setProductIdtoCart(productId);
    if (loopindex === featureselectedon) {
      variant_x = productVariantIdtoCart;
    } else {
      variant_x = productVariantId;
    }
    setProductVariantIdtoCart(variant_x);

    if (!auth || (auth?.user?.role !== "pet_owner" && !auth?.guest_id)) {
      return setModal(true);
    }

    auth?.user?.role === "pet_owner"
      ? dispatch(
          addCartDetails({
            Cart: {
              product_id: productId,
              product_variant_id: variant_x,
              quantity: 1,
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
              product_id: productId,
              product_variant_id: variant_x,
              quantity: 1,
            },
            callback: () => {
              dispatch(getGuestCart({ data: { guest_id: auth?.guest_id } }));
              // setShowPopup(true);
              clientedetail();
            },
          })
        );
  };

  const selectedfeature = (variant, PVindex, i) => {
    setDiscountedPrice(variant?.discounted_price);
    setNonDiscountedPrice(variant?.non_discount_price);
    setDiscountPercentage(variant?.dispaly_discount_percentage);
    setProductIndex(i);
    setProductVariantIndex(PVindex);
    setProductVariantIdtoCart(variant?.product_variant_id);
  };

  function clientedetail() {
    var el = document.getElementById("guardadoC");
    el.classList.add("animating");
    var listener = el.addEventListener("animationend", function () {
      el.classList.remove("animating");
      el.removeEventListener("animationend", listener);
    });
  }

  useEffect(() => {
    request && dispatch(getUserProductDetails({ request: { ...request } }));
  }, [request]);

  useEffect(() => {
    dispatch(getUserProductCategoryDetails({ data: { ideal_for: "" } }));
  }, []);

  const PetType = [
    { id: "1", value: "Dogs" },
    { id: "2", value: "Cats" },
    { id: "3", value: "Birds" },
    { id: "4", value: "Fish & Aquatics" },
    { id: "5", value: "Small Pets" },
  ];

  const [searchText, setSearchText] = useState("");

  const handleSearchClick = (e) => {
    e.preventDefault();
    setRequest({ ...request, keyword: searchText, page: 1 });
  };

  const handleStarRatingClick = (e) => {
    if (e.target.value == "lth") {
      setRequest({ ...request, sort: "price", sort_order: e.target.value });
    } else if (e.target.value == "htl") {
      setRequest({ ...request, sort: "price", sort_order: e.target.value });
    } else if (e.target.value == "newest") {
      delete request["sort_order"];
      setRequest({ ...request, sort: "newest" });
    } else {
      delete request["sort_order"];
      setRequest({ ...request, sort: "popular" });
    }
  };

  const addtoCartTooltip = (props) => (
    <Tooltip className="mytooltip" {...props}>
      Add to Cart
    </Tooltip>
  );

  useEffect(() => {
    dispatch(getProductBrands({ request: request }));
  }, []);

  return (
    <>
      <section className="main-content storePage">
        <StoreBanner />
        <div className="common-container">
          <div className="section-content">
            <div className="row ">
              <span className="font-weight-bold ml-4  mb-5 filter-inner-modal-btn cursor-pointer">
                <div className="filterText">
                  <span className="filtericon">
                    <img
                      src={`${config.S3imgHostUrl}/frontend-assets/icons/filterIcon.png`}
                      alt="Filter Icon"
                    />
                  </span>
                  FILTERS
                </div>

                {/* <i className="fas fa-filter ml-2 "></i> 
                {sidebar &&
                <span className="hideIcon" onClick={() => showSidebar()}>Hide
                  <img src={`${config.S3imgHostUrl}/frontend-assets/icons/crossIcon.png`} alt="Hide Icon"/>
                </span>
                }
                */}
              </span>
              <div className="responsive-filter">
                {sidebar ? (
                  <Sidebar
                    categories={shopContent?.productCategories?.categories}
                    request={request}
                    setRequest={setRequest}
                    brands={shopContent?.productBrands?.brands}
                    filter={filter}
                    setfilter={setfilter}
                    bfilter={bfilter}
                    setbfilter={setbfilter}
                  />
                ) : null}
                {/* <div className="ml-2"> */}
                <div className="flex">
                  {PetType?.map((pet, i) => (
                    <button
                      className={`btn mt-3 pet-type-btn ${
                        index == i ? "orange-font" : ""
                      }`}
                      value={pet.value}
                      key={pet.id}
                      onClick={(e) => {
                        setIndex(i);
                        e.preventDefault();
                        dispatch(
                          getUserProductCategoryDetails({
                            data: {
                              ideal_for: pet?.value,
                            },
                          })
                        );
                        dispatch(
                          getProductBrands({
                            request: { ...request, ideal_for: pet?.value },
                          })
                        );
                        delete request?.brand_filter;
                        delete request?.category_filter;
                        delete request?.veg_filter;
                        setfilter([]);
                        setbfilter([]);
                        setRequest({
                          ...request,
                          ideal_for: pet?.value,
                          page: 1,
                          keyword: searchText,
                        });
                      }}
                    >
                      {pet?.value}
                    </button>
                  ))}
                </div>
              </div>
              <div className="search-form ">
                <div className="search-filter-container">
                  <div className="col-lg-6 col-sm-12 col-md-12 ">
                    <form onSubmit={handleSearchClick}>
                      {/* <div className="SearchWrapper d-flex">
                    <input
                      type="text"
                      placeholder="Search"
                      onChange={(e) => setSearchText(e.target.value)}
                      value={searchText}
                      className="form-control tableSearchField"
                    />
                    <button
                      className="orange-background text-white"
                      style={{
                        backgroundColor: "white",
                        borderRight: "none",
                        borderLeft: "none",
                        borderTopWidth: "1px",
                        borderTopColor: "#CED4DA",
                        borderBottomColor: "#ffffff",
                        borderBottomWidth: "1px",
                        marginLeft: "-26px",
                      }}
                    >
                      <i className="fa fa-search" aria-hidden="true"></i>
                    </button>
                  </div> */}

                      <div className="input-group w-100">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search"
                          aria-label="Search"
                          aria-describedby="Search"
                          onChange={(e) => setSearchText(e.target.value)}
                          value={searchText}
                          // style={{
                          //   borderColor: "#00419D",
                          // }}
                        />
                        <div className="input-group-append">
                          <button
                            className="input-group-text"
                            id="basic-addon2"
                            style={{
                              color: "#00419D",
                              // borderTopRightRadius: "8px",
                              // borderBottomRightRadius: "8px",
                              cursor: "pointer",
                              // borderColor: "#00419D",
                              background: "#f2f2f2",
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-search"
                              viewBox="0 0 16 16"
                            >
                              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="col-lg-3 col-sm-5 col-md-6 shop-selection cust-display">
                    <select
                      id="sort"
                      className="shop-select form-control"
                      onChange={(e) => handleStarRatingClick(e)}
                    >
                      <option value="popular">Popularity</option>
                      <option value="newest">Newest First</option>
                      <option value="lth">Price low to high</option>
                      <option value="htl">Price high to low </option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="col-md-8 mt-5 col-lg-9 col-sm-12 ">
                <div className="products" style={{ position: "relative" }}>
                  <div className="row multi-row-clearfix">
                    {shopContent?.userProduct?.products?.length
                      ? shopContent?.userProduct?.products?.map(
                          (product, i) => (
                            // product?.variants?.length &&
                            // product?.variants?.map((variant) =>
                            <div className="col-sm-4 col-md-4 col-lg-4 col-xs-6 blockPadding">
                              <div className="product">
                                {/* {i == 2 && (
                                <span className="tag-sale">Trending!</span>
                              )} */}
                                <a
                                  href={`/product/${product?.product_id}`}
                                  style={{ textDecoration: "none" }}
                                >
                                  <div className="product-thumb product-img">
                                    <img
                                      style={{
                                        height: "100%",
                                        width: "100%",
                                        objectFit: "contain",
                                      }}
                                      alt
                                      src={
                                        product?.variants[0]?.product_image_1
                                          ? product?.variants[0]
                                              ?.product_image_1
                                          : productPlaceholder
                                      }
                                      className="img-responsive img-fullwidth product-hover  cust-size"
                                    />
                                    <div className="overlay" />
                                  </div>
                                </a>
                                <div className="product-details pr-lg-10 pl-lg-10">
                                  <a
                                    href={`/product/${product?.product_id}`}
                                    style={{ textDecoration: "none" }}
                                  >
                                    <h4 className="product-name">
                                      {product?.product_name?.slice(0, 75)}
                                    </h4>
                                  </a>
                                  {/*  <h5 className="text-dark">
                                    {product?.brand_name}
                                  </h5>
                                 */}
                                  <div className="row">
                                    <div className="col-sm-9 col-lg-12 col-xs-12 noRelative">
                                      {Array.isArray(product?.variants) &&
                                        product.variants.map(
                                          (variant, PVindex) => (
                                            <React.Fragment key={PVindex}>
                                              {PVindex === 0 ? (
                                                <>
                                                  <div className="price">
                                                    <span className="amount text-black font-weight-bold ml-0">
                                                      Rs.&nbsp;
                                                      {discountpercentage > 0 &&
                                                      productIndex === i
                                                        ? discountedPrice.toFixed(
                                                            2
                                                          )
                                                        : variant?.dispaly_discount_percentage >
                                                          0
                                                        ? (variant?.discounted_price).toFixed(
                                                            2
                                                          )
                                                        : variant?.price.toFixed(
                                                            2
                                                          )}
                                                    </span>
                                                    {/* {discountpercentage > 0 &&
                                                    productIndex == i ? (
                                                      <del className="ml-3 price-custom">
                                                        <span className="amount">
                                                          Rs.&nbsp;
                                                          {nondiscountedPrice.toFixed(
                                                            2
                                                          )}
                                                        </span>
                                                      </del>
                                                    ) : variant?.dispaly_discount_percentage >
                                                      0 ? (
                                                      <del className="ml-3 price-custom">
                                                        <span className="amount">
                                                          Rs.&nbsp;
                                                          {variant?.non_discount_price.toFixed(
                                                            2
                                                          )}
                                                        </span>
                                                      </del>
                                                    ) : null} */}
                                                  </div>
                                                  {/* {discountpercentage > 0 &&
                                                  productIndex == i ? (
                                                    <span className=" text-success font-weight-bold ml-0 mt-2">
                                                      <div>
                                                        {discountpercentage}%{" "}
                                                        <br />
                                                        ON
                                                      </div>
                                                    </span>
                                                  ) : variant?.dispaly_discount_percentage >
                                                    0 ? (
                                                    <span className=" text-success font-weight-bold ml-0 mt-2">
                                                      <div>
                                                        {
                                                          variant?.dispaly_discount_percentage
                                                        }
                                                        % <br /> OFF
                                                      </div>
                                                    </span>
                                                  ) : null} */}
                                                </>
                                              ) : (
                                                ""
                                              )}
                                              <span
                                                className="badge badge-pill text-black p-3 m-2 badge-pawwalker custtt"
                                                style={{
                                                  fontSize: "14px",
                                                  cursor: "pointer",
                                                  marginLeft: "0px",
                                                  background: "#E9E6E6",
                                                }}
                                                onClick={(e) => {
                                                  e.preventDefault();
                                                  selectedfeature(
                                                    variant,
                                                    PVindex,
                                                    i
                                                  );
                                                }}
                                              >
                                                {variant?.variant_name}
                                              </span>
                                            </React.Fragment>
                                          )
                                        )}
                                    </div>
                                    <div className=""></div>
                                    {/* <div className="col-sm-3 col-md-3  hidden-xs cartWrapper" */}
                                    <div
                                      className="col-sm-3 col-md-3 cartWrapper"
                                      onClick={() => {
                                        handleAddToCart(
                                          product?.product_id,
                                          product?.variants[0]
                                            .product_variant_id,
                                          i,
                                          productIndex
                                        );
                                      }}
                                    >
                                      {/* <OverlayTrigger
                                        placement="top"
                                        overlay={addtoCartTooltip}
                                      >
                                        <img
                                          id="tooltip"
                                          src={cart}
                                          style={{
                                            cursor: "pointer",
                                            width: "25px",
                                          }}
                                        />
                                      </OverlayTrigger> */}
                                      <span>Add to Cart</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {/* Below Cart Image to isplay only in mobile devices */}
                              {/* <div className="cart  visible-xs">*/}
                              <div className="cart hidden-xs">
                                <OverlayTrigger
                                  placement="top"
                                  overlay={addtoCartTooltip}
                                >
                                  <img
                                    id="tooltip"
                                    onClick={() => {
                                      handleAddToCart(
                                        product?.product_id,
                                        product?.variants[0].product_variant_id,
                                        i,
                                        productIndex
                                      );
                                    }}
                                    src={cart}
                                    style={{
                                      cursor: "pointer",
                                      width: "25px",
                                      right: "0",
                                      bottom: "0",
                                      position: "absolute",
                                    }}
                                  />
                                </OverlayTrigger>
                              </div>
                            </div>
                          )
                        )
                      : null}
                  </div>
                  <div className="row mb-5">
                    <div className="col-md-12">
                      {shopContent?.userProduct?.products?.length ? (
                        <ShopPagination
                          totalRecords={shopContent?.userProduct?.total}
                          loading={shopContent?.loading}
                          setRequest={setRequest}
                          request={request}
                        />
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="storeAddSectn">
          <img
            src={`${config.S3imgHostUrl}/frontend-assets/storeAddImg.png`}
            alt="Image"
          />
        </div>

        {/* {shopContent?.loading && <Loader pleasewait />} */}

        {/* 
      <FilterNavbar
        sidebar={sidebar}
        showSidebar={showSidebar}
        request={request}
        setRequest={setRequest}
        PetType={PetType}
        categories={shopContent?.productCategories?.categories}
        index={index}
        setIndex={setIndex}
      /> */}
      </section>
      <UserSelectionAlert
        modal_center={modal}
        setmodal_center={setModal}
        toggle={toggle}
        backbuttonTitle="Back To Product Section"
        productId={productIdtoCart}
        product_variant_id={productVariantIdtoCart}
        quantity={1}
        clientedetail={clientedetail}
        guest_id={auth?.guest_id}
      />
      <div id="guardadoC" className="shop-popup  d-flex ">
        <p className=" mr-5 mt-2">Item Added To Cart</p>
        <a className="btn shop-popup-bn mr-2 " href="/cart">
          <u>Go To Cart</u>
        </a>
      </div>
    </>
  );
};

export default ShopItems;

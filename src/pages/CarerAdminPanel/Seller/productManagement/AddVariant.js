import React, { useEffect, useState } from "react";
import { Col, Card, Row, UncontrolledAlert, Input } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Prompt, useParams } from "react-router-dom";

import BackButton from "../../../../components/UI/BackButton";
import Breadcrumbs from "../../../../components/UI/Tables/Breadcrumb";
import Loader from "../../../../components/UI/Loader";
import ConfirmationAlert from "../../../../components/confiramtionAlert";
import {
  addVariantDetails,
  getProductById,
} from "../../../../store/serviceProvider/Seller/action";
import SuccessConfirmationAlert from "../../../../components/SuccessConfirmationAlert";
import ImagePopup from "./ImagePopup";

const AddVariant = () => {
  const [variantName, setVariantName] = useState("");
  const [variantSortOrder, setVariantSortOrder] = useState("");
  const [netQuantity, setNetQuantity] = useState("");
  const [category, setCategory] = useState("Kg");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState("");
  const [maxDelivery, setMaxDelivery] = useState("");
  const [deliverin24Hr, setDeliverin24hr] = useState(false);
  const [deliverin72Hr, setDeliverin72hr] = useState(false);
  const [CustomDeliver, setCustomdeliver] = useState(false);
  const [img1, setImg1] = useState("");
  const [img2, setImg2] = useState("");
  const [img3, setImg3] = useState("");
  const [img4, setImg4] = useState("");
  const [img5, setImg5] = useState("");
  const params = useParams();
  const [modal, setModal] = useState(false);
  const [imagemodal, setImageModal] = useState(false);
  const [formChanged, setFormChanged] = useState(false);
  const [showPromptPopUp, setShowPromptPopUp] = useState(false);
  const [promptMessage, setPromptMessage] = useState({});
  const [backToListing, setBackToListing] = useState(false);
  const [disableSubmit, setDisableSubmit] = useState(false);
  const [img2Disabled, setImg2Disabled] = useState(false);
  const [img3Disabled, setImg3Disabled] = useState(false);
  const [img4Disabled, setImg4Disabled] = useState(false);
  const [img5Disabled, setImg5Disabled] = useState(false);
  const [active, setActive] = useState("select");
  const [currentImage, setCurrentImage] = useState("");
  const [showUrl, setShowUrl] = useState(false);
  const [admin_product, setadmin_product] = useState(0);
  const [foodType, setFoodType] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  const prodCat = useSelector((state) => state.Product);

  const toggle = () => {
    setModal(!modal);
    setFormChanged(false);
  };

  const imagetoggle = () => {
    setImageModal(!imagemodal);
  };

  useEffect(() => {
    if (img1 != null && img1 != "") {
      setImg2Disabled(false);
    } else {
      setImg2Disabled(true);
      setImg3Disabled(true);
      setImg4Disabled(true);
      setImg5Disabled(true);
    }
    if (img1 != null && img1 != "" && img2 != null && img2 != "") {
      setImg3Disabled(false);
    } else {
      setImg3Disabled(true);
      setImg4Disabled(true);
      setImg5Disabled(true);
    }
    if (
      img1 != null &&
      img1 != "" &&
      img2 != null &&
      img2 != "" &&
      img3 != null &&
      img3 != ""
    ) {
      setImg4Disabled(false);
    } else {
      setImg4Disabled(true);
      setImg5Disabled(true);
    }
    if (
      img1 != null &&
      img1 != "" &&
      img2 != null &&
      img2 != "" &&
      img3 != null &&
      img3 != "" &&
      img4 != null &&
      img4 != ""
    ) {
      setImg5Disabled(false);
    } else {
      setImg5Disabled(true);
    }
  }, [img1, img2, img3, img4, img5]);

  const handleValidSubmit = (event, values) => {
    event.preventDefault();
    let edit = "";
    let stringimgs = {};
    const formData = new FormData();
    if (typeof img1 == "object" && (img1 != null || img1 != undefined)) {
      formData.append("image1", img1);
      edit = edit + "1";
    } else if (typeof img1 == "string" && (img1 != null || img1 != undefined)) {
      edit = edit + "1";
      stringimgs = { ...stringimgs, image1: img1 };
    }

    if (typeof img2 == "object" && (img2 != null || img2 != undefined)) {
      edit = edit + "2";
      formData.append("image2", img2);
    } else if (typeof img2 == "string" && (img2 != null || img2 != undefined)) {
      edit = edit + "2";
      stringimgs = { ...stringimgs, image2: img2 };
    }

    if (typeof img3 == "object" && (img3 != null || img3 != undefined)) {
      edit = edit + "3";
      formData.append("image3", img3);
    } else if (typeof img3 == "string" && (img3 != null || img3 != undefined)) {
      edit = edit + "3";
      stringimgs = { ...stringimgs, image3: img3 };
    }

    if (typeof img4 == "object" && (img4 != null || img4 != undefined)) {
      edit = edit + "4";
      formData.append("image4", img3);
    } else if (typeof img4 == "string" && (img4 != null || img4 != undefined)) {
      edit = edit + "4";
      stringimgs = { ...stringimgs, image4: img4 };
    }

    if (typeof img5 == "object" && (img5 != null || img5 != undefined)) {
      edit = edit + "5";
      formData.append("image5", img5);
    } else if (typeof img5 == "string" && (img5 != null || img5 != undefined)) {
      edit = edit + "5";
      stringimgs = { ...stringimgs, image5: img5 };
    }
    if (typeof img1 == "string") {
      setadmin_product(1);
      formData.append("data", JSON.stringify(stringimgs));
    }

    const product = {
      variant_name: variantName,
      order: variantSortOrder,
      net_quantity: netQuantity,
      price: price,
      stock: stock,
      quantity_unit: category,
      product_id: params.id,
      custom_delivery_days: maxDelivery,
      dispaly_discount_percentage: discountPercentage,
      delivery_in_24: deliverin24Hr,
      delivery_in_72: deliverin72Hr,
      custom_delivery: CustomDeliver,
      is_veg: foodType || null,
    };

    const productwocustom = {
      variant_name: variantName,
      order: variantSortOrder,
      net_quantity: netQuantity,
      price: price,
      stock: stock,
      quantity_unit: category,
      product_id: params.id,
      dispaly_discount_percentage: discountPercentage,
      delivery_in_24: deliverin24Hr,
      delivery_in_72: deliverin72Hr,
      custom_delivery: CustomDeliver,
      is_veg: foodType || null,
    };
    dispatch(
      addVariantDetails({
        variant: CustomDeliver ? product : productwocustom,
        image: formData,
        id: params?.id,
        edit: edit,
        admin_product:
          typeof img1 == "string" ||
          typeof img2 == "string" ||
          typeof img3 == "string" ||
          typeof img4 == "string" ||
          typeof img5 == "string"
            ? 1
            : 0,
        callback: () => {
          toggle();
          history.push("/carer/seller/product-management");
        },
      })
    );
  };

  const handleVariantClick = (event, values) => {
    let edit = "";
    let stringimgs = {};
    const formData = new FormData();
    if (
      typeof img1 == "object" &&
      img1 != null &&
      img1 != undefined &&
      img1 != ""
    ) {
      formData.append("image1", img1);
      edit = edit + "1";
    } else if (
      typeof img1 == "string" &&
      img1 != null &&
      img1 != undefined &&
      img1.length &&
      img1 != ""
    ) {
      edit = edit + "1";
      stringimgs = { ...stringimgs, image1: img1 };
    }

    if (
      typeof img2 == "object" &&
      img2 != null &&
      img2 != undefined &&
      img2 != ""
    ) {
      edit = edit + "2";
      formData.append("image2", img2);
    } else if (
      typeof img2 == "string" &&
      img2 != null &&
      img2 != undefined &&
      img2 != ""
    ) {
      edit = edit + "2";
      stringimgs = { ...stringimgs, image2: img2 };
    }

    if (
      typeof img3 == "object" &&
      img3 != null &&
      img3 != undefined &&
      img3 != ""
    ) {
      edit = edit + "3";
      formData.append("image3", img3);
    } else if (
      typeof img3 == "string" &&
      (img3 != null) & (img3 != undefined) &&
      img3 != ""
    ) {
      edit = edit + "3";
      stringimgs = { ...stringimgs, image3: img3 };
    }
    if (
      typeof img4 == "object" &&
      img4 != null &&
      img4 != undefined &&
      img4 != ""
    ) {
      edit = edit + "4";
      formData.append("image4", img4);
    } else if (
      typeof img4 == "string" &&
      (img4 != null) & (img4 != undefined) &&
      img4 != ""
    ) {
      edit = edit + "4";
      stringimgs = { ...stringimgs, image4: img4 };
    }
    if (
      typeof img5 == "object" &&
      img5 != null &&
      img5 != undefined &&
      img5 != ""
    ) {
      edit = edit + "5";
      formData.append("image5", img5);
    } else if (
      typeof img5 == "string" &&
      (img5 != null) & (img5 != undefined) &&
      img5 != ""
    ) {
      edit = edit + "5";
      stringimgs = { ...stringimgs, image5: img5 };
    }
    if (typeof img1 == "string") {
      setadmin_product(1);
      formData.append("data", JSON.stringify(stringimgs));
    }

    event.preventDefault();
    const product = {
      variant_name: variantName,
      order: variantSortOrder,
      net_quantity: netQuantity,
      price: price,
      stock: stock,
      quantity_unit: category,
      product_id: params.id,
      custom_delivery_days: maxDelivery,
      dispaly_discount_percentage: discountPercentage,
      delivery_in_24: deliverin24Hr,
      delivery_in_72: deliverin72Hr,
      custom_delivery: CustomDeliver,
      is_veg: foodType,
    };
    const productwocustom = {
      variant_name: variantName,
      order: variantSortOrder,
      net_quantity: netQuantity,
      price: price,
      stock: stock,
      quantity_unit: category,
      product_id: params.id,
      dispaly_discount_percentage: discountPercentage,
      delivery_in_24: deliverin24Hr,
      delivery_in_72: deliverin72Hr,
      custom_delivery: CustomDeliver,
      is_veg: foodType || null,
    };
    dispatch(
      addVariantDetails({
        variant: CustomDeliver ? product : productwocustom,
        image: formData,
        id: params?.id,
        edit: edit,
        admin_product: typeof img1 == "string" ? 1 : 0,

        callback: () => {
          toggle();
          setVariantName("");
          setNetQuantity("");
          setPrice("");
          setStock("");
          setMaxDelivery("");
          setDiscountPercentage("");
          setDeliverin72hr(false);
          setDeliverin24hr(false);
          setCustomdeliver(false);
          setMaxDelivery("");
          setCategory("Kg");
          setImg1("");
          setImg2("");
          setImg3("");
          setImg4("");
          setImg5("");
        },
      })
    );
  };

  useEffect(() => {
    if (
      variantName == "" ||
      netQuantity == "" ||
      price == "" ||
      stock == "" ||
      category == "" ||
      discountPercentage == "" ||
      img1 == null ||
      img1 == ""
    ) {
      setDisableSubmit(true);
    } else {
      setDisableSubmit(false);
    }
  }, [
    variantName,
    netQuantity,
    price,
    stock,
    category,
    discountPercentage,
    img1,
    img2,
  ]);

  const confirmBack = () => {
    setShowPromptPopUp(!showPromptPopUp);
    setPromptMessage({
      id: "",
      content: "New Variant Added Successfully",
      type: "back",
    });
  };

  const redirectMethod = () => {
    // dispatch(resetErrorWithUsername());
    setBackToListing(true);
  };
  const confirmBrowserBack = () => {
    setShowPromptPopUp(!showPromptPopUp);
    setPromptMessage({
      id: "",
      content:
        "Are you sure you want to leave the page without saving your changes?",
      type: "back",
      title: "Alert",
    });
    return backToListing ? true : false;
  };

  const basicRequest = {
    keyword: "",
    product_id: "",
  };

  useEffect(() => {
    dispatch(getProductById({ data: { pid: params?.id } }));
  }, []);

  return (
    <div className="page-content cust-page" data-testid="component-faqAddNew">
      <Prompt
        when={formChanged}
        message={(location, action) => {
          if (action === "POP") {
            return confirmBrowserBack();
          }
        }}
      />

      <BackButton
        label="Products"
        handleClick={() => history.push("/carer/seller/product-management")}
        // handleClick={() => (formChanged ? confirmBack() : redirectMethod())}
      />
      <Breadcrumbs title="Tables" breadcrumbItem="Add Variant" />
      {(prodCat?.error || prodCat?.success) && (
        <div>
          <UncontrolledAlert
            color={prodCat?.error ? "danger" : "success"}
            className="alert-dismissible fade show"
            role="alert"
          >
            {prodCat?.error || prodCat?.success}
          </UncontrolledAlert>
        </div>
      )}
      <form
        onSubmit={(e, v) => {
          handleValidSubmit(e, v);
        }}
      >
        <Col xl="8">
          <Card className="p-4">
            <Row className="col-md-8 col-sm-10 col-lg-10   ">
              <div className="checkAvailabilityWrap col-lg-4 col-md-6">
                <label className="cust-label text-left">
                  Variant Display Name and Listing Order
                  <span className="mandatory">*</span>
                </label>
                <div className="d-flex col-lg-12 pl-0 col-sm-12 ">
                  <Input
                    value={variantName}
                    name="Feature"
                    placeholder="Enter variant name"
                    autoComplete="off"
                    onChange={(e) => {
                      // handleVariantNameChange(e.target.value);
                      setVariantName(e.target.value);
                      setFormChanged(true);
                    }}
                  />
                  &nbsp;&nbsp;
                  <Input
                    value={variantSortOrder}
                    name="Feature"
                    placeholder="Variant Listing Order"
                    onChange={(e) => {
                      setVariantSortOrder(e.target.value);
                      setFormChanged(true);
                    }}
                    style={{ width: "70px;" }}
                  />
                </div>
              </div>
            </Row>

            <Row className="col-md-8 col-lg-12  addUsernameFieldWrap">
              <div className="checkAvailabilityWrap  col-lg-8 col-md-8">
                <label className="cust-label text-left">
                  Enter Net quantity
                  <span className="mandatory">*</span>
                </label>
                <div className="d-flex col-lg-6 pl-0 col-sm-6">
                  <Input
                    type="number"
                    value={netQuantity}
                    name="product_name"
                    className="col-lg-10 col-sm-10"
                    placeholder="Enter Net quantity"
                    onChange={(e) => {
                      setFormChanged(true);
                      setNetQuantity(e.target.value);
                    }}
                  />

                  <select
                    className="col-lg-2 ml-3 col-sm-2"
                    value={category}
                    name="Quantity"
                    onChange={(e) => {
                      setFormChanged(true);
                      setCategory(e.target.value);
                    }}
                    style={{ padding: "0px " }}
                  >
                    <option>Kg</option>
                    <option>Ltr</option>
                    <option>No.</option>
                    <option>Gm.</option>
                  </select>
                </div>
              </div>
            </Row>

            <Row className="col-md-8 col-sm-6  addUsernameFieldWrap">
              <div className="checkAvailabilityWrap  col-lg-6 col-md-6">
                <label className="cust-label text-left">
                  Enter Price
                  <span className="mandatory">*</span>
                </label>
                <Input
                  type="number"
                  value={price}
                  name="product_description"
                  placeholder="Enter Price"
                  onChange={(e) => {
                    setFormChanged(true);
                    setPrice(e.target.value);
                  }}
                />
              </div>
            </Row>

            <Row className="col-md-8  col-sm-6  addUsernameFieldWrap">
              <div className="checkAvailabilityWrap  col-lg-6 col-md-6">
                <label className="cust-label text-left">
                  Enter Stock
                  <span className="mandatory">*</span>
                </label>
                <Input
                  type="number"
                  value={stock}
                  name="product_description"
                  placeholder="Enter Stock"
                  onChange={(e) => {
                    setFormChanged(true);
                    setStock(e.target.value);
                  }}
                />
              </div>
            </Row>

            <Row className="col-md-8 col-sm-6  addUsernameFieldWrap">
              <div className="text-left  col-lg-6 col-md-6">
                <label className="cust-label text-left">
                  Enter Max Delivery Days
                  <span className="mandatory">*</span>
                </label>
                <ul>
                  <li className="d-flex mb-0 pb-0">
                    <label htmlFor="24hr" className="filter-label">
                      <input
                        className="mt-3"
                        type="checkbox"
                        name="price"
                        id="24hr"
                        style={{ display: "inline" }}
                        onClick={(e) => setDeliverin24hr(e.target.checked)}
                      />
                      24hr delivery (Fast Delivery)
                    </label>
                  </li>

                  <li className="d-flex mb-0 pb-0">
                    <label htmlFor="72hr" className="filter-label">
                      <input
                        className="mt-3"
                        type="checkbox"
                        name="price"
                        id="72hr"
                        style={{ display: "inline" }}
                        onClick={(e) => setDeliverin72hr(e.target.checked)}
                      />
                      72hr (Standard Delivery)
                    </label>
                  </li>
                  <li className="d-flex mb-0 pb-0">
                    <label htmlFor="custom-deliver" className="filter-label">
                      <input
                        className="mt-3"
                        type="checkbox"
                        name="price"
                        id="custom-deliver"
                        style={{ display: "inline" }}
                        onClick={(e) => setCustomdeliver(e.target.checked)}
                      />
                      Custom Delivery Days
                    </label>
                  </li>

                  {CustomDeliver ? (
                    <div>
                      <label className="cust-label text-left">
                        Custom Days
                      </label>
                      <Input
                        type="number"
                        value={maxDelivery}
                        name="custom-days"
                        placeholder="Enter Day"
                        onChange={(e) => {
                          setFormChanged(true);
                          setMaxDelivery(e.target.value);
                        }}
                      />
                    </div>
                  ) : null}
                </ul>
              </div>
            </Row>

            <Row className="col-md-8 col-sm-6  addUsernameFieldWrap">
              <div className="checkAvailabilityWrap  col-lg-6 col-md-6">
                <label className="cust-label text-left">
                  Enter Discount Percentage
                  <span className="mandatory">*</span>
                </label>
                <Input
                  type="number"
                  value={discountPercentage}
                  name="product_description"
                  placeholder="Enter Discount Percentage"
                  onChange={(e) => {
                    setFormChanged(true);
                    setDiscountPercentage(e.target.value);
                  }}
                />
              </div>
            </Row>

            {prodCat?.productDetails?.is_food_item && (
              <Row className="col-md-8 col-sm-6  addUsernameFieldWrap">
                <div className="text-left  col-lg-6 col-md-6">
                  <label className="cust-label text-left">
                    Food Category
                    <span className="mandatory">*</span>
                  </label>
                  <ul className="d-flex">
                    <li className="d-flex mb-0 pb-0">
                      <label htmlFor="Veg" className="filter-label">
                        <input
                          className="mt-3"
                          type="radio"
                          name="food"
                          id="Veg"
                          style={{ display: "inline" }}
                          onClick={(e) => setFoodType(true)}
                        />
                        Veg
                      </label>
                    </li>

                    <li className="d-flex ml-3 mb-0 pb-0">
                      <label htmlFor="Non-Veg" className="filter-label">
                        <input
                          className="mt-3"
                          type="radio"
                          name="food"
                          id="Non-Veg"
                          style={{ display: "inline" }}
                          onClick={(e) => setFoodType(false)}
                        />
                        Non-Veg
                      </label>
                    </li>
                  </ul>
                </div>
              </Row>
            )}
            <label className="cust-label text-left ml-3">
              Images
              <span className="mandatory">*</span>
            </label>
            <Row className="ml-4 my-4 d-flex">
              <div className="text-left">
                <button
                  type="button"
                  className={`btn mb-3 ${
                    active == "select" ? "btn-orange" : ""
                  }`}
                  onClick={() => {
                    setActive("select");
                    setImg1("");
                    setImg2("");
                    setImg3("");
                    setImg4("");
                    setImg5("");
                  }}
                >
                  Select images
                </button>
                <p className="ml-5 mb-3 pl-4">OR</p>{" "}
                <button
                  type="button"
                  className={`btn mb-5 ${
                    active == "choose" ? "btn-orange" : ""
                  }`}
                  onClick={() => {
                    setActive("choose");
                    setImg1("");
                    setImg2("");
                    setImg3("");
                    setImg4("");
                    setImg5("");
                  }}
                >
                  Choose images
                </button>
              </div>
              {active == "select" ? (
                <div>
                  <div className="ml-4 mb-4">
                    <input
                      type="file"
                      accept="image/x-png,image/jpeg"
                      name="image"
                      onChange={(e) => {
                        setImg1(e.target.files[0]);
                      }}
                    />
                  </div>

                  <div className="ml-4 mb-4">
                    <input
                      type="file"
                      accept="image/x-png,image/jpeg"
                      name="image"
                      onChange={(e) => {
                        setImg2(e.target.files[0]);
                      }}
                      disabled={img2Disabled ? true : false}
                    />
                  </div>

                  <div className="ml-4 mb-4">
                    <input
                      type="file"
                      accept="image/x-png,image/jpeg"
                      name="image"
                      onChange={(e) => {
                        setImg3(e.target.files[0]);
                      }}
                      disabled={img3Disabled ? true : false}
                    />
                  </div>
                  <div className="ml-4 mb-4">
                    <input
                      type="file"
                      accept="image/x-png,image/jpeg"
                      name="image"
                      onChange={(e) => {
                        setImg4(e.target.files[0]);
                      }}
                      disabled={img4Disabled ? true : false}
                    />
                  </div>
                  <div className="ml-4 mb-4">
                    <input
                      type="file"
                      accept="image/x-png,image/jpeg"
                      name="image"
                      onChange={(e) => {
                        setImg5(e.target.files[0]);
                      }}
                      disabled={img5Disabled ? true : false}
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <div className="ml-5 mb-4 d-flex">
                    <button
                      type="button"
                      className="btn mb-3"
                      onClick={() => {
                        imagetoggle();
                        setCurrentImage("img1");
                      }}
                    >
                      Select image 1
                    </button>
                    {img1 && <p className="mt-2 ml-2">{img1?.slice(52)}</p>}
                  </div>
                  <div className="ml-5 mb-4 d-flex">
                    <button
                      type="button"
                      className="btn mb-3"
                      onClick={() => {
                        imagetoggle();
                        setCurrentImage("img2");
                      }}
                      disabled={img2Disabled ? true : false}
                    >
                      Select image 2
                    </button>
                    {img2 && <p className="mt-2 ml-2">{img2?.slice(52)}</p>}
                  </div>
                  <div className="ml-5 mb-4 d-flex">
                    <button
                      type="button"
                      className="btn mb-3"
                      onClick={() => {
                        imagetoggle();
                        setCurrentImage("img3");
                      }}
                      disabled={img3Disabled ? true : false}
                    >
                      Select image 3
                    </button>
                    {img3 && <p className="mt-2 ml-2">{img3?.slice(52)}</p>}
                  </div>
                  <div className="ml-5 mb-4 d-flex">
                    <button
                      type="button"
                      className="btn mb-3"
                      onClick={() => {
                        imagetoggle();
                        setCurrentImage("img4");
                      }}
                      disabled={img4Disabled ? true : false}
                    >
                      Select image 4
                    </button>
                    {img4 && <p className="mt-2 ml-2">{img4?.slice(52)}</p>}
                  </div>
                  <div className="ml-5 mb-4 d-flex">
                    <button
                      type="button"
                      className="btn mb-3"
                      onClick={() => {
                        imagetoggle();
                        setCurrentImage("img5");
                      }}
                      disabled={img5Disabled ? true : false}
                    >
                      Select image 5
                    </button>
                    {img5 && <p className="mt-2 ml-2">{img5?.slice(52)}</p>}
                  </div>
                </div>
              )}
            </Row>

            <div className="mt-4 text-center">
              <button
                onClick={handleVariantClick}
                className="btn waves-effect waves-light cust_no_shadow cust-save-btn cust-saveButton"
                disabled={disableSubmit}
              >
                SAVE AND ADD NEXT VARIANT
              </button>
              <button
                type="submit"
                className="btn waves-effect waves-light cust_no_shadow cust-save-btn cust-saveButton"
                disabled={disableSubmit}
              >
                SUBMIT
              </button>
            </div>
          </Card>
        </Col>
      </form>

      <ConfirmationAlert
        {...promptMessage}
        modal_center={showPromptPopUp}
        setmodal_center={setShowPromptPopUp}
        onOK={redirectMethod}
      />

      <SuccessConfirmationAlert
        modal_center={modal}
        setmodal_center={setModal}
        content="New Variant added successfully"
        toggle={toggle}
      />
      {prodCat?.loading && <Loader />}
      <ImagePopup
        modal_center={imagemodal}
        setmodal_center={setImageModal}
        toggle={imagetoggle}
        variantName={variantName}
        prodCat={prodCat}
        currentImage={currentImage}
        setImg1={setImg1}
        setImg2={setImg2}
        setImg3={setImg3}
        setShowUrl={setShowUrl}
        img1={img1}
        img2={img2}
        img3={img3}
        addImage={true}
      />
    </div>
  );
};

export default AddVariant;

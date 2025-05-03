import React, { useEffect, useState } from "react";
import { Col, Card, Row, UncontrolledAlert, Input } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  useHistory,
  Prompt,
  Link,
  useLocation,
  Redirect,
  useParams,
} from "react-router-dom";

import BackButton from "../../../../components/UI/BackButton";
import Breadcrumbs from "../../../../components/UI/Tables/Breadcrumb";
import Loader from "../../../../components/UI/Loader";
import Delete_icon from "../../../../assets/icons/ebud-icons/Delete.svg";
import ConfirmationAlert from "../../../../components/confiramtionAlert";
import {
  deleteVariantDetails,
  editVariantDetails,
  getVariantById,
  getVariantDetails,
} from "../../../../store/serviceProvider/Seller/action";
import SuccessConfirmationAlert from "../../../../components/SuccessConfirmationAlert";
import ImagePopup from "./ImagePopup";

const EditVariant = () => {
  const [variantName, setVariantName] = useState("");
  const [variantSortOrder, setVariantSortOrder] = useState("");
  const [variantId, setVariantId] = useState("");
  const [netQuantity, setNetQuantity] = useState();
  const [category, setCategory] = useState("Kg");
  const [price, setPrice] = useState();
  const [stock, setStock] = useState();
  const [discountPercentage, setDiscountPercentage] = useState("");
  const [maxDelivery, setMaxDelivery] = useState("");
  const [deliverin24Hr, setDeliverin24hr] = useState(false);
  const [deliverin72Hr, setDeliverin72hr] = useState(false);
  const [CustomDeliver, setCustomdeliver] = useState(false);

  const params = useParams();
  const [modal, setModal] = useState(false);
  const [variantmodal, setVariantModal] = useState(false);
  const [formChanged, setFormChanged] = useState(false);
  const [showPromptPopUp, setShowPromptPopUp] = useState(false);
  const [promptMessage, setPromptMessage] = useState({});
  const [backToListing, setBackToListing] = useState(false);
  const [disableSubmit, setDisableSubmit] = useState(false);
  const [img1, setImg1] = useState(null);
  const [img2, setImg2] = useState(null);
  const [img3, setImg3] = useState(null);
  const [img4, setImg4] = useState(null);
  const [img5, setImg5] = useState(null);
  const [img2Disabled, setImg2Disabled] = useState(false);
  const [img3Disabled, setImg3Disabled] = useState(false);
  const [img4Disabled, setImg4Disabled] = useState(false);
  const [img5Disabled, setImg5Disabled] = useState(false);
  const [active, setActive] = useState("select");
  const [currentImage, setCurrentImage] = useState("");
  const [showUrl, setShowUrl] = useState(false);
  const [admin_product, setadmin_product] = useState(0);
  const prodCat = useSelector((state) => state.Product);
  const [imagemodal, setImageModal] = useState(false);
  const [foodType, setFoodType] = useState(false);
  const [adminImage, setAdminImage] = useState(false);

  const [img1Selected, setImg1Selected] = useState(false);
  const [img2Selected, setImg2Selected] = useState(false);
  const [img3Selected, setImg3Selected] = useState(false);
  const [img4Selected, setImg4Selected] = useState(false);
  const [img5Selected, setImg5Selected] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();

  const imagetoggle = () => {
    setImageModal(!imagemodal);
  };

  const varianttoggle = () => {
    setVariantModal(!variantmodal);
  };

  useEffect(() => {
    dispatch(getVariantDetails({ id: params.id }));
  }, []);

  useEffect(() => {
    if (img1 != null && img1 != "") {
      setImg2Disabled(false);
    } else {
      setImg2Disabled(true);
    }
    if (img1 != null && img1 != "" && img2 != null && img2 != "") {
      setImg3Disabled(false);
    } else {
      setImg3Disabled(true);
    }
  }, [img1, img2, img3]);

  useEffect(() => {
    if (
      variantName == "" ||
      variantSortOrder == "" ||
      netQuantity == "" ||
      price == "" ||
      stock == "" ||
      img1 == null ||
      img1 == ""
    ) {
      setDisableSubmit(true);
    } else {
      setDisableSubmit(false);
    }
  }, [
    variantName,
    variantSortOrder,
    netQuantity,
    price,
    stock,
    discountPercentage,
    img1,
  ]);

  useEffect(() => {
    prodCat?.variantDetails?.variant_name &&
      setVariantName(prodCat?.variantDetails?.variant_name);
    prodCat?.variantDetails?.sort_order &&
      setVariantSortOrder(prodCat?.variantDetails?.sort_order);
    prodCat?.variantDetails?.net_quantity &&
      setNetQuantity(prodCat?.variantDetails?.net_quantity);
    prodCat?.variantDetails?.price && setPrice(prodCat?.variantDetails?.price);
    prodCat?.variantDetails?.stock && setStock(prodCat?.variantDetails?.stock);
    prodCat?.variantDetails?.product_variant_id &&
      setVariantId(prodCat?.variantDetails?.product_variant_id);
    setFoodType(prodCat?.variantDetails?.is_veg);
    setDiscountPercentage(prodCat?.variantDetails?.dispaly_discount_percentage);

    prodCat?.variantDetails?.delivery_in_24 &&
      setDeliverin24hr(prodCat?.variantDetails?.delivery_in_24);
    prodCat?.variantDetails?.delivery_in_24 &&
      setDeliverin72hr(prodCat?.variantDetails?.delivery_in_72);
    prodCat?.variantDetails?.custom_delivery &&
      setCustomdeliver(prodCat?.variantDetails?.custom_delivery);
    prodCat?.variantDetails?.custom_delivery_days &&
      setMaxDelivery(prodCat?.variantDetails?.custom_delivery_days);
    prodCat?.variantDetails?.product_image_1 &&
      setImg1(prodCat?.variantDetails?.product_image_1);
    prodCat?.variantDetails?.product_image_2 &&
      setImg2(prodCat?.variantDetails?.product_image_2);
    prodCat?.variantDetails?.product_image_3 &&
      setImg3(prodCat?.variantDetails?.product_image_3);
    prodCat?.variantDetails?.product_image_4 &&
      setImg4(prodCat?.variantDetails?.product_image_4);
    prodCat?.variantDetails?.product_image_5 &&
      setImg5(prodCat?.variantDetails?.product_image_5);
  }, [prodCat?.variantDetails?.variant_name]);

  const fileName1 =
    img1 && typeof img1 === "string"
      ? img1?.split("/").pop()
      : img1 && typeof img1 == "object"
      ? img1?.name
      : img1 == null
      ? "No file chosen"
      : "No file chosen";

  const fileName2 =
    img2 && typeof img2 === "string"
      ? img2?.split("/").pop()
      : img2 && typeof img2 == "object"
      ? img2?.name
      : img2 == null
      ? "No file chosen"
      : "No file chosen";

  const fileName3 =
    img3 && typeof img3 === "string"
      ? img3?.split("/").pop()
      : img3 && typeof img3 == "object"
      ? img3?.name
      : img3 == null
      ? "No file chosen"
      : "No file chosen";
  const fileName4 =
    img4 && typeof img4 === "string"
      ? img4?.split("/").pop()
      : img4 && typeof img4 == "object"
      ? img4?.name
      : img4 == null
      ? "No file chosen"
      : "No file chosen";
  const fileName5 =
    img5 && typeof img5 === "string"
      ? img5?.split("/").pop()
      : img5 && typeof img5 == "object"
      ? img5?.name
      : img5 == null
      ? "No file chosen"
      : "No file chosen";
  const toggle = () => {
    setModal(!modal);
    setFormChanged(false);
  };

  const handleValidSubmit = (event, values) => {
    event.preventDefault();

    let edit = "";
    let stringimgs = {};
    const formData = new FormData();
    if (typeof img1 == "object" && (img1 != null || img1 != undefined)) {
      formData.append("image1", img1);
      edit = edit + "1";
    } else if (
      typeof img1 == "string" &&
      img1 != prodCat?.variantDetails?.product_image_1 &&
      (img1 != null || img1 != undefined) &&
      img1.includes("pawwalker-files.s3.amazonaws.com")
    ) {
      edit = edit + "1";
      stringimgs = { ...stringimgs, image1: img1 };
    }

    if (typeof img2 == "object" && (img2 != null || img2 != undefined)) {
      edit = edit + "2";
      formData.append("image2", img2);
    } else if (
      typeof img2 == "string" &&
      img2 != prodCat?.variantDetails?.product_image_2 &&
      (img2 != null || img2 != undefined) &&
      img2.includes("pawwalker-files.s3.amazonaws.com")
    ) {
      edit = edit + "2";
      stringimgs = { ...stringimgs, image2: img2 };
    }

    if (typeof img3 == "object" && (img3 != null || img3 != undefined)) {
      edit = edit + "3";
      formData.append("image3", img3);
    } else if (
      typeof img3 == "string" &&
      img3 != prodCat?.variantDetails?.product_image_3 &&
      (img3 != null || img3 != undefined) &&
      img3.includes("pawwalker-files.s3.amazonaws.com")
    ) {
      edit = edit + "3";
      stringimgs = { ...stringimgs, image3: img3 };
    }

    if (typeof img4 == "object" && (img4 != null || img4 != undefined)) {
      edit = edit + "4";
      formData.append("image4", img4);
    } else if (
      typeof img4 == "string" &&
      img4 != prodCat?.variantDetails?.product_image_4 &&
      (img4 != null || img4 != undefined) &&
      img4.includes("pawwalker-files.s3.amazonaws.com")
    ) {
      edit = edit + "4";
      stringimgs = { ...stringimgs, image4: img4 };
    }

    if (typeof img5 == "object" && (img5 != null || img5 != undefined)) {
      edit = edit + "5";
      formData.append("image5", img5);
    } else if (
      typeof img5 == "string" &&
      img5 != prodCat?.variantDetails?.product_image_5 &&
      (img5 != null || img5 != undefined) &&
      img5.includes("pawwalker-files.s3.amazonaws.com")
    ) {
      edit = edit + "5";
      stringimgs = { ...stringimgs, image5: img5 };
    }
    if (
      (typeof img1 == "string" &&
        img1 != prodCat?.variantDetails?.product_image_1) ||
      (typeof img2 == "string" &&
        img2 != prodCat?.variantDetails?.product_image_2) ||
      (typeof img3 == "string" &&
        img3 != prodCat?.variantDetails?.product_image_3) ||
      (typeof img4 == "string" &&
        img4 != prodCat?.variantDetails?.product_image_4) ||
      (typeof img5 == "string" &&
        img5 != prodCat?.variantDetails?.product_image_5)
    ) {
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
      pvid: prodCat.variantDetails.product_variant_id,
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
      pvid: prodCat.variantDetails.product_variant_id,
      dispaly_discount_percentage: discountPercentage,
      delivery_in_24: deliverin24Hr,
      delivery_in_72: deliverin72Hr,
      custom_delivery: CustomDeliver,
      is_veg: foodType,
    };

    dispatch(
      editVariantDetails({
        variant: CustomDeliver ? product : productwocustom,
        image: formData,
        id: prodCat?.variantDetails.product_variant_id,
        edit: edit,
        admin_product: admin_product,
        callback: () => {
          varianttoggle();
        },
      })
    );
  };

  const units = [
    { id: 1, value: "Kg" },
    { id: 2, value: "Ltr" },
    { id: 3, value: "No." },
    { id: 4, value: "Gm." },
  ];

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

  const handleVariantChange = (e) => {
    e.preventDefault();
    setVariantId(e.target.value);
    setImg1("");
    setImg2("");
    setImg3("");
    setImg4("");
    setImg5("");
    dispatch(getVariantById({ id: e.target.value }));
  };

  const okHandler = () => {
    dispatch(
      deleteVariantDetails({
        data: { pid: promptMessage.id },
        callback: () => dispatch(getVariantDetails({ id: params.id })),
      })
    );
  };

  const deletePromptHandler = (id) => {
    setShowPromptPopUp(!showPromptPopUp);
    setPromptMessage({
      id: id,
      title: "",
      content: "Are you sure you want to delete this variant",
      type: "delete",
    });
  };

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
        label="Products Details"
        handleClick={() =>
          history.push(`/carer/seller/product-edit/${params?.id}`)
        }
      />
      {prodCat?.variant?.variants?.length == 0 ? (
        <div className="text-center mt-100">
          <h4>No Variants Added</h4>
          <a
            href={`/carer/seller/product-variant-addNew/${params?.id}`}
            className="btn waves-effect waves-light cust_no_shadow cust-save-btn cust-saveButton mt-3"
            // disabled={disableSubmit ? false : true}
          >
            ADD NEW VARIANT
          </a>
        </div>
      ) : (
        <>
          <Breadcrumbs title="Tables" breadcrumbItem="Edit Variant" />

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
          <div className=" mb-3 mt-4 ">
            <h5 className="mt-2  ">Select Variant</h5>
            <select
              className="col-lg-2 col-md-4 col-sm-5 col-xl-2 col-xs-3 mb-5"
              style={{ padding: "6px " }}
              onChange={(e) => handleVariantChange(e)}
            >
              {prodCat?.variant?.variants?.length &&
                prodCat?.variant?.variants?.map((variant) => (
                  <option value={variant?.product_variant_id}>
                    {variant?.variant_name}
                  </option>
                ))}
            </select>
          </div>

          <button
            onClick={() => deletePromptHandler(variantId)}
            className=" btn mr-4 mb-5"
            style={{ background: "transparent" }}
            title="Delete Variants"
          >
            <img src={Delete_icon} alt="Delete" />
          </button>
          <a
            href={`/carer/seller/product-variant-addNew/${params?.id}`}
            className="btn waves-effect waves-light cust_no_shadow cust-save-btn cust-saveButton btn-hover ml-5 mb-5"
            // disabled={disableSubmit ? false : true}
          >
            ADD NEW
          </a>
          <form
            onSubmit={(e, v) => {
              handleValidSubmit(e, v);
            }}
          >
            <Col xl="8">
              <Card className="p-4">
                <Row className="col-md-8 col-sm-10 col-lg-10   addUsernameFieldWrap d-flex">
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
                        onChange={(e) => {
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
                        className="col-lg-2 ml-3 col-sm-2 col-xs-3"
                        name="Quantity"
                        onChange={(e) => {
                          setFormChanged(true);
                          setCategory(e.target.value);
                        }}
                        style={{ padding: "0px " }}
                      >
                        {units?.map((unit) =>
                          prodCat?.variantDetails?.quantity_unit ==
                          unit.value ? (
                            <option
                              selected
                              value={prodCat?.variantDetails?.quantity_unit}
                            >
                              {prodCat?.variantDetails?.quantity_unit}
                            </option>
                          ) : (
                            <option value={unit.value}>{unit.value}</option>
                          )
                        )}
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
                            checked={deliverin24Hr}
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
                            checked={deliverin72Hr}
                          />
                          72hr (Standard Delivery)
                        </label>
                      </li>
                      <li className="d-flex mb-0 pb-0">
                        <label
                          htmlFor="custom-deliver"
                          className="filter-label"
                        >
                          <input
                            className="mt-3"
                            type="checkbox"
                            name="price"
                            id="custom-deliver"
                            style={{ display: "inline" }}
                            onClick={(e) => setCustomdeliver(e.target.checked)}
                            checked={CustomDeliver}
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

                {prodCat?.variantDetails?.is_food_item && (
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
                              defaultChecked={foodType}
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
                              defaultChecked={!foodType}
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
                        if (img1Selected) {
                          setImg1("");
                        } else {
                          setImg1(prodCat?.variantDetails?.product_image_1);
                        }
                        if (img2Selected) {
                          setImg2("");
                        } else {
                          setImg2(prodCat?.variantDetails?.product_image_2);
                        }
                        if (img3Selected) {
                          setImg3("");
                        } else {
                          setImg3(prodCat?.variantDetails?.product_image_3);
                        }
                        if (img4Selected) {
                          setImg4("");
                        } else {
                          setImg4(prodCat?.variantDetails?.product_image_4);
                        }
                        if (img5Selected) {
                          setImg5("");
                        } else {
                          setImg5(prodCat?.variantDetails?.product_image_5);
                        }
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
                      <div className="ml-4 ">
                        <div className="edit-file">
                          <input
                            className="pe-auto noselect"
                            type="file"
                            accept="image/x-png,image/jpeg"
                            name="image"
                            onChange={(e) => {
                              setImg1(e.target.files[0]);
                              setImg1Selected(true);
                              setadmin_product(0);
                            }}
                          />
                          <span
                            style={{
                              position: "absolute",
                              top: "3px",
                              left: "105px",
                              transition: "right 0.2s",
                            }}
                          >
                            {fileName1}
                          </span>
                        </div>
                      </div>

                      <div className="ml-4 my-4">
                        <div className="edit-file">
                          <input
                            className="pe-auto noselect"
                            type="file"
                            accept="image/x-png,image/jpeg"
                            name="image"
                            onChange={(e) => {
                              setImg2(e.target.files[0]);
                              setImg2Selected(true);
                              setadmin_product(0);
                            }}
                            disabled={img2Disabled ? true : false}
                          />
                          <span
                            style={{
                              position: "absolute",
                              top: "3px",
                              left: "105px",
                              transition: "right 0.2s",
                            }}
                          >
                            {fileName2}
                          </span>
                        </div>
                      </div>

                      <div className="ml-4 my-4">
                        <div className="edit-file">
                          <input
                            className="pe-auto noselect"
                            type="file"
                            accept="image/x-png,image/jpeg"
                            name="image"
                            onChange={(e) => {
                              setImg3(e.target.files[0]);
                              setImg3Selected(true);
                              setadmin_product(0);
                            }}
                            disabled={img3Disabled ? true : false}
                          />
                          <span
                            style={{
                              position: "absolute",
                              top: "3px",
                              left: "105px",
                              transition: "right 0.2s",
                            }}
                          >
                            {fileName3}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4 my-4">
                        <div className="edit-file">
                          <input
                            className="pe-auto noselect"
                            type="file"
                            accept="image/x-png,image/jpeg"
                            name="image"
                            onChange={(e) => {
                              setImg4(e.target.files[0]);
                              setImg4Selected(true);
                              setadmin_product(0);
                            }}
                            disabled={img4Disabled ? true : false}
                          />
                          <span
                            style={{
                              position: "absolute",
                              top: "3px",
                              left: "105px",
                              transition: "right 0.2s",
                            }}
                          >
                            {fileName4}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4 my-4">
                        <div className="edit-file">
                          <input
                            className="pe-auto noselect"
                            type="file"
                            accept="image/x-png,image/jpeg"
                            name="image"
                            onChange={(e) => {
                              setImg5(e.target.files[0]);
                              setImg5Selected(true);
                              setadmin_product(0);
                            }}
                            disabled={img5Disabled ? true : false}
                          />
                          <span
                            style={{
                              position: "absolute",
                              top: "3px",
                              left: "105px",
                              transition: "right 0.2s",
                            }}
                          >
                            {fileName5}
                          </span>
                        </div>
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
                            setadmin_product(1);
                            setCurrentImage("img1");
                            setImg1Selected(true);
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
                            setImg2Selected(true);
                            setadmin_product(1);
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
                            setImg3Selected(true);
                            setadmin_product(1);
                          }}
                          disabled={img3Disabled ? true : false}
                        >
                          Select image 3
                        </button>
                        {img3 && <p className="mt-2 ml-2">{img3?.slice(52)}</p>}
                      </div>
                    </div>
                  )}
                </Row>

                <div className="mt-4 text-center">
                  <button
                    type="submit"
                    className="btn waves-effect waves-light cust_no_shadow cust-save-btn cust-saveButton"
                    disabled={disableSubmit}
                  >
                    SAVE
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

          <ConfirmationAlert
            {...promptMessage}
            modal_center={showPromptPopUp}
            setmodal_center={setShowPromptPopUp}
            onOK={okHandler}
          />
          <SuccessConfirmationAlert
            modal_center={variantmodal}
            setmodal_center={setVariantModal}
            content="Variant updated successfully"
            toggle={varianttoggle}
          />
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
            setadmin_product={setadmin_product}
          />
          {prodCat?.loading && <Loader />}
        </>
      )}
    </div>
  );
};

export default EditVariant;

import React, { useEffect, useState } from "react";
import { Col, Card, Row, UncontrolledAlert, Input } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Prompt, Link, useLocation } from "react-router-dom";

import BackButton from "../../../../components/UI/BackButton";
import Breadcrumbs from "../../../../components/UI/Tables/Breadcrumb";
import {
  addProductDetails,
  getGSTDetails,
  getProductCategoryDetails,
  getProductFeatureSuggestion,
} from "../../../../store/serviceProvider/Seller/action";
import Loader from "../../../../components/UI/Loader";
import ConfirmationAlert from "../../../../components/confiramtionAlert";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [brandName, setbrandName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [petType, setPetType] = useState("Dogs");

  const [formChanged, setFormChanged] = useState(false);
  const [showPromptPopUp, setShowPromptPopUp] = useState(false);
  const [promptMessage, setPromptMessage] = useState({});
  const [backToListing, setBackToListing] = useState(false);
  const [disableSubmit, setDisableSubmit] = useState(false);
  const [nameClick, setNameClick] = useState(false);
  const [gstCategory, setgstCategory] = useState();
  const history = useHistory();
  const dispatch = useDispatch();

  const prodCat = useSelector((state) => state.Product);

  const basicRequest = {
    sort: "time_created",
    sort_order: "desc",
    keyword: "",
  };

  const [request, setRequest] = useState({ ...basicRequest });

  useEffect(() => {
    if (request?.keyword?.length > 0) {
      request && dispatch(getProductFeatureSuggestion({ request: request }));
    }
  }, [request]);

  useEffect(() => {
    dispatch(getProductCategoryDetails({ data: { ideal_for: petType } }));
  }, [petType]);

  useEffect(() => {
    dispatch(getGSTDetails());
  }, []);

  useEffect(() => {
    setgstCategory(prodCat?.gst_first_category);
  }, [prodCat?.gst_first_category]);

  useEffect(() => {
    setCategory(prodCat?.first_category);
  }, [prodCat?.first_category]);

  const handleValidSubmit = (event, values) => {
    event.preventDefault();
    const product = {
      product_name: name,
      product_description: description,
      brand_name: brandName,
      category_id: category,
      ideal_for: petType,
      gst_class_id: gstCategory,
    };
    dispatch(
      addProductDetails({
        product: product,
        history: history,
      })
    );
  };

  useEffect(() => {
    if (name == "" || description == "" || brandName == "") {
      setDisableSubmit(true);
    } else {
      setDisableSubmit(false);
    }
  }, [name, description, brandName, category]);

  const confirmBack = () => {
    setShowPromptPopUp(!showPromptPopUp);
    setPromptMessage({
      id: "",
      content:
        "Are you sure you want to leave the page without saving your changes?",
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

  const PetType = [
    { id: "1", value: "Dogs" },
    { id: "2", value: "Cats" },
    { id: "3", value: "Birds" },
    { id: "4", value: "Fish & Aquatics" },
    { id: "5", value: "Small Pets" },
    { id: "6", value: "Pet Owners" },
    { id: "7", value: "Others" },
  ];

  useEffect(() => {
    if (nameClick && prodCat?.admin_product_feature?.suggestions?.length) {
      const result = prodCat?.admin_product_feature?.suggestions?.find(
        (pro) => pro.product_name == name
      );
      setDescription(result?.description);
    }
  }, [nameClick]);

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
      <Breadcrumbs title="Tables" breadcrumbItem="Add Product" />
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
        <Col xl="12">
          <Card className="p-4">
            <Row className="col-md-8 col-sm-6   addUsernameFieldWrap ">
              <div className="checkAvailabilityWrap  col-lg-12 col-md-6">
                <label className="cust-label text-left">
                  Enter Product Name
                  <span className="mandatory">*</span>
                </label>
                <Input
                  value={name}
                  name="product_name"
                  placeholder="Enter Product Name"
                  autoComplete="off"
                  onChange={(e) => {
                    setFormChanged(true);
                    setName(e.target.value);
                    setRequest({ ...request, keyword: e.target.value });
                    setNameClick(false);
                  }}
                />
              </div>
            </Row>

            <Row className="col-md-8 col-sm-6  addUsernameFieldWrap">
              <div className="checkAvailabilityWrap  col-lg-12 col-md-6">
                <label className="cust-label text-left">
                  Enter Product Description
                  <span className="mandatory">*</span>
                </label>
                <Input
                  type="textarea"
                  rows="10"
                  value={description}
                  name="product_name"
                  placeholder="Enter Product Description"
                  onChange={(e) => {
                    setFormChanged(true);
                    setDescription(e.target.value);
                  }}
                />
              </div>
            </Row>

            <Row className="col-md-8 col-sm-6   addUsernameFieldWrap">
              <div className="checkAvailabilityWrap  col-lg-12 col-md-6">
                <label className="cust-label text-left">
                  Enter Brand Name
                  <span className="mandatory">*</span>
                </label>
                <Input
                  value={brandName}
                  name="product_description"
                  placeholder="Enter Brand"
                  onChange={(e) => {
                    setFormChanged(true);
                    setbrandName(e.target.value);
                  }}
                />
              </div>
            </Row>

            <Row className="col-md-11 col-sm-6  addUsernameFieldWrap">
              <div className="checkAvailabilityWrap  col-lg-12 col-md-6">
                <label className="cust-label text-left">
                  Select Pet Type
                  <span className="mandatory">*</span>
                </label>

                <select
                  value={petType}
                  name="brand_name"
                  onChange={(e) => {
                    setFormChanged(true);
                    setPetType(e.target.value);
                  }}
                  style={{ padding: "7px" }}
                >
                  {PetType.length &&
                    PetType?.map((pet) => (
                      <option value={pet?.value} key={pet?.id}>
                        {pet?.value}
                      </option>
                    ))}
                </select>
              </div>
            </Row>

            <Row className="col-md-11 col-sm-6  addUsernameFieldWrap">
              <div className="checkAvailabilityWrap  col-lg-12 col-md-6">
                <label className="cust-label text-left">
                  Select Category
                  <span className="mandatory">*</span>
                </label>

                <select
                  value={category}
                  name="brand_name"
                  onChange={(e) => {
                    setFormChanged(true);
                    setCategory(e.target.value);
                  }}
                  style={{ padding: "7px" }}
                >
                  {prodCat?.productCategories?.categories?.length &&
                    prodCat?.productCategories?.categories?.map((cat) => (
                      <option value={cat?.id} key={cat?.id}>
                        {cat.category_name}
                      </option>
                    ))}
                </select>
              </div>
            </Row>

            <Row className="col-md-11 col-sm-6  addUsernameFieldWrap">
              <div className="checkAvailabilityWrap  col-lg-12 col-md-6">
                <label className="cust-label text-left">
                  Select Gst Category
                  <span className="mandatory">*</span>
                </label>

                <select
                  value={gstCategory}
                  name="brand_name"
                  onChange={(e) => {
                    setFormChanged(true);
                    setgstCategory(e.target.value);
                  }}
                  style={{ padding: "7px" }}
                >
                  {prodCat?.gst?.gst_class?.length &&
                    prodCat?.gst?.gst_class?.map((cat) => (
                      <option value={cat?.gst_id} key={cat?.gst_id}>
                        {cat.gst_percentage}
                      </option>
                    ))}
                </select>
              </div>
            </Row>

            <div className="mt-4 text-center">
              <button
                type="submit"
                className="btn waves-effect waves-light cust_no_shadow cust-save-btn cust-saveButton"
                disabled={disableSubmit ? true : false}
              >
                SAVE AND NEXT
              </button>
            </div>
          </Card>
        </Col>
      </form>

      <div>
        {name.length && !nameClick ? (
          <ul
            className={`${
              prodCat?.admin_product_feature?.suggestions?.length
                ? "superstar-suggestion-list-container"
                : "superstar-suggestion-empty-container"
            } col-md-6 p-0 m-0`}
          >
            {prodCat?.admin_product_feature?.suggestions?.length
              ? prodCat?.admin_product_feature?.suggestions?.map(
                  (product, index) => (
                    <li key={index} className=" superstar-suggestion-list">
                      <a
                        className="cursor-pointer superstar-suggestion-list_link"
                        onClick={() => {
                          setName(product?.product_name);
                          setNameClick(true);
                        }}
                      >
                        {product?.product_name}
                      </a>
                    </li>
                  )
                )
              : null}
          </ul>
        ) : null}
      </div>

      <ConfirmationAlert
        {...promptMessage}
        modal_center={showPromptPopUp}
        setmodal_center={setShowPromptPopUp}
        onOK={redirectMethod}
      />
      {prodCat?.loading && <Loader />}
    </div>
  );
};

export default AddProduct;

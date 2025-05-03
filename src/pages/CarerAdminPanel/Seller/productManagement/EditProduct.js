import React, { useEffect, useState } from "react";
import { Col, Card, Row, Input, UncontrolledAlert } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Prompt, useParams } from "react-router-dom";

import BackButton from "../../../../components/UI/BackButton";
import Breadcrumbs from "../../../../components/UI/Tables/Breadcrumb";
// import ConfirmationAlert from "../../components/UI/ConfirmationAlert";

import {
  editProductDetails,
  getProductById,
  getProductCategoryDetails,
} from "../../../../store/serviceProvider/Seller/action";
import Loader from "../../../../components/UI/Loader";
import ConfirmationAlert from "../../../../components/confiramtionAlert";

const EditProduct = () => {
  const [name, setName] = useState("");
  const [brandName, setbrandName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [formChanged, setFormChanged] = useState(false);
  const [showPromptPopUp, setShowPromptPopUp] = useState(false);
  const [promptMessage, setPromptMessage] = useState({});
  const [backToListing, setBackToListing] = useState(false);
  const [petType, setPetType] = useState("Dogs");
  const params = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  const prod = useSelector((state) => state.Product);

  useEffect(() => {
    dispatch(getProductById({ data: { pid: params?.id } }));
  }, []);

  useEffect(() => {
    prod?.productDetails?.product_name &&
      setName(prod?.productDetails?.product_name);
    prod?.productDetails?.brand_name &&
      setbrandName(prod?.productDetails?.brand_name);
    prod?.productDetails?.product_description &&
      setDescription(prod?.productDetails?.product_description);
    prod?.productDetails?.category_id &&
      setCategory(prod?.productDetails?.category_id);
    prod?.productDetails?.ideal_for &&
      setPetType(prod?.productDetails?.ideal_for);
  }, [prod?.productDetails]);

  useEffect(() => {
    dispatch(getProductCategoryDetails({ data: { ideal_for: petType } }));
    setCategory(prod?.first_category);
  }, [prod?.first_category, petType]);

  const handleValidSubmit = (event, values) => {
    event.preventDefault();
    const product = {
      product_name: name,
      product_description: description,
      brand_name: brandName,
      category_id: category,
      pid: params.id,
    };
    dispatch(
      editProductDetails({
        product: product,
        callback: () => history.push("/carer/seller/product-management"),
      })
    );
  };

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

  // useEffect(()=>)

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

      <div className="d-flex justify-content-between">
        <BackButton
          label="Products"
          handleClick={() => history.push("/carer/seller/product-management")}
          // handleClick={() => (formChanged ? confirmBack() : redirectMethod())}
        />
        <div>
          <a
            className=" btn btn-dark mt-3"
            style={{
              background: "transparent",
              color: "#333",
            }}
            href={`/carer/seller/product-variant-edit/${params.id}`}
          >
            Edit Variants
          </a>

          <a
            className=" btn btn-dark mt-3"
            style={{
              background: "transparent",
              color: "#333",
            }}
            href={`/carer/seller/product-editFeatures/${params.id}`}
          >
            Edit Features
          </a>
        </div>
      </div>
      <Breadcrumbs title="Tables" breadcrumbItem="Edit Product" />
      {(prod?.error || prod?.success) && (
        <div>
          <UncontrolledAlert
            color={prod?.error ? "danger" : "success"}
            className="alert-dismissible fade show"
            role="alert"
          >
            {prod?.error || prod?.success}
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
            <Row className="col-md-12 addUsernameFieldWrap ">
              <div className="checkAvailabilityWrap  col-lg-6 col-md-6">
                <label className="cust-label text-left">
                  Enter Product Name
                  <span className="mandatory">*</span>
                </label>
                <Input
                  value={name}
                  name="product_name"
                  placeholder="Enter Product Name"
                  onChange={(e) => {
                    setFormChanged(true);
                    setName(e.target.value);
                  }}
                />
              </div>
            </Row>

            <Row className="col-md-12 addUsernameFieldWrap">
              <div className="checkAvailabilityWrap  col-lg-6 col-md-6">
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

            <Row className="col-md-12 addUsernameFieldWrap">
              <div className="checkAvailabilityWrap  col-lg-6 col-md-6">
                <label className="cust-label text-left">
                  Enter Brand Name
                  <span className="mandatory">*</span>
                </label>
                <Input
                  value={brandName}
                  name="product_description"
                  placeholder="Enter Title"
                  onChange={(e) => {
                    setFormChanged(true);
                    setbrandName(e.target.value);
                  }}
                />
              </div>
            </Row>

            <Row className="col-md-12 addUsernameFieldWrap">
              <div className="checkAvailabilityWrap  col-lg-6 col-md-6">
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
                  style={{ padding: "6px", background: "#fff" }}
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

            <Row className="col-md-12 addUsernameFieldWrap">
              <div className="checkAvailabilityWrap  col-lg-6 col-md-6">
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
                  style={{ padding: "6px", background: "#fff" }}
                >
                  {prod?.productCategories?.categories?.length &&
                    prod?.productCategories?.categories?.map((cat) =>
                      prod?.productDetails?.category_id == category ? (
                        <option selected value={cat?.id} key={cat?.id}>
                          {cat.category_name}
                        </option>
                      ) : (
                        <option value={cat?.id} key={cat?.id}>
                          {cat.category_name}
                        </option>
                      )
                    )}
                </select>
              </div>
            </Row>

            <div className="mt-4 text-center">
              <button
                type="submit"
                className="btn waves-effect waves-light cust_no_shadow cust-save-btn cust-saveButton"
                // disabled={disableSubmit ? false : true}
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
      {prod?.loading && <Loader />}
    </div>
  );
};

export default EditProduct;

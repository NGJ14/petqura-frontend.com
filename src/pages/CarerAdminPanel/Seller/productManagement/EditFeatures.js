import React, { useState, useEffect, useRef } from "react";
import { Col, Input, Row, UncontrolledAlert } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import Breadcrumbs from "../../../../components/UI/Tables/Breadcrumb";

import { AvForm } from "availity-reactstrap-validation";
import AvInput from "availity-reactstrap-validation/lib/AvInput";
import {
  addFeaturesDetails,
  editFeaturesDetails,
  getProductById,
  getProductSuggestion,
} from "../../../../store/serviceProvider/Seller/action";
import ConfirmationAlert from "../../../../components/confiramtionAlert";
import BackButton from "../../../../components/UI/BackButton";
import SuccessConfirmationAlert from "../../../../components/SuccessConfirmationAlert";
import Loader from "../../../../components/UI/Loader";

const EditFeatures = () => {
  const [error, setError] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [showPromptPopUp, setShowPromptPopUp] = useState(false);
  const promptToggle = () => {
    setShowPromptPopUp(!showPromptPopUp);
  };
  const [promptMessage, setPromptMessage] = useState({});
  const [success, setSuccess] = useState(false);
  const [successData, setSuccessData] = useState("");
  const data = useSelector((state) => state.user);
  const featuresSuggestion = useSelector((state) => state.featuresSuggestion);
  const [Features, setFeatures] = useState([{ description: "" }]);
  const history = useHistory();
  const params = useParams();

  const prod = useSelector((state) => state.Product);

  useEffect(() => {
    dispatch(getProductById({ data: { pid: params?.id } }));
    dispatch(getProductSuggestion({ request: { product_id: params?.id } }));
  }, []);

  const dispatch = useDispatch();

  useEffect(() => {
    prod?.admin_product?.suggestions?.length > 0 &&
      setFeatures(prod?.admin_product?.suggestions);
  }, [prod?.admin_product?.suggestions]);

  useEffect(() => {
    prod?.productDetails?.product_info?.features &&
      setFeatures(prod?.productDetails?.product_info?.features);
  }, [prod?.productDetails?.product_info?.features]);

  useEffect(() => {
    Features?.length &&
      Features?.map((star) => {
        if (star.username == "") {
          setDisabled(true);
        } else {
          setDisabled(false);
        }
      });
  }, [Features]);

  // handle input change
  const handlefeaturesInputChange = (e, i) => {
    let { name, value } = e.target;
    const list = [...Features];
    list[i][name] = value;
    setFeatures(list);
  };

  // handle click event of the delete button
  const handlefeaturesDeleteClick = (e, index) => {
    e.preventDefault();
    const list = [...Features];
    list.splice(index, 1);
    setFeatures(list);
  };

  // handle click event of the Add button
  const handlefeaturesAddClick = (e) => {
    setFeatures([...Features, { description: "" }]);
  };

  // handle submit event

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      editFeaturesDetails({
        features: { features: Features, product_id: params?.id },
        callback: () => {
          promptToggle();
          // history.push(`/carer/seller/product-image-add/${params?.id}`);
          setSuccess(true);
          setSuccessData("Admin suggested stars updated ");
          setError("");
        },
      })
    );
  };

  useEffect(() => {
    if (Features.length >= 3) {
      Features?.forEach((feature) => {
        if (feature.description == "") {
          setDisabled(true);
        } else {
          setDisabled(false);
        }
      });
    } else {
      return setDisabled(true);
    }
  }, [Features]);

  return (
    <div className="page-content cust-page" data-testid="component-faqAddNew">
      <Breadcrumbs title="Tables" breadcrumbItem="Product Features" />
      <BackButton
        label="Products Details"
        handleClick={() =>
          history.push(`/carer/seller/product-edit/${params?.id}`)
        }
      />
      {success && (
        <div>
          <UncontrolledAlert
            color="success"
            className="alert-dismissible fade show"
            role="alert"
          >
            {featuresSuggestion?.success}
          </UncontrolledAlert>
        </div>
      )}

      {(data?.error || prod?.error) && (
        <div>
          <UncontrolledAlert
            color="danger"
            className="alert-dismissible fade show"
            role="alert"
          >
            {data?.error || prod?.error}
          </UncontrolledAlert>
        </div>
      )}

      {error && (
        <div>
          <UncontrolledAlert
            color="danger"
            className="alert-dismissible fade show"
            role="alert"
          >
            {error}
          </UncontrolledAlert>
        </div>
      )}
      <AvForm
        onSubmit={(e, v) => {
          handleSubmit(e, v);
        }}
      >
        <div className="mt-3">
          <span className="px-3 text-danger">Add Atleast 3 features</span>
        </div>
        <div className="mt-4">
          <Row className="col-md-7">
            {Features?.length &&
              Features?.map((x, i) => (
                <Row
                  className="col-md-12 addUsernameFieldWrap icon-align"
                  key={i}
                >
                  <Col xl={6} sm={10}>
                    <label
                      htmlFor="features"
                      className="col-md-8 px-0"
                      style={{ fontWeight: "5 00" }}
                    >
                      Product Feature {i + 1}
                      <span className="mandatory">*</span>
                    </label>
                    <div>
                      {/* <AvInput
                        name="title"
                        autoComplete="off"
                        className="form-control admin-select-field my-4"
                        value={x.title}
                        placeholder="Enter Feature Title"
                        id="features"
                        onChange={(e) => {
                          handlefeaturesInputChange(e, i);
                        }}
                      /> */}
                      <AvInput
                        type="textarea"
                        rows={8}
                        name="description"
                        className="form-control admin-select-field "
                        value={x.description}
                        placeholder="Enter Feature Description"
                        id="features"
                        onChange={(e) => {
                          handlefeaturesInputChange(e, i);
                        }}
                      />
                    </div>
                  </Col>
                  <Col xl={6} md={4} className="super-star-btn-container">
                    {Features?.length - 1 === i && (
                      <>
                        <button
                          onClick={(e) => {
                            setSuccess(false);
                            handlefeaturesAddClick();
                          }}
                          className="btn btn-primary"
                          title="Add More"
                        >
                          Add More
                        </button>
                      </>
                    )}
                    {Features?.length !== 1 && (
                      <button
                        className="btn btn-danger mx-3"
                        onClick={(e) => {
                          setSuccess(false);
                          handlefeaturesDeleteClick(e, i);
                        }}
                        title="Delete"
                      >
                        Delete
                      </button>
                    )}
                  </Col>
                </Row>
              ))}
            <Col xl={8}>
              <button
                className="btn btn-primary mx-4 mt-4 mb-5"
                title="Submit"
                disabled={disabled ? true : false}
              >
                Submit
              </button>
            </Col>
          </Row>
        </div>
      </AvForm>
      <SuccessConfirmationAlert
        {...promptMessage}
        modal_center={showPromptPopUp}
        setmodal_center={setShowPromptPopUp}
        content="Product Features Updated"
        toggle={promptToggle}
        okHandleClick={() =>
          history?.push(`/carer/seller/product-edit/${params?.id}`)
        }
        okHandle
      />
      {prod?.loading && <Loader />}
    </div>
  );
};

export default EditFeatures;

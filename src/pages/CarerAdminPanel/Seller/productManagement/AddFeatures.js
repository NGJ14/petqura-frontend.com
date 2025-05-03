import React, { useState, useEffect, useRef } from "react";
import { Col, Input, Row, UncontrolledAlert } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import Breadcrumbs from "../../../../components/UI/Tables/Breadcrumb";

import { AvForm } from "availity-reactstrap-validation";
import AvInput from "availity-reactstrap-validation/lib/AvInput";
import {
  addFeaturesDetails,
  getProductFeatureSuggestion,
  getProductSuggestion,
} from "../../../../store/serviceProvider/Seller/action";

const AddFeatures = () => {
  const [error, setError] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [index, setIndex] = useState();
  const [success, setSuccess] = useState(false);
  const [successData, setSuccessData] = useState("");
  const data = useSelector((state) => state.user);
  const featuresSuggestion = useSelector((state) => state.featuresSuggestion);
  const [Features, setFeatures] = useState([{ description: "" }]);
  const history = useHistory();
  const pageWrapRef = useRef(null);
  const prodCat = useSelector((state) => state.Product);
  const [nameClick, setNameClick] = useState(false);

  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    dispatch(getProductSuggestion({ request: { product_id: params?.id } }));
  }, []);

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

  useEffect(() => {
    prodCat?.admin_product?.suggestions?.length > 0 &&
      setFeatures(prodCat?.admin_product?.suggestions);
  }, [prodCat?.admin_product?.suggestions]);

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
      addFeaturesDetails({
        feature: { features: Features, product_id: params?.id },
        callback: () => {
          history.push(`/carer/seller/product-variant-addNew/${params?.id}`);
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

      {data?.error ||
        (prodCat?.error && (
          <div>
            <UncontrolledAlert
              color="danger"
              className="alert-dismissible fade show"
              role="alert"
            >
              {data?.error || prodCat?.error}
            </UncontrolledAlert>
          </div>
        ))}

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
        <span className="px-3 text-danger">Add Atleast 3 features</span>
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
                          className="btn orange-background text-white"
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
                className="btn orange-background text-white mx-4 mt-4 mb-5"
                title="Submit"
                disabled={disabled ? true : false}
              >
                Submit
              </button>
            </Col>
          </Row>
        </div>
      </AvForm>

      {/* <div>
        {!nameClick ? (
          <ul
            className={`${
              prodCat.admin_product.suggestions?.length
                ? "superstar-suggestion-list-container"
                : "superstar-suggestion-empty-container"
            } col-md-6 p-0 m-0`}
          >
            {prodCat.admin_product.suggestions?.length
              ? prodCat.admin_product.suggestions?.map((product, index) => (
                  <li key={index} className=" superstar-suggestion-list">
                    <a
                      className="cursor-pointer superstar-suggestion-list_link"
                      onClick={() => {
                        setName(product?.title);
                        setNameClick(true);
                      }}
                    >
                      {product?.title}
                    </a>
                  </li>
                ))
              : null}
          </ul>
        ) : null}
      </div> */}
    </div>
  );
};

export default AddFeatures;

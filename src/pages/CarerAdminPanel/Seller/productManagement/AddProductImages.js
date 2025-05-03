import React, { useEffect, useState } from "react";
import { Col, Card, Row, UncontrolledAlert, Input } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  useHistory,
  Prompt,
  Link,
  useParams,
  Redirect,
} from "react-router-dom";
import BackButton from "../../../../components/UI/BackButton";
import Breadcrumbs from "../../../../components/UI/Tables/Breadcrumb";
import add_icon from "../../../../assets/icons/plus.png";
import delete_icon from "../../../../assets/icons/delete_icon.svg";

import { addProductImage } from "../../../../store/serviceProvider/Seller/action";
import Loader from "../../../../components/UI/Loader";
import ConfirmationAlert from "../../../../components/confiramtionAlert";

const AddProductImages = () => {
  const prodCat = useSelector((state) => state.Product);
  const params = useParams();
  const [img1, setImg1] = useState(null);
  const [img2, setImg2] = useState(null);
  const [img3, setImg3] = useState(null);

  const [formChanged, setFormChanged] = useState(false);
  const [showPromptPopUp, setShowPromptPopUp] = useState(false);
  const [promptMessage, setPromptMessage] = useState({});
  const [backToListing, setBackToListing] = useState(false);
  const [disableSubmit, setDisableSubmit] = useState(false);
  const [img2Disabled, setImg2Disabled] = useState(false);
  const [img3Disabled, setImg3Disabled] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  const location = {
    pathname: `/carer/seller/product-variant-addNew/${params?.id}`,
    state: { fromAddProductImage: true },
  };

  useEffect(() => {
    if (img1?.name) {
      setImg2Disabled(false);
    } else {
      setImg2Disabled(true);
    }
    if (img1?.name && img2?.name) {
      setImg3Disabled(false);
    } else {
      setImg3Disabled(true);
    }
  }, [img1, img2, img3]);

  useEffect(() => {
    if (
      img1?.name != undefined &&
      img2?.name != undefined &&
      img3?.name != undefined
    ) {
      setDisableSubmit(false);
    } else {
      setDisableSubmit(true);
    }
  }, [img1, img2, img3]);

  const handleValidSubmit = (event, values) => {
    event.preventDefault();
    let counts = 0;
    const formData = new FormData();
    if (typeof img1 == "object") {
      formData.append("image1", img1);
      counts += 1;
    }

    if (typeof img2 == "object") {
      counts += 1;
      formData.append("image2", img2);
    }

    if (typeof img3 == "object") {
      counts += 1;
      formData.append("image3", img3);
    }

    dispatch(
      addProductImage({
        image: formData,
        id: params?.id,
        count: counts,
        history: history,
        callback: () => {
          history.push(location);
        },
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
      title: "Alert",
    });
    return backToListing ? true : false;
  };

  return (
    //   return !location?.state?.fromAddProduct ? (
    //     <Redirect to="/carer/seller/product-addNew" />
    //   ) : (
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

      <form
        onSubmit={(e, v) => {
          handleValidSubmit(e, v);
        }}
      >
        <Col xl="12">
          <Card className="p-4">
            <Row className="ml-4 my-4">
              <label className="text-left mb-5">
                Choose images (260px * 273px)
                <span className="mandatory">*</span>
              </label>
              <input
                type="file"
                accept="image/x-png,image/jpeg"
                name="image"
                onChange={(e) => {
                  setImg1(e.target.files[0]);
                }}
              />
            </Row>

            <Row className="ml-4 my-2">
              {/* <label className="text-left">Select image (260px * 273px)</label> */}

              <input
                type="file"
                accept="image/x-png,image/jpeg"
                name="image"
                onChange={(e) => {
                  setImg2(e.target.files[0]);
                }}
                disabled={img2Disabled ? true : false}
              />
            </Row>

            <Row className="ml-4 my-4">
              <input
                type="file"
                accept="image/x-png,image/jpeg"
                name="image"
                onChange={(e) => {
                  setImg3(e.target.files[0]);
                }}
                disabled={img3Disabled ? true : false}
              />
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

export default AddProductImages;

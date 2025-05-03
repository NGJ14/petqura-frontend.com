import React, { useEffect, useState } from "react";
import { Col, Card, Row, UncontrolledAlert, Input } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Prompt } from "react-router-dom";

import BackButton from "../../../../components/UI/BackButton";
import Breadcrumbs from "../../../../components/UI/Tables/Breadcrumb";
import Loader from "../../../../components/UI/Loader";
import ConfirmationAlert from "../../../../components/confiramtionAlert";
import SuccessConfirmationAlert from "../../../../components/SuccessConfirmationAlert";
import { addServiceDetails } from "../../../../store/serviceProvider/Clinic/action";

const AddService = () => {
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [modal, setModal] = useState(false);
  const [formChanged, setFormChanged] = useState(false);
  const [showPromptPopUp, setShowPromptPopUp] = useState(false);
  const [promptMessage, setPromptMessage] = useState({});
  const [backToListing, setBackToListing] = useState(false);
  const [disableSubmit, setDisableSubmit] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();

  const slot = useSelector((state) => state.Slot);

  const toggle = () => {
    setModal(!modal);
    setFormChanged(false);
  };

  const handleValidSubmit = (event, values) => {
    event.preventDefault();
    const service = {
      service: name,
      description: description,
    };
    dispatch(
      addServiceDetails({
        Service: service,
        callback: () => {
          toggle();
          history.push("/carer/clinic/services");
        },
      })
    );
  };

  useEffect(() => {
    if (name == "" || description == "") {
      setDisableSubmit(true);
    } else {
      setDisableSubmit(false);
    }
  }, [name, description]);

  const confirmBack = () => {
    setShowPromptPopUp(!showPromptPopUp);
    setPromptMessage({
      id: "",
      content: "New Slot Added Successfully",
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
    // return !location?.state?.fromAddProductImage ? (
    //   <Redirect to="/carer/seller/product-addNew" />
    // ) : (
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
        label="Services"
        handleClick={() => history.push("/carer/clinic/services")}
      />
      <Breadcrumbs title="Tables" breadcrumbItem="Add Service" />
      {(slot?.error || slot?.success) && (
        <div>
          <UncontrolledAlert
            color={slot?.error ? "danger" : "success"}
            className="alert-dismissible fade show"
            role="alert"
          >
            {slot?.error || slot?.success}
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
            <Row className="col-md-8 col-lg-12   addUsernameFieldWrap d-flex">
              <div className="checkAvailabilityWrap col-lg-10 col-md-6">
                <label className="cust-label text-left">
                  Name
                  <span className="mandatory">*</span>
                </label>
                <div className="d-flex col-lg-6 pl-0 col-sm-6">
                  <Input
                    value={name}
                    type="text"
                    name="product_name"
                    className="col-lg-10 col-sm-10"
                    placeholder="Enter Name"
                    onChange={(e) => {
                      setFormChanged(true);
                      setName(e.target.value);
                    }}
                  />
                </div>
              </div>
            </Row>

            <Row className="col-md-8 col-lg-12  addUsernameFieldWrap">
              <div className="checkAvailabilityWrap  col-lg-6 col-md-12 col-xs-12">
                <label className="cust-label text-left">
                  Description
                  <span className="mandatory">*</span>
                </label>
                <div className="d-flex col-lg-12 pl-0 ">
                  <textarea
                    rows={8}
                    value={description}
                    row
                    name="product_name"
                    className="col-lg-10 col-sm-10"
                    placeholder="Enter qualification"
                    onChange={(e) => {
                      setFormChanged(true);
                      setDescription(e.target.value);
                    }}
                  />
                </div>
              </div>
            </Row>

            <div className="mt-4 text-center">
              <button
                type="submit"
                className="btn waves-effect waves-light cust_no_shadow cust-save-btn cust-saveButton"
                disabled={disableSubmit ? true : false}
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

      <SuccessConfirmationAlert
        modal_center={modal}
        setmodal_center={setModal}
        content="New Variant added successfully"
        toggle={toggle}
      />
      {slot?.loading && <Loader />}
    </div>
  );
};

export default AddService;

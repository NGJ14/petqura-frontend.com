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
import ConfirmationAlert from "../../../../components/confiramtionAlert";
import { addVariantDetails } from "../../../../store/serviceProvider/Seller/action";
import SuccessConfirmationAlert from "../../../../components/SuccessConfirmationAlert";
import moment from "moment";
import {
  editDoctorDetails,
  getDoctorById,
} from "../../../../store/serviceProvider/Clinic/action";
// import { EditDoctorDetails } from "../../../../store/serviceProvider/Clinic/action";

const EditDoctor = () => {
  const [qualification, setQualification] = useState("");
  const [position, setPosition] = useState("");
  const [photo, setPhoto] = useState(null); // holds the new file
  const [initialPhoto, setInitialPhoto] = useState(null);
  const [name, setName] = useState("");
  const [modal, setModal] = useState(false);
  const [formChanged, setFormChanged] = useState(false);
  const [showPromptPopUp, setShowPromptPopUp] = useState(false);
  const [promptMessage, setPromptMessage] = useState({});
  const [backToListing, setBackToListing] = useState(false);
  const [disableSubmit, setDisableSubmit] = useState(false);
  const params = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  const slot = useSelector((state) => state.Slot);

  const toggle = () => {
    setModal(!modal);
    setFormChanged(false);
  };

  useEffect(() => {
    dispatch(getDoctorById({ data: { doctor_id: params?.id } }));
  }, []);

  useEffect(() => {
    slot?.DoctorDetails?.doctor_name &&
      setName(slot?.DoctorDetails?.doctor_name);
    slot?.DoctorDetails?.qualifications &&
      setQualification(slot?.DoctorDetails?.qualifications);
    slot?.DoctorDetails?.description &&
      setPosition(slot?.DoctorDetails?.description);
      slot?.DoctorDetails?.profile_photo &&
      setPhoto(slot?.DoctorDetails?.profile_photo);
      slot?.DoctorDetails?.profile_photo &&
      setInitialPhoto(slot?.DoctorDetails?.profile_photo);
  }, [slot?.DoctorDetails]);

  const handleValidSubmit = (event, values) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("doctor_name", name);
    formData.append("qualification", qualification);
    formData.append("description", position);
    formData.append("doctor_id", params?.id);
    formData.append("icon", photo); 
    for (let [key, value] of formData.entries()) {
  console.log(key, value);
}
    
    dispatch(
      editDoctorDetails({
        Doctor: formData,
        callback: () => {
          toggle();
          history.push("/carer/clinic/doctors");
        },
      })
    );
  };

  useEffect(() => {
    if (name == "" || position == "" || qualification == "") {
      setDisableSubmit(true);
    } else {
      setDisableSubmit(false);
    }
  }, [name, position, qualification]);

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

      {/* <BackButton
        label="Slots"
        handleClick={() => history.push("/carer/clinic/slots")}
        // handleClick={() => (formChanged ? confirmBack() : redirectMethod())}
      /> */}
      <Breadcrumbs title="Tables" breadcrumbItem="Edit Doctor" />
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
            <Row className="col-md-8 col-lg-12 photoUploadRow d-flex align-items-center">
              <div className="col-lg-4 col-md-6">
                <label className="cust-label text-left">
                  Upload Photo
                  <span className="mandatory">*</span>
                </label>

                {/* Image preview */}
                <div className="photoPreview mb-2">
                  {photo ? (
                    <img
                      src={photo instanceof File ? URL.createObjectURL(photo) : photo}
                      alt="Preview"
                      className="img-thumbnail"
                      style={{ width: "150px", height: "150px", objectFit: "cover" }}
                    />
                  ) : (
                    <div className="img-thumbnail d-flex justify-content-center align-items-center" style={{ width: "150px", height: "150px", backgroundColor: "#f0f0f0" }}>
                      <span>No Image</span>
                    </div>
                  )}
                </div>

                {/* Input to change photo */}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setFormChanged(true);
                      setPhoto(file);
                    }
                  }}
                />
              </div>
            </Row>





            <Row className="col-md-8 col-lg-12   addUsernameFieldWrap d-flex">
              <div className="checkAvailabilityWrap col-lg-10 col-md-6">
                <label className="cust-label text-left">
                  Name
                  <span className="mandatory">*</span>
                </label>
                <div className="d-flex col-lg-4 pl-0 col-sm-6">
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
              <div className="checkAvailabilityWrap  col-lg-10 col-md-8">
                <label className="cust-label text-left">
                  Qualification
                  <span className="mandatory">*</span>
                </label>
                <div className="d-flex col-lg-4 pl-0 col-sm-6">
                  <Input
                    value={qualification}
                    type="text"
                    name="product_name"
                    className="col-lg-10 col-sm-10"
                    placeholder="Enter qualification"
                    onChange={(e) => {
                      setFormChanged(true);
                      setQualification(e.target.value);
                    }}
                  />
                </div>
              </div>
            </Row>

            <Row className="col-md-8 col-lg-12  addUsernameFieldWrap">
              <div className="checkAvailabilityWrap  col-lg-10 col-md-8">
                <label className="cust-label text-left">
                  Position
                  <span className="mandatory">*</span>
                </label>
                <div className="d-flex col-lg-4 pl-0 col-sm-6">
                  <Input
                    value={position}
                    type="text"
                    name="product_name"
                    className="col-lg-10 col-sm-10"
                    placeholder="Enter position"
                    onChange={(e) => {
                      setFormChanged(true);
                      setPosition(e.target.value);
                    }}
                  />
                </div>
              </div>
            </Row>

            <div className="mt-4 text-center">
              <a href="/carer/clinic/doctors">
                <button
                  type="button"
                  class="btn waves-effect waves-light cust_no_shadow cust-save-btn cust-saveButton"
                >
                  Back
                </button>
              </a>
              <button
                type="submit"
                className="btn waves-effect waves-light cust_no_shadow cust-save-btn cust-saveButton"
                disabled={disableSubmit ? true : false}
              >
                Save
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

export default EditDoctor;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router";
import { UncontrolledAlert } from "reactstrap";
import Loader from "../../../components/UI/Loader";
import { getLocalStorage, setLocalStorage } from "../../../helpers/utils";
import { addCarer, getCarerPersonalDetails } from "../../../store/carer/action";

const ProfileCompletion = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  let [address1, setAddress1] = useState();
  let [address2, setAddress2] = useState();
  let [city, setCity] = useState();
  let [state, setState] = useState();
  let [pin, setPin] = useState();
  let [accNo, setAccNo] = useState();
  let [accIfscCode, setAccIfscCode] = useState();
  let [beneficiaryName, setBeneficiaryName] = useState();
  let [benificaryIdProofImage, setBenificaryIdProofImage] = useState(null);
  let [idProofImage, setIdProofImage] = useState(null);
  let [name, setName] = useState();
  let [gstNo, setGstNo] = useState();
  let [description, setDescription] = useState();
  let [disableSubmit, setDisableSubmit] = useState();

  const carerDetails = useSelector((state) => state?.Carer);

  useEffect(() => {
    dispatch(getCarerPersonalDetails());
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const idFormData1 = new FormData();
    const benificaryFormData = new FormData();
    idFormData1.append("image1", idProofImage);
    benificaryFormData.append("image2", benificaryIdProofImage);
    const auth = getLocalStorage("AUTH_DETAILS");
    const user = { ...auth?.user };
    user["profile_completed"] = true;
    dispatch(
      addCarer({
        data: {
          address_line_1: address1,
          address_line_2: address2,
          city: city,
          state: state,
          pincode: pin,
          bank_account_number: accNo,
          bank_ifsc: accIfscCode,
          beneficiary_name: beneficiaryName,
          display_name: name,
          // service_description: description,
          gst_number: gstNo,
        },
        idImage: idFormData1,
        // benificaryImage: benificaryFormData,

        callback: () => {
          history.push("/carer/seller/dashboard");
          setLocalStorage("AUTH_DETAILS", { ...auth, user });
        },
      })
    );
  };

  useEffect(() => {
    if (
      address1 == "" ||
      address2 == "" ||
      city == "" ||
      pin == "" ||
      accNo == "" ||
      accIfscCode == "" ||
      beneficiaryName == "" ||
      name == "" ||
      // description == "" ||
      gstNo == "" ||
      idProofImage == null
    ) {
      setDisableSubmit(true);
    } else {
      setDisableSubmit(false);
    }
  }, [
    address1,
    address2,
    city,
    pin,
    accNo,
    accIfscCode,
    beneficiaryName,
    name,
    gstNo,
    idProofImage,
  ]);

  const auth = getLocalStorage("AUTH_DETAILS");

  return auth?.user?.profile_completed && !auth?.user?.admin_approved ? (
    <Redirect to="/carer/under-verification" />
  ) : auth?.user?.profile_completed && auth?.user?.admin_approved ? (
    <Redirect to="/carer/seller/dashboard" />
  ) : (
    <div
      className="page-content cust-page justify-content-center align-items-center"
      data-testid="component-faqAddNew"
    >
      <div className="main-content ">
        {/* Top seller-navbar */}

        {/* Header */}

        {/* Page content */}
        <div className="seller-container-fluid mt--7">
          <div className="row">
            <div className="col-xl-12 order-xl-1">
              <div className="seller-card bg-secondary shadow">
                <div className="seller-card-header bg-white border-0">
                  <div className="row align-items-center">
                    {(carerDetails?.error || carerDetails?.success) && (
                      <div>
                        <UncontrolledAlert
                          color={carerDetails?.error ? "danger" : "success"}
                          className="alert-dismissible fade show"
                          role="alert"
                        >
                          {carerDetails?.error || carerDetails?.success}
                        </UncontrolledAlert>
                      </div>
                    )}
                    <div className="seller-col-8">
                      <h3 className="mb-0">Complete Profile</h3>
                    </div>
                  </div>
                </div>
                <div className="seller-card-body">
                  <h6 className=" text-muted mb-4">Personnal information</h6>
                  <form onSubmit={handleSubmit}>
                    <div className="pl-lg-4">
                      <div className="row">
                        <div className="col-md-5">
                          <div className="seller-form-group focused">
                            <label
                              className="seller-form-control-label"
                              htmlFor="input-first-name"
                            >
                              First name
                            </label>
                            <input
                              type="text"
                              id="input-first-name"
                              className="seller-form-control seller-form-control-alternative"
                              value={carerDetails?.carer?.first_name}
                              disabled={true}
                            />
                          </div>
                        </div>
                        <div className="col-md-5">
                          <div className="seller-form-group focused">
                            <label
                              className="seller-form-control-label"
                              htmlFor="input-last-name"
                            >
                              Last name
                            </label>
                            <input
                              type="text"
                              id="input-last-name"
                              className="seller-form-control seller-form-control-alternative"
                              value={carerDetails?.carer?.last_name}
                              disabled={true}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-5">
                          <div className="seller-form-group focused">
                            <label
                              className="seller-form-control-label"
                              htmlFor="input-username"
                            >
                              Phone Number
                            </label>
                            <input
                              type="text"
                              id="input-username"
                              className="seller-form-control seller-form-control-alternative"
                              value={carerDetails?.carer?.phone}
                              disabled={true}
                            />
                          </div>
                        </div>
                        <div className="col-md-5">
                          <div className="seller-form-group">
                            <label
                              className="seller-form-control-label"
                              htmlFor="input-email"
                            >
                              Email address
                            </label>
                            <input
                              type="email"
                              id="input-email"
                              className="seller-form-control seller-form-control-alternative"
                              value={carerDetails?.carer?.email}
                              disabled={true}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr className="my-4" />
                    {/* Contact information */}
                    <h6 className=" text-muted mb-4">Contact information</h6>
                    <div className="pl-lg-4">
                      <div className="row">
                        <div className="col-md-5">
                          <div className="seller-form-group focused">
                            <label
                              className="seller-form-control-label"
                              htmlFor="input-address"
                            >
                              Address Line 1
                            </label>
                            <input
                              id="input-address"
                              className="seller-form-control seller-form-control-alternative"
                              placeholder="Home Address"
                              // defaultValue="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                              type="text"
                              value={address1}
                              onChange={(e) => setAddress1(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="col-md-5">
                          <div className="seller-form-group focused">
                            <label
                              className="seller-form-control-label"
                              htmlFor="input-address"
                            >
                              Address Line 2
                            </label>
                            <input
                              id="input-address"
                              className="seller-form-control seller-form-control-alternative"
                              placeholder="Home Address"
                              // defaultValue="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                              type="text"
                              value={address2}
                              onChange={(e) => setAddress2(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="col-md-5">
                          <div className="seller-form-group focused">
                            <label
                              className="seller-form-control-label"
                              htmlFor="input-city"
                            >
                              City
                            </label>
                            <input
                              type="text"
                              id="input-city"
                              className="seller-form-control seller-form-control-alternative"
                              placeholder="City"
                              value={city}
                              onChange={(e) => setCity(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-md-5">
                          <div className="seller-form-group focused">
                            <label
                              className="seller-form-control-label"
                              htmlFor="input-state"
                            >
                              State
                            </label>
                            <input
                              type="text"
                              id="input-state"
                              className="seller-form-control seller-form-control-alternative"
                              placeholder="State"
                              value={state}
                              onChange={(e) => setState(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-md-5">
                          <div className="seller-form-group">
                            <label
                              className="seller-form-control-label"
                              htmlFor="input-pin"
                            >
                              Pin code
                            </label>
                            <input
                              type="number"
                              id="input-pin"
                              className="seller-form-control seller-form-control-alternative"
                              placeholder="Pin code"
                              value={pin}
                              onChange={(e) => setPin(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr className="my-4" />
                    {/* Contact information */}
                    <h6 className=" text-muted mb-4">Bank Details</h6>
                    <div className="pl-lg-4">
                      <div className="row">
                        <div className="col-md-5">
                          <div className="seller-form-group">
                            <label
                              className="seller-form-control-label"
                              htmlFor="input-acc-no"
                            >
                              Bank Account Number
                            </label>
                            <input
                              type="text"
                              id="input-acc-no"
                              className="seller-form-control seller-form-control-alternative"
                              placeholder="Bank Account Number"
                              value={accNo}
                              onChange={(e) => setAccNo(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-md-5">
                          <div className="seller-form-group">
                            <label
                              className="seller-form-control-label"
                              htmlFor="input-ifsc-code"
                            >
                              Bank IFSC Code
                            </label>
                            <input
                              type="text"
                              id="input-ifsc-code"
                              className="seller-form-control seller-form-control-alternative"
                              placeholder="Bank Account IFSC Code"
                              value={accIfscCode}
                              onChange={(e) => setAccIfscCode(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="col-md-5">
                          <div className="seller-form-group">
                            <label
                              className="seller-form-control-label"
                              htmlFor="input-benificary-name"
                            >
                              Benificary Name
                            </label>
                            <input
                              type="text"
                              id="input-postal-code"
                              className="seller-form-control seller-form-control-alternative"
                              placeholder="Benificary Name"
                              value={beneficiaryName}
                              onChange={(e) =>
                                setBeneficiaryName(e.target.value)
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <>
                      <hr className="my-4" />
                      <h6 className=" text-muted mb-4">Detailed info </h6>
                      <div className="pl-lg-4">
                        <div className="row">
                          <div className="col-md-5">
                            <div className="seller-form-group focused">
                              <label className="seller-form-control-label h5">
                                {auth?.user?.role?.slice(0, 1).toUpperCase()}
                                {auth?.user?.role?.slice(1)}'s Name (Display
                                Name)
                              </label>
                              <input
                                type="text"
                                id="input-state"
                                className="seller-form-control seller-form-control-alternative"
                                placeholder="display name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                    <hr className="my-4" />

                    <>
                      <h6 className=" text-muted mb-4">Benificary IDs</h6>
                      <div className="pl-lg-4">
                        <div className="row">
                          <div className="seller-col-md-12">
                            <div className="seller-form-group focused">
                              <label className="seller-form-control-label">
                                {auth?.user?.role == "seller"
                                  ? "Shop License"
                                  : auth?.user?.role == "clinic"
                                  ? "Incorption certificate"
                                  : null}
                              </label>
                              <input
                                type="file"
                                accept="image/x-png,image/jpeg"
                                name="image"
                                onChange={(e) => {
                                  setIdProofImage(e.target.files[0]);
                                }}
                              />
                            </div>
                          </div>
                          <div className="col-md-5">
                            <div className="seller-form-group">
                              <label className="seller-form-control-label">
                                GST Number
                              </label>
                              <input
                                type="text"
                                id="input-acc-no"
                                className="seller-form-control seller-form-control-alternative"
                                placeholder="GST Number"
                                value={gstNo}
                                onChange={(e) => setGstNo(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </>

                    <button
                      type="submit"
                      className="btn ok-button mt-4 ml-4 mb-5"
                      disabled={disableSubmit}
                    >
                      Save Changes
                    </button>
                    {/* <hr className="my-4" /> */}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {carerDetails?.loading && <Loader />}
    </div>
  );
};

export default ProfileCompletion;

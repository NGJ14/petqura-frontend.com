import React, { useState } from "react";
import { Redirect, useHistory } from "react-router";
import { getLocalStorage } from "../../../helpers/utils";
import logo from "../../../assets/images/logo.jpg";
import logoImg from "../../../assets/images/pawwalker_white_text.png";
import { useDispatch, useSelector } from "react-redux";
import { carerLoginUser } from "../../../store/carer/action";
import "react-phone-number-input/style.css";

import StepOne from "./forgotStepOne";
import StepTwo from "./forgotStepTwo";
import StepThree from "./forgotStepThree";
import StepFour from "./forgotStepFour";
import SuccessConfirmationAlert from "../../../components/SuccessConfirmationAlert";

const CarerLogin = () => {
  const Carer = useSelector((state) => state.Carer);
  const dispatch = useDispatch();
  let [showPwd, setShowPwd] = useState(false);
  const showPasswordClass = "fa fa-eye-slash";
  const hidePasswordClass = "fa fa-eye";
  let [loginPhone, setLoginPhone] = useState();
  let [signinPhone, setsignPhone] = useState("");
  let [loginPassword, setLoginPassword] = useState();
  //state for steps
  const [step, setstep] = useState(1);
  //state for form data
  const [formData, setFormData] = useState({
    phone: "",
  });
  const [modal, setModal] = useState(false);

  const history = useHistory();
  const handleCarerValidLoginSubmit = (e, v) => {
    e.preventDefault();
    dispatch(
      carerLoginUser({
        data: { phone: signinPhone, password: loginPassword },
        callback: () => {
          if (!getLocalStorage("AUTH_DETAILS")?.user?.profile_completed) {
            history.push("/carer/complete-profile");
          } else if (!getLocalStorage("AUTH_DETAILS")?.user?.admin_approved) {
            history.push("/carer/under-verification");
          } else if (getLocalStorage("AUTH_DETAILS")?.user?.role == "seller")
            history.push("/carer/seller/dashboard");
          else if (getLocalStorage("AUTH_DETAILS")?.user?.role == "clinic")
            history.push("/carer/clinic/dashboard");
          setLoginPhone("");
          setLoginPassword("");
        },
      })
    );
  };
  const toggle = () => {
    setModal(!modal);
  };

  // function for going to next step by increasing step state by 1
  const nextStep = () => {
    setstep(step + 1);
  };

  // function for going to previous step by decreasing step state by 1
  const prevStep = () => {
    setstep(step - 1);
  };

  // handling form input data by taking onchange value and updating our previous form data state
  const handleInputDataVal = (input, value) => {
    //updating for data state taking previous state and then adding new value to create new object
    console.log("from Input", input);
    setFormData((prevState) => ({
      ...prevState,
      [input]: value,
    }));
  };

  const renderSwitch = (step) => {
    switch (step) {
      case 1:
        return (
          <StepOne
            nextStep={nextStep}
            haldleFormDataVal={handleInputDataVal}
            values={formData}
          />
        );
      // case 2 to show stepTwo form passing nextStep, prevStep, and handleInputData as handleFormData method as prop and also formData as value to the fprm
      case 2:
        return (
          <StepTwo
            nextStep={nextStep}
            prevStep={prevStep}
            haldleFormDataVal={handleInputDataVal}
            values={formData}
            toggle={toggle}
          />
        );
      case 3:
        return (
          <StepThree
            nextStep={nextStep}
            prevStep={prevStep}
            haldleFormDataVal={handleInputDataVal}
            values={formData}
            toggle={toggle}
          />
        );
      case 4:
        return (
          <StepFour
            nextStep={nextStep}
            prevStep={prevStep}
            haldleFormDataVal={handleInputDataVal}
            values={formData}
            toggle={toggle}
          />
        );
      default:
        return (
          <StepOne
            nextStep={nextStep}
            haldleFormDataVal={handleInputDataVal}
            values={formData}
          />
        );
    }
  };

  return getLocalStorage("AUTH_DETAILS") &&
    getLocalStorage("AUTH_DETAILS")?.user?.role == "seller" ? (
    <Redirect to="/carer/seller/dashboard" />
  ) : getLocalStorage("AUTH_DETAILS")?.user?.role == "clinic" ? (
    <Redirect to="/carer/clinic/dashboard" />
  ) : (
    <>
      <div className="wrapper">
        <div className="row">
          <div
            className="col-md-6 col-sm-12 col-12 no-float"
            style={{
              backgroundColor: "#ff6b00",
              display: "table",
              textAlign: "center",
            }}
          >
            <div
              className="txt"
              style={{
                display: "table-cell",
                verticalAlign: "middle",
              }}
            >
              <img
                src={logoImg}
                style={{
                  backgroundSize: "contain",
                  width: "75%",
                }}
              />
            </div>
          </div>
          <div
            className="col-md-6 col-sm-12 col-12 no-float"
            style={{ backgroundColor: "#f8f9fa", position: "relative" }}
          >
            <button
              type="button"
              className="btn btn-light mt-4 mr-30 pt-2 pull-right"
            >
              <a href="/" className="text-dark  font-weight-normal">
                Return to home
              </a>
            </button>
            <div
              className="service-provider-login"
              style={{ margin: "0", position: "absolute", top: "40%" }}
            >
              <h3 className="mt-0 line-height-1 mb-40 ">
                <span className="ml-0">
                  Forgot <span className="orange-font ml-0">Password ?</span>
                </span>
              </h3>
              {renderSwitch(step)}
            </div>
          </div>
        </div>
      </div>
      <SuccessConfirmationAlert
        modal_center={modal}
        setmodal_center={setModal}
        content="Account created successfully"
        toggle={toggle}
        okHandleClick={() => history.push("/carer/login")}
        okHandle
      />
    </>
  );
};

export default CarerLogin;

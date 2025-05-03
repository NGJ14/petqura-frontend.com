import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCarerType } from "../../../store/carer/action";
import {
  registerCarer,
  sendCarerOtp,
  verifyCarerOtp,
} from "../../../store/CarerRegister/actions";
import logo from "../../../assets/images/logo.jpg";
import Footer from "../../../components/Layout/footer";
import { Redirect, useHistory } from "react-router";
import {
  checkIfValidEmail,
  getLocalStorage,
  checkIfValidPasswordWithSpecialCharacters,
  checkIfValidPasswordWithNumbers,
} from "../../../helpers/utils";
import SuccessConfirmationAlert from "../../../components/SuccessConfirmationAlert";

import StepOne from "./StepOne";
import StepTwo from "./StepTwo";

import "react-phone-number-input/style.css";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";

const CarerRegister = () => {
  const CarerRegister = useSelector((state) => state.CarerRegister);

  const [modal, setModal] = useState(false);

  //state for steps
  const [step, setstep] = useState(1);

  //state for form data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    businessType: "",
    userName: "",
    password: "",
    phone: "",
  });

  // function for going to next step by increasing step state by 1
  const nextStep = () => {
    setstep(step + 1);
  };

  // function for going to previous step by decreasing step state by 1
  const prevStep = () => {
    setstep(step - 1);
  };

  // handling form input data by taking onchange value and updating our previous form data state
  // const handleInputData = (input) => (e) => {
  //   // input value from the form
  //   const { value } = e.target;
  //   //console.log(e.target);
  //   //updating for data state taking previous state and then adding new value to create new object
  //   setFormData((prevState) => ({
  //     ...prevState,
  //     [input]: value,
  //   }));
  // };

  // handling form input data by taking onchange value and updating our previous form data state
  const handleInputDataVal = (input, value) => {
    //updating for data state taking previous state and then adding new value to create new object
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

  const history = useHistory();
  const toggle = () => {
    setModal(!modal);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCarerType());
  }, []);

  // const [seconds, setSeconds] = useState(60);

  // useEffect(() => {
  // if (timer && seconds > 0) {
  // setTimeout(() => setSeconds(seconds - 1), 1000);
  // }
  // }, [seconds]);

  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(2);

  function updateTime() {
    // if (showTimer == true) {
    if (minutes == 0 && seconds == 0) {
      //reset
      setSeconds(0);
      setMinutes(0);
    } else {
      if (seconds == 0) {
        setMinutes((minutes) => minutes - 1);
        setSeconds(59);
      } else {
        setSeconds((seconds) => seconds - 1);
      }
    }
    // }
  }

  useEffect(() => {
    const token = setTimeout(updateTime, 1000);

    return function cleanUp() {
      clearTimeout(token);
    };
  }, []);

  // useEffect(() => {
  //   if (!registerphoneValild || registerPhone == "") {
  //     setDisablePhone(true);
  //   } else {
  //     setDisablePhone(false);
  //   }
  // }, [registerphoneValild, registerPhone]);

  return getLocalStorage("AUTH_DETAILS") &&
    getLocalStorage("AUTH_DETAILS")?.user?.role != "pet_owner" ? (
    <Redirect to="/carer/seller/dashboard" />
  ) : (
    <>
      <header className=" header-container  d-flex justify-content-between">
        <a href="/">
          <img src={logo} />{" "}
        </a>

        <a href="/" className="text-dark mt-4 mr-4 pt-2">
          Return to home
        </a>
      </header>
      <div className="main-content">
        <section
          className="divider parallax layer-overlay overlay-dark-8 carer-cust-margin"
          data-bg-img="http://placehold.it/1920x1280"
        >
          <div className="container-fluid p-0">
            <div className="row equal-height">
              <div className="col-md-5 bg-light pt-30">
                <div className="p-70">
                  <div className="row">
                    <div className="col-md-12">
                      <h2 className="mt-0 line-height-1 mb-20">
                        <span>
                          Sign Up
                          <span className="text-theme-colored"> Now</span>
                        </span>
                      </h2>
                      {CarerRegister?.error &&
                        typeof CarerRegister?.error === "string" &&
                        (CarerRegister?.error !=
                          "An account already exists with this phone number" ||
                          CarerRegister?.error != "Invalid OTP") && (
                          <p className="text-danger mt-0 mb-4 ml-2">
                            {CarerRegister?.error}
                          </p>
                        )}
                      {renderSwitch(step)}

                      <div className="form-group mb-0 mt-20">
                        <h5 className="mt-4">
                          Already have an account?{" "}
                          <a href="/carer/login" className="text-info">
                            Login
                          </a>
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-7">
                <div className="p-70">
                  <div className="row">
                    <div
                      className=" col-xs-12 col-sm-5 col-md-6 col-lg-6 mb-md-50 text-white mb-50
 "
                    >
                      <div className="funfact text-center">
                        <div className="funfact-content">
                          <div className="funfact-icon">
                            <i className="flaticon-pet-man font-100" />
                          </div>

                          <h4 className="text-uppercase text-white">
                            Service Provider
                          </h4>
                          {/* <p>
                          Architecto ullam tenetur quia nemo ratione tempora.
                        </p> */}
                        </div>
                      </div>
                    </div>
                    <div
                      className="col-xs-12 col-sm-5 col-md-6 col-lg-6 mb-md-50 text-white mb-100
 "
                    >
                      <div className="funfact text-center">
                        <div className="funfact-content">
                          <div className="funfact-icon">
                            <i className="flaticon-pet-veterinarian-hospital font-100" />
                          </div>

                          <h4 className="text-uppercase text-white">Clinic</h4>
                          {/* <p>
                          Architecto ullam tenetur quia nemo ratione tempora.
                        </p> */}
                        </div>
                      </div>
                    </div>
                    <div
                      className=" col-xs-12 col-sm-5 col-md-6 col-lg-6 mb-md-50 text-white mb-20
 "
                    >
                      <div className="funfact text-center">
                        <div className="funfact-content">
                          <div className="funfact-icon">
                            <i className="flaticon-pet-shopping-cart-with-product-inside font-100" />
                          </div>

                          <h4 className="text-uppercase text-white">Store</h4>
                          {/* <p>
                          Architecto ullam tenetur quia nemo ratione tempora.
                        </p> */}
                        </div>
                      </div>
                    </div>
                    <div
                      className=" col-xs-12 col-sm-5 col-md-6 col-lg-6 mb-md-50 text-white mb-20
 "
                    >
                      <div className="funfact text-center">
                        <div className="funfact-content">
                          <div className="funfact-icon">
                            <i className="flaticon-pet-feeding-the-dog  font-100" />
                          </div>

                          <h4 className="text-uppercase text-white">Carer</h4>
                          {/* <p>
                          Architecto ullam tenetur quia nemo ratione tempora.
                        </p> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />

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

export default CarerRegister;

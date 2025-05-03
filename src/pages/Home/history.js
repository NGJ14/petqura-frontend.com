import React, { useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import SuccessConfirmationAlert from "../../components/SuccessConfirmationAlert";
import { getHistoryDetails } from "../../store/UserStore/ContactUs/action";

const History = ({ contactRef }) => {
  const dispatch = useDispatch();
  const ContactUs = useSelector((state) => state.ContactUs);
  const [modal, setModal] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [disableSubmit, setDisableSubmit] = useState(false);
  const toggle = () => {
    setModal(!modal);
  };
  useEffect(() => {
    dispatch(getHistoryDetails());
  }, [dispatch]);

  useEffect(() => {
    if (name == "" || email == "" || phone == "" || message == "") {
      setDisableSubmit(true);
    } else {
      setDisableSubmit(false);
    }
  }, [name, email, phone, message]);

  const handleSubmit = (e) => {
    e.preventDefault();
    toggle();
    setMessage("");
    setName("");
    setEmail("");
    setPhone("");
  };
  return (
    <div id="contact">
      <section
        className="divider parallax layer-overlay overlay-dark-8"
        data-bg-img="http://placehold.it/1920x1280"
      >
        <div className="container-fluid p-0">
          <div className="row equal-height">
            <div className="col-md-5 col-md-offset-1">
              <div className="pt-50">
                <div className="row">
                  <div
                    className="
            col-xs-12 col-sm-6 col-md-6 col-lg-6
            mb-md-50
            text-white
            mb-20
          "
                  >
                    <div className="funfact text-center">
                      <div className="funfact-content">
                        <div className="funfact-icon">
                          <i className="flaticon-pet-man font-50" />
                        </div>
                        <h2
                          data-animation-duration={2000}
                          data-value={754}
                          className="
                  animate-number
                  
                  font-30
                  mt-10
                "
                        >
                          {ContactUs?.ServiceData?.totalpetowners
                            ? ContactUs?.ServiceData?.totalpetowners
                            : 0}
                        </h2>
                        <h4 className="text-uppercase text-white">
                          {" "}
                          Pets Pampered
                        </h4>
                        {/* <p>
                          Architecto ullam tenetur quia nemo ratione tempora.
                        </p> */}
                      </div>
                    </div>
                  </div>
                  <div
                    className="
            col-xs-12 col-sm-6 col-md-6 col-lg-6
            mb-md-50
            text-white
            mb-20
          "
                  >
                    <div className="funfact text-center">
                      <div className="funfact-content">
                        <div className="funfact-icon">
                          <i className="flaticon-pet-feeding-the-dog font-50" />
                        </div>
                        <h2
                          data-animation-duration={2000}
                          data-value={698}
                          className="
                  animate-number
                  
                  font-30
                  mt-10
                "
                        >
                          {ContactUs?.ServiceData?.totalmealsfed
                            ? ContactUs?.ServiceData?.totalmealsfed
                            : 0}
                        </h2>
                        <h4 className="text-uppercase text-white">Meals fed</h4>
                        {/* <p>
                          Architecto ullam tenetur quia nemo ratione tempora.
                        </p> */}
                      </div>
                    </div>
                  </div>
                  <div
                    className="
            col-xs-12 col-sm-6 col-md-6 col-lg-6
            mb-md-50
            text-white
            mb-20
          "
                  >
                    <div className="funfact text-center">
                      <div className="funfact-content">
                        <div className="funfact-icon">
                          <i className="flaticon-pet-veterinarian-hospital font-50" />
                        </div>
                        <h2
                          data-animation-duration={2000}
                          data-value={1106}
                          className="
                  animate-number
                  
                  font-30
                  mt-10
                "
                        >
                          {ContactUs?.ServiceData?.totalclinics
                            ? ContactUs?.ServiceData?.totalclinics
                            : 0}
                        </h2>
                        <h4 className="text-uppercase text-white">
                          {" "}
                          Veterinary Clinics
                        </h4>
                        {/* <p>
                          Architecto ullam tenetur quia nemo ratione tempora.
                        </p> */}
                      </div>
                    </div>
                  </div>
                  <div
                    className="
            col-xs-12 col-sm-6 col-md-6 col-lg-6
            mb-md-50
            text-white
            mb-20
          "
                  >
                    <div className="funfact text-center">
                      <div className="funfact-content">
                        <div className="funfact-icon">
                          <i className="flaticon-pet-animals font-50 " />
                        </div>
                        <h2
                          data-animation-duration={2000}
                          data-value={4469}
                          className="
                  animate-number
                  
                  font-30
                  mt-10
                "
                        >
                          {ContactUs?.ServiceData?.totalbrands
                            ? ContactUs?.ServiceData?.totalbrands
                            : 0}
                        </h2>
                        <h4 className="text-uppercase text-white">Brands</h4>
                        {/* <p>
                          Architecto ullam tenetur quia nemo ratione tempora.
                        </p> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 bg-light" ref={contactRef}>
              <div className="p-50">
                <div className="row">
                  <div className="col-md-10 px-0">
                    <h2 className="mt-0 line-height-1 my-4">
                      <span>
                        Contact
                        <span className=" ml-2 text-theme-colored">Us Now</span>
                      </span>
                    </h2>
                    <p>
                      Have a message or suggestion for us? We are eager to hear
                      from you!
                    </p>
                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-sm-6">
                          <div className="form-group mb-10">
                            <input
                              name="form_name"
                              className="form-control"
                              type="text"
                              required
                              placeholder="Enter Name"
                              aria-required="true"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group mb-10">
                            <input
                              name="form_email"
                              className="form-control required email"
                              type="email"
                              placeholder="Enter Email"
                              aria-required="true"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group mb-10">
                            <input
                              name="form_phone"
                              className="form-control"
                              type="tel"
                              placeholder="Enter Phone"
                              aria-required="true"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="form-group mb-10">
                        <textarea
                          id="form_message"
                          name="form_message"
                          className="form-control required"
                          placeholder="Enter Message"
                          rows={5}
                          aria-required="true"
                          defaultValue={""}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                        />
                      </div>
                      <div className="form-group mb-0 mt-20">
                        <input
                          id="form_botcheck"
                          name="form_botcheck"
                          className="form-control"
                          type="hidden"
                          defaultValue
                        />
                        <button
                          type="submit"
                          className="
                  btn btn-dark btn-theme-colored
                  text-uppercase
                "
                          disabled={disableSubmit}
                        >
                          Send Message
                        </button>
                      </div>
                    </form>
                    {/* Get Your Project Started Form Validation*/}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <SuccessConfirmationAlert
          modal_center={modal}
          setmodal_center={setModal}
          content="Response recorded successfully"
          toggle={toggle}
        />
      </section>
    </div>
  );
};

export default History;

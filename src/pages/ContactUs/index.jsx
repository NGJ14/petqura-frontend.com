import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  BannerImg as ContactUsBannerImg,
  BannerText,
  BannerWrapper,
  SecondaryBtn,
} from "../Home/homeSlider";
import { config } from "../../config/config";
import { Helmet } from "react-helmet";
import SuccessConfirmationAlert from "../../components/SuccessConfirmationAlert";

const ContactUs = () => {
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
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          Find the best Pet Care provider Near You | Pet shop in Bangalore
        </title>
        <meta
          name="description"
          content="Looking for reliable pet care near you? PawWalker is your ultimate pet care aggregator.Find the best pet clinics, grooming services, pet supplies, and more."
        />
        <meta
          name="keywords"
          content="Pet Care Near Me, Pet clinic Near Me, Pet Grooming Near Me, Pet Shop In Bangalore"
        ></meta>
      </Helmet>

      <div>
        <BannerWrapper>
          <BannerText>
            <h1>
              A Simple Guide For <span className="textBold">Your Pets</span>
            </h1>
            <p className="lightText">
              Have a message or suggestion for us? We are eager to hear from
              you!
            </p>
          </BannerText>
          <BannerImg>
            <img
              src={`${config.S3imgHostUrl}/frontend-assets/contactUsMainStart.png`}
              alt="Banner Image"
              className="firstImage"
            />
            <img
              src={`${config.S3imgHostUrl}/frontend-assets/contactUsMainMiddle.png`}
              alt="Banner Image"
              className="middleImage"
            />
            <img
              src={`${config.S3imgHostUrl}/frontend-assets/contactUsMainRight.png`}
              alt="Banner Image"
              className="thirdImage"
            />
          </BannerImg>
        </BannerWrapper>

        <ContactUsWrapper>
          <ContactUsMainHead>
            <h3>
              Book an <span className="textBold">Appointment</span>
            </h3>
            <p className="lightText">
              You can reach out to us at info@petqura.com
            </p>
            <p
              style={{
                fontSize: "18px",
              }}
              className="lightText"
            >
              Company name: Petqura OPC Private Limited
            </p>
          </ContactUsMainHead>

          <ContactUsMainSec>
            <ContactUsMainSecLeft>
              <img
                src={`${config.S3imgHostUrl}/frontend-assets/contactUsMiddleStart.png`}
                alt="Cat Image"
              />
            </ContactUsMainSecLeft>

            <ContactUsMainSecRight>
              <ContactUsForm onSubmit={handleSubmit}>
                <ContactUsFormRow>
                  <input
                    name="form_name"
                    type="text"
                    required
                    placeholder="Enter Name"
                    aria-required="true"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />

                  <input
                    name="form_email"
                    type="email"
                    placeholder="Enter Email"
                    aria-required="true"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </ContactUsFormRow>
                <ContactUsFormRow>
                  <input
                    name="form_phone"
                    type="tel"
                    placeholder="Enter Phone"
                    aria-required="true"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </ContactUsFormRow>
                <ContactUsFormRow>
                  <textarea
                    name="form_message"
                    placeholder="Enter Message"
                    rows={5}
                    aria-required="true"
                    defaultValue={""}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </ContactUsFormRow>
                <ContactUsFormRow>
                  <SecondaryBtn
                    className={disableSubmit ? "disabledBtn" : ""}
                    disabled={disableSubmit}
                  >
                    Send Message
                  </SecondaryBtn>
                </ContactUsFormRow>
              </ContactUsForm>
            </ContactUsMainSecRight>
          </ContactUsMainSec>
        </ContactUsWrapper>
        <SuccessConfirmationAlert
          modal_center={modal}
          setmodal_center={setModal}
          content="Response recorded successfully"
          toggle={toggle}
        />
      </div>
    </>
  );
};

export default ContactUs;

const BannerImg = styled(ContactUsBannerImg)`
  @media only screen and (max-width: 576px) {
    width: 60%;
  }
`;

const ContactUsWrapper = styled.div`
  width: 100%;
  height: auto;
`;

const ContactUsMainHead = styled.div`
  width: 100%;
  height: auto;
  padding: 15px 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #ffffff;

  & h3 {
    color: #333333;
    font-size: 40px;
    font-family: Montserrat;
    font-weight: lighter;

    @media only screen and (max-width: 768px) {
      font-size: 35px;
      text-align: center;
    }
  }

  .textBold {
    color: #00419d;
    font-weight: bold;
    font-size: 45px;
    letter-spacing: 0.5px;
    margin: 0;

    @media only screen and (max-width: 768px) {
      font-size: 38px;
      text-align: center;
    }
  }

  .lightText {
    color: #333333;
    font-size: 20px;
    font-family: Montserrat;
    font-weight: lighter;

    @media only screen and (max-width: 768px) {
      font-size: 18px;
      text-align: center;
    }
  }

  @media only screen and (max-width: 768px) {
    padding: 15px 10px;
  }
`;

const ContactUsMainSec = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  position: relative;

  @media only screen and (max-width: 768px) {
    width: 100%;
    flex-direction: column;
  }
`;

const ContactUsMainSecLeft = styled.div`
  width: 20%;
  background-color: #00419d;

  @media only screen and (max-width: 768px) {
    width: 100%;
    height: auto;
  }

  & img {
    width: 350px;
    height: auto;
    object-fit: contain;
    position: absolute;
    left: 5%;
    bottom: 0%;

    @media only screen and (max-width: 1000px) {
      width: 320px;
    }

    @media only screen and (max-width: 768px) {
      top: 0%;
      left: 0%;
      position: static;
      width: 300px;
    }

    @media only screen and (max-width: 568px) {
      width: 100%;
      height: auto;
      width: 230px;
    }
  }
`;

const ContactUsMainSecRight = styled.div`
  width: 80%;
  background-color: #e4e4e480;
  display: flex;
  justify-content: center;
  padding: 2rem 0px;

  @media only screen and (max-width: 768px) {
    width: 100%;
  }
`;

const ContactUsForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  align-items: center;
  width: 50%;
  gap: 20px;

  @media only screen and (max-width: 1100px) {
    width: 70%;
  }

  @media only screen and (max-width: 600px) {
    width: 100%;
  }

  & input,
  textarea {
    border: 1px solid #707070;
    padding: 10px;
    border-radius: 10px;
    color: #8f8f8f;
    font-family: Montserrat;
    font-weight: lighter;
    width: 100%;
    resize: none;
  }
`;

const ContactUsFormRow = styled.div`
  width: 90%;
  display: flex;
  gap: 20px;
  justify-content: center;

  & .disabledBtn {
    padding: 1rem 3rem;
    font-size: 18px;
    color: #fff;
    background-color: darkgray;
    border-radius: 15px;
    cursor: no-drop;
  }
`;

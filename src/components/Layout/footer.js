import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { config } from "../../config/config";
import logo from "../../assets/images/petqura-logo/logo-2.png";
import facebook_logo from "../../assets/images/square-facebook-brands.svg";
import instagram_logo from "../../assets/images/square-instagram-brands.svg";

const Footer = (props) => {
  const getCurrentYear = () => {
    return new Date().getFullYear();
  };

  return (
    <FooterWrapper>
      <FooterMainSec>
        <FooterLeftSec>
          <img src={logo} alt="Logo" />
          <p>
            Welcome to PetQura, your one platform for all your pet care needs!
            We strive to make pet parenting a seamless and joyful experience by
            bringing together a comprehensive range of services and products in
            one convenient place.
          </p>
        </FooterLeftSec>

        <FooterRightSec>
          <FooterRightSecLinks>
            <h6>Information</h6>
            <Link to={"/privacy-policy"}>Privacy Policy</Link>
            <Link to={"/terms-of-service"}>Terms & Service</Link>
            <Link to={"/refund-and-cancellation"}>Refund & Cancellation</Link>
            <Link to={"/about-us"}>About Us</Link>
            <Link to={"/contact-us"}>Contact Us</Link>
          </FooterRightSecLinks>

          <FooterRightSecLinks>
            <h6>Store For Pets</h6>
            <Link to={"/store"}>Dogs</Link>
            <Link to={"/store"}>Cats</Link>
            <Link to={"/store"}>Birds</Link>
            <Link to={"/store"}>Fish & Aquatic</Link>
            <Link to={"/store"}>Small Pets</Link>
          </FooterRightSecLinks>
        </FooterRightSec>
      </FooterMainSec>

      <FooterMiddleSec>
        <div className="footer-midleft">
          <img
            src={`${config.S3imgHostUrl}/frontend-assets/${props.footerImg}`}
            alt="About Us"
            className="footerImage"
          />
        </div>

        <div className="footer-midright">
          <a href="https://www.facebook.com/pawwalkerofficial">
            <img
              src={facebook_logo}
              alt="Facebook"
            />
          </a>
          <a href="https://www.instagram.com/pawwalkerofficial/">
            <img
              src={instagram_logo}
              alt="Instagram"
            />
          </a>
        </div>
      </FooterMiddleSec>

      <FooterBottomSec>
        <h6>Copyright ©{getCurrentYear()} PetQura. All Rights Reserved.</h6>
      </FooterBottomSec>
    </FooterWrapper>
  );
};

export default Footer;

const FooterWrapper = styled.footer`
  width: 100%;
  height: auto;
  background-color: #ffffff;
`;

const FooterMainSec = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
  padding: 1rem 2rem;

  @media only screen and (max-width: 786px) {
    flex-direction: column;
  }
`;

const FooterLeftSec = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;

  @media only screen and (max-width: 786px) {
    width: 100%;
  }

  & img {
    width: 50%;
    height: auto;
  }
  & p {
    font-size: 16px;
    text-align: left;
    font-weight: 500;
    line-height: 30px;
    font-family: Montserrat;
    font-weight: normal;
    width: 60%;
    color: #797979;

    @media only screen and (max-width: 786px) {
      width: 100%;
    }
  }

  & .footerImage {
    width: 25%;
    height: auto;
  }
`;
const FooterRightSec = styled.div`
  width: 50%;
  height: auto;
  display: flex;
  justify-content: space-evenly;

  @media only screen and (max-width: 786px) {
    width: 100%;
    justify-content: flex-start;
  }
`;

const FooterRightSecLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media only screen and (max-width: 786px) {
    width: 50%;
    align-items: center;
  }

  & h6 {
    color: #00419d;
    font-size: 17px;
    font-family: Montserrat;
    font-weight: 600;
  }

  & a {
    color: #797979;
    font-size: 17px;
    font-family: Montserrat;
    font-weight: normal;

    @media only screen and (max-width: 586px) {
      font-size: 15px;
    }
  }
`;

const FooterMiddleSec = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
  margin: auto;
  position: relative;

  & .footer-midleft {
    width: 50%;
    & img {
      width: 200px;
      height: 200px;
      object-fit: contain;
      margin-bottom: -30px;

      @media only screen and (max-width: 786px) {
        width: 150px;
        height: 150px;
        object-fit: contain;
        margin-bottom: -23px;
      }
    }
  }

  & .footer-midright {
    width: 50%;
    display: flex;
    justify-content: flex-end;
    gap: 25px;
    align-items: center;
    position: absolute;
    bottom: 30px;
    right: 0px;

    & img {
      width: 60px;
      height: 60px;
      object-fit: contain;
      cursor: pointer;

      @media only screen and (max-width: 586px) {
        width: 40px;
        height: 40px;
      }
    }
  }
`;

const FooterBottomSec = styled.div`
  width: 100%;
  height: auto;
  background-color: #00419d;
  padding: 10px;

  & h6 {
    font-size: 17px;
    font-family: Montserrat;
    font-weight: normal;
    color: #ffffff;
    text-align: center;

    @media only screen and (max-width: 586px) {
      font-size: 14px;
    }
  }
`;

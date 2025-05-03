import React from "react";
import styled from "styled-components";
import { config } from "../../config/config";
import grooming from "../../assets/images/new/3.svg";
import vaccinations from "../../assets/images/new/2.svg";
import consulation from "../../assets/images/new/1.svg";

const Services = () => {
  return (
    <section className="mt-2 pt-2">
      <div className="common-container pt-0 paddingMore">
        <div className="section-content">
          <Tittle className="text-left">
            <h2 className="">
              <span className="text-primary"> SERVICES</span>
            </h2>
          </Tittle>
          <Tittle className="text-right">
            <h3 className="">
              <span className="text-warning"> View all</span>
            </h3>
          </Tittle>
          <div className="row">
            <div className="col-md-4">
              <div
                className="
                icon-box
                text-center
                mt-sm-0
                servicesBg
              "
              >
                <IconWrapper>
                  <a
                    // className="
                    // icon icon-lg
                    // bg-theme-colored
                    // icon-circled icon-border-effect
                    // effect-circled
                    // text-white
                    // iconImg
                    // "
                    href="/clinic"
                  >
                    {/* <i className="flaticon-pet-veterinarian-hospital" /> */}
                    {/* <img
                      src={`${config.S3imgHostUrl}/frontend-assets/icons/servClincIcon.png`}
                      alt="Image"
                    /> */}
                  </a>
                </IconWrapper>
                <img className="ServicesIconImage" src={grooming} alt="Image" />
                {/* <p className="text-dark">
                  From the comforts of your home, schedule appointments with the
                  most loved and trusted vets of Bengaluru.
                </p> */}
                {/* <a
                  href="#"
                  className="btn btn-theme-colored text-uppercase mt-10"
                >
                  More info
                </a> */}
                {/* <TernoryBtn href="">Call Us</TernoryBtn> */}
              </div>
              <h4 className="icon-box-title text-center text-capitalize letter-space-0">
                <a
                  className="darkTextColor segoeFont font-weight-bold f-22"
                  href="/hands4paws"
                >
                  Grooming
                </a>
              </h4>
            </div>
            <div className="col-md-4">
              <div
                className="
                icon-box
                bg-lighter
                text-center
                p-30
                mt-sm-0
                border-1px
                services-bg-image-store
                servicesBg
                "
              >
                <IconWrapper>
                  <a
                    //   className="
                    //   icon icon-lg
                    //   bg-theme-colored
                    //   icon-circled icon-border-effect
                    //   effect-circled
                    //   text-white
                    //   iconImg
                    // "
                    href="/store"
                  >
                    {/* <i className="flaticon-pet-shopping-cart-with-product-inside" /> */}
                    {/* <img
                      src={`${config.S3imgHostUrl}/frontend-assets/icons/servStoreIcon.png`}
                      alt="Icon"
                    /> */}
                  </a>
                </IconWrapper>
                <img
                  className="ServicesIconImage"
                  src={vaccinations}
                  alt="Image"
                />
                {/* <h4 className="icon-box-title text-capitalize letter-space-0">
                  <a
                    className="darkTextColor segoeFont font-weight-bold f-22"
                    href="/store"
                  >
                    Store
                  </a>
                </h4> */}
                {/* <p className="text-dark">
                  Stop, drop, and roll over into our store, curated with love
                  and mischief.
                </p> */}
                {/* <a
                  href="#"
                  className="btn btn-theme-colored text-uppercase mt-10"
                >
                  More info
                </a> */}
                {/* <TernoryBtn href="">Call Us</TernoryBtn> */}
              </div>
              <h4 className="icon-box-title text-center text-capitalize letter-space-0">
                <a
                  className="darkTextColor segoeFont font-weight-bold f-22"
                  href="/hands4paws"
                >
                  Vaccinations
                </a>
              </h4>
            </div>
            <div className="col-md-4">
              <div
                className="
                icon-box
                bg-lighter
                text-center
                p-30
                mt-sm-0
                border-1px
                services-bg-image-hands4paws
                servicesBg
              "
              >
                <IconWrapper>
                  <a
                    //   className="
                    //   icon icon-lg
                    //   bg-theme-colored
                    //   icon-circled icon-border-effect
                    //   effect-circled
                    //   text-white
                    //   iconImg
                    // "
                    href="/hands4paws"
                  >
                    {/* <i className="flaticon-pet-play" /> */}
                    {/* <img
                      src={`${config.S3imgHostUrl}/frontend-assets/icons/servHandsIcon.png`}
                      alt="Icon"
                    /> */}
                  </a>
                </IconWrapper>
                <img className="ServicesIconImage" src={consulation} alt="Image" />
                {/* <h4 className="icon-box-title text-capitalize letter-space-0">
                  <a
                    className="darkTextColor segoeFont font-weight-bold f-22"
                    href="/hands4paws"
                  >
                    Hands4Paws
                  </a>
                </h4> */}
                {/* <p className="text-dark">
                  The sweetest dreams are made of treats! Join us to provide the
                  stray animals of Bengaluru with food, warmth, and love.
                </p> */}
                {/* <a
                  href="#"
                  className="btn btn-theme-colored text-uppercase mt-10"
                >
                  More info
                </a> */}
                {/* <TernoryBtn href="">
                  Call Us
                </TernoryBtn> */}
              </div>
              <h4 className="icon-box-title text-center text-capitalize letter-space-0">
                <a
                  className="darkTextColor segoeFont font-weight-bold f-22"
                  href="/hands4paws"
                >
                  Consultation
                </a>
              </h4>
            </div>
          </div>
        </div>
      </div>
      <CustomImg>
        <img
          src={`${config.S3imgHostUrl}/frontend-assets/ourServiceCat.png`}
          alt="Image"
        />
      </CustomImg>
    </section>
  );
};

export default Services;

export const CustomImg = styled.div`
  width: 35%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: -20%;
  left: 2%;

  img {
    max-width: 100%;
  }

  @media only screen and (max-width: 900px) {
    width: 250px;
    bottom: -4%;
  }
`;

export const TernoryBtn = styled.a`
  background-color: #00419d;
  border-radius: 30px;
  font-family: Montserrat;
  font-weight: 500;
  color: #fff;
  font-size: 25px;
  padding: 1rem 3rem;
  position: absolute;
  bottom: -40px;
  z-index: 9;

  &:hover {
    color: #ffffff;
    text-decoration: none;
    background: linear-gradient(180deg, #00419d, #00419d80);
  }

  @media only screen and (max-width: 900px) {
    font-size: 16px;
    padding: 5px 20px;
    position: static;
  }
`;

const ServicesIconImage =styled.img`
  background:black;
`

const IconWrapper = styled.div`
  display: flex;
  position: absolute;
  top: -7rem;
  left: 0;
  right: 0;
  align-items: center;
  justify-content: center;

  @media only screen and (max-width: 900px) {
    position: static;
  }
`;

export const Tittle = styled.div`
  width: 100%;
  text-align: center;
  margin-bottom: 1rem;
  display: inline-block;

  h2 {
    font-size: 35px;
    color: #000;
    font-family: Montserrat;
    font-weight: normal;
    text-transform: capitalize;
    display: inline-block;
  }

  .tittleBold {
    color: #00419d;
    font-weight: bold;
  }

  .borderLine {
    border-bottom: 2px solid #07b1f1;
    padding-bottom: 10px;
    padding-right: 15px;
    padding-left: 15px;
  }

  @media only screen and (max-width: 900px) {
    margin-bottom: 2rem;

    h2 {
      font-size: 30px;
    }

    .tittleBold {
      margin-left: 10px;
    }
  }

  @media only screen and (max-width: 576px) {
  }
`;

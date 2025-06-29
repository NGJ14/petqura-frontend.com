import React, { useState } from "react";
import styled from "styled-components";
import { config } from "../../config/config";
import Consultation from "../../assets/images/new/1-cropped.svg";
import Vaccinations from "../../assets/images/new/2-cropped.svg";
import Grooming from "../../assets/images/new/3-cropped.svg";
import Dental from "../../assets/images/new/4-cropped.svg";
import Dermatology from "../../assets/images/new/5-cropped.svg";
import Ultrasound from "../../assets/images/new/6-cropped.svg";
import Xray from "../../assets/images/new/7-cropped.svg";
import BloodUrine from "../../assets/images/new/8-cropped.svg";
import Microchip from "../../assets/images/new/9-cropped.svg";
import ECG from "../../assets/images/new/10-cropped.svg";

const services = [
  { img: Consultation, title: "Consultation", link: "/clinic" },
  { img: Vaccinations, title: "Vaccinations", link: "/store" },
  { img: Grooming, title: "Grooming", link: "/hands4paws" },
  { img: Dental, title: "Dental Care", link: "/hands4paws" },
  { img: Dermatology, title: "Dermatology", link: "/boarding" },
  { img: Ultrasound, title: "Ultrasound", link: "/training" },
  { img: Xray, title: "X-ray", link: "/surgery" },
  { img: BloodUrine, title: "Blood & Urine", link: "/surgery" },
  { img: Microchip, title: "Microchip", link: "/surgery" },
  { img: ECG, title: "ECG", link: "/surgery" },
];

const Services = () => {
  const [showAll, setShowAll] = useState(false);

  return (
    <section className="mt-2 pt-2">
      <div className="common-container pt-0 paddingMore">
        <div className="section-content">
          <Tittle className="text-left">
            <h2>
              <span className="text-primary"> SERVICES</span>
            </h2>
          </Tittle>
          <Tittle className="text-right">
            <h3
              style={{ cursor: "pointer" }}
              onClick={() => setShowAll(!showAll)}
            >
              <span className="text-warning">
                {showAll ? "View less" : "View more"}
              </span>
            </h3>
          </Tittle>

          {/* Service Grid Section */}
          <ServiceGrid>
            {services.slice(0, 4).map((item, index) => (
              <ServiceCard key={index}>
                <img className="ServicesIconImage p-5" src={item.img} alt="Image" />
                <h4 className="icon-box-title text-center text-capitalize letter-space-0">
                  <a
                    className="darkTextColor segoeFont font-weight-bold f-22"
                    href={item.link}
                  >
                    {item.title}
                  </a>
                </h4>
              </ServiceCard>
            ))}

            {showAll &&
              services.slice(4).map((item, index) => (
                <ServiceCard key={index + 4}>
                  <img
                    className="ServicesIconImage p-5"
                    src={item.img}
                    alt="Image"
                  />
                  <h4 className="icon-box-title text-center text-capitalize letter-space-0">
                    <a
                      className="darkTextColor segoeFont font-weight-bold f-22"
                      href={item.link}
                    >
                      {item.title}
                    </a>
                  </h4>
                </ServiceCard>
              ))}
          </ServiceGrid>
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

// ---------- STYLED COMPONENTS ----------

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

  h3 {
    font-size: 24px;
    font-weight: normal;
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

    h3 {
      font-size: 20px;
    }

    .tittleBold {
      margin-left: 10px;
    }
  }
`;

const ServiceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(22%, 1fr));
  gap: 2rem;
  margin-top: 2rem;

  @media only screen and (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media only screen and (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const ServiceCard = styled.div`
  background: rgb(215, 250, 255);
  background: rgb(240, 255, 255);
  padding: 2rem;
  border-radius: 1rem;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  img {
    width: 210px;
    height: 210px;
  }
`;

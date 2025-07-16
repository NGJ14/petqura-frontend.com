import React from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
import { config } from "../../config/config";

const services = [
  { img: Consultation, title: "Consultation", link: "/clinic" },
  { img: Vaccinations, title: "Vaccinations", link: "/clinic" },
  { img: Grooming, title: "Grooming", link: "/clinic" },
  { img: Dental, title: "Dental Care", link: "/clinic" },
  { img: Dermatology, title: "Dermatology", link: "/clinic" },
  { img: Ultrasound, title: "Ultrasound", link: "/clinic" },
  { img: Xray, title: "X-ray", link: "/clinic" },
  { img: BloodUrine, title: "Blood & Urine", link: "/clinic" },
  { img: Microchip, title: "Microchip", link: "/clinic" },
  { img: ECG, title: "ECG", link: "/clinic" },
];

const Services = () => {
  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 600,
    slidesToShow: 4, // 🔁 updated from 3 to 4
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3, slidesToScroll: 1, arrows: false },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2, slidesToScroll: 1, arrows: false },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1, slidesToScroll: 1, arrows: false },
      },
    ],
  };


  return (
    <Wrapper>
      <Tittle>
        <h2 className="borderLine">
          <span className="tittleBold">Services</span>
        </h2>
      </Tittle>

      <SliderContainer>
        <Slider {...settings}>
          {services.map((item, index) => (
            <SlideCard key={index}>
              <img src={item.img} alt={item.title} />
              <h4>
                <a href={item.link}>{item.title}</a>
              </h4>
            </SlideCard>
          ))}
        </Slider>
      </SliderContainer>
    </Wrapper>
  );
};

export default Services;

// --- Styled Components ---

const Wrapper = styled.section`
  padding: 5rem 2rem;
  background-color: #fff;

  @media only screen and (max-width: 576px) {
    padding: 3rem 1rem;
  }
`;

const Tittle = styled.div`
  width: 100%;
  text-align: center;
  margin-bottom: 7rem;

  h2 {
    font-size: 35px;
    font-weight: normal;
    font-family: Montserrat;
    color: #000;
  }

  .tittleBold {
    color: #00419d;
    font-weight: bold;
  }

  .borderLine {
    border-bottom: 2px solid #07b1f1;
    display: inline-block;
    padding: 0 15px 10px 15px;
  }

  @media (max-width: 576px) {
    h2 {
      font-size: 28px;
    }
  }
`;

const SliderContainer = styled.div`
  padding: 0 5rem;

  .slick-slider {
    .slick-track {
      display: flex;
      gap: 3rem;
    }

    .slick-prev,
    .slick-next {
      width: 50px;
      height: 50px;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
      z-index: 2;
    }

    .slick-prev {
      background-image: url(${config.S3imgHostUrl}/frontend-assets/icons/slickPrev.png);
      left: -30px;
    }

    .slick-next {
      background-image: url(${config.S3imgHostUrl}/frontend-assets/icons/slickNext.png);
      right: -30px;
    }

    .slick-prev:before,
    .slick-next:before {
      content: "";
    }
  }

  @media (max-width: 576px) {
    padding: 0 1rem;
  }
`;

const SlideCard = styled.div`
  background: #ffffff;
  background: rgb(230, 255, 255);
  border-radius: 1rem;
  padding: 2rem;
  text-align: center;
  transition: transform 0.3s ease;
  &:hover {
    transform: translateY(-6px);
  }
  img {
    width: 180px;
    height: 180px;
    object-fit: contain;
    margin: 0 auto 4rem auto;
  }
  h4 a {
    font-size: 20px;
    font-weight: bold;
    color: #00419d;
    text-decoration: none;
  }
`;

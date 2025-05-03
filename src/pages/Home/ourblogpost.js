import React from "react";
import { styled } from "styled-components";
import { Tittle as OurBlogPostTittle } from "./services";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CustomImg as OurBlogPostCustomImg } from "./services";

// export const config = "https://pawwalker-files.s3.amazonaws.com/frontend-assets/";
import { config } from "../../config/config";

const OurBlogPost = () => {
  var settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <CommonWrapper>
      <Tittle>
        <h2 className="">
          Our <span className="tittleBold">Blog Post?</span>
        </h2>
      </Tittle>
      <Container>
        <Slider {...settings}>
          <img
            src={`${config.S3imgHostUrl}/frontend-assets/ourBlogPostBanner1.jpg`}
            alt="Banner"
          />
          <img
            src={`${config.S3imgHostUrl}/frontend-assets/ourBlogPostBanner1.jpg`}
            alt="Banner"
          />
          <img
            src={`${config.S3imgHostUrl}/frontend-assets/ourBlogPostBanner1.jpg`}
            alt="Banner"
          />
        </Slider>
      </Container>
      <CustomImg>
        <img
          src={`${config.S3imgHostUrl}/frontend-assets/ourBlogPostCat.png`}
          alt="Image"
        />
      </CustomImg>
    </CommonWrapper>
  );
};

export default OurBlogPost;

const Tittle = styled(OurBlogPostTittle)`
  position: absolute;
  top: 3rem;
  z-index: 9;
  margin-bottom: 5rem;

  @media only screen and (max-width: 576px) {
    top: -45px;
  }
`;

const CustomImg = styled(OurBlogPostCustomImg)`
  left: unset;
  right: 0;
  bottom: -17%;
  width: 24%;

  @media only screen and (max-width: 576px) {
    left: unset;
    top: -90px;
    width: 44%;
    bottom: auto;
    opacity: 0.5;
  }
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  @media only screen and (max-width: 576px) {
    padding-top: 2rem;
  }

  .slick-slide {
    height: auto;
  }

  .slick-slider {
    width: 100%;
  }

  .slick-dots li button:before {
    color: transparent;
  }

  .slick-dots {
    z-index: 9;
    bottom: -35px;

    li button {
      width: 15px;
      height: 15px;
      background: #e4e4e4;
      border-radius: 10px;
      border: 1px solid #707070;

      :before {
        color: transparent;
      }
    }

    .slick-active button:before {
      opacity: unset;
      color: transparent;
    }

    .slick-active button {
      background: rgb(224, 247, 255);
      border: 1px solid #00419d;
    }
  }
`;

export const CommonWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;

  @media only screen and (max-width: 1400px) {
    /* overflow: hidden; */
  }
`;

import React from "react";
import { styled } from "styled-components";
import { Tittle as WhatClientSaysTittle } from "./services";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { config } from "../../config/config";

const WhatClientSays = () => {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
          arrows: false,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
          arrows: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ],
  };

  const columnData = [
    {
      id: 1,
      image: "sliderClientImg1.png",
      title: "Jina Hamilton",
      desc: "I highly recommend PawWalker to any pet parent. It has everything you need to provide the best care for your beloved pets, all in one place.",
    },
    {
      id: 2,
      image: "sliderClientImg2.png",
      title: "Naomi Shaw",
      desc: "I'm so glad I stumbled upon PawWalker. It made finding quality pet supplies so much easier. The prices were great, and the delivery was super quick!",
    },
    {
      id: 3,
      image: "sliderClientImg3.png",
      title: "Nina Tandon",
      desc: "I'm so grateful for PawWalker! It helped me discover a pet clinic near me for grooming with great, experienced staff. The staff was knowledgeable and friendly, making my pet's experience enjoyable.",
    },
    {
      id: 4,
      image: "sliderClientImg1.png",
      title: "Tandon Nina",
      desc: "I highly recommend PawWalker to any pet parent. It has everything you need to provide the best care for your beloved pets, all in one place.",
    },
  ];

  return (
    <CommonWrapper>
      <Tittle>
        <h2 className="borderLine">
          What<span className="tittleBold"> Client Says?</span>
        </h2>
      </Tittle>
      <Container>
        <Slider {...settings}>
          {columnData.map((data) => (
            <SliderColumn>
              <img
                src={`${config.S3imgHostUrl}/frontend-assets/${data.image}`}
                alt="Image"
              />
              <ColumnTittle>{data.title}</ColumnTittle>
              <DescriptionText>{data.desc}</DescriptionText>
            </SliderColumn>
          ))}
        </Slider>
      </Container>
    </CommonWrapper>
  );
};

export default WhatClientSays;

const Tittle = styled(WhatClientSaysTittle)`
  margin-bottom: 5rem;

  @media only screen and (max-width: 576px) {
    margin-bottom: 2rem;
  }
`;

const DescriptionText = styled.div`
  color: #333333;
  font-size: 15px;
  text-align: left;
`;

const ColumnTittle = styled.div`
  font-size: 20px;
  color: #000;
  font-weight: bold;
`;

const SliderColumn = styled.div`
  display: flex !important;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  background:rgb(224, 247, 255);
  border-radius: 50px;
  border: 1px solidrgba(0, 106, 255, 0.4);
  padding: 4rem;
  margin-bottom: 3rem;
  box-shadow: 10px 10px 20px 0px #00000029;

  @media only screen and (max-width: 576px) {
    box-shadow: none;
  }
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4rem;
  position: relative;
  padding: 0 8rem;
  padding-bottom: 7rem;

  .slick-slide {
    height: auto;
  }

  .slick-slider {
    width: 100%;

    .slick-track {
      display: flex;
      gap: 6rem;
    }

    .slick-prev {
      width: 50px;
      height: 50px;
      background: url(${config.S3imgHostUrl}/frontend-assets/icons/slickPrev.png);
      background-size: contain;
      background-position: center;
      background-repeat: no-repeat;
      z-index: 9;
      left: -35px;
    }

    .slick-next {
      width: 50px;
      height: 50px;
      background: url(${config.S3imgHostUrl}/frontend-assets/icons/slickNext.png);
      background-size: contain;
      background-position: center;
      background-repeat: no-repeat;
      z-index: 9;
      right: -35px;
    }

    .slick-prev:before,
    .slick-next:before {
      content: "";
    }
  }

  @media only screen and (max-width: 576px) {
    gap: 1rem;
    padding: 0 10px;

    .slick-slider .slick-track {
      display: inline-block;
    }
  }
`;

export const CommonWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  background: url(${config}whatclientsaysBg.png);
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  padding: 5rem 0;

  @media only screen and (max-width: 576px) {
    padding: 2rem 0;
  }
`;

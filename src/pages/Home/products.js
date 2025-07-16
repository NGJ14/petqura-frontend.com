import React from "react";
import { styled } from "styled-components";
// import { Tittle as WhatClientSaysTittle } from "./services";
import { Tittle as WhatClientSaysTittle } from "../../components/StyledShared";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { config } from "../../config/config";
import accessoriesIMG from "../../assets/images/products/accessories.svg"
import treatsIMG from "../../assets/images/products/pet-treats.svg";
import toysIMG from "../../assets/images/products/pet-toys.svg";
import dogFoodIMG from "../../assets/images/products/dog-food.png";
import catfoodIMG from "../../assets/images/products/cat-food.svg";


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
      image: dogFoodIMG,
      title: "Dog Food",
    },
    {
      id: 2,
      image: catfoodIMG,
      title: "Cat Food",
    },
    {
      id: 3,
      image: treatsIMG,
      title: "Pet Treats",
    },
    {
      id: 4,
      image: toysIMG,
      title: "Pet Toys",
    },
    {
      id: 5,
      image: accessoriesIMG,
      title: "Accessories",
    },
  ];

  return (
    <CommonWrapper>
      <Tittle>
        <h2 className="borderLine">
          <span className="tittleBold">Products</span>
        </h2>
      </Tittle>
      <Container>
        <Slider {...settings}>
          {columnData.map((data) => (
            <SliderColumn>
              <img
                src={data.image}
                alt="Image"
              />
              <ColumnTittle>{data.title}</ColumnTittle>
              {/* <DescriptionText>{data.desc}</DescriptionText> */}
            </SliderColumn>
          ))}
        </Slider>
      </Container>
    </CommonWrapper>
  );
};

export default WhatClientSays;

const Tittle = styled(WhatClientSaysTittle)`
  margin-bottom: 0rem;

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
  color: #00419d;
  font-weight: bold;
  text-align: center;
  justify-content: center;
  margin: 0 auto;
`;

const SliderColumn = styled.div`
  display: flex !important;
  flex-direction: column;
  align-items: center;
  border-radius: 30px;
  padding: 2rem;
  margin: 0 1rem; /* Horizontal space between boxes */
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  img {
    width: 300px;
    height: 300px;
    object-fit: contain;
    margin-bottom: 1rem;
  }

  @media only screen and (max-width: 576px) {
    padding: 1.5rem;
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
      gap: 0rem;
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

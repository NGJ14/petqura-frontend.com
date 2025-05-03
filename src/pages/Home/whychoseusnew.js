import React from "react";
import { styled } from "styled-components";
import { Tittle } from './services';
import { config } from "../../config/config";

const WhyChoseUsNew = () => {

  const columnData = [
    {
      id: 1,
      icon: "purposeIcon.png",
      title: "PURPOSE",
      desc: "Creating hope and convenience for pets and pet parents."
    },
    {
      id: 2,
      icon: "productIcon.png",
      title: "PRODUCTS",
      desc: "Choose amid numerous products for the well-being of your pet."
    },
    {
      id: 3,
      icon: "vetineryAidIcon.png",
      title: "VETERINARY AID",
      desc: "Schedule appointment with your favorite vet within the city."
    },
    {
      id: 4,
      icon: "fastDeliveryIcon.png",
      title: "FAST DELIVERY",
      desc: "Receive products at your doorstep within just 24 hours"
    }
  ]

  return (
    <CommonWrapper>
      <Tittle>
        <h2 className="">Why<span className="tittleBold">Choose Us?</span></h2>
      </Tittle>
      <Container>
        <>
          {columnData.map((data) => (
              <Column>
                <img src={`${config.S3imgHostUrl}/frontend-assets/icons/${data.icon}`} alt="Icon"/>
                <ColumnTittle>{data.title}</ColumnTittle>
                <DescriptionText>{data.desc}</DescriptionText>
              </Column>
          ))}
          <img className="whyChooseUsDog" src={`${config.S3imgHostUrl}/frontend-assets/whyChooseUsDog.png`} alt="Image"/>
        </>
      </Container>
    </CommonWrapper>
  );
};

export default WhyChoseUsNew;

const DescriptionText = styled.div`
  width: 230px;
  text-align: center;
  color: #333333;
`;

const ColumnTittle = styled.div`
  font-size: 20px;
  color: #000;
  font-weight: bold;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 0 0 35%;
  gap: 8px;

  img {
    width: 100px;
  }
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 4rem;
  position: relative;
  padding: 5rem;
  padding-bottom: 7rem;

  .whyChooseUsDog {
    width: 30%;
    display: inline-block;
    position: absolute;
    left: 32%;
  }

  @media only screen and (max-width: 576px) {
    padding: 0 20px;
    gap: 3rem;
    justify-content: center;

    .whyChooseUsDog {
      width: 80%;
      display: flex;
      opacity: 0.5;
      left: unset;
      bottom: -75px;
    }
  }
`;

export const CommonWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #FFE4D4;
  padding: 5rem 0;
`;

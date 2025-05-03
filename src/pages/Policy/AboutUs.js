import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { getPAGEById } from "../../store/UserStore/PageContent/action";
import { BannerImg as AboutUsBannerImg, BannerText, BannerWrapper } from "../Home/homeSlider";
import { config } from "../../config/config";
import { Helmet } from "react-helmet";

const AboutUs = () => {
  const PageContent = useSelector((state) => state.PageContent);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(
      getPAGEById({ data: { id: "5952ee36-669e-468a-94da-f45f9add3e7a" } })
    );
  }, []);


  return (
    <>
    
    <Helmet>
        <meta charSet="utf-8" />
        <title>Find the best Pet Care provider  Near You | Pet shop in Bangalore</title>
        <meta name="description" content="Looking for reliable pet care near you? PawWalker is your ultimate pet care aggregator.Find the best pet clinics, grooming services, pet supplies, and more." />
        <meta name="keywords" content="Pet Care Near Me, Pet clinic Near Me, Pet Grooming Near Me, Pet Shop In Bangalore"></meta>
    </Helmet>
 
    <div>
      <BannerWrapper>
        <BannerText>
          <h1>Discover the  <span className="textBold">PAWSOME WORLD</span></h1>
          <p className="lightText">Connecting pet parents with the top-rated pet clinics and the highest-quality pet products all in one convenient location.</p>
        </BannerText>
        <BannerImg>
          <img src={`${config.S3imgHostUrl}/frontend-assets/aboutUsMainRIght.png`} alt="Banner Image" className="mainImage" />
        </BannerImg>
      </BannerWrapper>

      <AboutUsMidSec>
        <AboutUsMidSecLeft>
          <img src={`${config.S3imgHostUrl}/frontend-assets/aboutUsMiddleStart.png`} alt="About Us" />
        </AboutUsMidSecLeft>
        <AboutUsMidSecRight>
          <p>PawWalker aims to bring together essential pet care requirements under a single platform. We believe that all pets and pet parents deserve services which can be efficiently managed, at ease.</p>
          <br />
          <p>Driven by this vision, PawWalker provides multiple pet care services, namely,  pre-booking appointments online with your preferred veterinary clinics, and an e-commerce platform offering an array of pet-related products.</p>
          <br />
          <p>Our aspiration is to empower you with accurate and comprehensive information on clinics and veterinarians, and make your pets happy with their favourite products from their favourite brands. At PawWalker, we believe in making you and your pets deserve the best of convenience.</p>
        </AboutUsMidSecRight>
      </AboutUsMidSec>

      <AboutUsEndSec>
        <img src={`${config.S3imgHostUrl}/frontend-assets/aboutUsLastEndBall.png`} alt="About Us" className="aboutusBall" />
        <img src={`${config.S3imgHostUrl}/frontend-assets/aboutUsLastEnd.png`} alt="About Us" className="aboutUsLastDog" />
      </AboutUsEndSec>

    </div>
    </>
  );
};

export default AboutUs;

const BannerImg = styled(AboutUsBannerImg)`
  width: 90%;
`;

const AboutUsMidSec = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem 1rem;

    @media only screen and (max-width: 768px) {
      flex-direction: column;
   }

   @media only screen and (max-width: 568px) {
      
   }
`
const AboutUsMidSecLeft = styled.div`
    width: 40%;
    height: auto;

    @media only screen and (max-width: 768px) {
      width: 60%;
   }

    & img {
      width: 80%;
      height: auto;
    }
`

const AboutUsMidSecRight = styled.div`
    width: 60%;
    height: auto;

    @media only screen and (max-width: 768px) {
      width: 80%;
      margin: 3rem 0px;
   }

    & p {
      font-size: 17px;
      text-align: left;
      font-weight: 500;
      line-height: 30px;
      font-family: Montserrat;
      font-weight: normal;
      color: #3A3A3A;

      @media only screen and (max-width: 768px) {
        width: 100%;
     }
    }

`

const AboutUsEndSec = styled.div`
      display: flex;
      width: 100%;
      height: 15vh;
      align-items: end;
      justify-content: flex-end;
      position: relative;

      @media only screen and (max-width: 668px) {
        height: 20vh;
     }

        .aboutusBall {
          width: 50px;
          height: 50px;
          object-fit: contain;
          position: absolute;
          right: 20%;
          bottom: -85%;

          @media only screen and (max-width: 768px) {
            bottom: -25%;
            right: 30%;
         }

         @media only screen and (max-width: 568px) {
          bottom: 10%;
          right: 35%;
       }
          
       } 

       .aboutUsLastDog {
         width: 260px;
         height: auto;
         position: absolute;
          bottom: -80%;
          right: 4%;

          @media only screen and (max-width: 1000px) {
             width: 230px;
           }

          @media only screen and (max-width: 768px) {
            width: 200px;
            bottom: -25%;
         }

         @media only screen and (max-width: 568px) {
          bottom: 10%;
       }
       }
`
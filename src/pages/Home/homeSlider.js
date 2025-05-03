// import Slider from "./slider/Slider";
import bannerImg1 from "../../assets/images/bannerImage1.png";
import bannerImg2 from "../../assets/images/bannerImage2.png";
import bannerImg from "../../assets/images/bannerImage.png";
import styled from "styled-components";

const HomeSlider = () => {
  // return <Slider />;
  return (
    <BannerWrapper>
      <BannerText>
        <h1>
          Discover the No. 1 Pet Clinic
          <span className="textBold"> Near You</span>
        </h1>
        <p className="lightText">
          Where Exceptional Care Meets Peace of Mind! Your Furry Friend Deserves
          The Best .
        </p>
        <SecondaryBtn>Book an Appointment</SecondaryBtn>
        <img className="mobileTextImg" src={bannerImg} alt="Banner Image" />
      </BannerText>
      <BannerImg>
        <img className="desktop" src={bannerImg1} alt="Banner Image" />
        <img
          src={bannerImg2}
          alt="Banner Image"
          className="secondImg desktop"
        />
        <img className="mobile" src={bannerImg} alt="Banner Image" />
      </BannerImg>
    </BannerWrapper>
  );
};

export default HomeSlider;

export const SecondaryBtn = styled.button`
  padding: 1rem 3rem;
  font-size: 18px;
  color: #fff;
  background-color: #07b1f1;
  border-radius: 15px;
  transition: all ease-in-out;
  transition-duration: 300ms;
  z-index: 3;

  @media only screen and (max-width: 576px) {
    padding: 10px 15px;
    font-size: 15px;
    border-radius: 15px;
  }
`;

export const BannerImg = styled.div`
  width: 70%;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  .mobile {
    display: none;
  }

  img {
    max-width: 90%;
  }

  .secondImg {
    position: absolute;
    right: 9%;
    top: -14%;
    max-width: 25%;
    z-index: 101;
  }

  .mainImage {
    position: absolute;
    right: -5%;
    max-width: 78%;
    bottom: -10%;
    z-index: 101;
  }

  .firstImage {
    position: absolute;
    right: 26%;
    width: 32%;
    bottom: 0;
  }

  .middleImage {
    position: absolute;
    right: 26%;
    max-width: 17%;
    bottom: 0;
  }

  .thirdImage {
    position: absolute;
    right: 3%;
    bottom: 0px;
    width: 27%;
    z-index: 101;
  }
  .clinicFirst {
    position: absolute;
    right: 28%;
    max-width: 27%;
    bottom: 0;
    display: flex;
  }
  .clinicThird {
    position: absolute;
    right: 6%;
    bottom: -2%;
    width: 30%;
    z-index: 101;
  }
  .clinicInnerFirst {
    position: absolute;
    right: 32%;
    width: 22%;
    bottom: 0%;
  }
  .clinicInnerThird {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 43%;
    z-index: 101;
  }

  @media only screen and (max-width: 900px) {
    width: 50%;

    .desktop {
      display: none;
    }

    .mobile {
      display: block;
    }
  }

  @media only screen and (max-width: 576px) {
    display: block;
    position: absolute;
    bottom: 0;
    right: 0;
    z-index: 1;
    opacity: 0.5;

    .clinicInnerThird {
      width: 80%;
    }

    .clinicInnerFirst {
      right: 60%;
      width: 40%;
    }

    .clinicFirst {
      right: 58%;
      max-width: 80%;
      bottom: 0;
      display: flex;
      z-index: auto;
    }

    .clinicThird {
      position: absolute;
      right: 6%;
      bottom: -2%;
      width: 80%;
      z-index: auto;
    }

    .mobileTextImg {
      display: block;
      width: 300px;
      position: absolute;
      right: -30px;
      z-index: 0;
      opacity: 0.4;
      bottom: -70px;
    }

    .firstImage {
      right: 18%;
      width: 92%;
    }

    .middleImage {
      max-width: 50%;
    }

    .thirdImage {
      width: 60%;
    }

    .mainImage {
      max-width: 98%;
      bottom: -20%;
    }
  }
`;

export const BannerText = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 1rem;

  .lightText {
    color: #797979;
    font-size: 17px;
    font-family: Montserrat;
    font-weight: normal;
    z-index: 3;
  }

  .mobileTextImg {
    display: none;
  }

  @media only screen and (max-width: 900px) {
    width: 60%;

    .lightText {
      font-size: 16px;
      line-height: normal;
    }
  }

  @media only screen and (max-width: 576px) {
    width: 100%;
    position: relative;
    z-index: 9;
  }
`;

export const BannerWrapper = styled.div`
  width: 100%;
  /* min-height: 500px; */
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 2rem 5rem;
  background: #faf5f2;
  height: 65vh;
  position: relative;

  h1 {
    color: #515050;
    font-size: 35px;
    font-family: Montserrat;
    font-weight: lighter;
  }

  .textBold {
    color: #00419d;
    font-weight: bold;
    font-size: 45px;
    letter-spacing: 6px;
    margin: 0;
    text-transform: uppercase;
  }

  @media only screen and (max-width: 900px) {
    align-items: flex-start;
    height: 45vh;
    padding: 2rem;
    padding-top: 3rem;

    h1 {
      width: 270px;
      font-size: 25px;
      margin: 0;
    }

    .textBold {
      font-size: 35px;
      letter-spacing: 4px;
    }
  }
`;

import React from "react";
import styled from "styled-components";
import { config } from "../../config/config";
import { Link } from "react-router-dom";
import avatar from "../../assets/images/user/Fa6SolidHospital.svg";
  import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { trackEvent } from "../../helpers/analytics";
const ClinicBox = (props) => {


// You can put this above your component or inside it
const renderStars = (rating) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<FaStar key={i} className="text-yellow-500" />);
    } else if (rating >= i - 0.5) {
      stars.push(<FaStarHalfAlt key={i} className="text-yellow-500" />);
    } else {
      stars.push(<FaRegStar key={i} className="text-yellow-500" />);
    }
  }
  return stars;
};

const trackClinicView = (clinicId, clinicName) => {
  console.log("sending analytics for "+ clinicId+" "+ clinicName);
  
  trackEvent({
    category: 'Clinic',
    action: 'Viewed',
    label: `${clinicName} (${clinicId})`,
    value: 1
  });
};

  return (
    <ClinicBoxWrap>
      <ClinicMainSec>
        <img
          src={props.clinicLogo ? props.clinicLogo : avatar}
          alt="clinic-logo"
          className="clinicMainImg"
        />
        <h5 className="clinicTitle">{props.clinicTitle}</h5>
        <ClinicMainSecWrap>
          {/* <ClinicMainSecSpeciality>
            <div>
              <img
                src={`${config.S3imgHostUrl}/frontend-assets/icons/locationIcon.png`}
                alt="location"
              />
            </div>
            <p className="clinicLocation">{props.clinicLocation}</p>
          </ClinicMainSecSpeciality>
          <ClinicMainSecSpeciality className="specialityWrap">
            <div>
              <img
                src={`${config.S3imgHostUrl}/frontend-assets/icons/specialityIcon.png`}
                alt="speciality"
              />
            </div>
            <div>
              <h6>SPECIALITY</h6>
              <p className="clinicSpeciality">{props.clinicConsultation}</p>
            </div>
          </ClinicMainSecSpeciality>

          <ClinicMainSecSpeciality>
            <div>
              <img
                src={`${config.S3imgHostUrl}/frontend-assets/icons/priceIcons.png`}
                alt="price"
              />
            </div>
            <p className="clinicPrice">{props.clinicPrice}</p>
          </ClinicMainSecSpeciality> */}
        </ClinicMainSecWrap>

        <ClinicFooterSec>
          <ClinicFooterTopSec>
            <ClinicRatingBtn className="flex items-center gap-1">
              {renderStars(4.5)}
              <span className="ml-1 text-sm text-gray-700">
                {/* {4.5.toFixed(1)} */}
              </span>
            </ClinicRatingBtn>
            <ClinicViewMoreBtn>
              <Link to={props.redirectLink}>View More</Link>
            </ClinicViewMoreBtn>
          </ClinicFooterTopSec>

          <ClinicFooterBottomSec>
            <BookAppoinmentBtn  onClick={() => {
              trackClinicView(props.clinic_id, props.clinicTitle);
              props.bookAppoinment();
            }}>
              Book Your Appointment
            </BookAppoinmentBtn>
          </ClinicFooterBottomSec>
        </ClinicFooterSec>
      </ClinicMainSec>
    </ClinicBoxWrap>
  );
};

export default ClinicBox;

const ClinicBoxWrap = styled.div`
  width: 20%;
  height: auto;
  border-radius: 15px;
  // border: 1px solid #70707066;
  padding: 10px 10px 0px 10px;
  margin: 10px 0px;
  font-family: "Montserrat";
  position: relative;

  & .clinicMainImg {
    width: 100%;
    height: 220px;
    object-fit: contain;
    border-radius: 20px;
    box-shadow: #fec200 0px 12px 15px -10px;
    margin-bottom: 2rem;
  }

  @media only screen and (max-width: 1100px) {
    width: 32%;
  }

  @media only screen and (max-width: 900px) {
    width: 50%;
  }

  @media only screen and (max-width: 768px) {
    width: 90%;
  }
`;

const ClinicMainSec = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & .clinicTitle {
    color: #000;
    font-size: 16px;
    font-weight: bold;
    margin: 5px 0px 0px 0px;
  }
`;

const ClinicMainSecSpeciality = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;

  & img {
    width: 20px;
    height: 20px;
    object-fit: contain;
  }

  & .clinicLocation {
    margin: 1px 0px;
    font-size: 14px;
    color: #000000;
  }

  & .clinicSpeciality {
    margin: 3px 0px;
    font-size: 11px;
    color: #000000;

    & span {
      margin: 0px;
    }
  }

  & .clinicPrice {
    color: #707070;
    font-size: 14px;
    font-weight: 600;
    margin: 3px 0px;
  }

  & h6 {
    color: #000000;
    font-weight: 700;
    font-size: 12px;
    margin: 3px 0px;
  }
`;

const ClinicFooterSec = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  width: 100%;
`;

const ClinicFooterTopSec = styled.div`
  display: flex;
  width: 100%;
  margin: auto;
  justify-content: center;
`;

export const ClinicRatingBtn = styled.button`
  background-color: #fff;
  color: gold;
  font-size:20px;
  display: flex;
  gap: 5px;
  border: none;
  outline: none;
  border-radius: 6px;
  height: -webkit-fill-available;
  align-items: center;
  margin-bottom: 2px;
  & img {
    width: 13px !important;
    height: 13px !important;
  }
`;

const ClinicViewMoreBtn = styled.button`
  width: auto;
  padding: 05px 15px;
  text-align: center;
  font-size: 12px;
  text-transform: capitalize;
  background-color: #ffffff;
  border: 1px solid #00419d;
  outline: none;
  color: #00419d;
  border-radius: 7px;
  font-weight: 500;

  & a {
    text-decoration: none;
    color: #00419d;
  }
`;

const ClinicFooterBottomSec = styled.div`
  width: 100%;
  margin: auto;
  display: flex;
  justify-content: center;
  margin: 2px 0px;
`;

export const BookAppoinmentBtn = styled.button`
  width: 90%;
  padding: 8px 10px;
  text-align: center;
  font-size: 15px;
  text-transform: capitalize;
  background-color: #00419d;
  border: none;
  outline: none;
  color: #ffffff;
  border-radius: 20px;
  font-weight: 600;
  position: absolute;
  bottom: -40px;
`;

const ClinicMainSecWrap = styled.div`
  width: 100%;
  height: auto;
  // min-height: 10px;
  margin: 10px 0px 0px 0px;
  display: flex;
  flex-direction: column;
  gap: 5px;

  .specialityWrap {
    align-items: flex-start !important;
  }
`;

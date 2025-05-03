import React, { useEffect, useState } from "react";
import { config } from "../../config/config";
import ClinicList from "./ClinicList";
import { Helmet } from "react-helmet";
import { BannerImg, BannerText, BannerWrapper } from "../Home/homeSlider";
import { styled } from "styled-components";
import { useDispatch } from "react-redux";
import { getClinicDetails } from "../../store/UserStore/Clinic/action";

const Clinics = () => {
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();

  const basicRequest = {
    page: 1,
    page_count: 9,
    keyword: "",
  };

  const [request, setRequest] = useState({ ...basicRequest });

  useEffect(() => {
    dispatch(getClinicDetails({ request: request }));
  }, [request]);

  const handleSearchClick = (e) => {
    e.preventDefault();
    setRequest({ ...request, keyword: searchText });
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          Find No. 1 Pet Clinic Near You | Pet Grooming in Bangalore
        </title>
        <meta
          name="description"
          content="Discover the best pet store in Bangalore, PawWalker, for all your pet care needs. From premium pet supplies to top-notch pet grooming service near you."
        />
        <meta
          name="keywords"
          content="Pet Clinic Near Me, Pet Doctor Near Me, Pet Grooming Near Me, Pet Shop In Bangalore"
        ></meta>
      </Helmet>
      <div>
        <BannerWrapper>
          <BannerText>
            <h1>
              Your Pet Deserves <span className="textBold">BEST Care</span>
            </h1>
            <p className="lightText">
              Connecting pet parents with the top-rated pet clinics and the
              highest-quality pet products all in one convenient location.
            </p>
            <SearchInputWrap onSubmit={handleSearchClick}>
              <input
                type="text"
                placeholder="Find for Clinic"
                aria-label="Search"
                aria-describedby="Search"
                onChange={(e) => setSearchText(e.target.value)}
                value={searchText}
              />
              <button type="submit">
                <img
                  src={`${config.S3imgHostUrl}/frontend-assets/icons/searchIcon.png`}
                  alt="search"
                />
              </button>
            </SearchInputWrap>
          </BannerText>
          <BannerImg>
            <img
              src={`${config.S3imgHostUrl}/frontend-assets/clinicMainLeft.png`}
              alt="Banner Image"
              className="clinicFirst"
            />
            <img
              src={`${config.S3imgHostUrl}/frontend-assets/clinicMainRIght.png`}
              alt="Banner Image"
              className="clinicThird"
            />
          </BannerImg>
        </BannerWrapper>
        <ClinicList />
      </div>
    </>
  );
};

export default Clinics;

const SearchInputWrap = styled.form`
  display: flex;
  width: 300px;

  & input {
    border: 1px solid darkgray;
    padding: 10px;
    color: #8f8f8f;
    width: 80%;
    border-radius: 25px 0px 0px 25px;
    letter-spacing: 1px;
    font-size: 14px;
    background: transparent;
  }

  & button {
    width: 20%;
    padding: 10px;
    background-color: #00419d;
    border-radius: 0px 25px 25px 0px;
    text-align: center;

    & img {
      width: 20px;
      height: 20px;
    }
  }
`;

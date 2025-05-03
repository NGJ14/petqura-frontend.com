import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { Input } from "reactstrap";
import StarRating from "../../components/StarRating";
import { getLocalStorage } from "../../helpers/utils";
import {
  addClinicReviews,
  getClinicById,
  getClinicReviews,
  getClinicServices,
  getLoggedClinicReviews,
} from "../../store/UserStore/Clinic/action";
import BookSlot from "./BookSlot";
import avatar from "../../assets/images/user/Fa6SolidHospital.svg";
import {
  BannerImg as ClinicDetailBannerImg,
  BannerText,
  BannerWrapper,
} from "../Home/homeSlider";
import { config } from "../../config/config";
import { styled } from "styled-components";
import { ClinicRatingBtn } from "./ClinicBox";
import Rating from "../../components/UI/Rating";

const ClinicDetail = () => {
  const [modal, setModal] = useState(false);
  const [clinicId, setClinicId] = useState();
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewDescription, setReviewDescription] = useState("");
  const [stars, setStars] = useState([1, 2, 3, 4, 5]);
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [selectedIcon, setSelectedIcon] = useState("★");
  const [deselectedIcon, setDeselectedIcon] = useState("☆");
  const clinicData = useSelector((state) => state.Clinic);
  const [enableAddReviewForm, setEnableAddReviewForm] = useState(false);
  const [enableAddReviewBtn, setEnableAddReviewBtn] = useState(true);
  const [disableSubmit, setDisableSubmit] = useState(false);

  const [activeTab, setActiveTab] = useState("services");

  let auth = getLocalStorage("AUTH_DETAILS");
  const toggle = () => {
    setModal(!modal);
  };
  const changeRating = (newRating) => {
    setRating(newRating);
  };

  const hoverRating = (rating) => {
    setHovered(rating);
  };

  const params = useParams();

  useEffect(() => {
    dispatch(
      getClinicReviews({ data: { clinic_id: params?.id, sort: "positive" } })
    );
    dispatch(getClinicById({ data: { clinic_id: params?.id } }));
    dispatch(getClinicServices({ data: { clinic_id: params?.id } }));
  }, [params?.id]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (rating == 0 || reviewTitle == "" || reviewDescription == "") {
      setDisableSubmit(true);
    } else {
      setDisableSubmit(false);
    }
  }, [rating, reviewTitle, reviewDescription]);

  const history = useHistory();
  useEffect(() => {
    document.title = clinicData?.ClinicDetails?.details?.clinic?.clinic_name;
  }, [history?.location?.pathname]);

  const handleAddReview = () => {
    dispatch(
      addClinicReviews({
        ClinicReviews: {
          clinic_id: params.id,
          review_title: reviewTitle,
          review_content: reviewDescription,
          review_star_count: rating,
        },
        callback: () => {
          dispatch(getClinicReviews({ data: { clinic_id: params?.id } }));
          setEnableAddReviewForm(false);
          setEnableAddReviewBtn(true);
        },
      })
    );
  };

  useEffect(() => {
    clinicData?.userClinicReview?.review_title &&
      setReviewTitle(clinicData.userClinicReview.review_title);
    clinicData?.userClinicReview?.review_content &&
      setReviewDescription(clinicData?.userClinicReview?.review_content);
    clinicData?.userClinicReview?.review_star_count &&
      setRating(clinicData?.userClinicReview?.review_star_count);
  }, [clinicData.userClinicReview]);

  const handleReviewEnableClick = () => {
    setEnableAddReviewForm(true);
    setEnableAddReviewBtn(false);
    dispatch(getLoggedClinicReviews({ data: { clinic_id: params?.id } }));
  };

  const HandleBookAppoinment = (id) => {
    toggle();
    setClinicId(id);
  };

  console.log(clinicData?.ClinicDetails?.clinic?.clinic_id, "aaa");

  return (
    <main className="page__course">
      <>
        <BannerWrapper>
          <BannerText>
            <h1>
              Your <br /> <span className="textBold">Reviews</span>
            </h1>
            <p className="lightText">
              Connecting pet parents with the top-rated pet clinics and the
              highest-quality pet products all in one convenient location.
            </p>
          </BannerText>
          <BannerImg>
            <img
              src={`${config.S3imgHostUrl}/frontend-assets/clinicInnerLeft.png`}
              alt="Banner Image"
              className="clinicInnerFirst"
            />
            <img
              src={`${config.S3imgHostUrl}/frontend-assets/clinicInnerRIghts.png`}
              alt="Banner Image"
              className="clinicInnerThird"
            />
          </BannerImg>
        </BannerWrapper>
        <div className="clinic_container">
          {clinicData?.error ==
          "We are facing some technical issue, please try after sometime" ? (
            <p className="text-center mandatory font-16 font-weight-bold">
              {clinicData?.error}
            </p>
          ) : null}

          {/* <aside className="col-md-4">
          <h3 className="visible-xs visible-sm">
            {clinicData?.ClinicDetails?.clinic?.clinic_name}

            <div className="product_review">
              <ul className="review_text list-inline">
                {clinicData?.reviewData?.average_rating == 0 ? null : (
                  <li className=" rating-btn">
                    {clinicData?.reviewData?.average_rating}{" "}
                    <i class="fa fa-star"></i>
                  </li>
                )}
              </ul>
            </div>
          </h3>
          <div className="courseSidebar__featureImage">
            <img
              className="clinic clinic-detail-img "
              alt
              src={
                clinicData?.ClinicDetails?.clinic?.clinic_image
                  ? clinicData?.ClinicDetails?.clinic?.clinic_image
                  : avatar
              }
            />
          </div>

          {clinicData?.ClinicDetails?.clinic?.phone && (
            <ul className="courseStats">
              <li>
                <span className="label courseStats__label">Address</span>
                <span className="courseStats__divider"></span>
                <span className="courseStats__data">
                  {clinicData?.ClinicDetails?.clinic?.clinic_address_line_1}
                </span>
                <span className="courseStats__data">
                  {clinicData?.ClinicDetails?.clinic?.clinic_address_line_2}
                </span>
              </li>
              <li>
                <span className="label courseStats__label">City</span>
                <span className="courseStats__divider"></span>
                <span className="courseStats__data">
                  {clinicData?.ClinicDetails?.clinic?.clinic_city}
                </span>
              </li>
              <li>
                <span className="label courseStats__label">Phone</span>
                <span className="courseStats__divider"></span>
                <span className="courseStats__data">
                  {clinicData?.ClinicDetails?.clinic?.phone}
                </span>
              </li>
              <li>
                <span className="label courseStats__label">Email</span>
                <span className="courseStats__divider"></span>
                <span className="courseStats__data">
                  {clinicData?.ClinicDetails?.clinic?.email}
                </span>
              </li>
            </ul>
          )}
          </aside> 
          */}

          <div className="col-md-12 clinic_detail">
            {/*
        <h1 className="visible-md visible-lg visible-xl">
            {clinicData?.ClinicDetails?.clinic?.clinic_name}
            <div className="product_review">
              <ul className="review_text list-inline">
                {clinicData?.reviewData?.average_rating == 0 ? null : (
                  <li className=" rating-btn">
                    {clinicData?.reviewData?.average_rating}{" "}
                    <i className="fa fa-star"></i>
                  </li>
                )}
                <li>
                  <a
                    href="#reviews"
                    onClick={() => setActiveTab("reviews")}
                    className="text-muted "
                    style={{ fontSize: "14px" }}
                  >
                    {!clinicData?.loading && clinicData?.reviewData
                      ? clinicData?.reviewData?.reviews?.length
                        ? clinicData?.reviewData?.reviews?.length == 1
                          ? "1 Review"
                          : `${clinicData?.reviewData?.reviews?.length} Reviews`
                        : "No Reviews"
                      : null}
                  </a>
                </li>
              </ul>
            </div>
          </h1>
        */}

            {/* <h5 className="text-muted doc-detail-page-descp ">
            {clinicData?.ClinicDetails?.clinic?.clinic_address_line_1}
          </h5>
          <h5 className="text-muted doc-detail-page-descp ">
            {clinicData?.ClinicDetails?.clinic?.clinic_address_line_2}
          </h5> */}

            {/* 
          <div className="content-block">
            <span className="label">HoundRank</span>
            <span className="stars">
              {clinicData?.reviewData?.average_rating * "★"}
              ★★★☆☆
            </span>
          </div> */}

            <ClinicDetailsBodyWrap>
              <div className="content-block" id="reviews">
                <div className="clinicBodyHead">
                  <ul id="tabs">
                    <li
                      className={`${activeTab == "services" ? "active" : ""}`}
                      onClick={() => setActiveTab("services")}
                    >
                      Services
                    </li>
                    <li
                      className={`${activeTab == "doctors" ? "active" : ""}`}
                      onClick={() => setActiveTab("doctors")}
                    >
                      Doctors
                    </li>
                    {/*
                  <li
                    className={`${activeTab == "timing" ? "active" : ""}`}
                    onClick={() => setActiveTab("timing")}
                  >
                    Clinic Timing
                  </li>
                  */}
                    <li
                      className={`${activeTab == "reviews" ? "active" : ""}`}
                      onClick={() => setActiveTab("reviews")}
                    >
                      Reviews
                    </li>
                  </ul>
                  {activeTab == "services" ? (
                    <div className="appoinmentBtn">
                      <a
                        className="button button--booking "
                        onClick={() => {
                          toggle();
                          setClinicId(
                            clinicData?.ClinicDetails?.clinic?.clinic_id
                          );
                          // dispatch(
                          //   getClinicById({
                          //     data: { clinic_id: params?.id, action: "slots" },
                          //   })
                          // );
                        }}
                      >
                        Request an Appointment
                      </a>
                      {/* <a className="button button--download">Download PDF</a> */}
                    </div>
                  ) : (
                    <></>
                  )}
                </div>

                <ul id="tab" className="available-container">
                  <li className={`${activeTab == "services" ? "active" : ""}`}>
                    {clinicData?.ServiceData?.clinic_services?.length ? (
                      clinicData?.ServiceData?.clinic_services?.map(
                        (service) => (
                          <div className="my-5">
                            <p
                              className="font-weight-600"
                              style={{ fontSize: "23px" }}
                            >
                              {service?.service}
                            </p>

                            <h5 className=" text-muted doc-detail-page-overview font-16">
                              {service?.description}
                            </h5>
                          </div>
                        )
                      )
                    ) : (
                      <p className="unavailable-container  text-muted font-16">
                        Service Details Not Available
                      </p>
                    )}
                  </li>
                  <li className={`${activeTab == "doctors" ? "active" : ""}`}>
                    {clinicData?.ClinicDetails?.clinic?.doctors?.length ? (
                      clinicData?.ClinicDetails?.clinic?.doctors?.map((doc) => (
                        <DoctorsSecWrap key={doc.doctor_id}>
                          <div className="docImgWrap">
                            <img
                              src={`${config.S3imgHostUrl}/frontend-assets/doctorAvatar.png`}
                              alt="doc-image"
                            />
                          </div>
                          <div className="docDetailsWrap">
                            <h4>{doc?.doctor_name}</h4>
                            <p>{doc?.description} | 40 years experience</p>

                            <h6>₹500 Consultation fee at clinic</h6>
                            <h5>
                              Available at 5 pm - 9 pm <br />
                              (Mon - Wed - Fri)
                            </h5>
                            <div className="likeBtnWrap">
                              <ClinicRatingBtn>
                                <img
                                  src={`${config.S3imgHostUrl}/frontend-assets/icons/likeIcon.png`}
                                  alt="like"
                                />{" "}
                                99%
                              </ClinicRatingBtn>
                              <p className="patient-stories">
                                998 Patient Stories
                              </p>
                            </div>
                          </div>

                          <div className="appBtnWrap">
                            <BookAppoinmentBtn
                              onClick={() => {
                                toggle();
                                setClinicId(
                                  clinicData?.ClinicDetails?.clinic?.clinic_id
                                );
                              }}
                            >
                              Request an Appointment
                            </BookAppoinmentBtn>
                          </div>
                          <div></div>
                        </DoctorsSecWrap>
                      ))
                    ) : (
                      <p className="unavailable-container text-muted font-16">
                        Doctors Details Not Available
                      </p>
                    )}
                  </li>
                  {/* <li className={`${activeTab == "timing" ? "active" : ""}`}>
                    {clinicData.ClinicDetails.slots?.length > 0 ? (
                      <div className=" text-muted doc-detail-page-overview">
                        <ul className="col-lg-4 mb-200">
                          {clinicData.ClinicDetails.slots?.length
                            ? clinicData.ClinicDetails.slots?.map((slot) => (
                              <div
                                className={`my-3 ${clinicData.ClinicDetails.slots?.length == 1
                                    ? "slot-container"
                                    : ""
                                  } `}
                              >
                                {slot?.total_slots?.length ? (
                                  <h4 className="text-dark">
                                    {slot?.doctor_name}
                                  </h4>
                                ) : null}
                                {slot?.total_slots?.length &&
                                  slot?.total_slots?.map((doc) => (
                                    <div className="d-flex justify-content-between">
                                      <p>{doc?.day}</p>

                                      <p>
                                        {doc?.start_time} - {doc?.end_time}
                                      </p>
                                    </div>
                                  ))}
                              </div>
                            ))
                            : null}
                        </ul>
                      </div>
                    ) : (
                      <p className=" text-muted font-16 ml-3 unavailable-container">
                        Clinic Timing Not Available
                      </p>
                    )}
                    </li> */}
                  {/* Review section starts */}
                  <li className={`${activeTab == "reviews" ? "active" : ""}`}>
                    {clinicData?.reviewData?.reviews?.length ? (
                      clinicData?.reviewData?.reviews?.map((review) => (
                        <div
                          className={`my-3 ${
                            clinicData?.reviewData?.reviews?.length == 0
                              ? "review-container"
                              : ""
                          } `}
                        >
                          {/* <ul className="review_text list-inline mt-5">
                            <div className="d-flex justify-content-between">
                              <div className="d-flex  responsive-review-container">
                                <div className=" rating-btn ">
                                  {review?.review_star_count}{" "}
                                  <i className="fa fa-star"></i>
                                </div>
                                <span className=" font-weight-bold mt-1 ml-0 font-17">
                                  {review?.review_title} 
                                </span>{" "}
                              </div>
                              <p className="text-muted text-right font-15">
                                {review?.time_created?.slice(5)}
                              </p>
                            </div>
                            <div className="mt-3  ml-2">
                              <span className="ml-0 font-16">
                                {review?.review_content}
                              </span>{" "}
                              <div className="d-flex justify-content-between mt-3">
                                <p className="text-muted font-15 d-flex">
                                  {review?.certified_user ? (
                                    <div className="font-15">
                                      <i class="fas fa-check-circle"></i>{" "}
                                      <span className="ml-1 mr-1">
                                        Certified Buyer,
                                      </span>{" "}
                                    </div>
                                  ) : null}
                                  {review?.user}
                                </p>
                              </div>
                            </div>
                          </ul>
                          */}

                          <ReviewSectionMainWrap>
                            <ReviewSectionMainTop>
                              <ReviewSectionMainTopLeft>
                                <img
                                  src={`${config.S3imgHostUrl}/frontend-assets/reviewsAvatar.png`}
                                  alt="review-image"
                                />
                              </ReviewSectionMainTopLeft>

                              <ReviewSectionMainTopRight>
                                <h5>{review?.user}</h5>
                                <p>Pet Owner</p>
                                <ReviewSectionMainTopRightBottom>
                                  <div className="ratingsWrap">
                                    <Rating
                                      count={
                                        review?.review_star_count
                                          ? review?.review_star_count
                                          : 0
                                      }
                                    />
                                  </div>
                                  |
                                  <div>
                                    <ClinicRatingBtn>
                                      <img
                                        src={`${config.S3imgHostUrl}/frontend-assets/icons/likeIcon.png`}
                                        alt="like"
                                      />{" "}
                                      Helpful (5)
                                    </ClinicRatingBtn>
                                  </div>
                                </ReviewSectionMainTopRightBottom>
                              </ReviewSectionMainTopRight>
                            </ReviewSectionMainTop>

                            <ReviewSectionMainBottom>
                              <p>{review?.review_content}</p>
                            </ReviewSectionMainBottom>
                          </ReviewSectionMainWrap>
                          <hr />
                        </div>
                      ))
                    ) : (
                      <p className=" ml-4 text-muted font-16">No Reviews</p>
                    )}

                    {/* Review section ends */}
                    {auth &&
                    auth?.user?.role == "pet_owner" &&
                    enableAddReviewBtn ? (
                      <button
                        className=" btn btn-default font-weight-bold px-5 py-3 mr-4  my-4 "
                        type="submit"
                        onClick={handleReviewEnableClick}
                        style={{
                          background: "#138496",
                          color: "#fff",
                          fontSize: "13px",
                        }}
                      >
                        ADD REVIEW
                      </button>
                    ) : null}

                    {enableAddReviewForm ? (
                      <div className="mt-5">
                        <span>Rate the Clinic</span>

                        <StarRating
                          stars={stars}
                          rating={rating}
                          hovered={hovered}
                          deselectedIcon={deselectedIcon}
                          selectedIcon={selectedIcon}
                          changeRating={changeRating}
                          hoverRating={hoverRating}
                        />
                        <div className="mt-4">
                          <Input
                            className="mb-3"
                            type="text"
                            placeholder="Enter title"
                            value={reviewTitle}
                            onChange={(e) => setReviewTitle(e.target.value)}
                          />
                          <Input
                            className="mb-3"
                            type="textarea"
                            rows="8"
                            placeholder="Enter Content"
                            value={reviewDescription}
                            onChange={(e) =>
                              setReviewDescription(e.target.value)
                            }
                          />
                        </div>
                        <button
                          className=" btn btn-default font-weight-bold px-5 py-3 mr-4 ml-3 my-4 "
                          type="submit"
                          onClick={handleAddReview}
                          style={{
                            background: "#138496",
                            color: "#fff",
                            fontSize: "13px",
                          }}
                          disabled={disableSubmit}
                        >
                          Submit
                        </button>
                        <button
                          className=" btn btn-default font-weight-bold px-5 py-3 mr-4 ml-3 my-4 "
                          type="submit"
                          onClick={() => {
                            setEnableAddReviewForm(false);
                            setEnableAddReviewBtn(true);
                            setReviewDescription("");
                            setReviewTitle("");
                            setRating(0);
                          }}
                          style={{
                            background: "#138496",
                            color: "#fff",
                            fontSize: "13px",
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    ) : null}
                  </li>
                </ul>
              </div>
            </ClinicDetailsBodyWrap>
          </div>
        </div>

        <BookSlot modal_center={modal} toggle={toggle} clinicId={params?.id} />
      </>
    </main>
  );
};

export default ClinicDetail;

const BannerImg = styled(ClinicDetailBannerImg)`
  width: 70%;
`;

const ClinicDetailsBodyWrap = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  font-family: "Montserrat";

  & .clinicBodyHead {
    display: flex;
    justify-content: space-between;
    width: 100%;

    @media only screen and (max-width: 680px) {
      flex-direction: column;

      #tabs {
        margin: 1rem 0rem;
      }

      .appoinmentBtn {
        display: flex;
        justify-content: end;
      }
    }

    @media only screen and (max-width: 485px) {
      flex-direction: column;

      #tabs {
        & li {
          width: 25%;
          text-align: center;
        }
      }
    }
  }
`;

const DoctorsSecWrap = styled.div`
  width: 100%;
  min-height: 25vh;
  height: auto;
  display: flex;
  gap: 10px;
  align-items: center;
  border-bottom: 0.5px solid #7070704f;
  padding: 10px 0px;

  @media only screen and (max-width: 576px) {
    flex-direction: column;
    background: linear-gradient(1deg, #e5e1e1, transparent);
    border-radius: 10px;
    margin-bottom: 1rem;
  }

  & .docImgWrap {
    width: 20%;
    height: auto;
  }
  & img {
    width: 300px;
    height: 200px;
    object-fit: contain;
    border-radius: 50px;

    @media only screen and (max-width: 576px) {
      width: auto;
      height: auto;
    }
  }

  & .appBtnWrap {
    display: flex;
    align-items: end;
    height: 25vh;

    @media only screen and (max-width: 576px) {
      height: auto;
    }
  }
  & .docDetailsWrap {
    width: 50%;

    @media only screen and (max-width: 576px) {
      width: 75%;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    & h4 {
      font-size: 2rem;
      font-weight: 400;
      color: #4b4b4b;
      margin: 3px 0px;
    }

    & p {
      font-size: 1.5rem;
      font-weight: 400;
      color: #797979;
      margin: 3px 0px;
    }

    & h6 {
      font-size: 1.5rem;
      font-weight: 500;
      color: #707070;
      margin: 20px 0px 2px 0px;
    }

    & h5 {
      font-size: 1.3rem;
      font-weight: 500;
      color: #07b1f1;
      margin: 3px 0px 10px 0px;
    }
  }

  & .likeBtnWrap {
    display: flex;
    gap: 5px;
    align-items: center;

    @media only screen and (max-width: 576px) {
      width: 100%;

      & button {
        width: 30%;
        justify-content: center;
      }
    }

    & p {
      font-size: 1.1rem !important;
      font-weight: 500;
      color: #707070;
      text-decoration: underline;

      @media only screen and (max-width: 576px) {
        width: 70%;
        text-align: center;
      }
    }
  }
`;

const BookAppoinmentBtn = styled.button`
  width: auto;
  padding: 10px;
  text-align: center;
  font-size: 15px;
  text-transform: capitalize;
  background-color: #00419d;
  border: none;
  outline: none;
  color: #ffffff;
  border-radius: 10px;
  font-weight: 600;

  @media only screen and (max-width: 1000px) {
    font-size: 12px;
  }
`;

const ReviewSectionMainWrap = styled.div`
  width: 60%;
  height: auto;
  padding: 15px 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media only screen and (max-width: 1150px) {
    width: 70%;
  }
  @media only screen and (max-width: 1000px) {
    width: 90%;
  }

  @media only screen and (max-width: 576px) {
    width: 100%;
  }
`;

const ReviewSectionMainTop = styled.div`
  display: flex;
  width: 100%;
  gap: 10px;
`;

const ReviewSectionMainBottom = styled.div`
  width: 70%;

  @media only screen and (max-width: 576px) {
    width: 100%;
  }

  & p {
    font-size: 15px;
    color: #797979;
    margin: 3px 0px;
  }
`;

const ReviewSectionMainTopLeft = styled.div`
  width: 12%;

  @media only screen and (max-width: 786px) {
    width: 20%;
  }

  & img {
    width: 75px;
    height: 75px;
    object-fit: contain;
  }
`;

const ReviewSectionMainTopRight = styled.div`
  width: 50%;

  @media only screen and (max-width: 576px) {
    width: 60%;
  }

  & h5 {
    margin: 3px 0px;
    font-size: 20px;
    color: #000000;
    font-weight: normal;
    text-transform: capitalize;
    text-align: left;
  }

  & p {
    margin: 3px 0px;
    font-size: 15px;
    color: #797979;
    font-weight: bold;
    text-align: left;
  }
`;

const ReviewSectionMainTopRightBottom = styled.div`
  display: flex;
  // justify-content: space-between;
  width: 70%;
  align-items: center;
  gap: 10px;

  @media only screen and (max-width: 900px) {
    width: 100%;
  }

  @media only screen and (max-width: 576px) {
    width: 100%;
  }

  & .ratingsWrap {
    display: flex;
    align-items: center;
    gap: 4px;
    & i {
      color: #00419d;
      font-size: 17px;
    }
  }
`;

import React from "react";
import { styled } from "styled-components";

const Rating = ({ count }) => {
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <div key={i} className={i <= count ? "star filled" : "star"}>
          <i className="fa fa-star"></i>
        </div>
      );
    }
    return stars;
  };

  return <RatingWrap className="rating">{renderStars()}</RatingWrap>;
};

export default Rating;

const RatingWrap = styled.div`
  font-size: 24px;
  font-family: "Montserrat";
  display: flex;
  gap: 5px;

  .rating {
    font-size: 24px;
  }

  .star {
    color: #e4e4e4;
  }

  .star.filled {
    color: #00419d;
  }
`;

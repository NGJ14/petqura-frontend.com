import React from "react";

class StarRating extends React.Component {
  render() {
    const {
      stars,
      rating,
      hovered,
      deselectedIcon,
      selectedIcon,
      changeRating,
      hoverRating,
    } = this.props;

    return (
      <div>
        <div className="rating" style={{ fontSize: "3em", color: "#00419D" }}>
          {stars.map((star) => {
            return (
              <span
                className="cursor-pointer"
                onClick={() => {
                  changeRating(star);
                }}
                onMouseEnter={() => {
                  hoverRating(star);
                }}
                onMouseLeave={() => {
                  hoverRating(0);
                }}
              >
                {rating < star
                  ? hovered < star
                    ? deselectedIcon
                    : selectedIcon
                  : selectedIcon}
              </span>
            );
          })}
        </div>
      </div>
    );
  }
}

export default StarRating;

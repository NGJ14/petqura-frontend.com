import React from "react";

const BackButton = ({ label, handleClick }) => {
  return (
    <div className="backButtonWrapper">
      <button
        className="btn waves-effect waves-light cust_no_shadow cust-btn"
        onClick={() => handleClick()}
      >
        <span>
          <i className="fa fa-angle-double-left" aria-hidden="true"></i>
        </span>{" "}
        {label}
      </button>
    </div>
  );
};

export default BackButton;

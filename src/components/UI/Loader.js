import React from "react";

const Loader = () => {
  return (
    <div className="loaderWrapper">
      <div className="spinnerBox">
        <i className="fa fa-spinner fa-spin" aria-hidden="true"></i>
        <div>Please wait ...</div>
      </div>
    </div>
  );
};

export default Loader;

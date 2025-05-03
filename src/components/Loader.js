import React from "react";

const Loader = ({pleasewait}) => {
  return (
    <div className="loaderWrapper">
      <div className="spinnerBox">
        <i className="fa fa-spinner fa-spin" aria-hidden="true"></i>
        {
          pleasewait ? null : 
          <div style={{ direction: "ltr" }}>Please wait ...</div>
        }
      </div>
    </div>
  );
};

export default Loader;

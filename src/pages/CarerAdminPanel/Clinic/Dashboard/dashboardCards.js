import React from "react";

const DashboardCards = ({ item }) => {
  return (
    <div className="col-md-4 col-xl-4">
      <div className="dash-card daily-sales">
        <div className="dash-card-block">
          <h5 className="mb-4 font-weight-bold">{item?.title}</h5>
          <div className="row d-flex align-items-center">
            <div className="col-9">
              <h3 className="f-w-300 d-flex align-items-center m-b-0">
                {}
                <i
                  className={`fa ${
                    item?.title == "Total Orders"
                      ? "fa-cart-plus"
                      : item?.title == "Total Products"
                      ? "fa-shopping-basket"
                      : "fa-cart-arrow-down"
                  } mx-3`}
                  style={{
                    fontSize: "35px",
                    color: "#36BC9B",
                  }}
                ></i>{" "}
                {item?.value}
              </h3>
            </div>
          </div>
          <div className="progress m-t-30" style={{ height: 7 }}>
            <div
              className="progress-bar progress-c-theme"
              role="progressbar"
              style={{ width: item?.value }}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCards;

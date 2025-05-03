import React from "react";

const Orders = () => {
  return (
    <div>
      <section className="col-md-8 d-flex">
        <div className="container pt-0">
          <div className="section-content">
            <div className="row ">
              <div className="col-md-6">
                <div className="icon-box bg-lighter text-center p-30 mt-sm-0 border-1px">
                  <h4 className="icon-box-title text-uppercase letter-space-3">
                    <p className="text-theme-colored">Pet Glam</p>
                  </h4>
                  <h5>
                    Love Struck - Dog Collar & Leash Set With Golden Buckles
                  </h5>
                  <button
                    className="btn btn-outline-dark btn-lg btn-light mt-4"
                    style={{ fontSize: "17px" }}
                  >
                    View
                  </button>
                </div>
              </div>
              <div className="col-md-6">
                <div
                  className="icon-box bg-lighter text-center p-30 mt-sm-0 border-1px"
                  data-margin-top="-90px"
                >
                  <h4 className="icon-box-title text-uppercase letter-space-3">
                    <p className="text-theme-colored">Pet Comfort</p>
                  </h4>
                  <h5> Bows For Dogs & Cats(Turquoise, Yellow, Pink)s</h5>
                  <button
                    className="btn btn-outline-dark btn-lg btn-light mt-4"
                    style={{ fontSize: "17px" }}
                  >
                    View
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Orders;

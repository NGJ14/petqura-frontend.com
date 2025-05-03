import React from "react";

const About = () => {
  return (
    <>
      <section style={{ background: "#FF6B00" }}>
        <div className="custom-container pt-150 pb-150">
          <div className="section-content">
            <div className="row">
              <h2 className="text-center text-white">
                Our<span className="text-white"> Services </span>
              </h2>
              <p
                className="text-center mb-40 text-white text-muted"
                style={{ fontWeight: "500", fontSize: "15px" }}
              >
                Curated, Quality Services. Guaranteed.
              </p>
              <div className="ml-100">
                <div className="col-md-3 col-sm-4 col-xs-6 ">
                  <div
                  // style={{ marginTop: "-90px" }}
                  >
                    <a className="icon icon-lg text-white nounderline" href="#">
                      <i className="flaticon-pet-man home-service-icon"></i>
                      <h4 className="my-0">Dog walking</h4>
                    </a>
                  </div>
                </div>
                <div className="col-md-3 col-sm-4 col-xs-6">
                  <div>
                    <a className="icon icon-lg text-white nounderline" href="#">
                      <i className="flaticon-pet-dog-eating home-service-icon"></i>
                      <h4 className="my-0">Pet DayCare</h4>
                    </a>
                  </div>
                </div>
                <div className="col-md-3 col-sm-4 col-xs-6">
                  <div>
                    <a className="icon icon-lg text-white nounderline" href="#">
                      <i className="flaticon-pet-scissors home-service-icon"></i>
                      <h4 className="my-0">Pet Grooming</h4>
                    </a>
                  </div>
                </div>

                <div className="col-md-3 col-sm-4 col-xs-6">
                  <div>
                    <a className="icon icon-lg text-white nounderline" href="#">
                      <i className="flaticon-pet-play home-service-icon"></i>
                      <h4 className="my-0">Pet Training</h4>
                    </a>
                  </div>
                </div>

                <div className="col-md-3 col-sm-4 col-xs-6">
                  <div>
                    <a
                      className="icon icon-lg text-white nounderline "
                      href="#"
                    >
                      <i className="flaticon-pet-pets-hotel-house-sign-with-a-paw home-service-icon"></i>
                      <h4 className="my-0">Pet Sitters</h4>
                    </a>
                  </div>
                </div>

                <div className="col-md-3 col-sm-4 col-xs-6">
                  <div>
                    <a className="icon icon-lg text-white nounderline" href="#">
                      <i className="flaticon-pet-feeding-the-dog home-service-icon"></i>
                      <h4 className="my-0">Pet Nutritionists</h4>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;

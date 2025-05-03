import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getClinicDetails } from "../../store/UserStore/Clinic/action";
import avatar from "../../assets/images/user/avatar.png";

const Doctors = () => {
  const clinicData = useSelector((state) => state.Clinic);
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

  return (
    <section className="divider  ">
      <div className="custom-container pb-17">
        <div className="section-title text-center">
          <div className="row">
            <div className="col-md-12">
              <h2 className="text-center mt-0 line-height-1">
                Our<span className="text-theme-colored"> Doctors</span>
              </h2>
            </div>
          </div>
        </div>
        <div className="row multi-row-clearfix">
          <div className="col-md-8 mt-5 col-lg-10 col-sm-12">
            <div className="products">
              <div className="row multi-row-clearfix">
                {clinicData?.Clinic?.clinics?.length
                  ? clinicData?.Clinic?.clinics?.slice(0, 4)?.map((clinic) => (
                      <div className=" col-sm-4 col-md-4 col-lg-3 mb-30 col-xs-6 ">
                        <a
                          href={`/clinic/${clinic?.clinic_id}`}
                          style={{ textDecoration: "none" }}
                        >
                          <div className="product ">
                            {/* {i == 2 && (
                                          <span className="tag-sale">Trending!</span>
                                        )} */}
                            <div className="product-thumb">
                              <img
                                alt
                                src={
                                  clinic?.clinic_image
                                    ? clinic?.clinic_image
                                    : avatar
                                }
                                className="img-responsive img-fullwidth product-hover col-lg-6 mb-4 cust-size"
                              />
                              <div className="overlay" />
                            </div>
                            <div className="product-details ml-4 ">
                              <h4 className="product-brand text-dark text-center">
                                {clinic?.clinic_name}
                              </h4>
                              <h5 className="text-dark text-center">
                                {clinic?.clinic_city}
                              </h5>
                            </div>
                          </div>
                        </a>
                      </div>
                    ))
                  : null}
              </div>
            </div>
          </div>
        </div>
        <p className="text-right font-weight-bold ">
          <a className="orange-font" href="/clinic">
            View All
          </a>
        </p>
      </div>
    </section>
  );
};

export default Doctors;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { getPetDetails } from "../../../store/UserStore/Pet/action";
import { getAddressDetails } from "../../../store/UserStore/Address/action";

const Pet = () => {
  const [custError, setCustError] = useState("");
  const history = useHistory();
  const petDetails = useSelector((state) => state.Pet);
  const dispatch = useDispatch();

  const addressDetails = useSelector((state) => state.Address);

  useEffect(() => {
    dispatch(getAddressDetails({ data: { address_use: "shipping" } }));
  }, []);

  useEffect(() => {
    dispatch(getPetDetails());
  }, []);

  const handleAddPet = () => {
    if (addressDetails?.addresses == undefined) {
      setCustError("Please Add an address for creating a pet profile");
    } else {
      setCustError("");
      history.push("/addPet");
    }
  };
  return (
    <>
      <section className="col-md-12  d-flex  profile-content">
        <div className="container pt-0 ">
          <div className="section-content">
            <div className="row ">
              {custError && <p className="mandatory ml-4 ">{custError}</p>}

              {petDetails?.pet?.result?.length
                ? petDetails?.pet?.result?.map((paw) => (
                    <div className="col-md-6 ">
                      <div className="icon-box pt-50 pb-50 pl-50 pr-50 bg-lighter text-center border-1px  ">
                        <p className="  text-success">
                          <i className="fa fa-paw"></i>
                        </p>

                        <h4 className="icon-box-title text-uppercase letter-space-3">
                          <p className="text-theme-colored">{paw?.pet_name}</p>
                        </h4>
                        <button
                          className="btn btn-outline-dark btn-lg btn-light mr-4"
                          style={{ fontSize: "16px" }}
                          onClick={() =>
                            history.push(`/viewpets/${paw?.pet_id}`)
                          }
                        >
                          View
                        </button>
                        <button
                          className="btn btn-outline-dark btn-lg btn-light"
                          style={{ fontSize: "16px" }}
                          onClick={() =>
                            history.push({
                              pathname: `/editpets/${paw?.pet_id}`,
                              from: "list",
                            })
                          }
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  ))
                : null}

              <div className="col-md-6">
                <div
                  className="icon-box bg-lighter text-center p-30 mt-sm-0 border-1px"
                  data-margin-top="-90px"
                  // style={{ marginTop: "-90px" }}
                >
                  <a
                    className="icon bg-theme-colored icon-circled icon-border-effect effect-circled text-white"
                    // href="/addPet"
                    onClick={handleAddPet}
                  >
                    <i
                      className="fa fa-plus cursor-pointer"
                      aria-hidden="true"
                    ></i>{" "}
                  </a>
                  <h4 className="icon-box-title text-uppercase letter-space-3">
                    <h5 className="text-theme-colored">ADD NEW PET</h5>
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Pet;

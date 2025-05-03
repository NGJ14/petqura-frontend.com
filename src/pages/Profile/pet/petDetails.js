import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import BackButton from "../../../components/UI/BackButton";
import { getPetById } from "../../../store/UserStore/Pet/action";

const PetDetails = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const pet = useSelector((state) => state.Pet);

  useEffect(() => {
    dispatch(getPetById({ data: { id: params.id } }));
  }, []);

  const history = useHistory();

  return (
    <div className="common-container main-content ">
      <div className="container mt-30">
        <div className="text-right">
          <button
            className="btn orange-background text-white "
            onClick={() => history.push({ pathname: "/profile", tab: "pets" })}
          >
            {"<< Back To Pets"}
          </button>
        </div>
        <div className="section-content">
          <div className="row mt-30">
            <div className="icon-box bg-lighter text-center p-30 mt-sm-0 border-1px d-flex justify-content-between">
              <div>
                <p className=" orange-font text-left">
                  {pet?.petDetails?.pet_image ? (
                    <img
                      className="rounded-circle border d-flex justify-content-center align-items-center"
                      style={{ width: "100px", height: "100px" }}
                      src={pet?.petDetails?.pet_image}
                    />
                  ) : (
                    <i className="fa fa-paw"></i>
                  )}
                </p>
                <h4 className="icon-box-title text-uppercase letter-space-3 mt-3 text-theme-colored font-weight-bold">
                  {pet?.petDetails?.pet_name}
                </h4>
              </div>
              <a
                className="float-right  mt-10 text-dark h5"
                href={`/editpets/${params?.id}`}
              >
                <i className="fa fa-pencil" style={{ fontSize: "16px" }} /> EDIT
              </a>
            </div>
          </div>
          <div className="row mt-10 mb-20">
            <div className="icon-box bg-lighter  p-30 mt-sm-0 border-1px  ">
              <h3 className="icon-box-title mt-3">About</h3>
              <br />
              <div className="row ">
                <div className="col-md-6">
                  <p className="my-3">
                    <strong>Gender</strong> : {pet?.petDetails?.gender}
                  </p>
                  <p className="my-3">
                    <strong>Date of Birth</strong> :{" "}
                    {pet?.petDetails?.date_of_birth}
                  </p>
                  <p className="my-3">
                    <strong>Weight :</strong> {pet?.petDetails?.pet_weight} kg
                  </p>
                  <p className="my-3">
                    <strong>Category :</strong> {pet?.petDetails?.pet_type}
                  </p>
                  <p className="my-3">
                    <strong>Pet Toilet trained : </strong>

                    {pet?.petDetails?.is_toilet_trained ? "Yes" : "No"}
                  </p>
                </div>
                <div className="col-md-6">
                  <p className="my-3">
                    <strong>Breed :</strong> {pet?.petDetails?.pet_breed}
                  </p>
                  <p className="my-3">
                    <strong>Spayed or Neutered :</strong>{" "}
                    {pet?.petDetails?.spayed_or_neutered ? "Yes" : "No"}
                  </p>
                  <p className="my-3">
                    <strong>Is Friendly :</strong>{" "}
                    {pet?.petDetails?.is_friendly ? "Yes" : "No"}
                  </p>
                  <p className="my-3">
                    <strong>Physical Ailment : </strong>

                    {pet?.petDetails?.is_physical_ailment ? "Yes" : "No"}
                  </p>
                  <p className="my-3">
                    <strong>Pet insured : </strong>

                    {pet?.petDetails?.is_insured ? "Yes" : "No"}
                  </p>{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetDetails;

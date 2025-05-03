import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import ConfirmationAlert from "../../../components/confiramtionAlert";

import Loader from "../../../components/UI/Loader";
import { getAddressDetails } from "../../../store/UserStore/Address/action";
import {
  addPetDetails,
  editPetDetails,
} from "../../../store/UserStore/Pet/action";

// import { editPersonalDetails } from "../../store/Profile/action";

const AddPet = () => {
  const dispatch = useDispatch();
  const today = new Date();
  const [startDate, setStartDate] = useState(today.toLocaleDateString("en-CA"));
  const [modal_center, setmodal_center] = useState("");

  const [name, setname] = useState("");
  const [gender, setgender] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("select");
  const [weight, setWeight] = useState("");
  const [breed, setBreed] = useState("");
  const [petType, setPetType] = useState("Dogs");
  const [insured, setInsured] = useState("");
  const [friendly, setFriendly] = useState("");
  const [toiletTrained, setToiletTrained] = useState("");
  const [physicalAliment, setPhysicalAliment] = useState("");
  const [spayedNeutered, setSpayedNeutered] = useState("");
  const [disableSubmit, setDisableSubmit] = useState(false);
  let [petImage, setPetImage] = useState(null);
  const pet = useSelector((state) => state.Pet);

  const addressDetails = useSelector((state) => state.Address);
  const history = useHistory();

  useEffect(() => {
    dispatch(getAddressDetails({ data: { address_use: "shipping" } }));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", petImage);
    dispatch(
      addPetDetails({
        pet: {
          // user_id: ,
          gender: gender,
          address_id: address,
          date_of_birth: startDate,
          is_toilet_trained: toiletTrained,
          is_insured: insured,
          pet_name: name,
          pet_weight: weight,
          spayed_or_neutered: spayedNeutered,
          pet_breed: breed,
          pet_type: petType,
          is_friendly: friendly,
          is_physical_ailment: physicalAliment,
        },
        petImage: formData,
        callback: () => {
          setmodal_center(false);
          history.push({ pathname: "/profile", tab: "pets" });
        },
      })
    );
  };

  useEffect(() => {
    if (
      gender == "" ||
      toiletTrained == "" ||
      insured == "" ||
      name == "" ||
      weight == "" ||
      spayedNeutered == "" ||
      friendly == "" ||
      physicalAliment == "" ||
      breed == ""
    ) {
      setDisableSubmit(true);
    } else {
      setDisableSubmit(false);
    }
  }, [
    gender,
    address,
    toiletTrained,
    insured,
    name,
    weight,
    spayedNeutered,
    age,
    friendly,
    physicalAliment,
    breed,
  ]);

  const PetType = [
    { id: "1", value: "Dogs" },
    { id: "2", value: "Cats" },
    { id: "3", value: "Birds" },
    { id: "4", value: "Fish & Aquatics" },
    { id: "5", value: "Small Pets" },
    { id: "7", value: "Others" },
  ];

  return (
    <div className="common-container">
      <div className="container custom-personal mb-80">
        <div className="text-right">
          <button
            className="btn orange-background text-white "
            onClick={() => history.push({ pathname: "/profile", tab: "pets" })}
          >
            {"<< Back To Pets"}
          </button>
        </div>
        <h2 className="mb-50">Add Yout Pet Details</h2>

        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6">
              <h5 className="mt-5 mb-4">Your Pet's Name</h5>
              <div className=" input-group input-group-icon ">
                <input
                  className="pet-custom-inputs w-100"
                  type="text"
                  placeholder=" Name"
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                />
                <div className="input-icon">
                  <i className="fa fa-paw" />
                </div>
              </div>

              <div className="mb-5">
                <h5 className="mt-5 mb-4">Date of birth</h5>
                <div className=" input-group input-group-icon ">
                  <input
                    className="pet-custom-inputs w-100"
                    type="date"
                    min="1930-01-01"
                    max={today.toLocaleDateString("en-CA")}
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                  <div className="input-icon">
                    <i className="fa fa-paw" />
                  </div>
                </div>
              </div>

              <h5 className="mb-4 ">Pet Category </h5>
              <div className="input-group input-group-icon ">
                <select
                  className="w-100"
                  name="pet-type"
                  value={petType}
                  onChange={(e) => setPetType(e.target.value)}
                >
                  {PetType?.length &&
                    PetType?.map((cat) =>
                      petType == cat.value ? (
                        <option selected value={cat.value}>
                          {cat.value}
                        </option>
                      ) : (
                        <option value={cat.value}>{cat.value}</option>
                      )
                    )}
                </select>
              </div>

              <div className="input-group input-group-icon">
                <h5 className="">Gender</h5>
                <div
                  className="input-group "
                  onChange={(e) => setgender(e.target.value)}
                >
                  <input
                    className="pet-custom-inputs"
                    id="gender-male"
                    type="radio"
                    name="gender"
                    value="Male"
                  />
                  <label
                    classname="cursor-pointer"
                    className="cursor-pointer"
                    for="gender-male"
                  >
                    Male
                  </label>
                  <input
                    className="pet-custom-inputs"
                    id="gender-female"
                    type="radio"
                    name="gender"
                    value="Female"
                  />
                  <label
                    classname="cursor-pointer"
                    className="cursor-pointer"
                    for="gender-female"
                  >
                    Female
                  </label>
                </div>
              </div>

              <div className="input-group input-group-icon ">
                <h5 className="mb-4">Is the pet insured?</h5>
                <div
                  className="input-group "
                  onChange={(e) => setInsured(e.target.value)}
                >
                  <input
                    className="pet-custom-inputs"
                    id="insured-yes"
                    type="radio"
                    name="insured"
                    value="True"
                  />
                  <label className="cursor-pointer" for="insured-yes">
                    Yes
                  </label>
                  <input
                    className="pet-custom-inputs"
                    id="insured-no"
                    type="radio"
                    name="insured"
                    value="False"
                  />
                  <label className="cursor-pointer" for="insured-no">
                    No
                  </label>
                </div>
              </div>
              <div className="input-group input-group-icon ">
                <h5 className="">Is your pet toilet trained?</h5>

                <div
                  className="input-group "
                  onChange={(e) => setToiletTrained(e.target.value)}
                >
                  <input
                    className="pet-custom-inputs"
                    id="toiletTrained-yes"
                    type="radio"
                    name="toiletTrained"
                    value="True"
                  />
                  <label className="cursor-pointer" for="toiletTrained-yes">
                    Yes
                  </label>
                  <input
                    className="pet-custom-inputs"
                    id="toiletTrained-no"
                    type="radio"
                    name="toiletTrained"
                    value="False"
                  />
                  <label className="cursor-pointer" for="toiletTrained-no">
                    No
                  </label>
                </div>
              </div>

              <div className="input-group input-group-icon ">
                <div className="seller-form-group focused">
                  {/* <label className="seller-form-control-label">
                    Select Pet Image
                  </label> */}
                  <h5 className="mb-4">Your Pet's Photo</h5>
                  <input
                    type="file"
                    name="image"
                    className="pl-0 pt-4"
                    onChange={(e) => {
                      setPetImage(e.target.files[0]);
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6 ">
              <h5 className="mt-5 mb-4">Your Pet's Weight (in Kg)</h5>
              <div className=" input-group input-group-icon">
                <input
                  className="pet-custom-inputs w-100"
                  type="number"
                  placeholder="Weight in Kg"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
                <div className="input-icon">
                  <i className="fa fa-paw" />
                </div>
              </div>
              <h5 className="mb-4 ">Your Pet's Breed </h5>

              <div className=" input-group input-group-icon">
                <input
                  className="pet-custom-inputs w-100"
                  type="text"
                  placeholder="Breed name"
                  value={breed}
                  onChange={(e) => setBreed(e.target.value)}
                />
                <div className="input-icon">
                  <i className="fas fa-paw" />
                </div>
              </div>

              <div className="input-group input-group-icon ">
                <h5 className="mb-4 ">Is your Pet Friendly?</h5>
                <div
                  className="input-group "
                  onChange={(e) => setFriendly(e.target.value)}
                >
                  <input
                    className="pet-custom-inputs"
                    id="friendly-yes"
                    type="radio"
                    name="friendly"
                    value="True"
                  />
                  <label classname="cursor-pointer" for="friendly-yes">
                    Yes
                  </label>
                  <input
                    className="pet-custom-inputs"
                    id="friendly-no"
                    type="radio"
                    name="friendly"
                    value="False"
                  />
                  <label classname="cursor-pointer" for="friendly-no">
                    No
                  </label>
                </div>
              </div>

              <div className="input-group input-group-icon ">
                <h5 className="mb-4 ">
                  Does your pet have any Physical Ailment?
                </h5>
                <div
                  className="input-group "
                  onChange={(e) => setPhysicalAliment(e.target.value)}
                >
                  <input
                    className="pet-custom-inputs"
                    id="physicalAliment-yes"
                    type="radio"
                    name="physicalAliment"
                    value="True"
                  />
                  <label classname="cursor-pointer" for="physicalAliment-yes">
                    Yes
                  </label>
                  <input
                    className="pet-custom-inputs"
                    id="physicalAliment-no"
                    type="radio"
                    name="physicalAliment"
                    value="False"
                  />
                  <label classname="cursor-pointer" for="physicalAliment-no">
                    No
                  </label>
                </div>
              </div>
              <div className="input-group input-group-icon ">
                <h5 className="mb-4 ">Spayed / Neutered?</h5>
                <div
                  className="input-group "
                  onChange={(e) => setSpayedNeutered(e.target.value)}
                >
                  <input
                    className="pet-custom-inputs"
                    id="spayedneutered-yes"
                    type="radio"
                    name="spayedneutered"
                    value="True"
                  />
                  <label classname="cursor-pointer" for="spayedneutered-yes">
                    Yes
                  </label>
                  <input
                    className="pet-custom-inputs"
                    id="spayedneutered-no"
                    type="radio"
                    name="spayedneutered"
                    value="False"
                  />
                  <label classname="cursor-pointer" for="spayedneutered-no">
                    No
                  </label>
                </div>
              </div>
              <h5 className="mb-4 ">Select the Address </h5>

              <div className="input-group input-group-icon ">
                <select
                  name="address"
                  id="pet-select"
                  className="w-100"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                >
                  <option>select</option>
                  {addressDetails?.addresses?.length &&
                    addressDetails?.addresses?.map((address) => (
                      <option value={address?.id}>{address?.address}</option>
                    ))}
                </select>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="btn ok-button mt-4"
            disabled={disableSubmit}
          >
            Save Changes
          </button>
        </form>
        <ConfirmationAlert
          modal_center={modal_center}
          setmodal_center={setmodal_center}
        />
      </div>
      {pet?.loading && <Loader />}
    </div>
  );
};

export default AddPet;

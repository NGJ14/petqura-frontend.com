import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";

import Loader from "../../../components/UI/Loader";
import { getAddressDetails } from "../../../store/UserStore/Address/action";
import {
  editPetDetails,
  getPetById,
} from "../../../store/UserStore/Pet/action";
// import { editPersonalDetails } from "../../store/Profile/action";

const EditPet = () => {
  const dispatch = useDispatch();
  const addressDetails = useSelector((state) => state.Address);
  const Pet = useSelector((state) => state.Pet);

  const today = new Date();
  const [startDate, setStartDate] = useState(today.toLocaleDateString("en-CA"));
  const [name, setname] = useState("");
  const [Gender, setGender] = useState("");
  const [GenderMale, setGenderMale] = useState(false);
  const [GenderFemale, setGenderFemale] = useState(false);
  const [petType, setPetType] = useState("Dogs");
  const [address, setAddress] = useState("");
  const [weight, setWeight] = useState("");
  const [breed, setBreed] = useState("");
  const [insured, setInsured] = useState();
  const [friendly, setFriendly] = useState();
  const [toiletTrained, setToiletTrained] = useState();
  const [physicalAliment, setPhysicalAliment] = useState();
  const [spayedNeutered, setSpayedNeutered] = useState();
  const [disableSubmit, setDisableSubmit] = useState(false);
  let [petImage, setPetImage] = useState(null);
  const history = useHistory();

  const params = useParams();

  useEffect(() => {
    dispatch(getAddressDetails({ data: { address_use: "shipping" } }));
    dispatch(getPetById({ data: { id: params.id } }));
  }, []);

  // useEffect(() => {
  //   setInsured(pet?.petDetails?.is_insured);
  // }, []);

  useEffect(() => {
    Pet?.petDetails?.pet_name && setname(Pet?.petDetails?.pet_name);
    Pet?.petDetails?.pet_type && setPetType(Pet?.petDetails?.pet_type);
    Pet?.petDetails?.pet_weight && setWeight(Pet?.petDetails?.pet_weight);
    Pet?.petDetails?.gender && setGender(Pet?.petDetails?.gender);
    Pet?.petDetails?.pet_breed && setBreed(Pet?.petDetails?.pet_breed);
    Pet?.petDetails?.is_friendly && setFriendly(Pet?.petDetails?.is_friendly);
    Pet?.petDetails?.is_insured && setInsured(Pet?.petDetails?.is_insured);
    Pet?.petDetails.is_physical_ailment &&
      setPhysicalAliment(Pet?.petDetails.is_physical_ailment);
    Pet?.petDetails?.is_toilet_trained &&
      setToiletTrained(Pet?.petDetails?.is_toilet_trained);
    Pet?.petDetails?.spayed_or_neutered &&
      setSpayedNeutered(Pet?.petDetails?.spayed_or_neutered);
    setStartDate(
      new Date(Pet?.petDetails?.date_of_birth)?.toLocaleDateString("en-CA")
    );
    setPetImage(Pet?.petDetails?.pet_image);

    if (Pet?.petDetails?.gender === "Male") {
      setGenderMale(true);
      setGenderFemale(false);
    } else {
      setGenderMale(false);
      setGenderFemale(true);
    }
    console.log(
      "=====Genders Locla",
      Gender,
      weight,
      "=====Genders Server",
      Pet?.petDetails?.gender
    );
  }, [Pet?.petDetails?.pet_name]);

  const handleGender = (val) => {
    setGender(val);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", petImage);
    dispatch(
      editPetDetails({
        user: {
          id: params?.id,
          gender: Gender,
          address_id: Pet?.petDetails?.address?.id,
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
        callback: () =>
          history?.location?.from == "list"
            ? history.push({ pathname: "/profile", tab: "pets" })
            : history.push({ pathname: `/viewpets/${params?.id}` }),
      })
    );
  };
  useEffect(() => {
    if (name === "" || weight === "" || breed === "") {
      setDisableSubmit(true);
    } else {
      setDisableSubmit(false);
    }
  }, [name, weight, breed]);

  const PetTypes = [
    { id: "1", value: "Dogs" },
    { id: "2", value: "Cats" },
    { id: "3", value: "Birds" },
    { id: "4", value: "Fish & Aquatics" },
    { id: "5", value: "Small Pets" },
    { id: "7", value: "Others" },
  ];

  const fileName =
    petImage && typeof petImage === "string"
      ? petImage?.slice(52)
      : typeof petImage == "object"
      ? petImage?.name
      : "No file chosen";

  return (
    <div className="common-container main-content">
      <>
        <div className="container custom-personal mb-80">
          <div className="text-right">
            <button
              className="btn orange-background text-white"
              onClick={() =>
                history?.location?.from === "list"
                  ? history.push({ pathname: "/profile", tab: "pets" })
                  : history.push({ pathname: `/viewpets/${params?.id}` })
              }
            >
              {history?.location?.from === "list"
                ? "<< Back To Pets"
                : "<< Back To Pet Details"}{" "}
            </button>
          </div>
          <h2 className="mb-50">Edit Your Pet Details</h2>

          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6">
                <h5 className="mb-4">Your Pet's Name</h5>
                <div className=" input-group input-group-icon ">
                  <input
                    className="pet-custom-inputs  w-100"
                    type="text"
                    placeholder=" Name"
                    value={name}
                    onChange={(e) => setname(e.target.value)}
                  />
                  <div className="input-icon">
                    <i className="fa fa-paw" />
                  </div>
                </div>
                <div className="mb-4">
                  <h5 className="mb-4">Date of birth</h5>

                  <input
                    className="pet-custom-inputs w-100"
                    type="date"
                    min="1930-01-01"
                    max={today.toLocaleDateString("en-CA")}
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>

                <h5 className="mb-4 ">Pet Category </h5>
                <div className="input-group input-group-icon ">
                  <select
                    className="w-100"
                    name="pet-type"
                    value={petType}
                    onChange={(e) => setPetType(e.target.value)}
                  >
                    {PetTypes?.length &&
                      PetTypes?.map((cat) =>
                        petType === cat.value ? (
                          <option selected value={cat.value}>
                            {cat.value}
                          </option>
                        ) : (
                          <option value={cat.value}>{cat.value}</option>
                        )
                      )}
                  </select>
                </div>

                <div className="input-group input-group-icon ">
                  <h5 className="mb-3 ">Gender</h5>
                  {Gender !== undefined ? (
                    <div
                      className="input-group"
                      onChange={(e) => handleGender(e.target.value)}
                    >
                      <input
                        className="pet-custom-inputs"
                        id="gender-male"
                        type="radio"
                        name="gender"
                        value="Male"
                        // defaultChecked={true}
                        defaultChecked={GenderMale ? true : false}
                      />
                      <label for="gender-male">Male</label>
                      <input
                        className="pet-custom-inputs"
                        id="gender-female"
                        type="radio"
                        name="gender"
                        value="Female"
                        defaultChecked={GenderFemale ? true : false}
                      />
                      <label for="gender-female">Female</label>
                    </div>
                  ) : null}
                </div>

                <div className="input-group input-group-icon ">
                  <h5 className="mb-4 ">Is the pet insured?</h5>
                  {insured !== undefined ? (
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
                        defaultChecked={insured ? true : false}
                      />
                      <label for="insured-yes">Yes</label>
                      <input
                        className="pet-custom-inputs"
                        id="insured-no"
                        type="radio"
                        name="insured"
                        value="False"
                        defaultChecked={insured ? false : true}
                      />
                      <label for="insured-no">No</label>
                    </div>
                  ) : null}
                </div>
                <div className="input-group input-group-icon">
                  <h5 className="">Is your pet toilet trained?</h5>
                  {toiletTrained !== undefined ? (
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
                        defaultChecked={toiletTrained ? true : false}
                      />
                      <label for="toiletTrained-yes">Yes</label>
                      <input
                        className="pet-custom-inputs"
                        id="toiletTrained-no"
                        type="radio"
                        name="toiletTrained"
                        value="False"
                        defaultChecked={toiletTrained ? false : true}
                      />
                      <label for="toiletTrained-no">No</label>
                    </div>
                  ) : null}
                </div>
                <div className="input-group input-group-icon ">
                  <div className="seller-form-group focused edit-file">
                    <label className="seller-form-control-label">
                      Select Pet Image
                    </label>
                    <input
                      type="file"
                      name="image"
                      className="pl-0 pt-4 pe-auto noselect "
                      style={{
                        userSelect: "none",
                      }}
                      onChange={(e) => {
                        setPetImage(e.target.files[0]);
                      }}
                    />
                    <span
                      style={{
                        position: "absolute",
                        top: "45px",
                        left: "75px",
                        transition: "right 0.2s",
                        zIndex: "100",
                      }}
                      className="col-lg-6"
                    >
                      {fileName}
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-md-6 ">
                <h5 className="mb-4">Your Pet's Breed</h5>
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
                <h5 className="mb-4">Your Pet's Weight (in Kg)</h5>
                <div className=" input-group input-group-icon">
                  <input
                    className="pet-custom-inputs w-100"
                    type="number"
                    placeholder="Weight in Kg"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                  />
                  <div className="input-icon">
                    <i className="fas fa-paw" />
                  </div>
                </div>

                <div className="input-group input-group-icon ">
                  <h5 className="mb-4 ">Is your Pet Friendly?</h5>
                  {friendly !== undefined ? (
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
                        // defaultChecked={true}
                        defaultChecked={friendly ? true : false}
                      />
                      <label for="friendly-yes">Yes</label>
                      <input
                        className="pet-custom-inputs"
                        id="friendly-no"
                        type="radio"
                        name="friendly"
                        value="False"
                        defaultChecked={friendly ? false : true}
                      />
                      <label for="friendly-no">No</label>
                    </div>
                  ) : null}
                </div>

                <div className="input-group input-group-icon ">
                  <h5 className="mb-4 ">
                    Does your pet have any Physical Ailment?
                  </h5>
                  {physicalAliment !== undefined ? (
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
                        defaultChecked={physicalAliment ? true : false}
                      />
                      <label for="physicalAliment-yes">Yes</label>
                      <input
                        className="pet-custom-inputs"
                        id="physicalAliment-no"
                        type="radio"
                        name="physicalAliment"
                        value="False"
                        defaultChecked={physicalAliment ? false : true}
                      />
                      <label for="physicalAliment-no">No</label>
                    </div>
                  ) : null}
                </div>
                <div className="input-group input-group-icon ">
                  <h5 className="mb-4 ">Spayed / Neutered?</h5>
                  {spayedNeutered !== undefined ? (
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
                        defaultChecked={spayedNeutered ? true : false}
                      />
                      <label for="spayedneutered-yes">Yes</label>
                      <input
                        className="pet-custom-inputs"
                        id="spayedneutered-no"
                        type="radio"
                        name="spayedneutered"
                        value="False"
                        defaultChecked={spayedNeutered ? false : true}
                      />
                      <label for="spayedneutered-no">No</label>
                    </div>
                  ) : null}
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
        </div>
      </>
      {Pet?.loading && <Loader />}
    </div>
  );
};

export default EditPet;

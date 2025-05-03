import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Modal } from "reactstrap";
import { getLocalStorage } from "../../helpers/utils";
import {
  addClinicPayment,
  getClinicServices,
} from "../../store/UserStore/Clinic/action";

const PetMedDetailsForm = ({
  modal_petmeddetails_center,
  petmedDetailsToggle,
  slotId,
  slotTime,
  slotDate,
  clinicId,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  let [firstname, setFirstName] = useState("");
  let [age, setAge] = useState();
  let [medicalDetails, setMedicalDetails] = useState("");
  let [breedType, setBreedType] = useState("");
  let [custError, setCustError] = useState("");
  let [disable, setDisable] = useState(false);
  let [service, setService] = useState("select");
  let [visited, setVisited] = useState("select");
  const [petType, setPetType] = useState("select");

  const Register = useSelector((state) => state.Register);
  const Clinic = useSelector((state) => state.Clinic);
  const auth = getLocalStorage("AUTH_DETAILS");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!firstname || !age) {
      return setCustError("Please enter all the required fields");
    } else {
      setCustError("");
      const data = {
        pet_name: firstname,
        description: medicalDetails,
        pet_type: petType,
        pet_breed: breedType,
        pet_age: age,
        start_time: slotTime,
        time_slot_id: slotId,
        appointment_date: slotDate,
        slot_price: 250,
        service_id: service,
        visited_drop: visited,
      };

      dispatch(
        addClinicPayment({
          data: data,
          callback: () => {
            petmedDetailsToggle();
            setFirstName("");
            setMedicalDetails("");
            setBreedType("");
            setAge("");
            setVisited("");
          },
          history: history,
        })
      );
    }
  };

  useEffect(() => {
    if (
      firstname == "" ||
      age == undefined ||
      service == "select" ||
      petType == "select" ||
      visited == "select"
    ) {
      setDisable(true);
    } else setDisable(false);
  }, [firstname, age, service, petType, visited]);

  useEffect(() => {
    dispatch(getClinicServices({ data: { clinic_id: clinicId } }));
  }, [clinicId]);

  const PetType = [
    { id: "1", value: "Dogs" },
    { id: "2", value: "Cats" },
    { id: "3", value: "Birds" },
    { id: "4", value: "Fish & Aquatics" },
    { id: "5", value: "Small Pets" },
    { id: "7", value: "Others" },
  ];

  return (
    <>
      <Modal
        isOpen={modal_petmeddetails_center}
        centered={true}
        toggle={petmedDetailsToggle}
        style={{ maxWidth: "700px", width: "100%" }}
      >
        <div className="modal-header mb-5 text-center">
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
            onClick={() => {
              petmedDetailsToggle();
              //   dispatch(resetUserRegisterErrors());
            }}
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>

        <div className="modal-body">
          <div className="d-flex flex-column text-center">
            <form onSubmit={handleSubmit}>
              <div className="form-title text-center">
                <h2>Medical Details</h2>
              </div>
              <div
                className="form-group"
                style={{
                  margin: "15px 20px",
                  padding: "0px 20px",
                }}
              >
                <input
                  type="text"
                  className="form-control "
                  id="name"
                  placeholder="Pet Name"
                  style={{ fontSize: "1.5rem" }}
                  value={firstname}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div
                className="form-group"
                style={{
                  margin: "15px 20px",
                  padding: "0px 20px",
                }}
              >
                <input
                  type="number"
                  className="form-control "
                  id="name"
                  placeholder="Pet Age"
                  style={{ fontSize: "1.5rem" }}
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  autoComplete="off"
                />
              </div>

              <div
                className="form-group"
                style={{
                  margin: "15px 20px",
                  padding: "0px 20px",
                }}
              >
                <select
                  className="form-control "
                  style={{ fontSize: "1.4rem" }}
                  name="pet-type"
                  value={petType}
                  onChange={(e) => setPetType(e.target.value)}
                >
                  <option value="select">Select Pet Category </option>

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

              <div
                className="form-group"
                style={{
                  margin: "15px 20px",
                  padding: "0px 20px",
                }}
              >
                <select
                  className="form-control "
                  style={{ fontSize: "1.4rem" }}
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                >
                  <option value="select">Select Service </option>
                  {Clinic?.ServiceData?.clinic_services?.length &&
                    Clinic?.ServiceData?.clinic_services?.map((service) => (
                      <option value={service?.service_id}>
                        {service?.service}
                      </option>
                    ))}
                </select>
              </div>
              <div
                className="form-group"
                style={{
                  margin: "15px 20px",
                  padding: "0px 20px",
                }}
              >
                <textarea
                  rows={7}
                  type="text"
                  className="form-control custom-input"
                  id="name"
                  placeholder="Additional Information"
                  style={{ fontSize: "1.5rem" }}
                  value={medicalDetails}
                  onChange={(e) => setMedicalDetails(e.target.value)}
                />
              </div>

              <div
                className="form-group"
                style={{
                  margin: "15px 20px",
                  padding: "0px 20px",
                }}
              >
                <input
                  type="text"
                  className="form-control custom-input"
                  id="phone"
                  placeholder="Breed Type"
                  style={{ fontSize: "1.5rem" }}
                  value={breedType}
                  onChange={(e) => setBreedType(e.target.value)}
                />

                {Register?.error && (
                  <p className="mr-4 mt-2 mandatory">{Register?.error}</p>
                )}
                {custError && <p className="mr-4 mandatory">{custError}</p>}
              </div>
              <div
                className="form-group"
                style={{
                  margin: "15px 20px",
                  padding: "0px 20px",
                }}
              >
                <select
                  className="form-control "
                  style={{ fontSize: "1.4rem" }}
                  value={visited}
                  onChange={(e) => setVisited(e.target.value)}
                >
                  <option value="select">Have you visited here before?</option>
                  <option value="1">Yes</option>
                  <option value="0">No</option>
                </select>
              </div>

              <button
                type="submit"
                className="btn btn-info btn-round"
                style={{
                  padding: "5px 80px",
                  fontWeight: "bold",
                }}
                disabled={disable ? true : false}
              >
                Request Appointment
                {Clinic?.loading ? (
                  <i
                    className="fa fa-spinner fa-spin ml-3"
                    aria-hidden="true"
                  ></i>
                ) : null}
              </button>
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default PetMedDetailsForm;

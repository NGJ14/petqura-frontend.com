import React from "react";
import { Modal, ModalBody } from "reactstrap";
import useAppointment from "../../hooks/useAppointment";

const BookAppointment = ({ isOpen, toggle }) => {
  const { appointmentDetails } = useAppointment();
  console.log("appointmentDetails:", appointmentDetails);
  return (
    <>
      <Modal isOpen={isOpen} toggle={toggle} centered>
        <ModalBody>
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 my-3">
            <h1>Book Appointment</h1>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default BookAppointment;

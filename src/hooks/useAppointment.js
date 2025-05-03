import { useContext } from "react";
import { BookAppointmentContext } from "../contexts/BookAppointment";
const useAppointment = () => {
  return useContext(BookAppointmentContext);
}

export default useAppointment;
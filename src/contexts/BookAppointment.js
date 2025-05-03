import { createContext, useState } from "react";

export const BookAppointmentContext = createContext({});

const defaultState = {
    "clinic": "",
    "slot": "",
    "mobile_no": "",
    "doctor": ""
}

const BookAppointmentProvider = ({ children }) => {
    const [appointmentDetails, setAppointmentDetails] = useState(defaultState);
    return(
        <BookAppointmentContext.Provider value={{ appointmentDetails, setAppointmentDetails }}>
            {children}
        </BookAppointmentContext.Provider>
    )
}

export default BookAppointmentProvider;
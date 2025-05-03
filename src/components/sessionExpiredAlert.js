import React from "react";
import { useHistory } from "react-router";
import { Modal } from "reactstrap";

const SessionExpiredAlert = ({ modal_center, okHandleClick }) => {
  const history = useHistory();
  return (
    <Modal isOpen={modal_center} centered={true}>
      <div className="modal-header" style={{ direction: "ltr" }}>
        <h5 className="modal-title mt-0">Alert</h5>
      </div>
      <div className="modal-body">Session Expired!</div>
      <div className="modal-footer">
        <a
          href="/clinic"
          className="btn orange-background"
          onClick={okHandleClick}
        >
          OK
        </a>
      </div>
    </Modal>
  );
};

export default SessionExpiredAlert;

import React from "react";
import { Modal } from "reactstrap";

const SuccessConfirmationAlert = ({
  content,
  modal_center,
  setmodal_center,
  okHandle,
  okHandleClick,
}) => {
  return (
    <Modal
      isOpen={modal_center}
      centered={true}
      style={{ maxWidth: "450px", width: "100%" }}
    >
      <div className="modal-header" style={{ direction: "ltr" }}>
        <h5 className="modal-title mt-0">Success</h5>
      </div>
      <div className="modal-body">{content}</div>
      <div className="modal-footer">
        <button
          type="button"
          className="btn orange-background text-white"
          onClick={() => (okHandle ? okHandleClick() : setmodal_center(false))}
        >
          OK
        </button>
      </div>
    </Modal>
  );
};

export default SuccessConfirmationAlert;

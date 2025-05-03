import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Input, Modal, Row } from "reactstrap";
import {
  addSlotPriceDetails,
  getSlotPriceDetails,
} from "../../../../store/serviceProvider/Clinic/action";

const SlotFeePopUp = ({
  modal_center,
  setmodal_center,
  title,
  okText,
  cancelText,
  slotprice,
}) => {
  useEffect(() => {
    slotprice && setPrice(slotprice);
  }, [slotprice]);
  const [price, setPrice] = useState();
  const dispatch = useDispatch();
  const handleFeeClick = () => {
    dispatch(
      addSlotPriceDetails({
        SlotPrice: {
          slot_price: price,
        },
        callback: () => {
          dispatch(getSlotPriceDetails());
          setmodal_center(false);
        },
      })
    );
  };

  const handleKeyPress = () => {
    window.addEventListener(
      "keydown",
      function (e) {
        if (["Space", "ArrowUp", "ArrowDown"].indexOf(e.code) > -1) {
          e.preventDefault();
        }
      },
      false
    );
  };

  return (
    <Modal
      isOpen={modal_center}
      centered={true}
      style={{ maxWidth: "450px", width: "100%" }}
    >
      <div className="modal-header">
        <h5 className="modal-title mt-0">{title}</h5>
        <button
          type="button"
          onClick={() => setmodal_center(false)}
          className="close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body ml-4">
        <Row className="col-md-8 col-lg-12  addUsernameFieldWrap">
          <div className="checkAvailabilityWrap  col-lg-12 col-md-8">
            <label className="cust-label text-left">
              Slot Price
              <span className="mandatory">*</span>
            </label>
            <div className="d-flex col-lg-7 pl-0 col-sm-6">
              <Input
                autoComplete="off"
                value={price}
                type="number"
                name="product_name"
                className="col-lg-10 col-sm-10"
                placeholder="Enter Slot Price"
                onKeyDown={handleKeyPress}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              />
            </div>
          </div>
        </Row>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn cust-btn" onClick={handleFeeClick}>
          {okText || "SAVE"}
        </button>
        <button
          type="button"
          className="btn btn-light"
          onClick={() => setmodal_center(false)}
        >
          {cancelText || "CANCEL"}
        </button>
      </div>
    </Modal>
  );
};

export default SlotFeePopUp;

import React from "react";

const CustomAmount = ({ setActiveAmount, setAmount, amount }) => {
  const handleKeyDown = () => {
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
    <div className="mt-5 mb-50">
      <div
        className="mb-5"
        onClick={() => {
          setActiveAmount(5);
          setAmount(amount);
        }}
      >
        <p className="text-center  ">Enter a donation amount</p>
        <div className="form-field-wrapper">
          <input
            type="number"
            className="form-field  mt-4"
            data-type="text"
            placeholder=" ₹ Amount"
            style={{
              width: "83%",
              height: "30px",
              borderRadius: "10px",
              border: "2px solid #fff",
              fontSize: "18px",
              fontWeight: "bold",
              color: "#525151",
              textAlign: "center",
              fontSize: "30px",
            }}
            onKeyDown={handleKeyDown}
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CustomAmount;

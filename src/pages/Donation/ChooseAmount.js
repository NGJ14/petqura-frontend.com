import React from "react";

const ChooseAmount = ({
  setActiveAmount,
  setAmount,
  amount,
  days,
  petCount,
  setDays,
  setPetCount,
}) => {
  const arr = Array.from(Array(100).keys());

  return (
    <div>
      <div
        onClick={() => {
          setActiveAmount(5);
          setAmount(amount);
        }}
      >
        {days * petCount * 15 > 0 ? (
          <h4 className="mb-4 orange-font">Amount: {days * petCount * 15}</h4>
        ) : null}
        <p className="card-title">
          Enter number of days{"  "}
          <select
            style={{ width: "50px" }}
            className="donate-select"
            value={days}
            onChange={(e) => setDays(e.target.value)}
          >
            {arr?.slice(1)?.map((val) => (
              <option>{val}</option>
            ))}
          </select>
        </p>{" "}
        <p className="card-title mt-5">
          Enter number of pets {"   "}
          <select
            style={{ width: "50px" }}
            className="donate-select"
            value={petCount}
            onChange={(e) => setPetCount(e.target.value)}
          >
            {arr?.slice(1)?.map((val) => (
              <option>{val}</option>
            ))}
          </select>
        </p>
      </div>
    </div>
  );
};

export default ChooseAmount;

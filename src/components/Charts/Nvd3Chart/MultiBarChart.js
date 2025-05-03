import React from "react";
import NVD3Chart from "react-nvd3";

function generateNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getDatum() {
  let sin = [],
    sin2 = [],
    sin3 = [];

  const len = 10;
  for (let i = 1; i <= len; i++) {
    sin.push({
      x: i,
      y: generateNumber(0, 60),
    });
    sin2.push({
      x: i,
      y: generateNumber(0, 100),
    });
    sin3.push({
      x: i,
      y: generateNumber(0, 30),
    });
  }
  return [
    {
      values: sin,
      key: "Stream #0",
      color: "#A389D4",
    },
    {
      values: sin3,
      key: "Stream #1",
      color: "#04a9f5",
    },
    {
      values: sin2,
      key: "Stream #3",
      color: "#1de9b6",
      area: true,
    },
  ];
}

const data = getDatum();

class MultiBarChart extends React.Component {
  render() {
    const { datas, provider } = this.props;
    let data1 = [];
    let data2 = [];
    let data3 = [];
    let data4 = [];
    datas?.length &&
      datas
        .slice(1, 2)
        .map(
          (data) => data?.length && data?.map((dat) => (data1 = dat.result))
        );
    datas?.length &&
      datas
        .slice(2, 3)
        .map(
          (data) => data?.length && data?.map((dat) => (data2 = dat.result))
        );

    datas?.length &&
      datas
        .slice(3, 4)
        .map(
          (data) => data?.length && data?.map((dat) => (data3 = dat.result))
        );

    datas?.length &&
      datas
        .slice(4, 5)
        .map(
          (data) => data?.length && data?.map((dat) => (data4 = dat.result))
        );

    let key1 =
      provider == "clinic"
        ? "Completed Appointments"
        : provider == "seller"
        ? "Completed Orders"
        : null;
    let key2 =
      provider == "clinic"
        ? "Pending Appointments"
        : provider == "seller"
        ? "Pending Orders"
        : null;
    let key3 =
      provider == "clinic"
        ? "Cancelled Appointments"
        : provider == "seller"
        ? "Cancelled Orders"
        : null;
    let key4 =
      provider == "clinic"
        ? "Confirmed Appointments"
        : provider == "seller"
        ? "Confirmed Orders"
        : null;

    const data = [
      {
        values: data1,
        key: key1,
        color: "#A389D4",
      },
      {
        values: data2,
        key: key2,
        color: "#04a9f5",
      },
      {
        values: data3,
        key: key3,
        color: "#1de9b6",
      },
      {
        values: data4,
        key: key4,
        color: "#2E3683",
      },
    ];

    return (
      <NVD3Chart
        type="multiBarChart"
        datum={data}
        x="Date"
        y="Appointments"
        height={300}
        showValues
        groupSpacing={0.2}
      />
    );
  }
}

export default MultiBarChart;

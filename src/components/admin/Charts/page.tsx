"use client";
import ChartOne from "../Charts/ChartOne";
import ChartTwo from "../Charts/ChartTwo";
import ChartThree from "../Charts/ChartThree";
import React from "react";
// import Breadcrumb from "../../../../Breadcrumb";
import Breadcrumb from '../Breadcrumbs/Breadcrumb'

const Chart: React.FC = () => {
  return (
    <div>
      <Breadcrumb pageName="Chart" />

      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />
        <ChartThree />
      </div>
    </div>
  );
};

export default Chart;

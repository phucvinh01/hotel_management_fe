"use client";
import React from "react";
import ChartOne from "../Charts/ChartOne";
import ChartThree from "../Charts/ChartThree";
import ChartTwo from "../Charts/ChartTwo";
import ChatCard from "../Chat/ChatCard";
import TableOne from "../Tables/TableOne";
import CardDataStats from "../CardDataStats";
import { CalendarCheck, HomeIcon } from "lucide-react";

const ECommerce: React.FC = () => {
  return (
    <div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-2">
        <CardDataStats title="Total booking" total="$3.456K" rate="0.43%" levelUp>
         <CalendarCheck />
        </CardDataStats>
        <CardDataStats title="Rooms Available" total="14" rate="" levelUp>
          <HomeIcon/>
        </CardDataStats>
      </div>

      <div className="mt-4 grid grid-cols-2 first-letter:gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartThree />
       
        <ChartOne />
          <TableOne />
        <ChatCard />
      </div>
     
    </div>
  );
};

export default ECommerce;

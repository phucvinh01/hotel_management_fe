"use client"

import React, { FC, useState } from "react";
import LocationInput from "./LocationInput";
import { DateRange } from "react-day-picker";
import GuestsInput from "./GuestsInput";
import StayDatesRangeInput from "../DayRangePicker";

const StaySearchForm: FC<{}> = ({}) => {

  const [day, setDay ] = useState<DateRange | undefined>()
  const renderForm = () => {
    return (
      <form className="w-full p-4 relative mt-8 flex rounded-full shadow-xl dark:shadow-2xl bg-white dark:bg-neutral-800 ">
        <LocationInput className="flex-[1.5]" />
        <div className="self-center border-r border-slate-200 dark:border-slate-700 h-8"></div>
        <StayDatesRangeInput className="flex-1" />
        <div className="self-center border-r border-slate-200 dark:border-slate-700 h-8"></div>
        <GuestsInput className="flex-1" />
      </form>
    );
  };

  return renderForm();
};

export default StaySearchForm;

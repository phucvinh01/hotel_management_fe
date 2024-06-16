"use client"
import { cn } from "@/lib/utils"
import { CalendarIcon } from "lucide-react"
import * as React from "react"
import ReactDatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";


type CalendarMonthPickerProps = {
  className?:React.HTMLAttributes<HTMLDivElement>,
  month:Date,
  setMonth:React.Dispatch<React.SetStateAction<Date>>
}

export function CalendarMonthPicker({
  className,month, setMonth
}: CalendarMonthPickerProps) {

  return (
    <div className={cn("flex gap-3 items-center", className)}>
          <CalendarIcon/>
          <ReactDatePicker
           className="p-3 border rounded-3xl"
              selected={month}
              onChange={(date) => setMonth(date as Date)} 
              dateFormat="MMMM"
              showMonthYearPicker
              calendarClassName="p-3 border rounded-3xl"      
          />
    </div>
  )
}
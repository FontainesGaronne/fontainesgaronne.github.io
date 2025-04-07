import React from "react";
import { BsCalendar2CheckFill } from "react-icons/bs";
import { start } from "repl";

type EventDatesType = Partial<HTMLParagraphElement> & {
  startDate: Date; 
  endDate: Date;
  tinaFieldStartDate?: string;
  tinaFieldEndDate?: string;
}


export default function EventDates({ startDate, endDate, tinaFieldStartDate, tinaFieldEndDate }: EventDatesType) {
  if (!startDate && !endDate) {
    return null;
  }
  const classNames = "w-full flex gap-2 items-center bg-yellow-500 p-4";
  const dateTimeFormatOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  }
  

  if (startDate && endDate && startDate.toUTCString().split('T')[0] !== endDate.toUTCString().split('T')[0])  {
    const firstDate = startDate;
    const secondDate = endDate;
    return (
      <p className={classNames}>
        <BsCalendar2CheckFill aria-hidden />
        <span>
          <span>Du</span>{" "}
          <time
            dateTime={startDate.toISOString()}
            className="font-bold"
            data-tina-field={tinaFieldStartDate}
          >
            {new Intl.DateTimeFormat('fr', dateTimeFormatOptions).format(firstDate)}
          </time>{" "}
          <span>au</span>{" "}
          <time
            dateTime={endDate.toISOString()}
            className="font-bold"
            data-tina-field={tinaFieldEndDate}
          >
            {new Intl.DateTimeFormat('fr', dateTimeFormatOptions).format(secondDate)}
          </time>
        </span>
      </p>
    )
  }

  const date = startDate || endDate;

  return (
    <p className={classNames}>
      <BsCalendar2CheckFill aria-hidden />
      <span>
        <span>Le</span>{" "}  
        <time
          dateTime={date.toISOString()}
          className="font-bold"
          data-tina-field={tinaFieldStartDate}
        >
          {new Intl.DateTimeFormat('fr', dateTimeFormatOptions).format(date)}
        </time>
      </span>
    </p>
  )
}

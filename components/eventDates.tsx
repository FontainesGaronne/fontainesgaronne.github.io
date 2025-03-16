import { cn } from "@/lib/utils";
import { BsCalendar2CheckFill } from "react-icons/bs";

type EventDatesType = Partial<HTMLParagraphElement> & {
  startDate: string; 
  endDate: string;
  tinaFieldStartDate?: string;
  tinaFieldEndDate?: string;
}

function formatDateForDatetime(date) {
  return date.split('/').reverse().join('-') 
} 

export default function EventDates({ startDate, endDate, tinaFieldStartDate, tinaFieldEndDate, className }: EventDatesType) {
  if (!startDate && !endDate) {
    return null;
  }
  const classNames = cn("w-full flex gap-2 items-center bg-yellow-500 p-4", className);
  const dateTimeFormatOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  }
  

  if (startDate && endDate && startDate !== endDate)  {
    const firstDate = new Date(formatDateForDatetime(startDate));
    const secondDate = new Date(formatDateForDatetime(endDate))
    return (
      <p className={classNames}>
        <BsCalendar2CheckFill aria-hidden />
        <span>
          <span>Du</span>{" "}
          <time
            dateTime={formatDateForDatetime(startDate)}
            className="font-bold"
            data-tina-field={tinaFieldStartDate}
          >
            {new Intl.DateTimeFormat('fr', dateTimeFormatOptions).format(firstDate)}
          </time>{" "}
          <span>au</span>{" "}
          <time
            dateTime={formatDateForDatetime(endDate)}
            className="font-bold"
            data-tina-field={tinaFieldEndDate}
          >
            {new Intl.DateTimeFormat('fr', dateTimeFormatOptions).format(secondDate)}
          </time>
        </span>
      </p>
    )
  }

  const date = new Date(formatDateForDatetime(startDate || endDate));

  return (
    <p className={classNames}>
      <BsCalendar2CheckFill aria-hidden />
      <span>
        <span>Le</span>{" "}  
        <time
          dateTime={formatDateForDatetime(startDate || endDate)}
          className="font-bold"
          data-tina-field={tinaFieldStartDate}
        >
          {new Intl.DateTimeFormat('fr', dateTimeFormatOptions).format(date)}
        </time>
      </span>
    </p>
  )
}
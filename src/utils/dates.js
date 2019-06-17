import { getDaysInMonth, format, startOfMonth } from "date-fns";

export const getInfoAboutMonth = (type, year, month) => {
  let date, yearForState, monthForState, daysInMonth, firstDayOfMonth;

  if (type === "current" || type === "initial") {
    date = new Date();
    firstDayOfMonth = format(startOfMonth(date), "d");
    daysInMonth = getDaysInMonth(date);
    yearForState = date.getFullYear();
    monthForState = date.getMonth();
  }

  if (type === "prev") {
    date = new Date(
      month === 0 ? year - 1 : year,
      month === 0 ? 11 : month - 1
    );
    firstDayOfMonth = format(startOfMonth(date), "d");
    daysInMonth = getDaysInMonth(date);
    monthForState = date.getMonth();
    yearForState = date.getFullYear();
  }

  if (type === "next") {
    date = new Date(
      month === 11 ? year + 1 : year,
      month === 11 ? 0 : month + 1
    );
    firstDayOfMonth = format(startOfMonth(date), "d");
    daysInMonth = getDaysInMonth(date);
    monthForState = date.getMonth();
    yearForState = date.getFullYear();
  }

  return {
    yearForState,
    monthForState,
    daysInMonth,
    firstDayOfMonth
  };
};

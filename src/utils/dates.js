import { getDaysInMonth, format, startOfMonth } from "date-fns";

export const getInfoAboutMonth = (type, year, month) => {
  let date, yearForState, monthForState, daysInMonth, firstDayOfMonth
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
      this.state.month === 11 ? this.state.year + 1 : this.state.year,
      this.state.month === 11 ? 0 : this.state.month + 1
    );
  }

  return {
    yearForState,
    monthForState,
    daysInMonth,
    firstDayOfMonth
  };
};

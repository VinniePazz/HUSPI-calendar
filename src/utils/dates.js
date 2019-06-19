import { getDaysInMonth, format, startOfMonth, isToday } from "date-fns";

export const getInfoAboutMonth = (type, year, month) => {
  let date;

  if (type === "current" || type === "initial") {
    date = new Date();
  }

  if (type === "prev") {
    date = new Date(
      month === 0 ? year - 1 : year,
      month === 0 ? 11 : month - 1
    );
  }

  if (type === "next") {
    date = new Date(
      month === 11 ? year + 1 : year,
      month === 11 ? 0 : month + 1
    );
  }

  const firstDayOfMonth = format(startOfMonth(date), "d");
  const daysInMonth = getDaysInMonth(date);
  const yearForState = date.getFullYear();
  const monthForState = date.getMonth();

  return {
    yearForState,
    monthForState,
    daysInMonth,
    firstDayOfMonth
  };
};

export const getPreviousDays = ({ year, month, firstDayOfMonth }) => {
  const daysInPrevMonth = getDaysInMonth(
    new Date(month === 0 ? year - 1 : year, month === 0 ? 11 : month - 1)
  );
  // Sunday == 0 (string)
  const prevNumOfDays = firstDayOfMonth == 0 ? 7 - 1 : firstDayOfMonth - 1;
  const prevDays = Array.from({ length: prevNumOfDays }).map((key, i) => {
    const date = new Date(
      year,
      month - 1,
      i + (daysInPrevMonth - prevNumOfDays + 1)
    );
    return {
      id: format(date, "D/MM/YYYY"),
      dim: true,
      previous: true
    };
  });
  return prevDays;
};

export const getCurrentDays = ({ year, month, daysInMonth }) => {
  return Array.from({ length: daysInMonth }).map((key, i) => {
    const date = new Date(year, month, i + 1);
    return {
      id: format(date, "D/MM/YYYY"),
      dim: false,
      isToday: isToday(date)
    };
  });
};

export const getNextDays = ({ year, month, daysInMonth }, nextAmountOfDays) => {
  return Array.from({ length: nextAmountOfDays }).map((key, i) => {
    const date = new Date(
      month === 11 ? year + 1 : year,
      month === 11 ? 0 : month + 1,
      i + 1
    );
    return {
      id: format(date, "D/MM/YYYY"),
      dim: true
    };
  });
};

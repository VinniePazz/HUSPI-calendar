import React, { Component } from "react";
import { getDaysInMonth, format, isToday } from "date-fns";

import {
  Wrapper,
  Header,
  Body,
  Month,
  DaysOfWeek,
  CalendarDays
} from "../styled-components";
import { getInfoAboutMonth } from "../utils/dates";

import Day from "./Day";
import LeftArrow from "../icons/LeftArrow";
import RightArrow from "../icons/RightArrow";
import Home from "../icons/Home";

const ruLocale = require("date-fns/locale/ru");

export default class Calendar extends Component {
  state = {
    loading: true,
    tasksId: [],
    tasks: {},
    animate: false
  };

  addTask = (date, task) => {
    let newTasksId, newTasks, newTasksOfDay;
    const { tasksId, tasks } = this.state;
    task.id = Date.now(); //generated aka unique id for task
    // check if we already have tasks in this day
    if (tasksId.includes(date)) {
      newTasksId = [...tasksId];
    } else {
      newTasksId = [...tasksId, date];
    }

    if (tasks.hasOwnProperty(date)) {
      newTasksOfDay = [...tasks[date], task].sort((task1, task2) => {
        if (task1.hours < task2.hours) {
          return -1;
        }
        if (task1.hours > task2.hours) {
          return 1;
        }
        return 0;
      });
      newTasks = { ...tasks, [date]: newTasksOfDay };
    } else {
      newTasksOfDay = [task];
      newTasks = { ...tasks, [date]: newTasksOfDay };
    }

    localStorage.setItem("tasks", JSON.stringify(newTasks));
    localStorage.setItem("tasksId", JSON.stringify(newTasksId));

    this.setState({
      tasksId: newTasksId,
      tasks: newTasks
    });
  };

  deleteTask = (id, taskId) => {
    let { tasks, tasksId } = this.state;
    const newTasksOfDay = tasks[id].filter(task =>
      task.id === taskId ? false : true
    );

    let newTasks = { ...tasks, [id]: newTasksOfDay };
    let newTasksId = tasksId;
    // console.log(newTasks);
    if (newTasksOfDay.length === 0) {
      delete newTasks[id];
      newTasksId = tasksId.filter(dayId => (dayId === id ? false : true));
    }

    localStorage.setItem("tasks", JSON.stringify(newTasks));
    localStorage.setItem("tasksId", JSON.stringify(newTasksId));

    this.setState({
      tasks: newTasks,
      tasksId: newTasksId
    });
  };

  componentDidMount() {
    // get current date info
    const {
      yearForState,
      monthForState,
      daysInMonth,
      firstDayOfMonth
    } = getInfoAboutMonth("initial");

    // get data from previous sessions
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    const tasksId = JSON.parse(localStorage.getItem("tasksId"));

    this.setState({
      tasks,
      tasksId,
      year: yearForState,
      month: monthForState,
      firstDayOfMonth,
      daysInMonth,
      today: new Date(),
      loading: false
    });
  }

  renderDays = () => {
    const {
      year,
      month,
      daysInMonth,
      firstDayOfMonth,
      tasks,
      tasksId,
      animate
    } = this.state;

    let daysInPrevMonth,
      prevNumOfDays,
      prevDays,
      nextAmountOfDays,
      nextDays,
      currentDays,
      calendarDays,
      calendarDaysWithTasks;

    daysInPrevMonth = getDaysInMonth(
      new Date(month === 0 ? year - 1 : year, month === 0 ? 11 : month - 1)
    );

    // Sunday == 0 (string)
    prevNumOfDays = firstDayOfMonth == 0 ? 7 - 1 : firstDayOfMonth - 1;
    prevDays = Array.from({ length: prevNumOfDays }).map((key, i) => {
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

    currentDays = Array.from({ length: daysInMonth }).map((key, i) => {
      const date = new Date(year, month, i + 1);
      return {
        id: format(date, "D/MM/YYYY"),
        dim: false,
        isToday: isToday(date)
      };
    });

    nextAmountOfDays = 42 - (prevNumOfDays + daysInMonth);

    nextDays = Array.from({ length: nextAmountOfDays }).map((key, i) => {
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

    calendarDays = [...prevDays, ...currentDays, ...nextDays];

    //check if days have tasks
    calendarDaysWithTasks = calendarDays.map(day => {
      if (tasksId.includes(day.id)) {
        return { ...day, tasks: tasks[day.id] };
      } else {
        return { ...day, tasks: [] };
      }
    });

    //and finally - render all our calendar days - EASY LIFE!
    return calendarDaysWithTasks.map(
      ({ id, dim, isToday, tasks = [], previous }) => (
        <Day
          key={id}
          isToday={isToday}
          animate={isToday && animate}
          dim={dim}
          isPrevious={previous}
          id={id}
          tasks={tasks}
          addTask={this.addTask}
          deleteTask={this.deleteTask}
        />
      )
    );
  };

  changeMonth = type => {
    let { year, month } = this.state;
    const {
      yearForState,
      monthForState,
      daysInMonth,
      firstDayOfMonth
    } = getInfoAboutMonth(type, year, month);

    this.setState({
      firstDayOfMonth,
      daysInMonth,
      year: yearForState,
      month: monthForState,
      animate: type === "current" ? true : false
    });
  };

  render() {
    const { year, month, loading } = this.state;
    const daysOfWeek = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

    if (loading) {
      return null;
    } else {
      return (
        <Wrapper>
          <Header>
            <LeftArrow onClick={() => this.changeMonth("prev")} />
            <RightArrow onClick={() => this.changeMonth("next")} />
            <Home onClick={() => this.changeMonth("current")} />
          </Header>
          <Body>
            <Month>{`${format(new Date(year, month), "MMMM", {
              locale: ruLocale
            })} ${year}`}</Month>
            <DaysOfWeek>
              {daysOfWeek.map(day => (
                <span key={day}>{day}</span>
              ))}
            </DaysOfWeek>
            <CalendarDays>{this.renderDays()}</CalendarDays>
          </Body>
        </Wrapper>
      );
    }
  }
}

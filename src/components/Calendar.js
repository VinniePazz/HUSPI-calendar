import React, { Component } from "react";
import { format } from "date-fns";

import {
  Wrapper,
  Header,
  Body,
  Month,
  DaysOfWeek,
  CalendarDays
} from "../styled-components/Calendar";

import {
  getInfoAboutMonth,
  getPreviousDays,
  getCurrentDays,
  getNextDays
} from "../utils/dates";

import Day from "./Day";
// ====================== icons ========================
import LeftArrow from "../icons/LeftArrow";
import RightArrow from "../icons/RightArrow";
import Home from "../icons/Home";
// =====================================================
const ruLocale = require("date-fns/locale/ru");

export default class Calendar extends Component {
  state = {
    loading: true,
    tasksId: [],
    tasks: {},
    animate: false
  };

  componentDidMount() {
    // get current date info
    const {
      yearForState,
      monthForState,
      daysInMonth,
      firstDayOfMonth
    } = getInfoAboutMonth("initial");

    // get data from previous user sessions
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    let tasksId = JSON.parse(localStorage.getItem("tasksId"));

    //Maded for browser compatibility - LocalStorage individual bitch
    tasks = tasks || {};
    tasksId = tasksId || [];

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

  addTask = (date, task) => {
    let newTasksId, newTasks, newTasksOfDay;
    const { tasksId, tasks } = this.state;
    task.id = Date.now(); //generated aka unique id for task

    // check if we already have tasks in this day
    if (tasksId.includes(date)) {
      newTasksId = [...tasksId];
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
      newTasksId = [...tasksId, date];
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

  renderDays = () => {
    const {
      daysInMonth,
      firstDayOfMonth,
      tasks,
      tasksId,
      animate
    } = this.state;

    const cells = 42;
    const prevAmountOfDays = firstDayOfMonth == 0 ? 7 - 1 : firstDayOfMonth - 1; // Sunday == 0 :)
    const nextAmountOfDays = cells - (prevAmountOfDays + daysInMonth);

    const prevDays = getPreviousDays(this.state);
    const currentDays = getCurrentDays(this.state);
    const nextDays = getNextDays(this.state, nextAmountOfDays);

    const calendarDays = [...prevDays, ...currentDays, ...nextDays];
    
    //check if days have tasks
    const calendarDaysWithTasks = calendarDays.map(day => {
      if (tasksId.includes(day.id)) {
        return { ...day, tasks: tasks[day.id] };
      } else {
        return { ...day, tasks: [] };
      }
    });
    //and finally - render all our calendar days = EASY LIFE!
    return calendarDaysWithTasks.map(
      ({ id, dim, isToday, tasks = [], previous }) => (
        <Day
          key={id}
          tasks={tasks}
          isToday={isToday}
          animate={isToday && animate}
          dim={dim}
          isPrevious={previous}
          id={id}
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

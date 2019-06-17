import React, { Component } from "react";
import styled from "styled-components";

import {
  endOfMonth,
  getDaysInMonth,
  format,
  startOfMonth,
  isToday
} from "date-fns";

import { getInfoAboutMonth } from "../utils/dates";

import Day from "./Day";
import LeftArrow from "../icons/LeftArrow.jsx";
import RightArrow from "../icons/RightArrow.jsx";

const Wrapper = styled.div`
  min-width: 320px;
  padding: 1rem;
  background: #6d6875;
  box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.3),
    0 1px 3px 1px rgba(60, 64, 67, 0.15);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
`;

const TodayCTA = styled.button`
  margin: 0 auto;
  padding: 0.5rem 0;
  border: none;
  background: none;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #ffcdb2;
  cursor: pointer;
  outline: none;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
`;

const Month = styled.div`
  padding: 0.8rem 0;
  color: #ffece2;
  font-weight: 600;
  font-size: 1.2rem;
  text-align: center;
`;

const DaysOfWeek = styled.div`
  padding: 0.6rem 0;
  border-bottom: 1px solid rgba(227, 185, 165, 0.55);
  display: flex;

  span {
    flex: 1;
    text-align: center;
    color: #ffece2;
    cursor: default;
  }
`;

const Days = styled.div`
  padding: 0.5rem 0;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-auto-rows: 50px;
`;

export default class Calendar extends Component {
  state = {
    loading: true,
    tasksId: [],
    tasks: {}
  };

  addTask = (id, task) => {
    task.id = Date.now(); //generated aka unique id for task
    const { tasksId, tasks } = this.state;
    let newTasksId, newTasks, newTasksOfDay;

    if (this.state.tasksId.includes(id)) {
      newTasksId = [...tasksId];
    } else {
      newTasksId = [...tasksId, id];
    }

    if (tasks.hasOwnProperty(id)) {
      newTasksOfDay = [...tasks[id], task];
      newTasks = { ...tasks, [id]: newTasksOfDay };
    } else {
      newTasksOfDay = [task];
      newTasks = { ...tasks, [id]: newTasksOfDay };
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
    const date = new Date();
    const firstDayOfMonth = format(startOfMonth(date), "d");
    const daysInMonth = getDaysInMonth(date);
    const year = date.getFullYear();
    const month = date.getMonth();
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    const tasksId = JSON.parse(localStorage.getItem("tasksId"));
    this.setState({
      tasks,
      tasksId,
      year,
      month,
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
      tasksId
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
        isToday: isToday(date),
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
        dim: true,
        isToday: isToday(date),
        next: true
      };
    });

    calendarDays = [...prevDays, ...currentDays, ...nextDays];

    calendarDaysWithTasks = calendarDays.map(day => {
      if (tasksId.includes(day.id)) {
        return { ...day, tasks: tasks[day.id] };
      } else {
        return { ...day, tasks: [] };
      }
    });

    return calendarDaysWithTasks.map(({ id, dim, isToday, tasks = [] }) => (
      <Day
        key={id}
        isToday={isToday}
        dim={dim}
        id={id}
        tasks={tasks}
        addTask={this.addTask}
        deleteTask={this.deleteTask}
      />
    ));
  };

  changeMonth = type => {
    let { year, month } = this.state;
    if (type === "prev") {
      const {
        yearForState,
        monthForState,
        daysInMonth,
        firstDayOfMonth
      } = getInfoAboutMonth(type, year, month);

      this.setState({
        year: yearForState,
        month: monthForState,
        firstDayOfMonth,
        daysInMonth
      });
    }
    if (type === "next") {
      const {
        yearForState,
        monthForState,
        daysInMonth,
        firstDayOfMonth
      } = getInfoAboutMonth(type, year, month);
     

      const firstDayOfMonth = format(startOfMonth(date), "d");
      const lastWeekDayOfMonth = format(endOfMonth(date), "d");
      const daysInMonth = getDaysInMonth(date);
      const month = date.getMonth();
      const year = date.getFullYear();
      this.setState({
        firstDayOfMonth,
        lastWeekDayOfMonth,
        daysInMonth,
        year,
        month
      });
    }
    if (type === "current") {
      const date = new Date();
      const firstDayOfMonth = format(startOfMonth(date), "d");
      const lastWeekDayOfMonth = format(endOfMonth(date), "d");
      const daysInMonth = getDaysInMonth(date);
      const year = date.getFullYear();
      const month = date.getMonth();
      this.setState({
        firstDayOfMonth,
        lastWeekDayOfMonth,
        daysInMonth,
        year,
        month
      });
    }
  };

  render() {
    if (this.state.loading) {
      return null;
    } else {
      return (
        <Wrapper>
          <Header>
            <LeftArrow onClick={() => this.changeMonth("prev")} />
            <TodayCTA onClick={() => this.changeMonth("current")}>
              cегодня
            </TodayCTA>
            <RightArrow onClick={() => this.changeMonth("next")} />
          </Header>
          <Body>
            <Month>{`${format(
              new Date(this.state.year, this.state.month),
              "MMM"
            )} ${this.state.year}`}</Month>
            <DaysOfWeek>
              <span>Пн</span>
              <span>Вт</span>
              <span>Ср</span>
              <span>Чт</span>
              <span>Пт</span>
              <span>Сб</span>
              <span>Вс</span>
            </DaysOfWeek>
            <Days>{this.renderDays()}</Days>
          </Body>
        </Wrapper>
      );
    }
  }
}

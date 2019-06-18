import React, { Component } from "react";
import styled, { keyframes } from "styled-components";
import { format } from "date-fns";

import Modal from "./Modal";

const ruLocale = require("date-fns/locale/ru");

const animation = keyframes`
  0% {
    transform: scale(1);
    background: #e5989b;
  }
  50% {
    transform: scale(1.2);
    background: #ff5f65;
  }
  100% {
    transform: scale(1);
    background: #e5989b;
  }
`;

const StyledDay = styled.span`
  color: ${({ dim }) => (dim ? "#929292" : "#ffece2")};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: default;
  position: relative;
  font-weight: 600;
  border: 1px solid transparent;
  transition: all 0.2s;

  & span {
    content: "";
    width: 30px;
    height: 30px;
    position: absolute;
    border-radius: 100%;
    z-index: 0;
    display: ${({ isToday }) => (isToday ? "block" : "none")};
    background-color: #e5989b;
    animation: ${animation} 1s linear;
    animation-iteration-count: 2;
    ${({ animate }) =>
      animate
        ? "animation-play-state: running"
        : "animation-play-state: paused"}
  }

  &::after {
    position: absolute;
    content: "";
    background: ${({ color }) => color};
    top: 7%;
    right: 7%;
    height: 7px;
    width: 7px;
    border-radius: 100%;
    display: ${({ isHaveTasks }) => (isHaveTasks ? "block" : "none")};
  }

  p {
    z-index: 1;
  }

  &:hover {
    border-color: ${({ dim }) => (dim ? "#929292" : "#ffcdb2")};
  }
`;

export default class Day extends Component {
  state = {
    showModal: false
  };

  toogleModal = () => {
    this.setState(prevState => ({ showModal: !prevState.showModal }));
  };

  render() {
    const {
      isToday,
      dim,
      animate,
      id,
      tasks,
      addTask,
      deleteTask,
      isPrevious
    } = this.props;

    // const currentDate = id.split("/"); // [19, 06, 1994]
    // currentDate[1] = format(new Date(currentDate[0], currentDate[2]), "MMMM", {
    //   locale: ruLocale
    // });

    return (
      <>
        <StyledDay
          onClick={this.toogleModal}
          dim={dim}
          isToday={isToday}
          animate={animate}
          isHaveTasks={tasks.length > 0}
          color={tasks.length > 0 ? tasks[0].color : null}
        >
          <p>{id.split("/")[0]}</p>
          <span />
        </StyledDay>
        {this.state.showModal && (
          <Modal
            tasks={tasks}
            id={id}
            addTask={addTask}
            deleteTask={deleteTask}
            isPrevious={isPrevious}
            toogleModal={this.toogleModal}
          />
        )}
      </>
    );
  }
}

import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Modal from "./Modal";

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

  &::before {
    content: "";
    width: 30px;
    height: 30px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 100%;
    z-index: 0;
    display: ${({ isToday }) => (isToday ? "block" : "none")};
    background-color: #b5838d;
  }

  &::after {
    position: absolute;
    content: "";
    background: #ffcdb2;
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
    return (
      <>
        <StyledDay
          onClick={this.toogleModal}
          dim={this.props.dim}
          isToday={this.props.isToday}
          isHaveTasks={this.props.tasks.length > 0}
        >
          <p>{this.props.id.split("/")[0]}</p>
        </StyledDay>
        {this.state.showModal && (
          <Modal
            closeModal={this.toogleModal}
            tasks={this.props.tasks}
            id={this.props.id}
            addTask={this.props.addTask}
            deleteTask={this.props.deleteTask}
          />
        )}
      </>
    );
  }
}

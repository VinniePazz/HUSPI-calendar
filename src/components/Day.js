import React, { Component } from "react";
import PropTypes from "prop-types";

import Modal from "./Modal";
import { StyledDay } from "../styled-components/Day";

class Day extends Component {
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

Day.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
  isToday: PropTypes.bool,
  dim: PropTypes.bool,
  animate: PropTypes.bool,
  id: PropTypes.string.isRequired,
  addTask: PropTypes.func,
  deleteTask: PropTypes.func,
  isPrevious: PropTypes.bool
};

export default Day;

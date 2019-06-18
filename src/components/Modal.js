import React, { Component } from "react";
import ReactDOM from "react-dom";

import Form from "../components/Form";

import {
  Dimmer,
  Body,
  Date,
  TaskArea,
  Task,
  Heading,
  Title,
  Description,
  Time,
  Error
} from "../styled-components/Modal";
import Cancel from "../icons/Cancel";

class Modal extends Component {
  state = {
    title: "",
    description: "",
    hours: 12,
    minutes: 0,
    color: "#FFB4A2",
    errors: {
      title: "",
      previous: ""
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    let { title, description, hours, minutes, color, errors } = this.state;
    let { id, addTask, toogleModal } = this.props;

    if (this.props.isPrevious) {
      this.setState({
        errors: { ...errors, previous: "Нельзя вернуться в прошлое :)" }
      });
      return;
    } else if (title === "") {
      this.setState({
        errors: { ...errors, title: "Укажите название события" }
      });
      return;
    }

    if (minutes === 0 || minutes === 5) {
      minutes = `0${minutes}`;
    }

    const task = {
      title,
      description,
      hours,
      minutes,
      color
    };

    addTask(id, task);

    this.setState({
      title: "",
      description: "",
      hours: 12,
      minutes: 0,
      color: "#FFB4A2"
    });

    toogleModal();
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleHours = e => {
    let hours = parseInt(e.target.value, 10);
    this.setState({ hours });
  };

  handleMinutes = e => {
    let minutes = parseInt(e.target.value, 10);
    this.setState({ minutes });
  };

  render() {
    const date = this.props.id.replace(/\//gi, "-");

    return ReactDOM.createPortal(
      <Dimmer onClick={this.props.toogleModal}>
        <Body onClick={e => e.stopPropagation()}>
          <Date>{`${date}`}</Date>
          <TaskArea>
            {this.props.tasks.map(task => (
              <Task key={task.id} color={task.color}>
                <Time color={task.color}>
                  <span>{`${task.hours}:${task.minutes}`}</span>
                </Time>
                <Title color={task.color}>{task.title}</Title>
                <Description>{task.description}</Description>
                <span
                  onClick={() => this.props.deleteTask(this.props.id, task.id)}
                >
                  <Cancel deleteTask={this.props.deleteTask} />
                </span>
              </Task>
            ))}
          </TaskArea>

          <Heading>Добавить событие</Heading>
          {this.state.errors.previous && (
            <Error>{this.state.errors.previous}</Error>
          )}
          <Form
            {...this.state}
            onSubmit={this.handleSubmit}
            handleHours={this.handleHours}
            handleChange={this.handleChange}
            handleMinutes={this.handleMinutes}
            toogleModal={this.props.toogleModal}
          />
        </Body>
      </Dimmer>,
      document.querySelector("#modal")
    );
  }
}

export default Modal;

import React, { Component } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

import Cancel from "../icons/Cancel";

const Dimmer = styled.div`
  background: rgba(0, 0, 0, 0.8);
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Body = styled.div`
  background: #fafafa;
  padding: 1rem;
  max-width: 500px;
  min-width: 350px;
`;

const Date = styled.h2`
  font-size: 1rem;
  text-align: center;
  position: relative;
  padding-bottom: 1rem;
  margin-bottom: 0.5rem;

  &::after {
    content: "";
    position: absolute;
    top: 65%;
    left: 50%;
    width: 5rem;
    height: 5px;
    background-color: #ffb4a2;
    transform: translateX(-50%);
  }
`;

const TaskArea = styled.div`
  padding: 0.4em 0;
  max-height: 250px;
  overflow: auto;
  margin-bottom: 1rem;

  & > p {
    font-size: 0.9rem;
  }
`;

const Task = styled.div`
  padding: 0.5rem 0.5rem 0.5rem 1rem;
  border-left: 4px solid ${({ color }) => color};
  position: relative;
  margin: 0.4em 0;
  background: #ffece2;
  color: rgba(0, 0, 0, 0.67);
  position: relative;
`;

const Heading = styled.h4`
  text-align: center;
`;

const Title = styled.h3`
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 0.2em;
  color: ${({ color }) => color};
`;

const Description = styled.p`
  font-size: 0.8rem;
  word-break: break-all;
`;

const Time = styled.p`
  text-align: left;
  margin-bottom: 0.4rem;
  span {
    font-size: 0.8rem;
    font-weight: 600;
    background-color: ${({ color }) => color};
    border-radius: 10px;
    padding: 0.2rem 0.4rem;
    color: #fafafa;
  }
`;

const Form = styled.form`
  & input[type="text"] {
    padding: 0.2rem 0;
    text-indent: 5px;
    margin-bottom: 0.5rem;
    border: none;
    background: none;
    border-bottom: 2px solid #ffb4a2;
  }

  & input[type="text"]:focus {
    background-color: #ffb4a2;
    color: #fafafa;
  }
`;

const Error = styled.p`
  color: #e41111;
  padding: 0.2rem;
  font-size: 0.9rem;
  font-weight: 600;
  text-align: center;
`;

const Configuration = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0.4rem 0;

  & > div {
    margin: 0 0.2rem;
  }

  & label {
    font-size: 0.8rem;
    color: rgba(0, 0, 0, 0.75);
  }
`;

const Hours = styled.select``;

const ColorInput = styled.input`
  margin-left: 5px;
  border: none;
  width: 70px;
  height: 40px;
  cursor: pointer;
  position: relative;
  transition: all 0.2s;

  &:hover {
    background-color: #e04f5f;
  }

  &:focus {
    background-color: #e04f5f;
  }
`;

const ActionBar = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
`;

const Button = styled.button`
  padding: 0.8rem 1.6rem;
  border: none;
  background: none;
  text-transform: uppercase;
  color: #fafafa;
  cursor: pointer;
`;

const Submit = styled(Button)`
  background: #36b35c;

  &:hover {
    background: rgba(54, 179, 92, 0.73);
  }
`;

const Dismiss = styled(Button)`
  background: #e04f5f;

  &:hover {
    background: rgba(224, 79, 95, 0.68);
  }
`;

class Modal extends Component {
  state = {
    title: "",
    description: "",
    hours: 12,
    minutes: 0,
    color: "#FFB4A2",
    errors: {
      title: "",
      hours: "",
      minutes: "",
      previous: ""
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    let { title, description, hours, minutes, color, errors } = this.state;

    if (this.props.isPrevious) {
      this.setState({
        errors: { ...errors, previous: "Нельзя вернуться в прошлое :)" }
      });
      return;
    }

    if (title === "") {
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

    this.props.addTask(this.props.id, task);

    this.setState({
      title: "",
      description: "",
      hours: 12,
      minutes: 0,
      color: "#FFB4A2"
    });

    this.props.toogleModal();
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
          {this.props.tasks.length === 0 && (
            <p
              style={{
                fontSize: ".8rem",
                color: "rgba(0,0,0,.75)",
                textAlign: "center",
                marginTop: ".5rem"
              }}
            >
              нет событий
            </p>
          )}
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

          <Heading>Новое событие</Heading>
          {this.state.errors.previous && (
            <Error>{this.state.errors.previous}</Error>
          )}
          <Form
            onSubmit={this.handleSubmit}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <input
              type="text"
              name="title"
              value={this.state.title}
              autoComplete="off"
              placeholder="название"
              onChange={this.handleChange}
            />
            {this.state.errors.title && (
              <Error>{this.state.errors.title}</Error>
            )}
            <textarea
              name="description"
              value={this.state.description}
              placeholder="описание"
              rows={5}
              cols={5}
              autoComplete="off"
              onChange={this.handleChange}
              maxLength={200}
            />
            <Configuration>
              <div>
                <label htmlFor="hours">Время: </label>
                <Hours
                  id="hours"
                  name="hours"
                  value={this.state.hours}
                  onChange={this.handleHours}
                >
                  {Array.from({ length: 24 }).map((value, i) => (
                    <option key={value} value={i}>{`${i}`}</option>
                  ))}
                </Hours>
              </div>
              <label>:</label>
              <div>
                <select
                  id="minutes"
                  name="minutes"
                  onChange={this.handleMinutes}
                >
                  {Array.from({ length: 13 }).map((value, i) => {
                    const content =
                      i === 0 || i === 1 ? `0${i * 5}` : `${i * 5}`;
                    return (
                      <option key={value} value={i * 5}>
                        {content}
                      </option>
                    );
                  })}
                </select>
              </div>
              <ColorInput
                name="color"
                type="color"
                value={this.state.color}
                onChange={this.handleChange}
              />
            </Configuration>
            <ActionBar>
              <Submit type="submit">сохранить</Submit>
              <Dismiss type="button" onClick={this.props.toogleModal}>
                отменить
              </Dismiss>
            </ActionBar>
          </Form>
        </Body>
      </Dimmer>,
      document.querySelector("#modal")
    );
  }
}

export default Modal;

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
`;

const TaskArea = styled.div`
  padding: 0.2em 0;
  max-height: 300px;
  overflow: auto;

  & > p {
    font-size: 0.9rem;
  }
`;

const Task = styled.div`
  padding: 0.5rem 0.5rem 0.5rem 1rem;
  border-left: 4px solid #e05a8a;
  position: relative;
  margin: 0.4em 0;
  background: #ffece2;
  position: relative;
`;

const Title = styled.h3`
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 0.2em;
`;

const Description = styled.p`
  font-size: 0.8rem;
`;

const Time = styled.p`
  text-align: left;
  margin-bottom: 0.4rem;
  span {
    font-size: 0.8rem;
    font-weight: 600;
    background-color: #e05a8a;
    border-radius: 10px;
    padding: 0.2rem 0.4rem;
    color: #fafafa;
  }
`;

const ActionBar = styled.div``;

class Modal extends Component {
  state = {
    title: "",
    description: ""
  };
  handleSubmit = e => {
    e.preventDefault();
    const { title, description } = this.state;
    const task = {
      title,
      description
    };
    this.props.addTask(this.props.id, task);
    this.setState({
      title: "",
      description: ""
    });
  };
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  render() {
    return ReactDOM.createPortal(
      <Dimmer onClick={this.props.closeModal}>
        <Body onClick={e => e.stopPropagation()}>
          <Date>19 июня 2019</Date>
          <p>Нет событий</p>
          <TaskArea />
          {this.props.tasks.map(task => (
            <Task key={task.id}>
              <Time>
                <span>15:00</span>
              </Time>
              <Title>{task.title}</Title>
              <Description>{task.description}</Description>
              <span
                onClick={() => this.props.deleteTask(this.props.id, task.id)}
              >
                <Cancel deleteTask={this.props.deleteTask} />
              </span>
            </Task>
          ))}
          <h4 style={{ textAlign: "center", margin: ".4rem 0" }}>
            Добавить событие
          </h4>
          <form
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
            <ActionBar>
              <button type="submit">submit</button>
              <button type="button">submit</button>
            </ActionBar>
          </form>
        </Body>
      </Dimmer>,
      document.querySelector("#modal")
    );
  }
}

export default Modal;

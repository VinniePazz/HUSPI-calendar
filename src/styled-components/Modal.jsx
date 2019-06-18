import styled from "styled-components";

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

const Error = styled.p`
  color: #e41111;
  padding: 0.2rem;
  font-size: 0.9rem;
  font-weight: 600;
  text-align: center;
`;

export {
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
};

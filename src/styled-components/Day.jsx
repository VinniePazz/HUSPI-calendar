import styled, { keyframes } from "styled-components";

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

export const StyledDay = styled.span`
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

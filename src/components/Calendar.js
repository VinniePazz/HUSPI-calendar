import React, { Component } from "react";
import styled from "styled-components";

import LeftArrow from "../icons/LeftArrow.jsx";
import RightArrow from "../icons/RightArrow.jsx";

const Wrapper = styled.div`
  width: 350px;
  height: 500px;
  padding: 1rem;
  background: #6d6875;
  box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.3),
    0 1px 3px 1px rgba(60, 64, 67, 0.15);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
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

const Day = styled.span`
  color: #ffece2;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: default;
  position: relative;
  font-weight: 600;

  p {
    z-index: 10000;
  }

  &:hover {
    color: #ffcdb2;
  }
`;

const Circle = styled.span`
  position: absolute;
  content: "";
  background: ${({ color }) => color};
  top: 50%;
  left: ${({ left }) => `${left}%`};
  transform: translate(-50%, -50%);
  height: 40px;
  width: 40px;
  border-radius: 100%;
  z-index: ${({ n }) => n};
`;

const Footer = styled.div``;

export default class Calendar extends Component {
  render() {
    return (
      <Wrapper>
        <Header>
          <LeftArrow />
          <TodayCTA>cегодня</TodayCTA>
          <RightArrow />
        </Header>
        <Body>
          <Month>Июнь 2019</Month>
          <DaysOfWeek>
            <span>Пн</span>
            <span>Вт</span>
            <span>Ср</span>
            <span>Чт</span>
            <span>Пт</span>
            <span>Сб</span>
            <span>Вс</span>
          </DaysOfWeek>
          <Days>
            {Array.from({ length: 42 }).map((day, i) => (
              <Day key={i}>
                <p>{i}</p>
                {i === 7 ? (
                  <>
                    <Circle left={"50"} color={"#ff8f00"} n={2} />
                    <Circle left={"53"} color={"#00ffde"} n={1} />
                  </>
                ) : null}
              </Day>
            ))}
          </Days>
        </Body>
        <Footer />
      </Wrapper>
    );
  }
}

import styled from "styled-components";

export const Wrapper = styled.div`
  min-width: 320px;
  padding: 1rem;
  background: #281d3a;
  box-shadow: 0 1px 20px 2px rgba(60, 64, 67, 0.3),
    0 1px 3px 1px rgba(60, 64, 67, 0.15);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
`;

export const TodayCTA = styled.button`
  margin: 0 auto;
  padding: 0.5rem 0;
  border: none;
  background: none;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
  outline: none;
  color: #ffece2;

  &:hover {
    color: #ffcdb2;
  }
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Month = styled.div`
  padding: 0.8rem 0;
  color: #ffece2;
  font-weight: 600;
  font-size: 1.2rem;
  text-align: center;
`;

export const DaysOfWeek = styled.div`
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

export const CalendarDays = styled.div`
  padding: 0.5rem 0;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-auto-rows: 50px;
`;

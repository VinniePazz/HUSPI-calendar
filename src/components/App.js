import React from "react";
import styled from "styled-components";

import Calendar from "./Calendar";

const Background = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
`;
const Background1 = styled(Background)`
  z-index: -1;
  background-color: #E5989B;
  clip-path: polygon(78% 85%, 120% 0%, 100% 100%, 0% 105%);
`;
const Background2 = styled(Background)`
  z-index: -2;
  background-color: #B5838D;
  clip-path: polygon(76% 80%, 114% 0%, 100% 100%, 0% 103%);
`;

function App() {
  return (
    <>
      <Background1 />
      <Background2 />
      <Calendar />
    </>
  );
}

export default App;

import styled from "styled-components";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;

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

export {
  StyledForm,
  Error,
  Configuration,
  Hours,
  ColorInput,
  ActionBar,
  Submit,
  Dismiss
};

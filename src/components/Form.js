import React from "react";
import {
  StyledForm,
  Error,
  Configuration,
  Hours,
  ColorInput,
  ActionBar,
  Submit,
  Dismiss
} from "../styled-components/Form";

const Form = props => {
  return (
    <StyledForm onSubmit={props.onSubmit}>
      <input
        type="text"
        name="title"
        value={props.title}
        autoComplete="off"
        placeholder="название"
        onChange={props.handleChange}
      />
      {props.errors.title && <Error>{props.errors.title}</Error>}
      <textarea
        name="description"
        value={props.description}
        placeholder="описание"
        rows={5}
        cols={5}
        autoComplete="off"
        onChange={props.handleChange}
        maxLength={200}
      />
      <Configuration>
        <div>
          <label htmlFor="hours">Время: </label>
          <Hours
            id="hours"
            name="hours"
            value={props.hours}
            onChange={props.handleHours}
          >
            {Array.from({ length: 24 }).map((value, i) => (
              <option key={i} value={i}>{`${i}`}</option>
            ))}
          </Hours>
        </div>
        <span>:</span>
        <div>
          <select id="minutes" name="minutes" onChange={props.handleMinutes}>
            {Array.from({ length: 13 }).map((value, i) => {
              const content = i === 0 || i === 1 ? `0${i * 5}` : `${i * 5}`;
              return (
                <option key={i} value={i * 5}>
                  {content}
                </option>
              );
            })}
          </select>
        </div>
        <ColorInput
          name="color"
          type="color"
          value={props.color}
          onChange={props.handleChange}
        />
      </Configuration>
      <ActionBar>
        <Submit type="submit">сохранить</Submit>
        <Dismiss type="button" onClick={props.toogleModal}>
          отменить
        </Dismiss>
      </ActionBar>
    </StyledForm>
  );
};

export default Form;

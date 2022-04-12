import React from "react";
import styled from "styled-components";

const TextArea = (props) => {
  const { label = "텍스트", _onChange, id, type = "text", value = "" } = props;

  return (
    <TextareaDiv>
      <ElTextarea
        id={id}
        onChange={_onChange}
        placeholder=" "
        rows="8"
        value={value}
      />
      <label>{label}</label>
    </TextareaDiv>
  );
};

const TextareaDiv = styled.div`
  width: 100%;
  background-color: transparent;
  box-sizing: border-box;
  position: relative;
  display: flex;
  align-items: center;

  & label {
    position: absolute;
    left: 10px;
    top: 15px;
    padding: 0 5px;
    transition: 0.4s;
    user-select: none;
    font-size: 22px;
    z-index: 2;
  }

  & textarea:focus + label,
  textarea:not(:placeholder-shown) + label {
    transform: translateX(5px) translateY(-50%) translateY(-50%)
      translateY(-25%);
    font-size: 13px;
    background-color: white;
    color: rgba(0, 0, 0, 0.6);
    z-index: 90;
  }
`;
const ElTextarea = styled.textarea`
  width: 100%;
  height: 100%;
  outline: none;
  border: 1px solid #212121;
  background-color: transparent;
  color: black;
  font-size: 20px;
  padding: 22px;
  z-index: 3;
`;

export default TextArea;

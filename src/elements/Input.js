import React from "react";
import styled from "styled-components";

const Input = (props) => {
  const { _id, type, label, _onChange, value, _disabled, onSubmit } = props;
  return (
    <InputWrap>
      <InputBar
        type={type}
        id={_id}
        onChange={_onChange}
        placeholder=" "
        value={value}
        disabled={_disabled}
        onKeyPress={(e) => {
          if (e.key === "Enter") onSubmit(e);
        }}
      />
      <label>{label}</label>
    </InputWrap>
  );
};

Input.defaultProps = {
  label: "텍스트",
  _onChange: () => {},
  _id: "",
  type: "text",
  multiLine: false,
  value: "",
  onSubmit: () => {},
  _disabled: false,
};

const InputWrap = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;

  & label {
    z-index: 3;
    padding: 0 5px;
    position: absolute;
    left: 10px;
    top: 12px;
    transition: 0.4s;
    user-select: none;
    font-size: 22px;
  }

  & input:focus + label,
  input:not(:placeholder-shown) + label {
    font-size: 16px;
    transform: translateX(15px) translateY(-19px);
    background-color: white;
    color: rgba(0, 0, 0, 0.6);
    z-index: 92;
  }
`;

const InputBar = styled.input`
  /* z-index: 90; */
  width: 100%;
  padding: 12px 8px;
  border: 1px solid #212121;
  background-color: transparent;
  box-sizing: border-box;
  font-size: 24px;
`;

export default Input;

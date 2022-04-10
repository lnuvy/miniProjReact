import React from "react";
import styled from "styled-components";

const Input = (props) => {
  const {
    label,
    placeholder,
    _onChange,
    type = "text",
    value,
    autoComplete,
    id,
  } = props;

  return (
    <>
      <InputField
        id={id}
        type={type}
        placeholder={placeholder}
        onChange={_onChange}
        value={value}
        autoComplete={autoComplete}
      />
    </>
  );
};

Input.defaultProps = {
  label: "",
  placeholder: "텍스트를 입력하세용",
  _onChange: () => {},
  type: "text",
  value: "",
  autoComplete: "on",
  id: null,
};

const InputField = styled.input`
  background-color: transparent;
  border: none;
  border-bottom: 1px solid #ccc;
  color: #555;
  margin: 15px 0px;
  box-sizing: border-box;
  padding: 10px 0px;
  position: relative;
  ${(props) => (props.width ? `width: ${props.width};` : `width: 100%;`)};

  &:focus {
    outline: none;
  }
`;

export default Input;

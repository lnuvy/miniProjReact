import React from "react";
import styled from "styled-components";

const Input = (props) => {
  const {
    label,
    placeholder,
    _onChange,
    type,
    value,
    autoComplete,
    height,
    id = "",
    clickColor,
    disabled,
  } = props;

  const styles = { clickColor: clickColor, height: height };

  return (
    <>
      <SmallText>{label}</SmallText>
      <InputField
        id={id}
        type={type}
        placeholder={placeholder}
        onChange={_onChange}
        value={value}
        disabled={disabled}
        autoComplete={autoComplete}
        {...styles}
      />
    </>
  );
};

Input.defaultProps = {
  disableed: false,
  label: "",
  placeholder: "텍스트를 입력하세용",
  _onChange: () => {},
  type: "text",
  value: "",
  autoComplete: "on",
  height: "",
  clickColor: "",
  width: "",
  id: "",
};

const SmallText = styled.small`
  color: #aaa;
  display: flex;
  flex-direction: column;
  float: left;
`;

const InputField = styled.input`
  background-color: transparent;
  border: none;
  border-bottom: 1px solid #ccc;
  color: #555;
  margin: 10px 0px;
  box-sizing: border-box;
  padding: 10px 0px;
  position: relative;
  ${(props) => (props.width ? `width: ${props.width};` : `width: 100%;`)};
  ${(props) => (props.height ? `height: ${props.height};` : `height: 30px;`)};

  &:focus {
    outline: none;
    border-bottom: 2px solid #98ddca;
    transition-duration: 0.25s;
    ${(props) =>
      props.clickColor ? `color: ${props.clickColor}!important;` : ""};
  }
`;

export default Input;

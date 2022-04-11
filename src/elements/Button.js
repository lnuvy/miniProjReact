import React from "react";
import styled from "styled-components";

const Button = (props) => {
  const { children, _id, _onClick, ...styles } = props;

  return (
    <ElButton onClick={_onClick} id={_id} {...styles}>
      {children}
    </ElButton>
  );
};

Button.defaultProps = {
  _id: "",
  children: null,
  _onClick: () => {},
  isFloat: false,
  margin: false,
  width: "",
  padding: "12px 0px",
  _color: false,
  shadow: false,
};

const ElButton = styled.button`
  cursor: pointer;
  font-size: 18px;
  width: ${(props) => props.width};
  ${(props) =>
    props._color ? `background: ${props._color};` : `background: #212121;`}
  ${(props) => (props.color ? `color: ${props.color};` : `color: #fff;`)}
  box-sizing: border-box;
  padding: ${(props) => props.padding};
  border: none;
  border-radius: 30px;
  font-weight: 500;
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
  ${(props) =>
    props.shadow ? `box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;` : ""}
`;

export default Button;

//브랜치 체크

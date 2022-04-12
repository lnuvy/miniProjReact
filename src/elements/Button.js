import React from "react";
import styled from "styled-components";

const Button = (props) => {
  const { children, _id, _onClick, small, ...styles } = props;

  if (small) {
    return (
      <SmallButton onClick={_onClick} id={_id} {...styles}>
        {children}
      </SmallButton>
    );
  }

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
  width: "100%",
  padding: "12px 0px",
  _color: false,
  shadow: false,
  small: false,
  bg: false,
};

const ElButton = styled.button`
  cursor: pointer;
  font-size: 18px;
  ${(props) => (props.width ? `width: ${props.width};` : "100px")};
  ${(props) => (props.bg ? `background: ${props.bg};` : `background: #212121;`)}
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

const SmallButton = styled.button`
  cursor: pointer;
  font-size: 14px;
  ${(props) => (props.width ? `width: ${props.width};` : "100px")};
  ${(props) => (props.bg ? `background: ${props.bg};` : `background: #212121;`)}
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

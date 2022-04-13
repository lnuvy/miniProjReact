import React from "react";
import styled from "styled-components";

const AuthButton = (props) => {
  const { children, isPost, _id, _onClick, isMe, ...styles } = props;

  if (isPost && isMe)
    return (
      <PostBtn id={_id} onClick={_onClick} {...styles}>
        {children}
      </PostBtn>
    );
  if (isMe) {
    return (
      <CommentBtn id={_id} onClick={_onClick} {...styles}>
        {children}
      </CommentBtn>
    );
  }

  return null;
};

AuthButton.defaultProps = {
  width: "100%",
};

const PostBtn = styled.div`
  cursor: pointer;
  font-size: 14px;
  box-sizing: border-box;
  border: none;
  font-weight: 500;
  width: ${(props) => props.width};
  ${(props) => (props.bg ? `background: ${props.bg};` : `background: #212121;`)}
  ${(props) => (props.color ? `color: ${props.color};` : `color: #fff;`)}
  ${(props) => (props.width ? `width: ${props.width};` : "width: 100%")};
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
  ${(props) =>
    props.shadow ? `box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;` : ""}
    padding: ${(props) => props.padding};
`;

const CommentBtn = styled.div`
  cursor: pointer;
  font-size: 12px;
  box-sizing: border-box;
  border: none;
  font-weight: 500;
  border-radius: 5px;
  width: ${(props) => props.width};
  ${(props) => (props.bg ? `background: ${props.bg};` : `background: #212121;`)}
  ${(props) => (props.color ? `color: ${props.color};` : `color: #fff;`)}
  ${(props) => (props.width ? `width: ${props.width};` : "width: 100%")};
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
  ${(props) =>
    props.shadow ? `box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;` : ""}
    padding: ${(props) => props.padding};
`;

export default AuthButton;

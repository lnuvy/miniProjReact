import React from "react";
import styled from "styled-components";
import { FaPen } from "react-icons/fa";

const FixedButton = (props) => {
  const { _onClick, children = null } = props;

  // const switchIcon = (category) => {

  // }

  return (
    <FloatButton onClick={_onClick}>
      <FaPen />
    </FloatButton>
  );
};

export default FixedButton;

const FloatButton = styled.button`
  width: 60px;
  height: 60px;
  background-color: #212121;
  color: #fff;
  box-sizing: border-box;
  font-size: 36px;
  font-weight: 800;
  position: fixed;
  bottom: 50px;
  text-align: center;
  vertical-align: middle;
  border: none;
  border-radius: 70%;
  right: 16px;
`;

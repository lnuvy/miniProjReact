import React from "react";
import styled from "styled-components";
import { FaPen } from "react-icons/fa";

const FixedButton = (props) => {
  const { _onClick, children = null } = props;

  return (
    <FloatButton onClick={_onClick}>
      <FaPen />
    </FloatButton>
  );
};

export default FixedButton;

const FloatButton = styled.button`
  cursor: pointer;
  width: 60px;
  height: 60px;
  background-color: #212121;
  color: #fff;
  box-sizing: border-box;
  font-size: 26px;
  font-weight: 800;
  position: fixed;
  bottom: 50px;
  text-align: center;
  vertical-align: middle;
  border: none;
  border-radius: 70%;
  right: 30px;
  z-index: 999;
`;

import React from "react";
import styled from "styled-components";

const Grid = (props) => {
  const { children, _onClick, _id, ...styles } = props;

  return (
    <GridBox onClick={_onClick} id={_id} {...styles}>
      {children}
    </GridBox>
  );
};

Grid.defaultProps = {
  _id: false,
  children: null,
  isFlex: false,
  isFlex_center: false,
  isFlex_start: false,
  width: "100%",
  padding: false,
  margin: false,
  bg: false,
  center: false,
  _onClick: () => {},
  _cursor: false,
  isSticky: false,
  zIndexTop: false,
};

const GridBox = styled.div`
  ${(props) => (props._cursor ? `cursor: pointer;` : "")};
  ${(props) =>
    props.isFlex
      ? `display: flex; align-items: center; justify-content: space-between;`
      : null}
  ${(props) =>
    props.isFlex_center
      ? `display: flex; align-items: center; justify-content: center;`
      : null}
        ${(props) =>
    props.isFlex_start
      ? `display: flex; align-items: center; justify-content: start;`
      : null}
  ${(props) => (props.isSticky ? `position: sticky; top: 0;` : null)};
  ${(props) => (props.zIndexTop ? `z-index: 998;` : null)};

  height: 100%;
  box-sizing: border-box;
  width: ${(props) => props.width};
  ${(props) => (props.padding ? `padding: ${props.padding};` : null)}
  ${(props) => (props.margin ? `margin: ${props.margin};` : null)}
  ${(props) => (props.bg ? `background: ${props.bg};` : null)}
  ${(props) => (props.center ? `text-align: center;` : "")}
`;

export default Grid;

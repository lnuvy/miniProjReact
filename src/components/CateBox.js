import React from "react";
import styled from "styled-components";
import { Button, Grid } from "../elements";

const CateBox = (props) => {
  const { _onClick, current = null } = props;

  const textArr = ["# 의자", "# 책상", "# 전자기기", "# 건강용품", "# 기타"];

  const cate = {
    chair: "#C3E5AE",
    desk: "#C3B9EA",
    elecItem: "#F1E1A6",
    healthCare: "#F4BBBB",
    etc: "#77E4D4",
  };

  const category = Object.entries(cate);
  console.log(category);

  return (
    <CateDiv>
      <Grid>
        {category.map((c, i) => {
          console.log(c);
          return (
            <Button
              key={c[0]}
              small
              _id={c[0]}
              onClick={_onClick}
              bg={c[1]}
              width="100px"
              margin="10px 10px 0px 10px"
              current={current === c[0]} // 현재 선택된 카테고리와
            >
              {textArr[i]}
            </Button>
          );
        })}
      </Grid>
    </CateDiv>
  );
};

const CateDiv = styled.div`
  margin: 0 auto;
  width: 380px;
  text-align: center;
  align-items: center;
`;

export default CateBox;

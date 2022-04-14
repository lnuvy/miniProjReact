import React from "react";
import styled from "styled-components";
import { Button, Grid } from "../elements";

const CateBox = (props) => {
  const { _onClick, current = null, nowCategory = false } = props;

  const textArr = ["# 의자", "# 책상", "# 전자기기", "# 건강용품", "# 기타"];

  const cate = {
    chair: "#C3E5AE",
    desk: "#C3B9EA",
    elecItem: "#F1E1A6",
    healthCare: "#F4BBBB",
    etc: "#77E4D4",
  };
  const category = Object.entries(cate);

  return (
    <CateDiv>
      <Grid>
        {category.map((c, i) => {
          if (nowCategory) {
            return (
              <OneCateDiv key={`${c[0]}_${i}`}>
                {c[0] === nowCategory ? (
                  <Button
                    small
                    _id={c[0]}
                    onClick={_onClick}
                    bg={c[1]}
                    width="100px"
                    // margin="15px 15px 0px 15px"
                    margin="10px 10px 0"
                    current={current === c[0]} // 현재 선택된 카테고리와 일치하면 true, 아니면 false
                  >
                    {textArr[i]}
                  </Button>
                ) : null}
              </OneCateDiv>
            );
          } else
            return (
              <Button
                key={c[0]}
                small
                _id={c[0]}
                onClick={_onClick}
                bg={c[1]}
                width="100px"
                // margin="15px 15px 0px 15px"
                margin="10px 10px 0"
                current={current === c[0]} // 현재 선택된 카테고리와 일치하면 true, 아니면 false
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
  max-width: 450px;
  min-width: 120px;
  max-height: 30vh;
  min-height: 115px;
  text-align: center;
  align-items: center;
`;

const OneCateDiv = styled.div`
  margin: auto;
`;

export default CateBox;

import React from "react";
import { Button, Grid } from "../elements";

const Main = (props) => {
  // const {} = props;

  return (
    <>
      <h1>Main</h1>
      <Grid isFlex padding="30px">
        <Button _id="chair">의자</Button>
        <Button _id="desk">책상</Button>
        <Button _id="chair">전자기기</Button>
        <Button _id="chair">건강용품</Button>
        <Button>기타</Button>
      </Grid>
    </>
  );
};

export default Main;

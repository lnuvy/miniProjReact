import React from "react";
import { Button, Grid, Text } from "../elements";

const Main = (props) => {
  const handleId = (e) => {
    console.log(e.target.id);
  };

  return (
    <>
      <h1>Main</h1>
      <Grid>
        <Text>베스트 5</Text>
      </Grid>
      <Grid isFlex padding="30px">
        <Button _id="chair" onClick={handleId}>
          의자
        </Button>
        <Button _id="desk" onClick={handleId}>
          책상
        </Button>
        <Button _id="elecItem">전자기기</Button>
        <Button _id="healthCare">건강용품</Button>
        <Button _id="etc">기타</Button>
      </Grid>
    </>
  );
};

export default Main;

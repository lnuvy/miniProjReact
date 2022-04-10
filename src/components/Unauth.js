import React from "react";
import { Button, Grid, Text } from "../elements";

const Unauth = (props) => {
  const { history } = props;

  return (
    <Grid margin="auto 0" padding="16px" center>
      <Text size="32px" bold>
        잠깐!
      </Text>
      <Text size="24px">로그인 후에만 글을 쓸수있어요!</Text>
      <Button
        _onClick={() => {
          history.replace("/login");
        }}
      >
        로그인 하러가기
      </Button>
    </Grid>
  );
};
export default Unauth;

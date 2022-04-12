import React from "react";
import { Button, Grid, Text } from "../elements";

const NotFound = (props) => {
  const { history } = props;

  return (
    <Grid margin="auto 0" padding="16px" center>
      <Text size="32px" bold>
        잠깐!
      </Text>
      <Text size="24px">로그인 후에만 서비스를 이용할 수 있어요</Text>
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
export default NotFound;

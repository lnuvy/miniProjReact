import React from "react";
import Carousel from "../components/posts/Carousel";
import { Button, Grid, Image, Text } from "../elements";
import { history } from "../redux/configureStore";

const Main = (props) => {
  const handleClick = (e) => {
    const categoryValue = e.target.id;
    console.log(categoryValue);
    history.push(`/list/${categoryValue}`);
  };

  return (
    <>
      <h1>Main</h1>
      <Grid>
        <Text>베스트 5</Text>
        <Grid bg="green">
          <Grid width="70%" bg="tomato" margin="10px auto">
            {/* 가장 좋아요가 많은 5개 api 요청 후 여기에 뿌려짐 */}
            <Carousel />
          </Grid>
        </Grid>
      </Grid>
      <Grid isFlex padding="30px">
        <Button _id="chair" onClick={handleClick}>
          의자
        </Button>
        <Button _id="desk" onClick={handleClick}>
          책상
        </Button>
        <Button _id="elecItem" onClick={handleClick}>
          전자기기
        </Button>
        <Button _id="healthCare" onClick={handleClick}>
          건강용품
        </Button>
        <Button _id="etc" onClick={handleClick}>
          기타
        </Button>
      </Grid>
    </>
  );
};

export default Main;

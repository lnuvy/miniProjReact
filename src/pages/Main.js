import React from "react";
import Carousel from "../components/posts/Carousel";
import { Button, Grid, Image, Text } from "../elements";
import { history } from "../redux/configureStore";
import styled from "styled-components";

const Main = (props) => {
  const handleClick = (e) => {
    const categoryValue = e.target.id;
    console.log(categoryValue);
    history.push(`/list/${categoryValue}`);
  };

  return (
    <>
      <Grid>
        <Text center weight="900" size="40px" margin="10px">
          Best 5
        </Text>
        <Grid>
          <Grid width="70%" bg="#e17055" margin="10px auto">
            {/* 가장 좋아요가 많은 5개 api 요청 후 여기에 뿌려짐 */}
            <Carousel />
          </Grid>
        </Grid>
      </Grid>

      <CateBox>
        <Text weight="900" size="40px" margin="30px 0 10px 0">
          Category
        </Text>
        <Text>다른 개발자들의 꿀템들이 궁금하다면?👇</Text>
        <Grid>
          <Grid>
            <Button
              _id="chair"
              width="150px"
              bg="#C3E5AE"
              shadow
              margin="10px"
              onClick={handleClick}
            >
              # 의자
            </Button>
            <Button
              _id="desk"
              width="150px"
              bg="#C3B9EA"
              shadow
              margin="10px"
              onClick={handleClick}
            >
              # 책상
            </Button>
            <Button
              _id="elecItem"
              width="150px"
              bg="#F1E1A6"
              shadow
              margin="10px"
              onClick={handleClick}
            >
              # 전자기기
            </Button>
          </Grid>
          <Grid>
            <Button
              _id="healthCare"
              width="150px"
              shadow
              margin="10px"
              bg="#F4BBBB"
              onClick={handleClick}
            >
              # 건강용품
            </Button>
            <Button
              _id="etc"
              shadow
              width="150px"
              margin="10px"
              bg="#77E4D4"
              B590CA
              onClick={handleClick}
            >
              # 기타
            </Button>
          </Grid>
        </Grid>
      </CateBox>
    </>
  );
};

const CateBox = styled.div`
  margin: 0 auto;
  width: 50%;
  text-align: center;
  align-items: center;
`;

export default Main;

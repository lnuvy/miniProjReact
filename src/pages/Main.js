import React, { useEffect } from "react";
import Carousel from "../components/posts/Carousel";
import { Button, Grid, Image, Text } from "../elements";
import { history } from "../redux/configureStore";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";

const Main = (props) => {
  const dispatch = useDispatch();
  const topFive = useSelector((state) => state.post.list);

  useEffect(() => {
    dispatch(postActions.getBestFiveItem());
  }, []);

  const handleClick = (e) => {
    const categoryValue = e.target.id;
    console.log(categoryValue);
    history.push(`/list/${categoryValue}`);
  };

  return (
    <>
      <Grid>
        <Text center weight="900" size="40px" margin="60px 0 0">
          ✨ Best 5 ✨
        </Text>
        <Grid>
          <Grid width="70%" margin="0 auto">
            <Text center weight="500" size="20px">
              현재 개발자들에게 가장 인기 많은 꿀템들을 확인해보세요! 👀
            </Text>
            <Carousel topList={topFive} />
          </Grid>
        </Grid>
      </Grid>

      <CateBox>
        <Text weight="900" size="40px" margin="30px 0 10px 0">
          Category
        </Text>
        <Grid>
          <Text center weight="400" size="20px">
            다른 개발자들의 꿀템들이 궁금하다면?👇
          </Text>
        </Grid>
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
  max-width: 600px;
  margin: 0 auto 50px;
  // background-color: rgba(250, 248, 225, 0.5);
  text-align: center;
  align-items: center;
  border-radius: 60%;
  padding: 50px 50px 80px;
`;

export default Main;

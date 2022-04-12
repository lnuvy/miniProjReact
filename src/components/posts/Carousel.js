import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Grid, Image, Text } from "../../elements";
import styled from "styled-components";

import { topFive } from "../../shared/Dummy";

const Carousel = (props) => {
  const topList = topFive;

  topList.sort((a, b) => b.likeCnt - a.likeCnt);

  // react-slick 설정
  const settings = {
    dots: true, // 하단 점
    infinite: true, // 슬라이드 반복
    speed: 500, // 페이지 넘기는 속도
    autoplay: true, // 페이지 자동이동
    autoplaySpeed: 2000, // 스크롤 넘어가는 속도
    slidesToShow: 5, // 한페이지에 보이는 객체 수
    slidesToScroll: 1, // 스크롤 넘어가는 객체 수
    arrows: false, // 양옆의 애로우 없애기
    // centerMode: true,
    centerPadding: "0",
    responsive: [
      // 반응형 설정
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1150,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 750,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const topFiveUI = topList.map((item, i) => {
    return (
      <Grid
        key={item.postId}
        bg="white"
        margin="30px auto"
        padding="10px"
        width="20%"
      >
        <Grid padding="16px">
          <Image src={item.imageUrl} />
        </Grid>
        <Grid isFlex_center>
          <Text size="20px" weight={600}>
            {item.itemName}
          </Text>
          <Text color="#636e72" weight={500}>
            &nbsp;&nbsp;{item.writer.userNickname}
          </Text>
        </Grid>
      </Grid>
    );
  });

  return (
    <Container>
      <Grid>
        <StyledSlider {...settings}>{topFiveUI}</StyledSlider>
      </Grid>
    </Container>
  );
};

const Container = styled.div`
  margin: auto;
  border: 2px solid gainsboro;
  border-radius: 3px;
  padding: 30px;
`;

const StyledSlider = styled(Slider)`
  /* .slick-track {
    margin: 0;
    padding: 0;
  } */
  .slick-slide div {
    outline: none; // 슬라이드 클릭시 파란선을 제거하기 위해서 작성
    width: 100%;
  }
`;

export default Carousel;

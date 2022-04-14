import React from "react";
import { useSelector } from "react-redux";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { Grid, Text } from "../elements";
import styled from "styled-components";

const LikeIcon = (props) => {
  const { post } = props;
  const currentUser = useSelector((state) => state.user?.user?.userId);

  const isMyLike = post?.userLike?.find((l) => l === currentUser) || null;

  if (isMyLike) {
    return (
      <>
        <Container>
          <FaHeart color="red" size={18} /> &nbsp;
          <Text margin="0" size="16px">
            {post?.userLike?.length}개
          </Text>
        </Container>
      </>
    );
  } else {
    return (
      <>
        <Container>
          <FaRegHeart color="red" size={18} /> &nbsp;
          <Text margin="0" size="16px">
            {post?.userLike?.length}개
          </Text>
        </Container>
      </>
    );
  }
};

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
`;

export default LikeIcon;

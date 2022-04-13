import React from "react";
import { useSelector } from "react-redux";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { Text } from "../elements";

const LikeIcon = (props) => {
  const { post } = props;
  const currentUser = useSelector((state) => state.user?.user?.userId);

  const isMyLike = post.userLike.find((l) => l === currentUser) || null;

  if (isMyLike) {
    return (
      <>
        <FaHeart color="red" size={18} /> &nbsp;
        <Text margin="0" size="16px">
          {post?.userLike?.length}개
        </Text>
      </>
    );
  } else {
    return (
      <>
        <FaRegHeart color="red" size={18} /> &nbsp;
        <Text margin="0" size="16px">
          {post?.userLike?.length}개
        </Text>
      </>
    );
  }
};

export default LikeIcon;

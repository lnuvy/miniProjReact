import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { CommentList, CommentWrite, Post } from "../components/posts";
import { Text } from "../elements";

const Detail = (props) => {
  const dispatch = useDispatch();
  const { category, id } = useParams();

  // 리덕스에서 아이디와 일치하는거 딱하나 골라오는거라 새로고침하면 터집니다
  const item = useSelector((state) => state.post.list).filter(
    (l) => l.postId === id
  );

  // 위에서 걸러낸
  const {
    postId,
    itemName,
    writer,
    createdAt,
    imageUrl,
    content,
    likeCnt,
    commentCnt,
  } = item;

  return (
    <>
      <Post {...item[0]} />
      <CommentWrap>
        <CommentWrite postId={id} />
        <CommentList postId={id} />
      </CommentWrap>
    </>
  );
};

const CommentWrap = styled.div`
  width: 80%;
  margin: 0 auto;
`;

export default Detail;

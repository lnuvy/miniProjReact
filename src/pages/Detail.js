import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { CommentList, CommentWrite, Post } from "../components/posts";

const Detail = (props) => {
  const dispatch = useDispatch();
  const { category, id } = useParams();

  // 리덕스에서 아이디와 일치하는거 딱하나 골라오는거라 새로고침하면 터집니다
  // (눈치보고 백엔드한테 하나 만들어달라고 할예정)
  const item = useSelector((state) => state.post.list).filter(
    (l) => l.postId === id
  )[0];
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
      <h2>itemName</h2>
      <Post {...item} />
      <CommentWrite />
      <CommentList />
    </>
  );
};

export default Detail;

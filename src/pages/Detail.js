import React from "react";
import { useDispatch } from "react-redux";
import { Post } from "../components/posts";

const Detail = () => {
  const dispatch = useDispatch();
  return (
    <>
      <h1>Detail</h1>
      <Post />
    </>
  );
};

export default Detail;

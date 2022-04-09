import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Text } from "../elements";
import { Post } from "../components/posts";
import { actionCreators as postActions } from "../redux/modules/post";
import { useParams } from "react-router-dom";

// 카테고리 선택 후의 리스트입니다
const CategoryList = (props) => {
  const dispatch = useDispatch();
  const { category } = useParams();
  const categoryList = useSelector((state) => state.post.list);

  useEffect(() => {
    dispatch(postActions.getCategoryList(category));
  }, [category]);

  return (
    <>
      <Grid>
        <Grid>
          <Text bold margin="0">
            카테고리: {category}
          </Text>
        </Grid>
        <Grid>
          {categoryList?.map((l) => {
            return (
              <Grid key={l.postId}>
                <Post {...l} />
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </>
  );
};

export default CategoryList;

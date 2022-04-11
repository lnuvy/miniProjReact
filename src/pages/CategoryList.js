import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Input, Text } from "../elements";
import { FixedButton, Post } from "../components/posts";
import { actionCreators as postActions } from "../redux/modules/post";
import { useParams } from "react-router-dom";
import { history } from "../redux/configureStore";
import _ from "lodash";
import styled from "styled-components";

// 카테고리 선택 후의 리스트입니다
const CategoryList = () => {
  const dispatch = useDispatch();
  const { category } = useParams();
  console.log(category);
  const categoryList = useSelector((state) => state.post.list);

  // useEffect(() => {
  //   dispatch(postActions.getCategoryList(category));
  // }, [category]);

  // 정렬
  const [mostLike, setMostLike] = useState(true);
  const [sorted, SetSorted] = useState(false);

  // 검색
  const [query, setQuery] = useState("");

  const debounce = _.debounce((k) => k, 300);
  const keyPress = useCallback(debounce, []);

  const queryChange = (e) => {
    const { value } = e.target;
    keyPress(value);
    setQuery(value);
  };

  // query 로 필터링 한 후의 리스트
  const searchList = categoryList.filter((item) => {
    const { itemName } = item;
    const q = query;

    return itemName.includes(q);
  });

  return (
    <>
      <FixedButton _onClick={() => history.push(`/write/${category}`)} />
      <Grid>
        <ResDiv>
          <Text bold size="24px" margin="0">
            카테고리: {category}
          </Text>
          <Grid isFlex>
            <Input
              id="search"
              placeholder={`#${category} 의 제목을 검색하세요...`}
              value={query}
              _onChange={queryChange}
            />
          </Grid>
        </ResDiv>

        <Grid>
          {query !== ""
            ? searchList.map((l, i) => {
                return (
                  <Grid
                    key={l.postId}
                    padding="16px"
                    bg="green"
                    _onClick={() =>
                      history.push(`/list/${category}/${l.postId}`)
                    }
                  >
                    <Post {...l} />
                  </Grid>
                );
              })
            : categoryList.map((l, i) => {
                return (
                  <Grid
                    key={l.postId}
                    padding="16px"
                    _onClick={() =>
                      history.push(`/list/${category}/${l.postId}`)
                    }
                  >
                    <Text bold>{i}</Text>
                    <Post {...l} />
                  </Grid>
                );
              })}
        </Grid>
      </Grid>
    </>
  );
};

// 최상단 카테고리, 필터, 검색어 화면에 따라 flex-column 으로 변경되게
const ResDiv = styled.div`
  height: 20vh;
  flex-wrap: wrap;
  /* padding: 30px; */
  gap: 20px;
  width: 100%;
  margin: 10px auto;

  @media only screen and (min-width: 699px) {
    width: 699px;
  }
  @media only screen and (min-width: 1199px) {
    width: 1199px;
  }
`;

export default CategoryList;

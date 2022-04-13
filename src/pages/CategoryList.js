import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Button, Grid, Input, Text } from "../elements";
import { FixedButton, Post } from "../components/posts";
import { actionCreators as postActions } from "../redux/modules/post";
import { useParams } from "react-router-dom";
import { history } from "../redux/configureStore";
import _ from "lodash";
import styled from "styled-components";
import CateBox from "../components/CateBox";
import { commentActions } from "../redux/modules/comment";

// 카테고리 선택 후의 리스트입니다
const CategoryList = () => {
  const dispatch = useDispatch();
  const { category } = useParams();
  const categoryList = useSelector((state) => state.post.list) || [];

  // axios 조회
  useEffect(() => {
    dispatch(postActions.getCategoryList(category));
    // 카테고리가 바뀔때마다 검색창 value 비우기
    if (query !== "") setQuery("");
  }, [category]);

  // 카테고리별 이동
  const handleClick = (e) => {
    const categoryValue = e.target.id;
    history.push(`/list/${categoryValue}`);
  };

  // 정렬
  const [mostLike, setMostLike] = useState(true);
  const [sorted, SetSorted] = useState(false);

  // 검색
  const [isTitle, setIsTitle] = useState(true);
  const [query, setQuery] = useState("");

  const debounce = _.debounce((k) => k, 300);
  const keyPress = useCallback(debounce, []);

  const queryChange = (e) => {
    const { value } = e.target;
    keyPress(value);
    setQuery(value);
  };

  // query 로 필터링 한 후의 리스트
  const searchList =
    categoryList.filter((item) => {
      const { itemName, userNickname } = item;
      const q = query;
      if (isTitle) {
        return itemName.includes(q);
      } else {
        return userNickname.includes(q);
      }
    }) || [];

  return (
    <>
      <FixedButton _onClick={() => history.push(`/write/${category}`)} />
      <Grid>
        <CateBox current={category} _onClick={handleClick} />
        <Grid flexColumn>
          <Button
            margin="20px"
            width="200px"
            bg={isTitle ? "white" : "black"}
            color={isTitle ? "black" : "white"}
            _onClick={() => {
              setIsTitle(!isTitle);
            }}
          >
            {isTitle ? "작성자로 검색" : "제목으로 검색"}
          </Button>
          <ResInput>
            {isTitle ? (
              <Input
                id="search"
                placeholder={`#${category} 의 제목을 검색해보세요!`}
                value={query}
                _onChange={queryChange}
              />
            ) : (
              <Input
                id="search"
                placeholder={`게시글의 작성자를 검색해보세요!`}
                value={query}
                _onChange={queryChange}
              />
            )}
          </ResInput>
        </Grid>
        <Grid>
          {query !== ""
            ? searchList.map((l, i) => {
                return (
                  <Grid key={`${l.postId}_{i}`} padding="16px" isFlex_center>
                    <Post
                      _onClick={() =>
                        history.push(`/list/${category}/${l.postId}`)
                      }
                      bg={l.category}
                      {...l}
                    />
                  </Grid>
                );
              })
            : categoryList.map((l, i) => {
                return (
                  <Grid key={l.postId} padding="16px" isFlex_center>
                    <Post
                      _onClick={() =>
                        history.push(`/list/${category}/${l.postId}`)
                      }
                      bg={l.category}
                      {...l}
                    />
                  </Grid>
                );
              })}
        </Grid>
      </Grid>
    </>
  );
};

const ResInput = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60%;
  margin: 0 auto;
`;

export default CategoryList;

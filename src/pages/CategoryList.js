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

// 카테고리 선택 후의 리스트입니다
const CategoryList = () => {
  const dispatch = useDispatch();
  const { category } = useParams();
  const categoryList = useSelector((state) => state.post.list) || [];

  // axios 조회
  useEffect(() => {
    dispatch(postActions.getCategoryList(category));
  }, [category]);

  // 카테고리별 이동
  const handleClick = (e) => {
    const categoryValue = e.target.id;
    console.log(categoryValue);
    history.push(`/list/${categoryValue}`);
  };

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
  // const searchList = categoryList.filter((item) => {
  //   const { itemName } = item;
  //   const q = query;

  //   return itemName.includes(q);
  // });

  return (
    <>
      <FixedButton _onClick={() => history.push(`/write/${category}`)} />
      <Grid>
        <CateBox current={category} _onClick={handleClick} />
        <ResInput>
          <Input
            id="search"
            placeholder={`#${category} 의 제목을 검색하세요...`}
            value={query}
            _onChange={queryChange}
          />
        </ResInput>

        <Grid>
          {/* {query !== ""
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
              }) */}
          {/* : */}
          {categoryList.map((l, i) => {
            return (
              <Grid
                key={l.postId}
                padding="16px"
                _onClick={() => history.push(`/list/${category}/${l.postId}`)}
                isFlex_center
              >
                <Post bg={l.category} {...l} />
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </>
  );
};

const ResInput = styled.div`
  width: 60%;
  margin: 0 auto;
`;

export default CategoryList;

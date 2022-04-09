import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Input, Text } from "../elements";
import { Post } from "../components/posts";
import { actionCreators as postActions } from "../redux/modules/post";
import { useParams } from "react-router-dom";
import { history } from "../redux/configureStore";
import _ from "lodash";

// 카테고리 선택 후의 리스트입니다
const CategoryList = () => {
  const dispatch = useDispatch();
  const { category } = useParams();
  const categoryList = useSelector((state) => state.post.list);

  console.log(categoryList);
  useEffect(() => {
    dispatch(postActions.getCategoryList(category));
  }, [category]);

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

  const searchList = categoryList
    .filter((item) => {
      const { itemName } = item;
      const q = query;
      console.log(itemName, q);
      return itemName.includes(q);
    })
    .map((l) => {
      return (
        <Grid
          key={l.postId}
          padding="16px"
          bg="green"
          _onClick={() => history.push(`/${category}/${l.postId}`)}
        >
          <Post {...l} />
        </Grid>
      );
    });

  console.log(searchList);

  return (
    <>
      <Grid>
        <Grid isFlex_center padding="16px">
          <Grid>
            <Text bold margin="0">
              카테고리: {category}
            </Text>
          </Grid>
          <Grid isFlex>
            <Input
              id="search"
              label={`#${category} 의 꿀템을 검색해보세요...`}
              value={query}
              _onChange={queryChange}
            />
          </Grid>
        </Grid>
        <Grid>
          {query !== ""
            ? { searchList }
            : categoryList.map((l) => {
                return (
                  <Grid
                    key={l.postId}
                    padding="16px"
                    bg="tomato"
                    _onClick={() => history.push(`/${category}/${l.postId}`)}
                  >
                    <Post {...l} />
                    <Post {...l} />
                    <Post {...l} />
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

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import CategoryIconSwitch from "../components/CategoryIcon";
import { Upload } from "../components/posts";
import { Button, Grid, Image, Input, Text, TextArea } from "../elements";
import { history } from "../redux/configureStore";
import { imageActions } from "../redux/modules/image";
import { actionCreators as postActions } from "../redux/modules/post";

// 작성과 수정 동시에 처리
const WritePost = (props) => {
  const dispatch = useDispatch();
  // const isLogin = useSelector((state) => state.user.isLogin);
  const postList = useSelector((state) => state.post.list);
  const preview = useSelector((state) => state.image.preview);

  // 수정시에는 id 가 들어오고 아니면 "write"
  const nowCategory = props.match.params.category || null;

  const postId = props.match.params.id || "write";
  const isEdit = postId !== "write" ? true : false;
  // 수정이라면 현재 포스트의 정보들이 담김
  let nowPost = isEdit ? postList.find((p) => p.postId === postId) : null;

  const [inputs, setInputs] = useState(
    nowPost ? { itemName: nowPost.itemName, content: nowPost.content } : {}
  );

  useEffect(() => {
    if (isEdit && !nowPost) {
      history.goBack();
      return;
    }

    if (isEdit) {
      // 이미지 프리뷰 보여주기
      dispatch(imageActions.setPreview(nowPost.imageUrl));
    } else {
      dispatch(imageActions.setPreview(null));
    }
  }, []);

  // 제목과
  const changeValue = (e) => {
    const key = e.target.id;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [key]: value }));
  };

  const addPost = () => {
    // console.log("클릭");
    if (!preview) {
      alert("사진을 반드시 올려야합니다.");
      return;
    }
    if (!inputs.content || !inputs.itemName) {
      alert("내용을 입력해주세요.");
      return;
    }
    console.log({
      ...inputs,
      category: nowCategory,
      imageUrl: preview,
    });
    dispatch(
      postActions.addPostDB({
        ...inputs,
        category: nowCategory,
        imageUrl: preview,
      })
    );
  };

  const editPost = () => {
    console.log(postId, inputs.content);
    dispatch(postActions.editPostDB(postId, inputs.content));
  };

  return (
    <>
      <Grid padding="50px" width="60%" margin="10px auto">
        <Grid>
          <Text margin="0" size="32px" weight="600">
            {isEdit ? "게시글 수정" : "게시글 작성"}
          </Text>
        </Grid>

        {isEdit ? null : (
          <Grid isFlex padding="0 50px">
            <Grid margin="0 20px">
              <CategoryDiv>
                <Text
                  margin="0 20px"
                  size="20px"
                  weight="500"
                  center
                  color="#636e72"
                >
                  현재 카테고리
                  <br />
                  <CategoryIconSwitch category={nowCategory} /> {nowCategory}
                </Text>
              </CategoryDiv>
            </Grid>
            <Grid>
              <Grid margin="20px auto">
                <Upload propsfile={inputs.itemName} />
              </Grid>
            </Grid>
          </Grid>
        )}

        <Text align="left" size="14px" margin="0" color="#FA5E73">
          한번 올린 이미지는 수정이 불가능합니다!
        </Text>
        <Grid padding="20px">
          <Image
            src={preview ? preview : "http://via.placeholder.com/400x300"}
          />
        </Grid>
        <ItemNameBox>
          <Input
            id="itemName"
            fontSize="18px"
            label="소개할 아이템 이름"
            placeholder="소개할 아이템의 이름을 입력하세요..."
            value={inputs.itemName}
            _onChange={changeValue}
          />
        </ItemNameBox>
        <Grid padding="15px">
          <TextArea
            id="content"
            value={inputs.content}
            _onChange={changeValue}
            label="게시글 내용"
          />
        </Grid>
        <Grid>
          {!isEdit ? (
            <Button _onClick={addPost}>작성</Button>
          ) : (
            <Button _onClick={editPost}>수정</Button>
          )}
        </Grid>
      </Grid>
    </>
  );
};

const CategoryDiv = styled.div`
  width: 160px;
`;

const ItemNameBox = styled.div`
  padding: 50px;
  font-size: 24px;
`;

export default WritePost;

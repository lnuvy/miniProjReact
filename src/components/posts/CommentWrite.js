import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { Button, Grid, Input, Text } from "../../elements";
import { commentActions } from "../../redux/modules/comment";

const CommentWrite = (props) => {
  const dispatch = useDispatch();
  const { postId } = props;
  const [comment, setComment] = useState("");

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const write = () => {
    dispatch(commentActions.addCommentDB(postId, comment));
    setComment("");
  };

  return (
    <>
      <InputWrap>
        <Grid padding="24px" isFlex>
          <Input
            placeholder="댓글 내용 입력"
            _onChange={handleChange}
            value={comment}
            onSubmit={write}
            padding="0 10px"
          />
          <Button
            small
            width="100px"
            margin="0 20px"
            padding="16px 8px;"
            _onClick={write}
            _color="#3c40c6"
          >
            Enter
          </Button>
        </Grid>
      </InputWrap>
    </>
  );
};

const InputWrap = styled.div`
  width: 80%;
  margin: 0 auto;
`;

export default CommentWrite;

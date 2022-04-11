import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Grid, Input } from "../../elements";
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
      <Grid padding="16px" is_flex>
        <Input
          label="댓글 내용 입력"
          _onChange={handleChange}
          value={comment}
          onSubmit={write}
        />
        <Button
          width="100px"
          margin="0 20px"
          padding="16px 8px;"
          _onClick={write}
          _color="#3c40c6"
        >
          Enter
        </Button>
      </Grid>
    </>
  );
};

export default CommentWrite;

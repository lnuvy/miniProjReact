import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Grid, Text } from "../../elements";
import { commentActions } from "../../redux/modules/comment";
import { changeTime } from "../../shared/ChangeTime";

const CommentList = (props) => {
  const dispatch = useDispatch();
  const commentList = useSelector((state) => state.comment.list);
  const user_info = useSelector((state) => state.user.user);
  const { postId = null } = props;

  useEffect(() => {
    if (!commentList[postId]) {
      dispatch(commentActions.getCommentDB(postId));
    }
  }, []);

  if (!commentList[postId] || !postId) {
    return null;
  }

  return (
    <>
      <Grid padding="16px">
        {commentList[postId].map((c) => {
          console.log({ ...c });
          // 유저검사
          // if (c.user_id === user_info?.uid) {
          return <CommentItem is_me key={c.commentId} {...c} />;
          // } else {
          // return <CommentItem key={c.id} {...c} />;
          // }
        })}
      </Grid>
    </>
  );
};

export default CommentList;

const CommentItem = (props) => {
  const dispatch = useDispatch();
  const { commentId, content, createdAt, nickname, postId, userId } = props;

  return (
    <Grid isFlex>
      <Grid isFlex_center width="35%">
        <Text bold>{nickname}</Text>
      </Grid>
      <Grid isFlex margin="0 5px">
        <Text margin="0px">{content}</Text>
        <Grid isFlex width="30%" margin="0 10px">
          <Text margin="0px">{changeTime(createdAt)}</Text>
          {/* {is_me && ( */}
          <Button
            width="auto"
            margin="4px 5px"
            padding="7px"
            _color="#d03333"
            _onClick={() => {
              dispatch(commentActions.deleteCommentDB(commentId, postId));
            }}
          >
            삭제
          </Button>
          {/* )} */}
        </Grid>
      </Grid>
    </Grid>
  );
};

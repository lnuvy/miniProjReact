import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { AuthButton, Button, Grid, Text } from "../../elements";
import { commentActions } from "../../redux/modules/comment";
import { changeTime } from "../../shared/ChangeTime";

const CommentList = (props) => {
  const dispatch = useDispatch();
  const commentList = useSelector((state) => state.comment.list);
  const user_info = useSelector((state) => state.user.user);
  const { postId = null } = props;

  const currentUser = useSelector((state) => state.user.user.user);

  useEffect(() => {
    //코멘트 정보 없을때 불러오기
    if (!commentList[postId]) {
      dispatch(commentActions.getCommentDB(postId));
    }
  }, []);

  if (!commentList[postId] || !postId) {
    return null;
  }

  return (
    <>
      <CommentWrap>
        <Grid padding="16px">
          {commentList[postId].map((c, i) => {
            return (
              <Grid key={`${c.commentId}_${i}`} isFlex>
                <CommentItem key={c.commentId} {...c} />
              </Grid>
            );
          })}
        </Grid>
      </CommentWrap>
    </>
  );
};

const CommentWrap = styled.div`
  width: 80%;
  margin: 0 auto;
`;

export default CommentList;

const CommentItem = (props) => {
  const dispatch = useDispatch();
  const {
    commentId,
    content,
    createdAt,
    userNickname,
    userAge,
    postId,
    userId,
  } = props;
  const currentUser = useSelector((state) => state.user?.user?.userId);

  const isMe = currentUser === userId ? true : false;

  return (
    <Grid isFlex>
      <Grid isFlex_center width="40%">
        <Text margin="0">
          {userNickname} ({userAge})
        </Text>
      </Grid>
      <Text margin="0px">{content}</Text>
      <Grid isFlex width="30%" margin="0 10px">
        <Text margin="0px">{changeTime(createdAt)}</Text>

        <AuthButton
          isMe={isMe}
          width="auto"
          margin="4px 5px"
          padding="5px"
          bg="#d03333"
          _onClick={() => {
            dispatch(commentActions.deleteCommentDB(commentId, postId));
          }}
        >
          삭제
        </AuthButton>
      </Grid>
    </Grid>
  );
};

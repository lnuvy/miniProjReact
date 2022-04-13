import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import moment from "moment";
import { actionCreators as postActions } from "./post";
import axios from "axios";

const BASE_URL = "http://13.209.66.208";

const SET_COMMENT = "SET_COMMENT";
const ADD_COMMENT = "ADD_COMMENT";
const DELETE_COMMENT = "DELETE_COMMENT";

const setComment = createAction(SET_COMMENT, (postId, commentList) => ({
  postId,
  commentList,
}));
const addComment = createAction(ADD_COMMENT, (postId, comment) => ({
  postId,
  comment,
}));
const deleteComment = createAction(DELETE_COMMENT, (commentId, postId) => ({
  commentId,
  postId,
}));

const initialState = {
  list: {},
};

const getCommentDB = (postId) => {
  return async function (dispatch, getState, { history }) {
    if (!postId) return;

    // axios
    const response = await axios.get(`${BASE_URL}/comments/${postId}/list`);
    // console.log(response);
    const commentList = response.data.commentPostid;

    dispatch(setComment(postId, commentList));
  };
};

const addCommentDB = (postId, content) => {
  return async function (dispatch, getState, { history }) {
    const userInfo = getState().user.user;

    let newComment = {
      ...userInfo,
      content,
    };

    // axios
    const response = await axios({
      method: "post",
      url: `${BASE_URL}/comments/${postId}`,
      data: newComment,
    });
    //postId commentId userId userNickname userAge createdAt content
    console.log("리스폰스", response);

    newComment = response.data.createdComment;

    dispatch(addComment(postId, newComment));
  };
};

// postId 로 이 댓글이 달렸던 게시글 찾아서 commentCnt -1 해줘야함
const deleteCommentDB = (commentId, postId) => {
  return async function (dispatch, getState, { history }) {
    if (!commentId) return;

    const { userId } = getState().user.user;

    // 해당 개시글 정보
    const postInfo = getState().post.list.filter((l) => l.postId === postId)[0];

    await axios({
      method: "DELETE",
      url: `${BASE_URL}/comments/${commentId}`,
      data: { userId },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    dispatch(deleteComment(commentId, postId));
  };
};

export default handleActions(
  {
    [SET_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.list[action.payload.postId] = action.payload.commentList;
      }),
    [ADD_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.list[action.payload.postId].unshift(action.payload.comment);
      }),
    [DELETE_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        let path = action.payload.postId;

        let newArr = draft.list[path].filter(
          (l) => l.commentId !== action.payload.commentId
        );
        draft.list[path] = newArr;
      }),
  },
  initialState
);

export const commentActions = {
  getCommentDB,
  addCommentDB,
  deleteCommentDB,
  setComment,
  addComment,
  deleteComment,
};

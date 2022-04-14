import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
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
    axios
      .get(`${BASE_URL}/comments/${postId}/list`)
      .then((res) => {
        console.log("/comments/:postId/list res:", res);
        const commentList = res.data.commentPostid;
        dispatch(setComment(postId, commentList));
      })
      .catch((err) => {
        console.log("/comments/:postId/list error:", err.response);
      });
    // console.log(response);
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
    axios({
      method: "post",
      url: `${BASE_URL}/comments/${postId}`,
      data: JSON.stringify(newComment),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log("/comments/:postId res:", res);
        newComment = res.data.createdComment;
        dispatch(addComment(postId, newComment));
        dispatch(postActions.commentPlus(postId));
      })
      .catch((err) => {
        console.log("/comments/:postId res:", err.response);
      });
    //postId commentId userId userNickname userAge createdAt content
  };
};

// postId 로 이 댓글이 달렸던 게시글 찾아서 commentCnt -1 해줘야함
const deleteCommentDB = (commentId, postId) => {
  return async function (dispatch, getState, { history }) {
    if (!commentId) return;

    const { userId } = getState().user.user;

    // 해당 개시글 정보
    const postInfo = getState().post.list.filter((l) => l.postId === postId)[0];

    console.log(postId, postInfo.postId);

    await axios({
      method: "DELETE",
      url: `${BASE_URL}/comments/${commentId}`,
      data: { userId },
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log("/comments/:commentId res:", res);
        dispatch(deleteComment(commentId, postId));
      })
      .catch((err) => {
        console.log("/comments/:commentId res:", err.response);
      });
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

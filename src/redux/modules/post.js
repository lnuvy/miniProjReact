import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import moment from "moment";
import axios from "axios";
import user from "./user";
import { getUser } from "../../shared/token";

// mock API base_url // BASE_URL 주소의 마지막에 /를 뺐습니다
const BASE_URL = "http://13.209.66.208";

const initialState = {
  list: [],
  isLoading: false,
};

const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";
const EDIT_POST = "EDIT_POST";
const DELETE_POST = "DELETE_POST";
const TOGGLE_LIKE = "TOGGLE_LIKE";
const LOADING = "LOADING";
const SET_CNT = "SET_CNT";
const PLUS = "PLUS";

const setPost = createAction(SET_POST, (list) => ({ list }));
const addPost = createAction(ADD_POST, (post) => ({ post }));
const editPost = createAction(EDIT_POST, (postId, post) => ({
  postId,
  post,
}));
const deletePost = createAction(DELETE_POST, (postId) => ({ postId }));
const toggleLike = createAction(TOGGLE_LIKE, (postId, likeCnt, likeArr) => ({
  postId,
  likeCnt,
  likeArr,
}));
const loading = createAction(LOADING, (isLoading) => ({ isLoading }));
const commentControl = createAction(SET_CNT, (postId, commentCnt) => ({
  postId,
  commentCnt,
}));

const commentPlus = createAction(PLUS, (postId) => ({ postId }));

//// middlewares
// 메인에서 캐러셀에 주입되는 Best5 가져오기
const getBestFiveItem = () => {
  return async function (dispatch, getState, { history }) {
    await axios({
      method: "GET",
      url: `${BASE_URL}/mostLikePost`,
    })
      .then((res) => {
        console.log("/mostLikePost response:", res);
        dispatch(setPost(res.data.likeCnt));
      })
      .catch((err) => {
        console.log("/mostLikePost response:", err.response);
      });
  };
};

// 게시글의 댓글 개수 가져오기 .. ?
const getCommentCount = (postId) => {
  return async function (dispatch, getState, { history }) {
    if (!postId) return;

    await axios({
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      url: `${BASE_URL}/posts/comment`,
      data: JSON.stringify({ postId }),
    })
      .then((res) => {
        console.log("/posts/comment response:", res);
        const cnt = res.data;
        dispatch(commentControl(postId, cnt));
      })
      .catch((err) => {
        console.log("/posts/comment response:", err.response);
      });
  };
};

// 카테고리별 아이템을 가져오기
const getCategoryList = (category = null) => {
  return async function (dispatch, getState, { history }) {
    axios
      .get(`${BASE_URL}/posts/${category}`)
      .then((res) => {
        console.log("/posts/:category response:", res);
        const data = res.data.Posts;
        dispatch(setPost(data));
      })
      .catch((err) => {
        console.log("/posts/:category response:", err.response);
      });
  };
};

// 내가 쓴글 조회
const getMyPostDB = (userId) => {
  return async function (dispatch, getState, { history }) {
    axios
      .get(`${BASE_URL}/profile/${userId}`)
      .then((res) => {
        console.log("/profile/:userId response:", res);
        const data = res.data;
        const newArr = data.post.filter((l) => l.userId === userId);
        dispatch(setPost(newArr));
      })
      .catch((err) => {
        console.log("/profile/:userId response:", err.response);
      });
  };
};

const addPostDB = (post = null) => {
  return async function (dispatch, getState, { history }) {
    if (!post) return;

    const userInfo = getState().user.user;

    const data = {
      ...userInfo,
      itemName: post.itemName,
      content: post.content,
      imageUrl: post.imageUrl,
      category: post.category,
    };

    await axios({
      method: "POST",
      url: `${BASE_URL}/posts/${post.category}/add`,
      data: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log("/posts/:category/add", res);

        const { createPosting } = res.data;
        console.log(createPosting);

        dispatch(addPost(createPosting));
        history.replace(`/list/${post.category}`);
      })
      .catch((err) => {
        console.log("/posts/:category/add", err.response);
      });
  };
};

// 당장은 글 내용물만 바꿀수있음
const editPostDB = (postId, content) => {
  return async function (dispatch, getState, { history }) {
    if (!postId) return;

    // formData 로 바꿔야함
    // const preview = getState().image.preview;
    const postIndex = getState().post.list.findIndex(
      (p) => p.postId === postId
    );
    let data = getState().post.list[postIndex];
    console.log(data);

    // 지금은 컨텐츠만 수정하지만 확장성을 위해 형식 맞춤
    data = { ...data, content };

    // axios
    await axios({
      method: "POST",
      url: `${BASE_URL}/posts/edit/${postId}`,
      data: JSON.stringify({ postId, content }),
      headers: {
        "Content-Type": "application/json",
      },
      // headers: {},
    })
      .then((res) => {
        console.log("/posts/edit/:postId", res);
        dispatch(editPost(postId, data));
      })
      .catch((err) => {
        console.log("/posts/edit/:postId", err.response);
        console.log("글 수정시 에러", err);
      });

    history.push(`/list/${data.category}/${postId}`);
  };
};

const deletePostDB = (postId, category) => {
  return async function (dispatch, getState, { history }) {
    console.log(postId);
    if (!postId) return;

    const { userId } = getState().user.user;

    console.log(userId);
    // postId 와 일치하는 댓글들 모두 지우는 프로세스 있어야함
    // axios
    await axios({
      method: "DELETE",
      url: `${BASE_URL}/posts/delete/${postId}`,
      data: { userId },
    })
      .then((res) => {
        console.log("/posts/delete/:postId res:", res);
      })
      .catch((err) => {
        console.log("/posts/delete/:postId err:", err.response);
      });

    dispatch(deletePost(postId));
    history.replace(`/list/${category}`);
  };
};

const toggleLikeDB = (userId, postId) => {
  return async function (dispatch, getState, { history }) {
    const userInfo = getState().user.user;
    const currentUser = userInfo.userId;

    axios({
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      url: `${BASE_URL}/posts/like`,
      data: JSON.stringify({ userId: currentUser, postId }),
    })
      .then((res) => {
        console.log("/posts/like", res);
        const { newLikecnt, newuserLike } = res.data;
        console.log(newLikecnt, newuserLike);
        dispatch(toggleLike(postId, newLikecnt, newuserLike));
      })
      .catch((err) => {
        console.log("/posts/like", err.response);
      });
  };
};

export default handleActions(
  {
    [SET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.list;
      }),
    [ADD_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.unshift(action.payload.post);
      }),
    [EDIT_POST]: (state, action) =>
      produce(state, (draft) => {
        const newContent = action.payload.post.content;
        let index = draft.list.findIndex(
          (p) => p.postId === action.payload.postId
        );
        console.log(state.list[index]);
        draft.list[index] = {
          ...draft.list[index],
          content: newContent,
        };
      }),
    [DELETE_POST]: (state, action) =>
      produce(state, (draft) => {
        let newList = draft.list.filter(
          (l) => l.postId !== action.payload.postId
        );
        draft.list = newList;
      }),
    [TOGGLE_LIKE]: (state, action) =>
      produce(state, (draft) => {
        const likeArr = action.payload.likeArr;

        draft.list.forEach((l, i) => {
          if (l.postId === action.payload.postId) {
            l.userLike = likeArr;
          }
        });
      }),
    [SET_CNT]: (state, action) =>
      produce(state, (draft) => {
        const { postId, commentCnt } = action.payload;
        if (!commentCnt) return;

        let newArr = draft.list.map((l) => {
          if (l.postId === postId) {
            l.commentCnt = commentCnt;
          }
          return l;
        });
        draft.list = newArr;
      }),
    [PLUS]: (state, action) =>
      produce(state, (draft) => {
        const { postId } = action.payload;

        draft.list.forEach((p) => {
          if (postId === p.postId) {
            p.commentCnt = p.commentCnt + 1;
          }
        });
      }),
  },
  initialState
);

export const actionCreators = {
  setPost,
  getCategoryList,
  addPost,
  addPostDB,
  editPost,
  editPostDB,
  deletePost,
  deletePostDB,
  getMyPostDB,
  getBestFiveItem,
  toggleLikeDB,
  getCommentCount,
  commentPlus,
};

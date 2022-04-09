import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import moment from "moment";
import axios from "axios";

// mock API base_url // BASE_URL 주소의 마지막에 /를 뺐습니다
const BASE_URL =
  "https://virtserver.swaggerhub.com/myteam84866/Api-Example/1.0.0";

const initialPost = {
  postId: 1,
  itemName: "조지아 크래프트",
  writer: {
    userId: "iamuser",
    password: "1234",
    userNickname: "꿀렁",
    userAge: "20대",
  },
  createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
  content: "개발자들은 역시 커피죠",
  imageUrl: "http://via.placeholder.com/400x300",
  category: "etc",
  likeCnt: 5,
  commentCnt: 0,
};
const initialPost2 = {
  postId: 2,
  itemName: "아카펠라 아메리카노",
  writer: {
    userId: "nanuser",
    password: "1234",
    userNickname: "하이",
    userAge: "20대",
  },
  createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
  content: "조지아보다 이게 맛있음",
  imageUrl: "http://via.placeholder.com/400x300",
  category: "etc",
  likeCnt: 2,
  commentCnt: 1,
};

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

const setPost = createAction(SET_POST, (list) => ({ list }));
const addPost = createAction(ADD_POST, (post) => ({ post }));
const editPost = createAction(EDIT_POST, (postId, post) => ({
  postId,
  post,
}));
const deletePost = createAction(DELETE_POST, (postId) => ({ postId }));
const toggleLike = createAction(TOGGLE_LIKE, (postId, likeCnt) => ({
  postId,
  likeCnt,
}));
const loading = createAction(LOADING, (isLoading) => ({ isLoading }));

//// middlewares
// 카테고리별 아이템을 가져오기
const getCategoryList = (category = null) => {
  return async function (dispatch, getState, { history }) {
    // 물어볼거 (이렇게해도되는지)
    // 이걸 추가하지 않으면 리덕스에 데이터가 있을때도 계속해서 카테고리 리스트에서 디스패치를 함
    if (getState().post.list.length !== 0) return;
    // 비동기작업때 로딩 true 주기
    // dispatch(loading(true));

    // 가독성을 위해 BASE_URL 주소의 마지막에 /을 뺐습니다
    const response = await axios.get(`${BASE_URL}/posts/category`);
    const data = response.data;
    dispatch(setPost(data));
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
        console.log("hi");
      }),
  },
  initialState
);

export const actionCreators = { setPost, getCategoryList };

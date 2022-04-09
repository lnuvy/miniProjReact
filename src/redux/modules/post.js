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
  likeCnt: 0,
  commentCnt: 0,
};
const initialState = {
  list: [{ ...initialPost }],
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
  return function (dispatch, getState, { history }) {
    // 비동기작업때 로딩 true 주기
    dispatch(loading(true));

    dispatch(setPost());

    // 가독성을 위해 BASE_URL 주소의 마지막에 /을 뺐습니다
    // const response = axios.get(`${BASE_URL}/${category}`);
    // console.log(response);
    // const data = response.data;

    // api 테스트가 끝나면 아래 코드로 바꿔도됩니다
    // axios.get(`${BASE_URL}/${category}`).then((res) => {

    // }).catch((err) => {
    //   console.log("getCategoryList 에러 : ", err);
    // })
  };
};

export default handleActions(
  {
    [SET_POST]: (state, action) =>
      produce(state, (draft) => {
        // draft.list = action.payload.list;
        console.log(state);
      }),
    [ADD_POST]: (state, action) =>
      produce(state, (draft) => {
        console.log("hi");
      }),
  },
  initialState
);

export const actionCreators = { setPost, getCategoryList };

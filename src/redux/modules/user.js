// REDUX-ACTION & IMMER
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

// AXIOS
import axios from "axios";

// local storage
import { setData, removeData } from "../../shared/token";

// base_url + url
const BASE_URL = "http://13.209.66.208";

// initialState
const initialState = {
  user: null,
  token: null,
  is_login: false,
};

// ACTION
const LOG_IN = "LOG_IN";
const LOG_OUT = "LOG_OUT";
const SIGN_UP = "SIGN_UP";
const GET_USER = "GET_USER";

//ACTION CREATORS
const logIn = createAction(LOG_IN, (token, user) => ({ token, user }));
const signUp = createAction(SIGN_UP, (user) => ({ user }));
const logOut = createAction(LOG_OUT, (user) => ({ user }));
const getUser = createAction(GET_USER, (user) => ({ user }));

// MIDDLEWARE
const loginAction = (token, user) => {
  return async function (dispatch, getState, { history }) {
    dispatch(logIn(token, user));
    history.push("/");
  };
};
//로그아웃
const logoutAction = (user) => {
  return async function (dispatch, getStaet, { history }) {
    console.log(history);
    removeData("token");
    dispatch(logOut(user));
    history.replace("/login");
  };
};

//회원가입
const registerDB = (id, pwd, pwd_check, user_name, user_age) => {
  return async function (dispatch, getState, { history }) {
    await axios
      .post(`${BASE_URL}/login/signUp`, {
        userId: id,
        password: pwd,
        passwordCheck: pwd_check,
        userNickname: user_name,
        userAge: user_age,
      })
      .then(function (res) {
        console.log(res.data);
        dispatch(signUp());
      })
      .catch((err) => {
        console.log("회원가입중 에러", err);
      });
  };
};

// 로그인
const loginDB = (id, pwd) => {
  return async function (dispatch, getState, { history }) {
    await axios
      .post(`${BASE_URL}/login/reqLogin`, {
        userID: id,
        password: pwd,
      })
      // 여기서 유저정보도 받아야함!
      .then((res) => {
        console.log(res);

        // const userInfo = res.data.유저데이터 담긴변수
        // 더미
        const userInfo = {
          userId: "iamuser",
          userNickname: "닉네임",
          userAge: "20대",
          // qwer1234
        };
        const accessToken = res.data.token;
        setData({ accessToken, ...userInfo });
        console.log(userInfo);
        dispatch(logIn(accessToken, userInfo));
        history.push("/");
      })
      .catch(function (error) {
        console.log(error);
        window.alert("없는 회원정보입니다,,,");
      });
  };
};

//유저정보
// const userInfoDB = () => {
//   return async function (dispatch, getState, { history }) {
//     const token = getToken;
//     console.log(token);
//     await axios.get(`${BASE_URL}/getUser`);
//   };
// };

// REDUCER
export default handleActions(
  {
    [LOG_IN]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user;
        draft.token = action.payload.token;
        draft.is_login = true;
      }),
    [SIGN_UP]: (state, action) => produce(state, (draft) => {}),

    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        removeData();
        draft.user = null;
        draft.token = null;
        draft.is_login = false;
      }),

    [GET_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user;
      }),
  },
  initialState
);

const actionCreators = {
  logIn,
  logOut,
  signUp,
  loginAction,
  logoutAction,
  loginDB,
  registerDB,
};

export { actionCreators };

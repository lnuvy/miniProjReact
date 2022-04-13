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
        history.push("/login");
        dispatch(signUp());
      })
      .catch((err) => {
        alert("회원가입에 실패했어요!");
        console.log("회원가입중 에러", err);
        return;
      });
  };
};

// 로그인
const loginDB = (dic) => {
  return async function (dispatch, getState, { history }) {
    const { id: userId, pwd: password } = dic;
    await axios
      .post(`${BASE_URL}/login/reqLogin`, {
        userId,
        password,
      })
      // 여기서 유저정보도 받아야함!
      .then((res) => {
        console.log(res.status);
        const { token, userId, userNickname, userAge } = res.data;
        console.log(res.data.token);
        setData(res.data);
        dispatch(logIn(token, { userId, userNickname, userAge }));
        history.push("/");
      })
      .catch((err) => {
        // console.log(err.response);
        const { errorMessage } = err.response.data;
        alert(errorMessage);
      });
  };
};

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

import { createAction, handleActions } from "redux-actions";
import { getCookie, setCookie, deleteCookie } from "../../shared/Cookies";
import { produce } from "immer";
import axios from "axios";

// base_url + url
const BASE_URL =
  "https://virtserver.swaggerhub.com/myteam84866/Api-Example/1.0.0";
// axios.defaults.withCredentials = true // 쿠키 데이터 전송받기
// export const reqeust = (method, url, data) => {
//   return axios({
//     method,
//     url: BASE_URL + url,
//     data,
//   })
//     .then((res) => res.data)
//     .catch((err) => console.log(err))
// }

//initialState
const initialState = {
  user: null,
  is_login: false,
};

const initialUser = {
  userId: "iamuser",
  password: "1234",
  passwordChcek: "1234",
  userNickname: "꿀렁",
  userAge: "20대",
};

//actions
const LOG_IN = "LOG_IN";
const LOG_OUT = "LOG_OUT";
const SIGN_UP = "SIGN_UP";
const USER_INFO = "USER_INFO";

//action Creators
const logIn = createAction(LOG_IN, (user) => ({ user }));
const signUp = createAction(SIGN_UP, (user) => ({ user }));
const logOut = createAction(LOG_OUT, (user) => ({ user }));
const userInfo = createAction(USER_INFO, (user) => ({ user }));

// Middle wares actions
const loginAction = (user) => {
  return async function (dispatch, getState, { history }) {
    console.log(history);
    dispatch(logIn(user));
    history.push("/");
  };
};

const logoutAction = (user) => {
  return async function (dispatch, getStaet, { history }) {
    console.log(history);
    dispatch(logOut(user));
    history.push("/login");
  };
};

//API랑 연동
const registerDB = (id, pwd, pwd_check, user_name) => {
  return function (dispatch, getState, { history }) {
    axios
      .post(`${BASE_URL}/login/signUp`, {
        userId: "id",
        password: "pwd",
        passwordChcek: "pwd_check",
        userNickname: "user_kname",
        userAge: "userAge",
      })
      .then(function (res) {
        console.log(res.data);
        dispatch(signUp());
      });
  };
};

const loginDB = (id, pwd) => {
  return async function (dispatch, getState, { history }) {
    axios
      .post(`${BASE_URL}/login/reqLogin`, {
        userID: id,
        password: pwd,
      })
      .then((res) => {
        console.log(res.data);
        console.log(res.data.token);
        const accessToken = res.data.token;
        dispatch(logIn());
        history.push("/");
      })
      .catch(function (error) {
        console.log(error);
        window.alert("없는 회원정보입니다,,,");
      });
  };
};

// const loginDB = (id, pwd) => {
//   return async function (dispatch, getState, { history }) {
//     console.log(id, pwd);

//     await axios
//       .post("https://reqres.in/api/login", {
//         email: id,
//         password: pwd,
//       })
//       .then((response) => {
//         console.log(response);
//         const accessToken = response.data.token;
//         console.log(accessToken);
//         dispatch(logIn(accessToken));
//         history.push("/");
//       })
//       .catch(function (error) {
//         console.log(error);
//         window.alert("없는 회원정보입니다,,,");
//       });
//     // dispatch(logIn())
//   };
// };

const signupDB = () => {
  return async function (dispatch, getStaet, { history }) {};
};

// const isLoginDB = () => {
//   return async function (dispatch, getState, { history }) {
//     const response = await axios.get.get(`${BASE_URL}/login/isLogin`)
//     const data = response.data
//     console.log(data)
//     dispatch(logIn())
//   }
// }

//reducer (handleActions)

export default handleActions(
  {
    [LOG_IN]: (state, action) =>
      produce(state, (draft) => {
        setCookie("is_login", "success");
        draft.user = action.payload.user;
        draft.is_login = true;
      }),
    [SIGN_UP]: (state, action) => produce(state, (draft) => {}),

    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        deleteCookie("is_login");
        draft.user = null;
        draft.is_login = false;
      }),

    // [USER_INFO] : (state, action) =>
    // produce(state, (draft) => {
    //     draft.user = action.payload.user;
    // }),
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

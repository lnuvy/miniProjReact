import { createAction, handleActions } from 'redux-actions'
import { getCookie, setCookie, deleteCookie } from '../../shared/Cookies'
import { produce } from 'immer'
import axios from 'axios'

// base_url + url
// const BASE_URL =
//   'https://virtserver.swaggerhub.com/myteam84866/Api-Example/1.0.0'
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
  // userId: 'iamuser',
  // password: '1234',
  // passwordChcek: '1234',
  // userNickname: '꿀렁',
  // userAge: '20대',
  is_login: false,
}

//actions
const LOG_IN = 'LOG_IN'
const LOG_OUT = 'LOG_OUT'
const SIGN_UP = 'SIGN_UP'
const USER_INFO = 'USER_INFO'

//action Creators
const logIn = createAction(LOG_IN, (user) => ({ user }))
const signUp = createAction(SIGN_UP, (user) => ({ user }))
const logOut = createAction(LOG_OUT, (user) => ({ user }))
const userInfo = createAction(USER_INFO, (user) => ({ user }))

// Middle wares actions
const loginAction = (user) => {
  return function (dispatch, getState, { history }) {
    console.log(history)
    dispatch(logIn(user))
    history.push('/')
  }
}

const logoutAction = (user) => {
  return function (dispatch, getStaet, { history }) {
    console.log(history)
    dispatch(logOut(user))
    history.push('/login')
  }
}

//reducer (handleActions)

export default handleActions(
  {
    [LOG_IN]: (state, action) =>
      produce(state, (draft) => {
        setCookie('is_login', 'success')
        draft.user = action.payload.user
        draft.is_login = true
      }),
    [SIGN_UP]: (state, action) => produce(state, (draft) => {}),

    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        deleteCookie('is_login')
        draft.user = null
        draft.is_login = false
      }),

    // [USER_INFO] : (state, action) =>
    // produce(state, (draft) => {
    //     draft.user = action.payload.user;
    // }),
  },
  initialState,
)

const actionCreators = {
  logIn,
  logOut,
  signUp,
  loginAction,
  logoutAction,
}

export { actionCreators }

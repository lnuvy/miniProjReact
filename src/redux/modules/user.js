// REDUX-ACTION & IMMER
import { createAction, handleActions } from 'redux-actions'
import { produce } from 'immer'

// AXIOS
import axios from 'axios'
import { apis } from '../../shared/Axios'

// TOKEN
import { getToken, setToken, removeToken } from '../../shared/token'

// base_url + url
const BASE_URL = 'http://13.209.66.208'

// initialState
const initialState = {
  token: null,
  user: null,
  is_login: false,
}

// ACTION
const LOG_IN = 'LOG_IN'
const LOG_OUT = 'LOG_OUT'
const SIGN_UP = 'SIGN_UP'
const USER_INFO = 'USER_INFO'

//ACTION CREATORS
const logIn = createAction(LOG_IN, (user) => ({ user }))
const signUp = createAction(SIGN_UP, (user) => ({ user }))
const logOut = createAction(LOG_OUT, (user) => ({ user }))
const userInfo = createAction(USER_INFO, (user) => ({ user }))

// MIDDLEWARE
const loginAction = (user) => {
  return async function (dispatch, getState, { history }) {
    dispatch(logIn(user))
    history.push('/')
  }
}
//로그아웃
const logoutAction = (user) => {
  return async function (dispatch, getStaet, { history }) {
    console.log(history)
    removeToken('token')
    dispatch(logOut(user))
    history.replace('/login')
  }
}

//회원가입
const registerDB = (id, pwd, pwd_check, user_name, user_age) => {
  return async function (dispatch, getState, { history }) {
    console.log(id, pwd, pwd_check, user_name, user_age)
    console.log(BASE_URL)
    await axios({
      method: 'POST',
      url: `${BASE_URL}/login/signUp`,
      contentType: 'application/json',
      data: JSON.stringify({
        userId: id,
        password: pwd,
        passwordCheck: pwd_check,
        userNickname: user_name,
        userAge: user_age,
      }),
      // headers: {},
    })
      .then((res) => {
        console.log('회원가입 완료~~', res)
      })
      .catch((err) => {
        console.log('띠용,, 에러났음', err)
      })
  }
}

//로그인
const loginDB = (id, pwd) => {
  return async function (dispatch, getState, { history }) {
    await axios
      .post(`${BASE_URL}/login/reqLogin`, {
        userID: id,
        password: pwd,
      })
      .then((res) => {
        if (res.data.token) {
          setToken(res.data.token)
          console.log(res.data)
          dispatch(logIn(res.data.token))
          history.replace('/')
        }
      })
      .catch(function (error) {
        console.log(error)
        window.alert('아이디와 패스워드를 확인해주세요!')
      })
  }
}

// const loginDB = (id, pwd) => {
//   return async function (dispatch, getState, { history }) {
//     console.log('here')
//     await apis
//       .login(id.pwd)
//       .then((response) => {
//         if (response.data.token) {
//           const accessToken = response.data.token
//           let token = window.localStorage.setItem('token', accessToken)
//           console.log(response.data)
//           dispatch(logIn(accessToken))
//           history.replace('/')
//         }
//       })
//       .catch(function (error) {
//         console.log(error)
//         window.alert('없는 회원정보입니다,,,')
//       })
//   }
// }

//유저정보
const userInfoDB = () => {
  return async function (dispatch, getState, { history }) {
    const token = getToken
    console.log(token)
    await axios.get(`${BASE_URL}/getUser`)
  }
}

// REDUCER
export default handleActions(
  {
    [LOG_IN]: (state, action) =>
      produce(state, (draft) => {
        draft.token = action.payload.token
        draft.is_login = true
      }),
    [SIGN_UP]: (state, action) => produce(state, (draft) => {}),

    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        removeToken()
        draft.user = null
        draft.token = null
        draft.is_login = false
      }),

    [USER_INFO]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user
      }),
  },
  initialState,
)

const actionCreators = {
  logIn,
  logOut,
  signUp,
  loginAction,
  logoutAction,
  loginDB,
  registerDB,
}

export { actionCreators }

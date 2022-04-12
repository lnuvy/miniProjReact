import axios from 'axios'

const api = axios.create({
  BASE_URL: 'http://13.209.66.208',
  headers: {
    contentType: 'application/json',
    accept: 'application/json,',
  },
})

api.interceptors.request.use(function (config) {
  const accessToken = localStorage.getItem('token')
  config.headers.common['X-AUTH-TOKEN'] = `${accessToken}`
  return config
})

export const apis = {
  //users
  login: (id, pwd) => api.post('/reqLogin', { userID: id, password: pwd }),
  register: (id, pwd, pwd_check, user_name, user_age) =>
    api.post('/signUp', {
      userId: id,
      password: pwd,
      passwordCheck: pwd_check,
      userNickname: user_name,
      userAge: user_age,
    }),
}

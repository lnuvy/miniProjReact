//
export const getToken = () => {
  return localStorage.getItem('token')
}

export const getUser = () => {
  const userId = localStorage.getItem('userId')
  const userNickname = localStorage.getItem('userNickname')
  const userAge = localStorage.getItem('userAge')

  const dic = { userId, userNickname, userAge }
  return dic
}

export const setData = (data) => {
  const { userId, userNickname, userAge, token } = data
  localStorage.setItem('userId', userId)
  localStorage.setItem('userNickname', userNickname)
  localStorage.setItem('userAge', userAge)
  localStorage.setItem('token', token)
}

export const removeData = () => {
  localStorage.removeItem('userId')
  localStorage.removeItem('userNickname')
  localStorage.removeItem('userAge')
  localStorage.removeItem('token')
}

export const getToken = () => {
  return localStorage.getItem('token')
}

export const setData = (data) => {
  const { userId, userNickname, userAge } = data
  localStorage.setItem('userId', userId)
  localStorage.setItem('userNickname', userNickname)
  localStorage.setItem('userAge', userAge)
}

export const removeData = () => {
  localStorage.setItem('userId')
  localStorage.setItem('userNickname')
  localStorage.setItem('userAge')
}

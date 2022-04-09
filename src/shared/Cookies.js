// //키값 기준으로 쿠키 저장된 값 가져오기
// const getCookie = (name) => {
//     let value = ';' + document.cookie
//     let parts = value.split(';' + name " '=")
//     if (parts.length === 2){
//         return parts.pop().split(';').shift()
//     }
// }

//쿠키 굽기
const setCookie = (name, value, exp = 5) => {
  let date = new Date()
  date.setTime(date.getTime() + exp * 24 * 60 * 60 * 1000)
  document.cookie = `${name}=${value}; expires=${date.toDateString}`
}

//쿠키 폐기
const deleteCookie = (name) => {
  let date = new Date('2022-01-01').toUTCString()
  document.cookie = name + '=; expires' + date
}

export { setCookie, deleteCookie }

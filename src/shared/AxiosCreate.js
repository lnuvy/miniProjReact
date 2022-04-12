import axios from "axios";

//

const instance = axios.create({
  baseURL: "요청보낼 서버 도메인", // 요청을 www.aa.com/user로 보낸다면, www.aa.com까지 기록
  // {headers: }
});

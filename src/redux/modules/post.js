import { createAction, handleActions } from 'redux-actions'
import { produce } from 'immer'
import moment from 'moment'
import axios from 'axios'

// mock API base_url // BASE_URL 주소의 마지막에 /를 뺐습니다
const BASE_URL = 'http://13.209.66.208'

const initialPost = {
  postId: '12345678',
  itemName: '조지아 크래프트',
  writer: {
    userId: 'iamuser',
    password: '1234',
    userNickname: '꿀렁',
    userAge: '20대',
  },
  createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
  content: '개발자들은 역시 커피죠',
  imageUrl: 'http://via.placeholder.com/400x300',
  category: 'chair',
  likeCnt: 5,
  commentCnt: 0,
}
const initialPost2 = {
  postId: '12341234',
  itemName: '아카펠라 아메리카노',
  writer: {
    userId: 'nanuser',
    password: '1234',
    userNickname: '하이',
    userAge: '20대',
  },
  createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
  content: '조지아보다 이게 맛있음',
  imageUrl: 'http://via.placeholder.com/400x300',
  category: 'etc',
  likeCnt: 2,
  commentCnt: 1,
}

const initialState = {
  list: [],
  isLoading: false,
}

const SET_POST = 'SET_POST'
const ADD_POST = 'ADD_POST'
const EDIT_POST = 'EDIT_POST'
const DELETE_POST = 'DELETE_POST'
const TOGGLE_LIKE = 'TOGGLE_LIKE'
const LOADING = 'LOADING'
const MY_POST = 'MY_POST'

const setPost = createAction(SET_POST, (list) => ({ list }))
const addPost = createAction(ADD_POST, (post) => ({ post }))
const editPost = createAction(EDIT_POST, (postId, post) => ({
  postId,
  post,
}))
const deletePost = createAction(DELETE_POST, (postId) => ({ postId }))
const toggleLike = createAction(TOGGLE_LIKE, (postId, likeCnt) => ({
  postId,
  likeCnt,
}))
const loading = createAction(LOADING, (isLoading) => ({ isLoading }))
const myPost = createAction(MY_POST, (list) => ({ list }))

//// middlewares
// 카테고리별 아이템을 가져오기
const getCategoryList = (category = null) => {
  return async function (dispatch, getState, { history }) {
    // 물어볼거 (이렇게해도되는지)
    // 이걸 추가하지 않으면 리덕스에 데이터가 있을때도 계속해서 카테고리 리스트에서 디스패치를 함
    // if (getState().post.list.length !== 0) return;
    // 비동기작업때 로딩 true 주기
    // dispatch(loading(true));

    // 가독성을 위해 BASE_URL 주소의 마지막에 /을 뺐습니다
    const response = await axios.get(`${BASE_URL}/posts/${category}`)
    const data = response.data.Posts
    dispatch(setPost(data))
  }
}

//내가 쓴 글 조회
const getMyPostDB = (userId) => {
  console.log(userId)
  return async function (dispatch, getState, { history }) {
    await axios
      .get(`${BASE_URL}/profile/${userId}`)
      .then((res) => {
        const data = res.data.post
        console.log(data)
        const myData = data.filter((c) => c.userId === userId)
        console.log(...myData)
        dispatch(myPost(...myData))
      })
      .catch((err) => {
        console.log('내 글을 받아오지 못했어요', err)
      })
  }
}

const addPostDB = (post = null) => {
  return async function (dispatch, getState, { history }) {
    if (!post) return
    // 현재 작성한 유저의 정보 먼저 가져오기
    const userInfo = getState().user.user

    // 작성부분 ID 어떻게 하실건지 ? 우리가 넣어줘도 되나? 백에서 하는게 좋은가?
    const data = {
      ...userInfo,
      itemName: post.itemName,
      content: post.content,
      imageUrl: post.imageUrl,
      category: post.category,
    }
    console.log(data)
    console.log(post.imageUrl)

    // 요청!
    await axios
      .post(`${BASE_URL}/posts/${post.category}/add`, data)
      .then((res) => {
        console.log('포스팅 추가 완료했습니다', res)
      })
      .catch((err) => {
        console.log('포스팅 추가중 에러났네요', err)
      })
    dispatch(addPost(data))
    history.replace(`/list/${post.category}`)
  }
}

// 당장은 글 내용물만 바꿀수있음
const editPostDB = (postId, content) => {
  return async function (dispatch, getState, { history }) {
    console.log('here')
    if (!postId) return

    // formData 로 바꿔야함
    // const preview = getState().image.preview;

    const postIndex = getState().post.list.findIndex((p) => p.postId === postId)
    let data = getState().post.list[postIndex]
    console.log('data')

    // 지금은 컨텐츠만 수정하지만 확장성을 위해 형식 맞춤
    data = { ...data, content }

    // axios
    await axios({
      method: 'POST',
      url: `${BASE_URL}/posts/edit/${postId}`,
      data: { postId, content },
      // headers: {},
    })
      .then((res) => {
        dispatch(editPost(postId, data))
        console.log('수정 성공', res)
      })
      .catch((err) => {
        console.log('글 수정시 에러', err)
      })

    console.log(`${data.category}`)
    history.push(`/list/${data.category}/${postId}`)
  }
}

const deletePostDB = (postId, category) => {
  return async function (dispatch, getState, { history }) {
    if (!postId) return
    const { userId } = getState().user.user
    // postId 와 일치하는 댓글들 모두 지우는 프로세스 있어야함

    // axios
    await axios({
      method: 'DELETE',
      url: `${BASE_URL}/posts/delete/${postId}`,
      data: { userId },
    })
      .then((res) => {
        console.log('게시글 삭제 성공', res)
      })
      .catch((err) => {
        console.log('게시글 삭제 에러', err)
      })

    dispatch(deletePost(userId))
    history.replace(`/list/${category}`)
  }
}

export default handleActions(
  {
    [SET_POST]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload.list)
        draft.list = action.payload.list
      }),
    [ADD_POST]: (state, action) =>
      produce(state, (draft) => {
        console.log('hi')
        draft.list.unshift(action.payload.post)
      }),
    [EDIT_POST]: (state, action) =>
      produce(state, (draft) => {
        const newContent = action.payload.post.content
        let index = draft.list.findIndex(
          (p) => p.postId === action.payload.postId,
        )
        console.log(state.list[index])
        draft.list[index] = {
          ...draft.list[index],
          content: newContent,
        }
      }),
    [DELETE_POST]: (state, action) =>
      produce(state, (draft) => {
        let newList = draft.list.filter(
          (l) => l.postId !== action.payload.postId,
        )
        draft.list = newList
      }),

    [MY_POST]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload.list)
        draft.list = action.payload.list
      }),
  },
  initialState,
)

export const actionCreators = {
  setPost,
  getCategoryList,
  addPost,
  addPostDB,
  editPost,
  editPostDB,
  deletePost,
  deletePostDB,
  getMyPostDB,
}

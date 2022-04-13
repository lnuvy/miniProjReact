import { createAction, handleActions } from 'redux-actions'
import { produce } from 'immer'
import moment from 'moment'
import { actionCreators as postActions } from './post'
import axios from 'axios'

const SET_COMMENT = 'SET_COMMENT'
const ADD_COMMENT = 'ADD_COMMENT'
const DELETE_COMMENT = 'DELETE_COMMENT'

// base_url + url
const BASE_URL = 'http://13.209.66.208'

const setComment = createAction(SET_COMMENT, (postId, commentList) => ({
  postId,
  commentList,
}))
const addComment = createAction(ADD_COMMENT, (postId, comment) => ({
  postId,
  comment,
}))
const deleteComment = createAction(DELETE_COMMENT, (commentId, postId) => ({
  commentId,
  postId,
}))

const initialComment = {
  postId: '12341234',
  commentId: 'abcdefg',
  userId: 'iamuser',
  nickname: '닉네임',
  createdAt: '2022-04-10 12:00:00',
  content: '내용입니다',
}
const initialState = {
  list: { 12341234: [initialComment] },
  // is_loading: false,
}

// let cnt = 0
const getCommentDB = (postId) => {
  return async function (dispatch, getState, { history }) {
    if (!postId) return
    // axios
    await axios({
      method: 'get',
      url: `${BASE_URL}/comments/${postId}/list`,
    })
      .then((res) => {
        const list = res.data.commentPostid
        console.log(list)
        dispatch(setComment(postId, list))
      })
      .catch((err) => {
        console.log('댓글 목록 못 가져옴', err)
      })
  }
}

const addCommentDB = (postId, content) => {
  return async function (dispatch, getState, { history }) {
    const userInfo = getState().user.user
    let newComment = {
      ...userInfo,
      content,
    }

    const response = await axios({
      method: 'post',
      url: `${BASE_URL}/comments/${postId}`,
      data: newComment,
    })
    newComment = response.data.createdComment
    console.log(newComment)
    dispatch(addComment(postId, newComment))
  }
}

// postId 로 이 댓글이 달렸던 게시글 찾아서 commentCnt -1 해줘야함
const deleteCommentDB = (commentId, postId) => {
  return async function (dispatch, getState, { history }) {
    if (!commentId) return

    // 해당 개시글 정보
    const postInfo = getState().post.list.filter((l) => l.postId === postId)[0]
    console.log(postInfo)
    // axios
    await axios
      .delete(`${BASE_URL}/comments/${commentId}`)
      .then((res) => {
        console.log('댓글 삭제 성공', res)
      })
      .catch((err) => {
        console.log('댓글 삭제중 에러', err)
      })
    dispatch(deleteComment(commentId, postId))
  }
}

export default handleActions(
  {
    [SET_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.list[action.payload.postId] = action.payload.commentList
        console.log(action.payload.commentList)
      }),
    [ADD_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        console.log(state.list)
        draft.list[action.payload.postId].unshift(action.payload.comment)
      }),
    [DELETE_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        let path = action.payload.postId
        console.log(path)
        console.log(...state.list[path])
        let newArr = draft.list[path].filter(
          (l) => l.commentId !== action.payload.commentId,
        )
        console.log(newArr)
        draft.list[path] = newArr
      }),
  },
  initialState,
)

export const commentActions = {
  getCommentDB,
  addCommentDB,
  deleteCommentDB,
  setComment,
  addComment,
  deleteComment,
}

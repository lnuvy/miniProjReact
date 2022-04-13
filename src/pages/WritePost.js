import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CategoryIconSwitch from '../components/CategoryIcon'
import { Upload } from '../components/posts'
import { Button, Grid, Image, Input, Text, TextArea } from '../elements'
import { history } from '../redux/configureStore'
import { imageActions } from '../redux/modules/image'
import { actionCreators as postActions } from '../redux/modules/post'

// 작성과 수정 동시에 처리
const WritePost = (props) => {
  const dispatch = useDispatch()
  // const isLogin = useSelector((state) => state.user.isLogin);
  const postList = useSelector((state) => state.post.list)
  const preview = useSelector((state) => state.image.preview)

  // 수정시에는 id 가 들어오고 아니면 "write"
  const nowCategory = props.match.params.category || null

  const postId = props.match.params.id || 'write'
  const isEdit = postId !== 'write' ? true : false
  // 수정이라면 현재 포스트의 정보들이 담김
  let nowPost = isEdit ? postList.find((p) => p.postId === postId) : null

  const [inputs, setInputs] = useState(
    nowPost ? { itemName: nowPost.itemName, content: nowPost.content } : {},
  )

  useEffect(() => {
    if (isEdit && !nowPost) {
      history.goBack()
      return
    }

    if (isEdit) {
      // 이미지 프리뷰 보여주기
      dispatch(imageActions.setPreview(nowPost.imageUrl))
    } else {
      dispatch(imageActions.setPreview(null))
    }
  }, [])

  // 제목과
  const changeValue = (e) => {
    const key = e.target.id
    const value = e.target.value
    setInputs((values) => ({ ...values, [key]: value }))
  }

  const addPost = () => {
    // console.log("클릭");
    if (!preview) {
      alert('사진을 반드시 올려야합니다.')
      return
    }
    if (!inputs.content || !inputs.itemName) {
      alert('내용을 입력해주세요.')
      return
    }
    console.log({ ...inputs, nowCategory, preview })
    dispatch(
      postActions.addPostDB({
        ...inputs,
        category: nowCategory,
        imageUrl: preview,
      }),
    )
  }

  const editPost = () => {
    console.log(postId, inputs.content)
    dispatch(postActions.editPostDB(postId, inputs.content))
  }

  // if (!isLogin) {
  //   return <Unauth />;
  // }

  return (
    <>
      <Grid padding="50px" width="60%" margin="10px auto">
        <Grid>
          <Text margin="0" size="32px" bold>
            {isEdit ? '게시글 수정' : '게시글 작성'}
          </Text>
        </Grid>
        <Grid isFlex padding="0 50px">
          <Grid>
            <Text margin="0" size="24px" bold center color="#636e72">
              현재 카테고리는 <CategoryIconSwitch category={nowCategory} />{' '}
              {nowCategory}
            </Text>
          </Grid>
          <Grid>
            <Grid margin="20px auto">
              <Upload propsfile={inputs.itemName} />
            </Grid>
          </Grid>
        </Grid>
        <Text margin="12px 0 0 0">이미지 미리보기</Text>
        <Grid padding="20px">
          <Image
            src={preview ? preview : 'http://via.placeholder.com/400x300'}
          />
        </Grid>
        <Grid>
          <Input
            id="itemName"
            value={inputs.itemName}
            _onChange={changeValue}
          />
        </Grid>
        <Grid padding="15px">
          <TextArea
            id="content"
            value={inputs.content}
            _onChange={changeValue}
            label="게시글 내용"
          />
        </Grid>
        <Grid>
          {!isEdit ? (
            <Button _onClick={addPost}>작성</Button>
          ) : (
            <Button _onClick={editPost}>수정</Button>
          )}
        </Grid>
      </Grid>
    </>
  )
}

export default WritePost

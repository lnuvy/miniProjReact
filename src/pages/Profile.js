import React from 'react'
import { Grid, Input, Text, Button } from '../elements/index'
import styled from 'styled-components'
import MyPost from '../components/posts/MyPost'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { actionCreators as postActions } from '../redux/modules/post'

const Profile = (props) => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.user)
  console.log(user.userNickname)

  let params = useParams()
  console.log(params)
  const userId = params.id

  React.useEffect(() => {
    dispatch(postActions.getMyPostDB(userId))
  }, [])

  return (
    <>
      <Container>
        <InfoBox>
          <Grid>
            <Text weight="900" size="30px" marign="0">
              My Profile
            </Text>
            {/* <Circle></Circle> */}
            <Text weight="700" size="24px">
              {user.userNickname}
            </Text>
            <Text>{user.userAge}</Text>
          </Grid>
        </InfoBox>

        <MyPostBox>
          <Text weight="700" size="30px">
            내가 쓴 글
          </Text>
          <Grid isFlex>
            <MyPost />
            <MyPost />
            <MyPost />
          </Grid>
        </MyPostBox>
      </Container>
    </>
  )
}
// const Circle = styled.div`
//   height: 100px;
//   width: 100px;
//   border-radius: 50%;
//   margin: 0 auto;
//   background-color: #eee;
// `

const Container = styled.div`
  margin: 0 auto;
  width: 80%;
  text-align: center;
  align-items: center;
`

const InfoBox = styled.div`
  margin: 30px auto;
  text-align: center;
  align-items: center;
  width: 350px;
  padding: 50px;
  border-radius: 40px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
`

const MyPostBox = styled.div`
  margin: 30px auto;
  text-align: center;
  align-items: center;
  padding: 50px;
  border: 1px solid #eee;
`
export default Profile

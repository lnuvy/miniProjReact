import React from 'react'
import { Grid, Input, Text, Button } from '../elements/index'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

const Profile = (props) => {
  //걍 토큰 유저이름으로 가져와보기,,ㄹ
  const user = useSelector((state) => state.user.user)
  console.log(user)
  return (
    <>
      <Container>
        <InfoBox>
          <Grid>
            <Text weight="900" size="30px" marign="0">
              My Profile
            </Text>
            <Circle></Circle>
            <Text weight="700" size="24px">
              ${user}
            </Text>
            <Text>자기 소개 흠냐냐</Text>
            <Button width="200px">회원정보 수정</Button>
          </Grid>
        </InfoBox>

        <MyPostBox>
          <Text weight="700" size="30px">
            내가 쓴 글
          </Text>
        </MyPostBox>
      </Container>
    </>
  )
}
const Circle = styled.div`
  height: 200px;
  width: 200px;
  border-radius: 50%;
  margin: 0 auto;

  background-color: #eee;
`

const Container = styled.div`
  margin: 0 auto;
  width: 50%;
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

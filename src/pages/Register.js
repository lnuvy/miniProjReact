import React from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { Grid, Input, Text, Button } from '../elements/index'
import { actionCreators as userActions } from '../redux/modules/user'

const Register = (props) => {
  const dispatch = useDispatch()

  const [id, setId] = React.useState('')
  const [pwd, setPwd] = React.useState('')
  const [pwd_check, setPwdCheck] = React.useState('')
  const [user_name, setUserName] = React.useState('')
  const [user_age, setUserAge] = React.useState('')

  const onSubmitHandler = () => {
    console.log('welcome!')
    if (id === '' || pwd === '' || pwd_check === '' || user_name === '') {
      alert('빈칸을 채워주세요!')
      return
    }
    if (pwd === pwd_check) {
      alert('가입이 정상적으로 완료되었습니다!')
      props.history.push('/login')
    } else {
      alert('비밀번호가 일치하지 않습니다!')
    }
    dispatch(
      userActions.registerDB({ id, pwd, pwd_check, user_name, user_age }),
    )
  }

  return (
    <Container>
      <LogoBox>
        <Text size="50px" weight="700" margin="0">
          🐶개발자를 위한
        </Text>
        <Text size="50px" weight="700" margin="0">
          🍯꿀템
        </Text>
      </LogoBox>
      <SignupBox>
        <Text size="32px" weight="900" margin="0 0px 40px">
          Sign Up
        </Text>
        <Grid>
          <Grid margin="20px">
            <Input
              label="아이디"
              value={id}
              _onChange={(e) => {
                setId(e.target.value)
              }}
              placeholder="아이디를 입력해주세요"
            />
          </Grid>
          <Grid margin="20px">
            <Input
              label="닉네임"
              value={user_name}
              _onChange={(e) => {
                setUserName(e.target.value)
              }}
              placeholder="닉네임을 입력해주세요"
            />
          </Grid>
          <Grid margin="20px">
            <Input
              label="패스워드"
              value={pwd}
              _onChange={(e) => {
                setPwd(e.target.value)
              }}
              type="password"
              placeholder="비밀번호를 입력해주세요"
            />
          </Grid>
          <Grid margin="20px">
            <Input
              label="패스워드"
              value={pwd_check}
              _onChange={(e) => {
                setPwdCheck(e.target.value)
              }}
              type="password"
              placeholder="비밀번호를 다시 입력해주세요"
            />
          </Grid>
          <Grid isFlex_center>
            <SmallText>나이</SmallText>
            <Select
              value={user_age}
              onChange={(e) => setUserAge(e.target.value)}
            >
              <option value="10s">10대</option>
              <option value="20s">20대</option>
              <option value="30s">30대</option>
              <option value="40s">40대</option>
            </Select>
          </Grid>
          <Grid>
            <Button
              margin="20px"
              width="250px"
              text="회원가입"
              type="submit"
              _onClick={onSubmitHandler}
            >
              회원가입
            </Button>
          </Grid>
        </Grid>
      </SignupBox>
    </Container>
  )
}

const Container = styled.div`
  margin: 150px auto;
  width: 100%;
  max-width: 1000px;
  display: flex;
  position: relative;
  flex-direction: rows;
  justify-content: space-between;
  align-items: center;
`

const LogoBox = styled.div`
  align-items: center;
`

const SignupBox = styled.div`
  padding: 50px;
  text-align: center;
  border-radius: 30px;
  width: 300px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
`
const Select = styled.select`
  width: 70%;
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 3px;
`
const SmallText = styled.small`
  color: #aaa;
  margin: 10px;
`
export default Register

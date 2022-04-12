import React from 'react'
import styled from 'styled-components'
import { history } from '../redux/configureStore'
import { useDispatch } from 'react-redux'
import { Grid, Input, Text, Button } from '../elements/index'
import { actionCreators as userActions } from '../redux/modules/user'

const Register = (props) => {
  const dispatch = useDispatch()

  const [id, setId] = React.useState('')
  const [pwd, setPwd] = React.useState('')
  const [pwd_check, setPwdCheck] = React.useState('')
  const [user_name, setUserName] = React.useState('')
  const [user_age, setUserAge] = React.useState('10대')
  const [submitted, setSubmitted] = React.useState(false)
  const [pwdWarning, setPwdWarning] = React.useState(false)

  // const [idConfirm, setIdConfirm] = React.useState('')
  // const [pwdCheckConfirm, setPwdCheckConfirm] = React.useState('')
  // const [idWarning, setIdWarColor] = React.useState('red')

  // const [pwdCheckWarning, setPwdCheckWarColor] = React.useState('red')

  const onSubmitHandler = () => {
    setSubmitted(true)
    if (id === '' || pwd === '' || pwd_check === '' || user_name === '') {
      console.log('빈칸을 채워주세요!')
      return
    }
    if (pwd === pwd_check) {
      alert('가입이 정상적으로 완료되었습니다!')
      props.history.push('/login')
    } else {
      setPwdWarning(true)
    }

    dispatch(userActions.registerDB(id, pwd, pwd_check, user_name, user_age))
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
              label="ID"
              id="userId"
              value={id}
              _onChange={(e) => {
                setId(e.target.value)
              }}
              placeholder="아이디를 입력해주세요"
              clickColor="#98ddca"
            />
            {submitted && !id ? (
              <Text align="left" size="12px" margin="0" color="#FA5E73">
                아이디를 입력하세요!
              </Text>
            ) : null}
          </Grid>
          <Grid margin="20px">
            <Input
              label="Nickname"
              id="userNickname"
              value={user_name}
              _onChange={(e) => {
                setUserName(e.target.value)
              }}
              placeholder="닉네임을 입력해주세요"
              clickColor="#98ddca"
            />
            {submitted && !user_name ? (
              <Text align="left" size="12px" margin="0" color="#FA5E73">
                닉네임을 입력하세요!
              </Text>
            ) : null}
          </Grid>
          <Grid margin="20px">
            <Input
              label="패스워드"
              id="password"
              value={pwd}
              _onChange={(e) => {
                setPwd(e.target.value)
              }}
              type="Password"
              placeholder="영문, 숫자의 패스워드 6자리를 입력해주세요"
              clickColor="#98ddca"
            />
            {submitted && !pwd ? (
              <Text align="left" size="12px" margin="0" color="#FA5E73">
                패스워드를 입력하세요!
              </Text>
            ) : null}
            {submitted && pwdWarning ? (
              <Text align="left" size="12px" margin="0" color="#FA5E73">
                패스워드가 일치하지 않습니다!
              </Text>
            ) : null}
          </Grid>
          <Grid margin="20px">
            <Input
              label="Password"
              id="passwordCheck"
              value={pwd_check}
              _onChange={(e) => {
                setPwdCheck(e.target.value)
              }}
              type="password"
              placeholder="패스워드를 다시 입력해주세요"
              clickColor="#98ddca"
            />
            {submitted && !pwd_check ? (
              <Text align="left" size="12px" margin="0" color="#FA5E73">
                패스워드를 다시 입력하세요!
              </Text>
            ) : null}
            {submitted && pwdWarning ? (
              <Text align="left" size="12px" margin="0" color="#FA5E73">
                패스워드가 일치하지 않습니다!
              </Text>
            ) : null}
          </Grid>
          <Grid isFlex_center>
            <SmallText>나이</SmallText>
            <Select
              value={user_age}
              id="userAge"
              onChange={(e) => setUserAge(e.target.value)}
            >
              <option value="10대">10대</option>
              <option value="20대">20대</option>
              <option value="30대">30대</option>
              <option value="40대">40대</option>
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
          <Text
            margin="0"
            onClick={() => {
              history.push('/login')
            }}
          >
            뒤로가요
          </Text>
        </Grid>
      </SignupBox>
    </Container>
  )
}

const Container = styled.div`
  margin: 50px auto;
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

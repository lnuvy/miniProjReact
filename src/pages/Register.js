import React, { useState } from 'react'
import styled from 'styled-components'
import { history } from '../redux/configureStore'
import { useDispatch } from 'react-redux'
import { Grid, Input, Text, Button } from '../elements/index'
import { actionCreators as userActions } from '../redux/modules/user'

const Register = (props) => {
  const dispatch = useDispatch()
  //기본 회원가입 폼 값
  const [id, setId] = useState('')
  const [pwd, setPwd] = useState('')
  const [pwd_check, setPwdCheck] = useState('')
  const [name, setName] = useState('')
  const [user_age, setUserAge] = useState('10대')
  const [submitted, setSubmitted] = useState(false)

  // 오류메세지
  const [pwdWarning, setPwdWarning] = useState(false)
  const [nameMessage, setNameMessage] = useState('')
  const [idMessage, setIdMessage] = useState('')
  const [pwdMessage, setPwdMessage] = useState('')
  const [pwdConfirmMessage, setPwdConfirmMessage] = useState('')

  // 유효성 검사
  const [isId, setIsId] = useState(false)
  const [isName, setIsName] = useState(false)
  const [isPwd, setIsPwd] = useState(false)
  const [isPwdConfirm, setIsPwdConfirm] = useState(false)

  //아이디 체크
  const onChangeId = (e) => {
    setId(e.target.value)
    if (e.target.value.length < 4 || e.target.value.length > 10) {
      setIdMessage('4자리 이상 10자리 미만으로 입력해주세요.')
      setIsId(false)
    } else {
      setIdMessage('올바른 아이디 형식입니다 ☺️')
      setIsId(true)
    }
  }
  //닉네임 체크
  const onChangeName = (e) => {
    setName(e.target.value)
    if (e.target.value.length < 2 || e.target.value.length > 8) {
      setNameMessage('2글자 이상 8글자 미만으로 입력해주세요.')
      setIsName(false)
    } else {
      setNameMessage('멋진 닉네임이네요!')
      setIsName(true)
    }
  }

  //패스워드 체크
  const onChangePwd = (e) => {
    const pwdRegex = /^[A-Za-z0-9]{6,12}$/
    const pwdCurrent = e.target.value
    setPwd(pwdCurrent)

    if (!pwdRegex.test(pwdCurrent)) {
      setPwdMessage('숫자+영문자 조합 6~12자리 이상 입력해주세요!.')
      setIsPwd(false)
    } else {
      setPwdMessage('안전한 비밀번호입니다 ☺️')
      setIsPwd(true)
    }
  }
  //패스워드 다시 체크
  const onChangePwdConfirm = (e) => {
    const pwdConfirmCurrent = e.target.value
    setPwdCheck(pwdConfirmCurrent)
    if (pwd === pwdConfirmCurrent) {
      setPwdConfirmMessage('비밀번호를 똑같이 입력했어요!')
      setIsPwdConfirm(true)
    } else {
      setPwdConfirmMessage('비밀번호를 다시 확인해주세요!')
      setIsPwdConfirm(false)
    }
  }

  //가입 제출
  const onSubmitHandler = () => {
    setSubmitted(true)
    if (id === '' || pwd === '' || pwd_check === '' || name === '') {
      console.log('빈칸을 채워주세요!')
      return
    }
    if (isId && isName && isPwd && isPwdConfirm) {
      alert('가입이 정상적으로 완료되었습니다!')
    } else {
      alert('다시 한번 확인해주세요..!')
    }
    dispatch(userActions.registerDB(id, pwd, pwd_check, name, user_age))
  }

  return (
    <SignupBox>
      <FormContent>
        <Text size="32px" weight="900" margin="20px 0px 40px">
          Sign Up
        </Text>

        <Grid>
          <Grid margin="20px">
            <Input
              label="ID"
              id="userId"
              value={id}
              _onChange={onChangeId}
              placeholder="아이디를 입력해주세요"
              clickColor="#5DC2B1"
            />
            {id.length > 0 && (
              <Text
                align="left"
                size="12px"
                margin="0"
                color="#5DC2B1"
                className={`message ${isId ? 'success' : 'error'}`}
              >
                {idMessage}
              </Text>
            )}
            {submitted && !id ? (
              <Text align="left" size="12px" margin="0" color="#5DC2B1">
                아이디를 입력하세요!
              </Text>
            ) : null}
          </Grid>
          <Grid margin="20px">
            <Input
              label="Nickname"
              id="name"
              value={name}
              _onChange={onChangeName}
              placeholder="닉네임을 입력해주세요"
              clickColor="#5DC2B1"
            />
            {name.length > 0 && (
              <Text
                align="left"
                size="12px"
                margin="0"
                color="#5DC2B1"
                className={`message ${isName ? 'success' : 'error'}`}
              >
                {nameMessage}
              </Text>
            )}
            {submitted && !name ? (
              <Text align="left" size="12px" margin="0" color="#5DC2B1">
                닉네임을 입력하세요!
              </Text>
            ) : null}
          </Grid>
          <Grid margin="20px">
            <Input
              label="Password"
              id="password"
              value={pwd}
              _onChange={onChangePwd}
              type="Password"
              placeholder="패스워드를 입력해주세요"
              clickColor="#5DC2B1"
            />
            {pwd.length > 0 && (
              <Text
                align="left"
                size="12px"
                margin="0"
                color="#5DC2B1"
                className={`message ${isPwd ? 'success' : 'error'}`}
              >
                {pwdMessage}
              </Text>
            )}
            {submitted && !pwd ? (
              <Text align="left" size="12px" margin="0" color="#5DC2B1">
                패스워드를 입력하세요!
              </Text>
            ) : null}
          </Grid>
          <Grid margin="20px">
            <Input
              label="Password"
              id="pwdCheck"
              value={pwd_check}
              _onChange={onChangePwdConfirm}
              type="password"
              placeholder="패스워드를 다시 입력해주세요"
              clickColor="#5DC2B1"
            />
            {pwd_check.length > 0 && (
              <Text
                align="left"
                size="12px"
                margin="0"
                color="#5DC2B1"
                className={`message ${isPwdConfirm ? 'success' : 'error'}`}
              >
                {pwdConfirmMessage}
              </Text>
            )}
            {submitted && !pwd_check ? (
              <Text align="left" size="12px" margin="0" color="#5DC2B1">
                패스워드를 입력하세요!
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
          <Grid _cursor>
            <Ptag
              margin="0"
              onClick={() => {
                history.push('/login')
              }}
            >
              뒤로가요
            </Ptag>
          </Grid>
        </Grid>
      </FormContent>
    </SignupBox>
  )
}

const SignupBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  min-height: 100%;
`

// const LogoBox = styled.div`
//   align-items: center;
// `

const FormContent = styled.div`
  margin-top: 30px;
  margin-bottom: 50px;
  width: 90%;
  padding: 20px;
  max-width: 350px;
  position: relative;
  border-radius: 30px;
  text-align: center;
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

const Ptag = styled.p`
  margin: 0px;
  &:hover {
    color: #98ddca;
  }
`
export default Register

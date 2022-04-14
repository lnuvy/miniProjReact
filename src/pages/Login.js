import React from 'react'
import styled from 'styled-components'
import { history } from '../redux/configureStore'
import { Grid, Input, Text, Button } from '../elements/index'
import { useDispatch } from 'react-redux'
import { actionCreators as userActions } from '../redux/modules/user'

const Login = (props) => {
  const dispatch = useDispatch()
  const [id, setId] = React.useState('')
  const [pwd, setPwd] = React.useState('')
  const [submitted, setSubmitted] = React.useState(false)

  const login = () => {
    setSubmitted(true)
    if (id === '' || pwd === '') {
      console.log('빈칸을 채워주세요!')
      return
    }
    dispatch(userActions.loginDB(id, pwd))
  }

  return (
    <Container>
      <LogoBox>
        <Text size="40px" weight="900" margin="30px;">
          🐶개발자 🍯꿀템 list.
        </Text>
        {/* <Text size="30px" weight="900" margin="0">
          🍯꿀템
        </Text> */}
      </LogoBox>
      <LoginBox>
        <FormContent>
          <Text size="32px" weight="900">
            Login
          </Text>
          <Grid margin="20px">
            <Input
              id="id"
              clickColor="#5DC2B1"
              label="ID"
              value={id}
              type="text"
              placeholder="🔑    아이디를 입력해주세요"
              _onChange={(e) => {
                setId(e.target.value)
              }}
            />
            {submitted && !id ? (
              <Text align="left" size="12px" margin="0" color="#5DC2B1">
                아이디를 입력하세요!
              </Text>
            ) : null}
          </Grid>

          <Grid margin="20px">
            <Input
              id="password"
              clickColor="#5DC2B1"
              label="Password"
              value={pwd}
              type="password"
              placeholder="🔒    패스워드를 입력해주세요"
              _onChange={(e) => {
                setPwd(e.target.value)
              }}
            />
            {submitted && !pwd ? (
              <Text align="left" size="12px" margin="0" color="#5DC2B1">
                패스워드를 입력하세요!
              </Text>
            ) : null}
          </Grid>

          <Button margin="20px" width="250px" text="로그인" _onClick={login}>
            로그인
          </Button>

          <TextBox>
            <p>
              새로 오셨나요?{' '}
              <span
                onClick={() => {
                  history.push('/register')
                }}
              >
                <U>여기서 가입</U>
              </span>
              하세요!
            </p>
          </TextBox>
        </FormContent>
      </LoginBox>
    </Container>
  )
}

const Container = styled.div`
  margin-top: 100px;
`

// const LogoBox = styled.div`
//   display: flex;
// `

const LoginBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  min-height: 100%;
`

const LogoBox = styled.div`
  align-items: center;
  margin: 0 auto;
  position: relative;
  text-align: center;
`

const FormContent = styled.div`
  margin-bottom: 50px;
  width: 90%;
  padding: 20px;
  max-width: 350px;
  position: relative;
  border-radius: 30px;
  text-align: center;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
`

const TextBox = styled.div`
  padding: 20px;
`

const U = styled.u`
  &:hover {
    color: #98ddca;
  }
`

export default Login

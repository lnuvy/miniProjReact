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

  const login = () => {
    dispatch(userActions.loginAction({ userId: 'jina' }))
    // if (id === '' || pwd === '') {
    //   window.alert('빈칸을 채워주세요!')
    //   return
    // }
  }

  return (
    <Container>
      <Grid>
        <Text size="32px" bold>
          Login
        </Text>
        <Grid>
          <Input
            label="id"
            value={id}
            placeholder="🔑    아이디를 입력해주세요"
            _onChange={(e) => {
              setId(e.target.value)
            }}
          />
        </Grid>
        <Grid>
          <Input
            label="password"
            value={pwd}
            type="password"
            placeholder="🔒    비밀번호를 입력해주세요"
            _onChange={(e) => {
              setPwd(e.target.value)
            }}
          />
        </Grid>
        <Grid>
          <Button margin="20px" width="250px" text="로그인" _onClick={login}>
            로그인
          </Button>
        </Grid>

        <TextBox>
          <p>
            Not a Member?{' '}
            <span
              onClick={() => {
                history.push('/register')
              }}
            >
              <u>Sign up</u>{' '}
            </span>
            now!
          </p>
        </TextBox>
      </Grid>
    </Container>
  )
}

const Container = styled.div`
  border: 1px solid #ddd;
  padding: 20px;
  float: right;
  align-items: center;
  margin-top: 200px;
  margin-right: 150px;
  text-align: center;

  width: 300px;
`

const TextBox = styled.div`
  padding: 20px;
`

export default Login

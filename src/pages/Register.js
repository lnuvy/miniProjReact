import React from 'react'
import styled from 'styled-components'
import { Grid, Input, Text, Button } from '../elements/index'

const Register = (props) => {
  const [id, setId] = React.useState('')
  const [pwd, setPwd] = React.useState('')
  const [pwd_check, setPwdCheck] = React.useState('')
  const [user_name, setUserName] = React.useState('')

  const onSubmitHandler = (e) => {
    e.preventDefault()
    if (pwd === pwd_check) {
      alert('가입이 정상적으로 완료되었습니다!')
      props.history.push('/login')
    } else {
      alert('비밀번호가 일치하지 않습니다!')
    }
  }

  return (
    <Container>
      <h1>Sign Up</h1>
      <Grid>
        <form onSubmit={onSubmitHandler}>
          <Grid>
            <Input
              label="id"
              value={id}
              _onChange={(e) => {
                setId(e.target.value)
              }}
              placeholder="아이디를 입력해주세요"
            />
          </Grid>
          <Grid>
            <Input
              label="user_name"
              value={user_name}
              _onChange={(e) => {
                setUserName(e.target.value)
              }}
              placeholder="닉네임을 입력해주세요"
            />
          </Grid>
          <Grid>
            <Input
              label="pwd"
              value={pwd}
              _onChange={(e) => {
                setPwd(e.target.value)
              }}
              type="password"
              placeholder="비밀번호를 입력해주세요"
            />
          </Grid>
          <Grid>
            <Input
              label="pwd_check"
              value={pwd_check}
              _onChange={(e) => {
                setPwdCheck(e.target.value)
              }}
              type="password"
              placeholder="비밀번호를 다시 입력해주세요"
            />
          </Grid>
          <Grid>
            <Button margin="20px" width="250px" text="회원가입" type="submit">
              회원가입
            </Button>
          </Grid>
        </form>
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

export default Register

import React, { useState } from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import { Grid, Input, Text, Button } from "../elements/index";
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

const Login = (props) => {
  const dispatch = useDispatch();
  // const [id, setId] = React.useState("");
  // const [pwd, setPwd] = React.useState("");

  // 로그인 state 리팩토링
  const [logins, setLogins] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    setLogins((values) => ({ ...values, [id]: value }));
  };

  const login = () => {
    if (!logins.id || !logins.pwd) {
      setSubmitted(true);
      return;
    }
    console.log(logins);
    dispatch(userActions.loginDB(logins));
  };

  return (
    <Container>
      <LoginBox>
        <Grid>
          <Text size="32px" weight="900">
            Login
          </Text>

          <Grid margin="20px">
            <Input
              id="id"
              clickColor="#98ddca"
              label="ID"
              value={logins.id}
              width="80%"
              placeholder="🔑    아이디를 입력해주세요"
              _onChange={handleChange}
            />
            {submitted && !logins.id && (
              <Text align="left" size="12px" margin="0" color="#FA5E73">
                아이디를 입력하세요!
              </Text>
            )}
          </Grid>

          <Grid margin="20px">
            <Input
              id="pwd"
              clickColor="#98ddca"
              label="Password"
              value={logins.pwd}
              width="80%"
              type="password"
              placeholder="🔒    패스워드를 입력해주세요"
              _onChange={handleChange}
            />
            {submitted && !logins.pwd ? (
              <Text align="left" size="12px" margin="0" color="#FA5E73">
                패스워드를 입력하세요!
              </Text>
            ) : null}
          </Grid>
          <Grid>
            <Button margin="20px" width="250px" text="로그인" _onClick={login}>
              로그인
            </Button>
          </Grid>

          <TextBox>
            <p>
              새로 오셨나요?{" "}
              <span
                onClick={() => {
                  history.push("/register");
                }}
              >
                <U>여기서 가입</U>
              </span>
              하세요!
            </p>
          </TextBox>
        </Grid>
      </LoginBox>
    </Container>
  );
};

const Container = styled.div`
  margin: auto;
  width: 100%;
  max-width: 1000px;
  align-items: center;
`;

// const LogoBox = styled.div`
//   align-items: center;
// `

const LoginBox = styled.div`
  padding: 50px;
  text-align: center;
  border-radius: 30px;
  width: 300px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
`;

const TextBox = styled.div`
  padding: 20px;
`;

const U = styled.u`
  &:hover {
    color: #98ddca;
  }
`;

export default Login;

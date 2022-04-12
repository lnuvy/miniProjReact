import React from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import { Grid, Input, Text, Button } from "../elements/index";
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

const Login = (props) => {
  const dispatch = useDispatch();
  const [id, setId] = React.useState("");
  const [pwd, setPwd] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);

  const login = () => {
    setSubmitted(true);
    if (id === "" || pwd === "") {
      console.log("빈칸을 채워주세요!");
      return;
    }
    dispatch(userActions.loginDB(id, pwd));
  };

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

      <LoginBox>
        <Grid flexColumn>
          <Text size="32px" weight="900">
            Login
          </Text>

          <Grid margin="20px">
            <Input
              id="id"
              clickColor="#98ddca"
              label="ID"
              value={id}
              placeholder="🔑    아이디를 입력해주세요"
              _onChange={(e) => {
                setId(e.target.value);
              }}
            />
            {submitted && !id ? (
              <Text align="left" size="12px" margin="0" color="#FA5E73">
                아이디를 입력하세요!
              </Text>
            ) : null}
          </Grid>

          <Grid margin="20px">
            <Input
              id="password"
              clickColor="#98ddca"
              label="Password"
              value={pwd}
              type="password"
              placeholder="🔒    패스워드를 입력해주세요"
              _onChange={(e) => {
                setPwd(e.target.value);
              }}
            />
            {submitted && !pwd ? (
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
              Not a Member?{" "}
              <span
                onClick={() => {
                  history.push("/register");
                }}
              >
                <U>Sign up</U>{" "}
              </span>
              now!
            </p>
          </TextBox>
        </Grid>
      </LoginBox>
    </Container>
  );
};

const Container = styled.div`
  margin: 150px auto;
  width: 100%;
  max-width: 1000px;
  display: flex;
  position: relative;
  flex-direction: rows;
  justify-content: space-between;
  align-items: center;
`;

const LogoBox = styled.div`
  align-items: center;
`;

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

import React from "react";
import { Text, Grid, Button } from "../elements/index";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../redux/configureStore";
import { actionCreators as userActions } from "../redux/modules/user";
import { MdLogout, MdOutlinePermIdentity, MdList } from "react-icons/md";
import styled from "styled-components";

const Header = (props) => {
  const dispatch = useDispatch();

  const { userId } = useSelector((state) => state.user.user);

  console.log(userId);

  return (
    <Container>
      <Grid isFlex>
        <Grid _cursor>
          <Text
            size="50px"
            margin="0 10px 5px 10px"
            onClick={() => history.push("/")}
          >
            🐶🍯
          </Text>
        </Grid>
        <Grid isFlex>
          <Grid
            _cursor
            isFlex
            padding="15px"
            _onClick={() => history.push("/list/chair")}
          >
            <MdList size="30" />
            <Text _className="headerText" weight="400">
              Category
            </Text>
          </Grid>
          <Grid
            _cursor
            isFlex
            padding="15px"
            _onClick={() => history.push(`/profile/${userId}`)}
          >
            <MdOutlinePermIdentity size="30" />
            <Text _className="headerText" weight="400">
              My info
            </Text>
          </Grid>
          <Grid
            _cursor
            isFlex
            padding="15px"
            onClick={() => {
              dispatch(userActions.logoutAction({}));
              history.push("/login");
            }}
          >
            <MdLogout size="30" />
            <Text _className="headerText" weight="400">
              LogOut
            </Text>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

export default Header;

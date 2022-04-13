import React from "react";
import { Text, Grid, Button } from "../elements/index";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../redux/configureStore";
import { actionCreators as userActions } from "../redux/modules/user";
import { MdLogout, MdOutlinePermIdentity, MdList } from "react-icons/md";
import styled from "styled-components";
import logo from "./img/logo.png";
import logoHover from "./img/logo_hover.png";

const Header = (props) => {
  const dispatch = useDispatch();

  const { userId } = useSelector((state) => state.user.user);
  const [imgHover, setImgHover] = React.useState(false);

  console.log(userId);

  return (
    <Container>
      <Grid isFlex>
        <li
          onMouseOver={() => setImgHover(true)}
          onMouseOut={() => setImgHover(false)}
        >
          <Grid _cursor onClick={() => history.push("/")}>
            <Logo src={imgHover ? logoHover : logo} />
          </Grid>
        </li>
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
            <MdOutlinePermIdentity size="27" />
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
            <MdLogout size="26" />
            <Text _className="headerText" weight="400">
              LogOut
            </Text>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

const Logo = styled.img`
  width: 200px;
  padding: 5px;
  margin: auto 0;
`;

const Container = styled.div`
  padding: 0 50px;
  // max-width: 1200px;
  margin: 0 auto;
  height: 85px;
  // background-color: #eee;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
    rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
`;

export default Header;

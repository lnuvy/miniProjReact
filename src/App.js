import { ConnectedRouter } from "connected-react-router";
import React, { useEffect } from "react";
import { history } from "./redux/configureStore";
import { Route } from "react-router-dom";
import "./App.css";
import {
  CategoryList,
  Login,
  Main,
  Profile,
  Register,
  WritePost,
  Detail,
} from "./pages";
import Header from "./shared/Header";
import NotFound from "./shared/NotFound";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { actionCreators as postActions } from "./redux/modules/post";
import { actionCreators as userActions } from "./redux/modules/user";
import { Switch } from "react-router-dom";
import { getToken, getUser } from "./shared/token";

function App() {
  const dispatch = useDispatch();

  // 토큰 있을때만 메인 이외의 페이지 보이기 (요렇게 하는게 맞나..?) => 따로 permit
  const is_login = useSelector((state) => state.user.is_login);

  useEffect(() => {
    const token = getToken();
    const user = getUser();
    if (token) {
      dispatch(userActions.loginAction(token, user));
    }
  }, [is_login]);

  if (is_login) {
    return (
      <div className="App">
        <Header />
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact component={Main} />
            <Route path="/list/:category" exact component={CategoryList} />
            <Route path="/list/:category/:id" exact component={Detail} />
            <Route path="/write/:category" exact component={WritePost} />
            <Route path="/write/:categoty/:id" exact component={WritePost} />
            <Route path="/profile/:id" exact component={Profile} />
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
            <Route path="/*" exact component={NotFound} />
          </Switch>
        </ConnectedRouter>
      </div>
    );
  } else {
    return (
      <div className="App">
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
            <Route path="/*" exact component={NotFound} />
          </Switch>
        </ConnectedRouter>
      </div>
    );
  }
}

export default App;

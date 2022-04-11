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
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { actionCreators as postActions } from "./redux/modules/post";

function App() {
  const dispatch = useDispatch();

  // 토큰 있을때만 메인 이외의 페이지 보이기 (요렇게 하는게 맞나..?) => 따로 permit
  const is_login = localStorage.getItem("token");

  if (is_login) {
    return (
      <div className="App">
        <Header />
        <ConnectedRouter history={history}>
          <Route path="/" exact component={Main} />
          <Route path="/list/:category" exact component={CategoryList} />
          <Route path="/list/:category/:id" exact component={Detail} />
          <Route path="/write/:category" exact component={WritePost} />
          <Route path="/write/:categoty/:id" exact component={WritePost} />
          <Route path="/profile/:id" exact component={Profile} />
        </ConnectedRouter>
      </div>
    );
  } else {
    return (
      <div className="App">
        <ConnectedRouter history={history}>
          <Route path="/" exact component={Login} />
          <Route path="/register" exact component={Register} />
        </ConnectedRouter>
      </div>
    );
  }
}

export default App;

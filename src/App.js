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
} from "./pages";
import { useDispatch } from "react-redux";
import { actionCreators as postActions } from "./redux/modules/post";

// 분기?
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(postActions.setPost());
  });

  return (
    <>
      <div className="App">
        <ConnectedRouter history={history}>
          <Route path="/" exact component={Main} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/:category" exact component={CategoryList} />
          <Route path="/write" exact component={WritePost} />
          <Route path="/write/:id" exact component={WritePost} />
          <Route path="/profile/:id" exact component={Profile} />
        </ConnectedRouter>
      </div>
    </>
  );
}

export default App;

import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";
import { connectRouter } from "connected-react-router";

import User from "./modules/user";
import Post from "./modules/post";
import Image from "./modules/image";
import Comment from "./modules/comment";

export const history = createBrowserHistory();

// 리듀서 router 안에 history 넣기
const rootReducer = combineReducers({
  user: User,
  post: Post,
  image: Image,
  comment: Comment,
  router: connectRouter(history),
});

const middlewares = [thunk.withExtraArgument({ history: history })];

// 개발 환경일때, redux-logger 사용할 수 있게하기
const env = process.env.NODE_ENV;
if (env === "development") {
  const { logger } = require("redux-logger");
  middlewares.push(logger);
}

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const enhancer = composeEnhancers(applyMiddleware(...middlewares));
let store = (initialStore) => createStore(rootReducer, enhancer);

export default store();

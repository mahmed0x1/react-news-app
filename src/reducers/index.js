import { combineReducers } from "redux";
import newsReducer from "./newsReducer";
import routeReducer from "./routeReducer";

export default combineReducers({
  news: newsReducer,
  router: routeReducer
});

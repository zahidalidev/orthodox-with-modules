import { createStore, combineReducers } from "redux";
import routeReducer from "./reducers/routes";
import notificationReducer from './reducers/notification'

let rootReducers = combineReducers({
  routes: routeReducer,
  notifications: notificationReducer
});

const store = createStore(rootReducers);
export default store;

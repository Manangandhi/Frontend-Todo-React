import { combineReducers } from "redux";
import { todoReducer } from "./reducers/todoReducer";

const appReducer = combineReducers({
  todo: todoReducer,
});

const initialState = appReducer({}, {});

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT_SUCCESS") {
    state = initialState;
  }

  return appReducer(state, action);
};

export default rootReducer;

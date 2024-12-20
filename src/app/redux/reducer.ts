import {combineReducers} from "redux";
import usersReduser from "./slices/usersReduser";

const rootReducer = combineReducers({
  users: usersReduser,
})

export default rootReducer
import { combineReducers } from "redux";
import workoutReducer from "./Reducers";

const rootReducer = combineReducers({
  workout: workoutReducer,
});

export default rootReducer;

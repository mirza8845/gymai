import { SET_WORKOUT_PLAN, SET_WORKOUT_LOADING } from "./Actions";

const initialState = {
  workoutPlan: null,
  loading: false,
};

const workoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_WORKOUT_PLAN:
      return {
        ...state,
        workoutPlan: action.payload,
      };
    case SET_WORKOUT_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};

export default workoutReducer;

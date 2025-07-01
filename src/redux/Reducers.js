import { SET_WORKOUT_PLAN } from "./Actions";
const initialState = {
  workoutPlan: null,
};

const workoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_WORKOUT_PLAN:
      return {
        ...state,
        workoutPlan: action.payload,
      };
    default:
      return state;
  }
};

export default workoutReducer;

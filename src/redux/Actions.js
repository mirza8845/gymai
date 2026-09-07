export const SET_WORKOUT_PLAN = "SET_WORKOUT_PLAN";
export const SET_WORKOUT_LOADING = "SET_WORKOUT_LOADING";

export const setWorkoutPlan = (plan) => ({
  type: SET_WORKOUT_PLAN,
  payload: plan,
});

export const setWorkoutLoading = (loading) => ({
  type: SET_WORKOUT_LOADING,
  payload: loading,
});

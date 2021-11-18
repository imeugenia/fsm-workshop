// 1️⃣  Define the statuses based on the state chart we created in the previous
//    exercise.
export const STATUSES = {
  IDLE: "IDLE",
  LOADING: "LOADING",
  FAILURE: "FAILURE",
  QUIZ: "QUIZ",
  VALIDATION: "VALIDATION",
  VICTORY: "VICTORY",
  DEFEAT: "DEFEAT",
  // 👉 Add more statuses below
};

// 2️⃣ Create an initial state. Currently, it consists only of a status.
//    We might add more data like `questions` soon, but for now skip
//    it as `status` it already defined. :)
export const initialState = {
  // @TODO: Either we modify the explanation, or we remove the next line.
  status: STATUSES.IDLE,
  questions: [],
};

// @TODO: Consider using `status` to align the naming with the first example. Or
//        maybe renaming `status` to `state` in the first example.
function reducer(state, action) {
  switch (action.event) {
    // 3️⃣ Add cases for all transitions between states based on the state chart
    // E.g. case for transition between initial state and the loading state:
    // case "start": {
    //   return { status: STATUSES.LOADING_QUIZ };
    // }
    // ❗️ Pro tip for later: In case the state has not just the `status`
    //    property but also other fields like `questions`, we should be careful
    //    about not loosing them. To do so, ensure you spread the initial state
    //    and new values for every field. Feel free to ignore this for now.

    // @TODO: Maybe consider storing transitions in a separate object? Or not
    //        storing anything at all and passing strings all over the place.
    // @TODO: Consider differences of casing to better differentiate transitions
    //        from statuses or something.
    case "START":
      return { ...state, status: STATUSES.LOADING };
    case "LOAD":
      return {
        ...state,
        status: action.data ? STATUSES.QUIZ : STATUSES.FAILURE,
        questions: action.data || [],
      };
    case "SUBMIT":
      return { ...state, status: STATUSES.VALIDATION };
    case "ASSESS_CORRECT":
      return { ...state, status: STATUSES.VICTORY };
    case "ASSESS_INCORRECT":
      return { ...state, status: STATUSES.DEFEAT };

    default: {
      return state;
    }
  }
}

export default reducer;

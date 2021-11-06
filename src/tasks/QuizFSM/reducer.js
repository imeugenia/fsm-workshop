// 1️⃣ Define the statuses based on the state chart we have just created
export const STATUSES = {
  IDLE: "IDLE",
  // 👉 Add more statuses below
};

// 2️⃣ The next step is creating an initial state. Currently, it consists of
// a status. We can add more data like `questions` and `error`, but for now skip
// it as it already defined :)
export const initialState = {
  status: STATUSES.IDLE,
};

function reducer(state, action) {
  switch (action.event) {
    // 3️⃣ Add cases for all transitions between states based on the state chart
    // Eg. case for transition between initial state and the loading state:
    // case "start": {
    //   return {
    //      ...initialState,
    //      status: STATUSES.LOADING_QUIZ,
    //   };
    // }
    // ❗️ In case the state has not just `status` but other fields like `questions` and `error`,
    // we should be careful about not loosing it. To do so, ensure you add initial state and
    // new values for every field.

    default: {
      return state;
    }
  }
}

export default reducer;

// 1️⃣ Define the statuses based on the state chart we created in the previous exercise
export const STATUSES = {
  IDLE: "IDLE",
  // 👉 Add more statuses below
};

// 2️⃣ Add a status to the initCurrently, it consists only of a status.
// We might add more data like `questions` soon, but for now skip
// it as `status` it already defined :)
export const initialState = {
  status: STATUSES.IDLE,
};

function reducer(state, event) {
  switch (event.type) {
    // 3️⃣ Add cases for all transitions between states based on the state chart
    // Eg. case for transition between initial state and the loading state:
    // case "start": {
    //   return {
    //      ...initialState,
    //      status: STATUSES.LOADING_QUIZ,
    //   };
    // }
    // ❗️ In case the state has not just `status` but other fields like `questions`,
    // we should be careful about not loosing it. To do so, ensure you add initial state and
    // new values for every field.

    default: {
      return state;
    }
  }
}

export default reducer;

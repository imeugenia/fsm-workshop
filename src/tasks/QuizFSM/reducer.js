// 1️⃣ Define the statuses based on the state chart we created in the previous
//   exercise, i.e. "LOADING" (when the questions are loading), "VALIDATION"
//   (when the answers are validated), etc.
export const STATUSES = {
  IDLE: "IDLE",
  // 👉 Add more statuses below
};

// 2️⃣ The next step is creating an initial state. Currently, it consists only
//    of a status. We might add more data like `questions` soon. As the status
//    is already defined, feel free to continue to the next step :)
export const initialState = {
  status: STATUSES.IDLE,
};

function reducer(state, event) {
  switch (event.type) {
    // 3️⃣ Add cases for all transitions between states based on the state chart
    // E.g. case for transition between initial state and the loading state:
    // case "start": {
    //   return {
    //      ...initialState,
    //      status: STATUSES.LOADING,
    //   };
    // }
    // ❗️ Pro tip for later: In case the state has not just the `status`
    //    property but also other fields like `questions`, we should be careful
    //    about not loosing them. To do so, ensure you spread the initial state
    //    and new values for every field. Feel free to ignore this for now.

    default: {
      return state;
    }
  }
}

export default reducer;

// 🏁 Thank you for participating and well done on completing the workshop!
//   Please, fill out the feedback form: https://forms.gle/Y624DthNFXriUftt9

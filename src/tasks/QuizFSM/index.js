import React from "react";
import serialize from "form-serialize";
import { decode } from "html-entities";
import { fetchQuestions, getIsResultCorrect } from "../../utils";
import Answers from "../../components/Answers";
import reducer, { STATUSES, initialState } from "./reducer";

function QuizFSM() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const formRef = React.useRef(null);

  console.log(state.status === STATUSES.LOADING_RESULTS);

  const startQuiz = () => {
    // 4️⃣ Dispatch event to reducer
    // Eg.: dispatch({ event: 'start' })
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // 8️⃣ Dispatch "submit" event to reducer
  };

  // 6️⃣ According to the state chart, once a machine enters "loading quiz" state
  // a request to get questions should be triggered. Data fetching is a side-effect
  // that should be handled inside `React.useEffect()` hook.
  React.useEffect(() => {
    // Here is the logic to be implemented:
    //    1. If the status has changed to "loading quiz", trigger a request that is handled inside
    //       `fetchQuestions` helper.
    //    ❗️ `fetchQuestions` is asynchronous and should be used with Promise or async/await syntax.
    //    💡 Data returned from `fetchQuestions` has the following structure:
    // !!!!!!!!!!!!!!!!!!!!
    //    2. Questions should be saved in a state. You have 2 options where to store them:
    //        - inside component state
    //        - inside reducer state
    //    💡 To keep component clean from the logic, I would recommend to store all kind of data inside
    //    reducer state. In order to do this
    //        - go back to `reducer.js` file and add `questions: []` to the `initialState`,
    //        - dispatch "request succeed" action that contains `event` and `questions`.
    //          Eg.: dispatch({ event: "request_succeed", questions: data.results });
  }, [state.status]);

  React.useEffect(() => {
    // 9️⃣ Once the machine enters "LOADING_RESULTS" state, we should check for the correctness of the answers
    //  and transition to the next state based on the result. Uncomment the line before and dispatch an event
    //  according to the results.
    // if (state.status === STATUSES.LOADING_RESULTS) {
    //   const answers = serialize(formRef.current, { hash: true });
    //   const isCorrect = getIsResultCorrect(state.questions, answers);
    //   // 👉 Dispatch an event here
    // }
  }, [state.status, state.questions]);

  return (
    <div className="App">
      <button onClick={startQuiz}>Start a quiz</button>
      {/* 5️⃣ Check if the status is "loading" and display Loading indicator accordingly */}
      {/* Eg.: {state.status === STATUSES.LOADING_QUIZ && <div>Loading...</div>} */}
      {state.status === STATUSES.FAILURE && <div>{state.error}</div>}

      {state.status === STATUSES.QUIZ ? (
        <form ref={formRef} onSubmit={handleSubmit}>
          {/* 7️⃣ Uncomment the code below. ❗️ In case you are not storing questions in reducer state 
              change `state.questions` to the component state variable you have defined. */}
          {/* {state.questions.map(({ question }, index) => {
            return (
              <div key={index}>
                {decode(question)}
                <Answers index={index} />
              </div>
            );
          })} */}
          <button type="submit">Submit</button>
          {state.status === STATUSES.LOADING_RESULTS && (
            <div>Checking results...</div>
          )}
        </form>
      ) : null}
      {/* 🔟 Display `CorrectResult` component, if the status is "VICTORY" and 
          `WrongResult` component, if the status is "DEFEAT" */}
    </div>
  );
}

export default QuizFSM;

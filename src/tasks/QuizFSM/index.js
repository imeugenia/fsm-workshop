import React from "react";
import serialize from "form-serialize";
import { fetchQuestions, getIsResultCorrect } from "../../utils";
import Button from "@mui/lab/LoadingButton";
import Question from "../../components/Question";
import Results from "../../components/Results";
import reducer, { STATUSES, initialState } from "./reducer";

function QuizFSM() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const formRef = React.useRef(null);

  const startQuiz = () => {
    // If you are looking for instructions 1 to 3, head to `./reducer.js`.
    // 4️⃣ Dispatch "start" event to the reducer
    // Eg.: dispatch({ event: 'start' })
    dispatch({ event: "START" });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // 8️⃣ Dispatch "submit" event to the reducer
    // @TODO: Consider renaming `event` to `type` (or something else) to avoid
    //        mix-up with the `event` argument from event handlers.
    dispatch({ event: "SUBMIT" });
  };

  // 6️⃣ According to the state chart, once a machine enters "loading quiz" state
  //   a request to get questions should be triggered. Data fetching is a
  //   side-effect that should be handled inside `React.useEffect()` hook.
  React.useEffect(() => {
    if (state.status === STATUSES.LOADING) {
      // @TODO: Consider displaying only 2 questions at a time to make testing
      //        for the successful state easier.
      fetchQuestions()
        .then(({ results, response_code: code }) => {
          if (code === 0) dispatch({ event: "LOAD", data: results });
          else dispatch({ event: "LOAD" });
        })
        .catch(() => dispatch({ event: "LOAD" }));
    }

    // Here is the logic to be implemented:
    //    1. If the status has changed to "LOADING", call the `fetchQuestions`
    //       function that triggers a request.
    //    ❗️ `fetchQuestions` is asynchronous and should be used with Promise or
    //       async/await syntax.
    //    💡 You can find data returned from `fetchQuestions` sample in
    //       "./dataSample.json".
    //    2. Questions should be saved in a state. You have 2 options where to
    //       store them:
    //       - inside component state (with `useState`)
    //       - inside reducer state (alongside `status`)
    //    💡 To keep component clean from the logic, I would recommend to store
    //       all kind of data inside reducer state. In order to do this:
    //        - go back to `./reducer.js` file and add `questions: []` to the
    //         `initialState`,
    //        - dispatch "Request succeed" action that contains `event` and
    //         `questions`.
    //          Eg.: dispatch({ event: "LOAD", questions: data.results });
  }, [state.status]);

  React.useEffect(() => {
    // 9️⃣ Part 1. Once "Get results" button is clicked the machine should enter
    //    the "Loading results" state. In that case, check for the correctness
    //    of the answers and transition to the next state based on the result.
    //    Here is what you need to do:
    //    1. Add an "if" statement to check for "Loading results" state.
    //    2. Check for the correctness of the answers using the following lines
    //       of code:
    //       const answers = serialize(formRef.current, { hash: true });
    //       const isCorrect = getIsResultCorrect(state.questions, answers);
    //    3. Transition to the next state using `dispatch`.
    if (state.status === STATUSES.VALIDATION) {
      const answers = serialize(formRef.current, { hash: true });
      const isCorrect = getIsResultCorrect(state.questions, answers);

      dispatch({ event: isCorrect ? "ASSESS_CORRECT" : "ASSESS_INCORRECT" });
    }
  }, [state.status, state.questions]);

  return (
    <div>
      {/** Consider adding the next logic bit as an extra 🔥? */}
      {[STATUSES.QUIZ, STATUSES.VALIDATION].includes(state.status) || (
        <Button
          // 5️⃣ Check if the status is "loading" and set button `loading` prop
          //    accordingly.
          loading={state.status === STATUSES.LOADING}
          onClick={startQuiz}
          variant="contained"
        >
          Load a quiz
        </Button>
      )}

      {/* 🔥 If you are on fire today, here is an extra task. A request to get
             questions might fail and you need to handle this error.
             Check Trivia API docs: https://opentdb.com/api_config.php to find
             out error response body. In the first `useEffect` hook, add a
             condition to check for an error and, in case of a request error,
             dispatch a failure event. Also, there should be an additional
             failure state added to reducer.
             @TODO: Maybe we should clarify and/or simplify that part by
                    providing error codes and what should be done without having
                    to switch to the browser.
      */}
      {state.status === STATUSES.FAILURE && (
        <div>Quiz failed successfully. 💩 </div>
      )}

      {state.status === STATUSES.QUIZ ||
      state.status === STATUSES.LOADING_RESULTS ? (
        <form ref={formRef} onSubmit={handleSubmit}>
          {/* 7️⃣ Uncomment the code below. ❗️ In case you are not storing
           *    questions in reducer state change `state.questions` to the
           *    component state variable you have defined. */}
          {state.questions.map(({ question }, index) => (
            <Question key={index} question={question} index={index} />
          ))}

          {/* 9️⃣ Part 2.
              Check if the status is "loading results" and set button loading
              prop accordingly.
          */}
          <Button
            type="submit"
            loading={state.status === STATUSES.VALIDATION}
            variant="contained"
          >
            Get results
          </Button>
        </form>
      ) : null}

      {/* 🔟  Uncomment the line below to enable display of the results based on the state */}
      <Results status={state.status} />
    </div>
  );
}

export default QuizFSM;

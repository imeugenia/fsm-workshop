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

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch({ event: "submit" });
  };

  React.useEffect(() => {
    const getQuestions = async () => {
      const data = await fetchQuestions();

      if (data.response_code > 0) {
        dispatch({ event: "request_failed" });
      } else {
        dispatch({ event: "request_succeed", questions: data.results });
      }
    };

    if (state.status === STATUSES.LOADING_QUIZ) {
      getQuestions();
    }

    if (state.status === STATUSES.LOADING_RESULTS) {
      const answers = serialize(formRef.current, { hash: true });
      const event = getIsResultCorrect(state.questions, answers)
        ? "correct"
        : "wrong";
      dispatch({ event });
    }
  }, [state.status, state.questions]);

  return (
    <div>
      <Button
        loading={state.status === STATUSES.LOADING_QUIZ}
        onClick={() => dispatch({ event: "start" })}
        variant="contained"
      >
        Load a quiz
      </Button>

      {state.status === STATUSES.FAILURE && <div>{state.error}</div>}

      {state.status === STATUSES.QUIZ ||
      state.status === STATUSES.LOADING_RESULTS ? (
        <form ref={formRef} onSubmit={handleSubmit}>
          {state.questions.map(({ question }, index) => {
            return <Question key={index} question={question} index={index} />;
          })}
          <Button
            type="submit"
            loading={state.status === STATUSES.LOADING_RESULTS}
            variant="contained"
          >
            Get results
          </Button>
        </form>
      ) : null}
      <Results status={state.status} />
    </div>
  );
}

export default QuizFSM;

import React from "react";
import serialize from "form-serialize";
import { fetchQuestions, getIsResultCorrect } from "../../utils";
import Button from "@mui/lab/LoadingButton";
import Question from "../../components/Question";
import Results from "../../components/Results";
import Error from "../../components/Error";
import reducer, { STATUSES, EVENTS, initialState } from "./reducer";
import "./index.css";

function QuizFSM() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const formRef = React.useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch({ type: EVENTS.submit });
  };

  React.useEffect(() => {
    const getQuestions = async () => {
      try {
        const data = await fetchQuestions();

        if (data.response_code > 0) {
          dispatch({ type: EVENTS.failed });
        } else {
          dispatch({ type: EVENTS.succeed, questions: data.results });
        }
      } catch {
        dispatch({ type: EVENTS.failed });
      }
    };

    if (state.status === STATUSES.LOADING) {
      getQuestions();
    }

    if (state.status === STATUSES.VALIDATION) {
      setTimeout(() => {
        const answers = serialize(formRef.current, { hash: true });
        const type = getIsResultCorrect(state.questions, answers)
          ? EVENTS.validate_correct
          : EVENTS.validate_incorrect;
        dispatch({ type });
      }, 3000);
    }
  }, [state.status, state.questions]);

  return (
    <div className="form-wrapper">
      {![STATUSES.QUIZ, STATUSES.FAILURE, STATUSES.VALIDATION].includes(
        state.status
      ) && (
        <Button
          color="secondary"
          loading={state.status === STATUSES.LOADING}
          onClick={() => dispatch({ type: EVENTS.start })}
          variant="contained"
          aria-describedby="loading-error"
          aria-invalid={state.status === STATUSES.FAILURE}
          size="large"
        >
          Load a quiz
        </Button>
      )}

      {state.status === STATUSES.FAILURE && <Error id="loading-error" />}

      {state.status === STATUSES.QUIZ ||
      state.status === STATUSES.VALIDATION ? (
        <form ref={formRef} onSubmit={handleSubmit} className="quiz">
          {state.questions.map(({ question }, index) => {
            return <Question key={index} question={question} index={index} />;
          })}
          <Button
            color="success"
            type="submit"
            loading={state.status === STATUSES.VALIDATION}
            variant="contained"
            size="large"
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

import React from "react";
import serialize from "form-serialize";
import { fetchQuestions, getIsResultCorrect } from "../../utils";
import Button from "@mui/lab/LoadingButton";
import Question from "../../components/Question";
import Results from "../../components/Results";
import Error from "../../components/Error";
import reducer, { STATUSES, EVENTS, initialState } from "./reducer";

function QuizFSM() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const formRef = React.useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch({ event: EVENTS.submit });
  };

  React.useEffect(() => {
    const getQuestions = async () => {
      try {
        const data = await fetchQuestions();

        if (data.response_code > 0) {
          dispatch({ event: EVENTS.failed });
        } else {
          dispatch({ event: EVENTS.succeed, questions: data.results });
        }
      } catch {
        dispatch({ event: EVENTS.failed });
      }
    };

    if (state.status === STATUSES.LOADING_QUIZ) {
      getQuestions();
    }

    if (state.status === STATUSES.VALIDATION) {
      const answers = serialize(formRef.current, { hash: true });
      const event = getIsResultCorrect(state.questions, answers)
        ? EVENTS.validate_correct
        : EVENTS.validate_incorrect;
      dispatch({ event });
    }
  }, [state.status, state.questions]);

  return (
    <div>
      <Button
        loading={state.status === STATUSES.LOADING_QUIZ}
        onClick={() => dispatch({ event: EVENTS.start })}
        variant="contained"
        aria-describedby="loading-error"
        aria-invalid={state.status === STATUSES.FAILURE}
      >
        Load a quiz
      </Button>

      {state.status === STATUSES.FAILURE && <Error id="loading-error" />}

      {state.status === STATUSES.QUIZ ||
      state.status === STATUSES.VALIDATION ? (
        <form ref={formRef} onSubmit={handleSubmit}>
          {state.questions.map(({ question }, index) => {
            return <Question key={index} question={question} index={index} />;
          })}
          <Button
            type="submit"
            loading={state.status === STATUSES.VALIDATION}
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

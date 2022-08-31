import React from "react";
import serialize from "form-serialize";
import { fetchQuestions, getIsResultCorrect } from "../../utils";
import Button from "@mui/lab/LoadingButton";
import Question from "../../components/Question";
import Results from "../../components/Results";
import Error from "../../components/Error";
import transition, { STATES, EVENTS } from "./reducer";
import "./index.css";

function QuizFSM() {
  const [state, setState] = React.useState(STATES.IDLE);
  const [questions, setQuestions] = React.useState([]);
  const [result, setResult] = React.useState();
  const formRef = React.useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    setState(transition(state, EVENTS.submit));
  };

  React.useEffect(() => {
    const getQuestions = async () => {
      try {
        const data = await fetchQuestions();

        if (data.response_code > 0) {
          setState(transition(state, EVENTS.failed));
        } else {
          setState(transition(state, EVENTS.succeed));
          setQuestions(data.results);
        }
      } catch {
        setState(transition(state, EVENTS.failed));
      }
    };

    if (state === STATES.LOADING) {
      getQuestions();
    }

    if (state === STATES.VALIDATION) {
      setTimeout(() => {
        const answers = serialize(formRef.current, { hash: true });
        setResult(getIsResultCorrect(questions, answers));
        setState(transition(state, EVENTS.validated));
      }, 3000);
    }
  }, [state, questions]);

  return (
    <div className="form-wrapper">
      {![STATES.QUIZ, STATES.FAILURE, STATES.VALIDATION].includes(state) && (
        <Button
          color="secondary"
          loading={state === STATES.LOADING}
          onClick={() => setState(transition(state, EVENTS.click))}
          variant="contained"
          aria-describedby="loading-error"
          aria-invalid={state === STATES.FAILURE}
          size="large"
        >
          Load a quiz
        </Button>
      )}

      {state === STATES.FAILURE && <Error id="loading-error" />}

      {(state === STATES.QUIZ || state === STATES.VALIDATION) && (
        <form ref={formRef} onSubmit={handleSubmit} className="quiz">
          {questions.map(({ question }, index) => {
            return <Question key={index} question={question} index={index} />;
          })}
          <Button
            color="success"
            type="submit"
            loading={state === STATES.VALIDATION}
            variant="contained"
            size="large"
          >
            Get results
          </Button>
        </form>
      )}
      {state === STATES.RESULT && <Results isCorrect={result} />}
    </div>
  );
}

export default QuizFSM;

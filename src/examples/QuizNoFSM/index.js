import React from "react";
import serialize from "form-serialize";
import Button from "@mui/lab/LoadingButton";
import { fetchQuestions, getIsResultCorrect } from "../../utils";
import Question from "../../components/Question";
import Results from "../../components/Results";
import Error from "../../components/Error";

function QuizNoFSM() {
  const [questions, setQuestions] = React.useState([]);
  const [isQuizLoading, setIsQuizLoading] = React.useState(false);
  const [isQuizRequestError, setIsQuizRequestError] = React.useState("");
  const [isSubmitLoading, setIsSubmitLoading] = React.useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = React.useState(false);
  const [isResultCorrect, setIsResultCorrect] = React.useState(false);

  const formRef = React.useRef(null);

  const resetStates = () => {
    setIsFormSubmitted(false);
    setIsResultCorrect(false);
    setIsQuizRequestError(false);
  };

  const getQuestions = async () => {
    resetStates();
    setIsQuizLoading(true);

    try {
      const data = await fetchQuestions();

      if (data.response_code > 0) {
        setIsQuizRequestError(true);
      } else {
        setQuestions(data.results);
      }
    } catch {
      setIsQuizRequestError(true);
    } finally {
      setIsQuizLoading(false);
    }
  };

  const checkResults = (answers) => {
    setIsResultCorrect(getIsResultCorrect(questions, answers));
  };

  const handleSubmit = (event) => {
    setIsFormSubmitted(true);
    setIsSubmitLoading(true);
    event.preventDefault();
    const answers = serialize(formRef.current, { hash: true });
    setTimeout(() => {
      checkResults(answers);
      setIsSubmitLoading(false);
    }, 3000);
  };

  return (
    <div>
      <Button
        loading={isQuizLoading}
        onClick={getQuestions}
        variant="contained"
        aria-describedby="loading-error"
        aria-invalid={isQuizRequestError}
      >
        Load a quiz
      </Button>

      {/* add accessible error component */}
      {isQuizRequestError && <Error id="loading-error" />}

      {(!isFormSubmitted || isSubmitLoading) &&
      !isQuizLoading &&
      questions.length > 0 ? (
        <form ref={formRef} onSubmit={handleSubmit}>
          {questions.map(({ question }, index) => {
            return <Question key={index} question={question} index={index} />;
          })}
          <Button type="submit" loading={isSubmitLoading} variant="contained">
            Get results
          </Button>
        </form>
      ) : null}
      <div>
        {isFormSubmitted && !isSubmitLoading && (
          <Results isCorrect={isResultCorrect} />
        )}
      </div>
    </div>
  );
}

export default QuizNoFSM;

import React from "react";
import serialize from "form-serialize";
import Button from "@mui/lab/LoadingButton";
import { fetchQuestions, getIsResultCorrect } from "../../utils";
import Question from "../../components/Question";
import Results from "../../components/Results";

function QuizNoFSM() {
  const [questions, setQuestions] = React.useState([]);
  const [isQuizLoading, setIsQuizLoading] = React.useState(false);
  const [quizRequestError, setQuizRequestError] = React.useState("");
  const [isSubmitLoading, setIsSubmitLoading] = React.useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = React.useState(false);
  const [isResultCorrect, setIsResultCorrect] = React.useState(false);

  const formRef = React.useRef(null);

  const resetStates = () => {
    setIsFormSubmitted(false);
    setIsResultCorrect(false);
    setQuizRequestError(false);
  };

  const getQuestions = async () => {
    resetStates();
    setIsQuizLoading(true);

    const data = await fetchQuestions();

    if (data.response_code > 0) {
      setQuizRequestError("Error when loading questions");
    } else {
      setQuestions(data.results);
    }

    setIsQuizLoading(false);
  };

  const checkResults = (answers) => {
    setIsResultCorrect(getIsResultCorrect(questions, answers));
  };

  const handleSubmit = (event) => {
    setIsFormSubmitted(true);
    setIsSubmitLoading(true);
    event.preventDefault();
    const answers = serialize(formRef.current, { hash: true });
    console.log(answers);
    checkResults(answers);
    setIsSubmitLoading(false);
  };

  return (
    <div>
      <Button
        loading={isQuizLoading}
        onClick={getQuestions}
        variant="contained"
      >
        Load a quiz
      </Button>

      {quizRequestError && <div>{quizRequestError}</div>}

      {!isFormSubmitted && !isQuizLoading && questions.length > 0 ? (
        <form ref={formRef} onSubmit={handleSubmit}>
          {questions.map(({ question }, index) => {
            return <Question key={index} question={question} index={index} />;
          })}
          <Button type="submit" loading={isSubmitLoading} variant="contained">
            Get results
          </Button>
        </form>
      ) : null}
      <div>{isFormSubmitted && <Results isCorrect={isResultCorrect} />}</div>
    </div>
  );
}

export default QuizNoFSM;

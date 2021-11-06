import React from "react";
import serialize from "form-serialize";
import { decode } from "html-entities";
import { fetchQuestions, getIsResultCorrect } from "../../utils";
import Answers from "../../components/Answers";

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
    <div className="App">
      <button onClick={getQuestions}>Start a quiz</button>
      {isQuizLoading && <div>Loading...</div>}
      {quizRequestError && <div>{quizRequestError}</div>}

      {!isFormSubmitted && !isQuizLoading && questions.length > 0 ? (
        <form ref={formRef} onSubmit={handleSubmit}>
          {questions.map(({ question }, index) => {
            return (
              <div key={index}>
                {decode(question)}
                <Answers index={index} />
              </div>
            );
          })}
          <button type="submit">Submit</button>
          {isSubmitLoading && <div>Checking results...</div>}
        </form>
      ) : null}
      <div>
        {isFormSubmitted && (
          <span>Result: {isResultCorrect ? "Correct" : "Wrong"}</span>
        )}
      </div>
    </div>
  );
}

export default QuizNoFSM;

export const fetchQuestions = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fetch(`https://opentdb.com/api.php?amount=3&type=boolean`).then(
        (response) => {
          const data = response.json();
          resolve(data);
        }
      );
    }, 2000);
  });
};

export const getIsResultCorrect = (questions, answers) => {
  let isCorrect = true;
  questions.forEach(({ correct_answer }, index) => {
    const answer = answers[index] === "true" ? true : false;

    if (answer !== correct_answer) {
      isCorrect = false;
    }
  });

  return isCorrect;
};

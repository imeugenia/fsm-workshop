export const fetchQuestions = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fetch(`https://opentdb.com/api.php?amount=1&type=boolean`)
        .then((response) => {
          const data = response.json();
          resolve(data);
        })
        .catch(() => reject());
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

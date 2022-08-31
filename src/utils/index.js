export const fetchQuestions = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fetch(`https://opentdb.com/api.php?amount=1&type=boolean`)
        .then((response) => {
          const data = response.json();
          resolve(data);
        })
        .catch(() => reject());
    }, 3000);
  });
};

export const getIsResultCorrect = (questions, answers) => {
  let isCorrect = true;
  questions.forEach(({ correct_answer }, index) => {
    if (answers[index] !== correct_answer.toLowerCase()) {
      isCorrect = false;
    }
  });

  return isCorrect;
};

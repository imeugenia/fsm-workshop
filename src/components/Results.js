import { STATUSES } from "../examples/QuizFSM/reducer";

const styles = {
  box: {
    margin: "2em 0",
  },
  text: {
    fontSize: "2em",
  },
};

// Accepts status from FSM example and isCorrect from non-FSM example
const Results = ({ status, isCorrect }) => {
  if (!status) {
    return (
      <div style={styles.box}>
        {isCorrect ? <span>Yay! 🎉</span> : <span>Oh noes! 👎</span>}
      </div>
    );
  }

  const show = status === STATUSES.VICTORY || status === STATUSES.DEFEAT;

  return (
    show && (
      <div style={styles.box}>
        {status === STATUSES.VICTORY && <span>Yay! 🎉</span>}
        {status === STATUSES.DEFEAT && <span>Oh noes! 👎</span>}
      </div>
    )
  );
};

export default Results;

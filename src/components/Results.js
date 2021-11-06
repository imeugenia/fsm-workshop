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
        {isCorrect ? <span>Winner 🎉</span> : <span>Looser 👎</span>}
      </div>
    );
  }

  const show = status === STATUSES.VICTORY || status === STATUSES.DEFEAT;

  return (
    show && (
      <div style={styles.box}>
        {status === STATUSES.VICTORY && <span>Winner 🎉</span>}
        {status === STATUSES.DEFEAT && <span>Looser 👎</span>}
      </div>
    )
  );
};

export default Results;

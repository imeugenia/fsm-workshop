import { STATUSES } from "../examples/QuizFSM/reducer";

const styles = {
  box: {
    margin: "2em 0",
  },
  text: {
    fontSize: "2em",
  },
};

const Results = ({ status }) => {
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

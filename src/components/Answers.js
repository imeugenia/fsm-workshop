const styles = {
  field: {
    border: "none",
    margin: "1em 0",
  },
};

const Answers = ({ index }) => {
  return (
    <fieldset id={index} style={styles.field}>
      <input type="radio" value="true" name={index} id={index + "answer-0"} />
      <label htmlFor={index + "answer-0"}>Yes</label>
      <input type="radio" value="false" name={index} id={index + "answer-1"} />
      <label htmlFor={index + "answer-1"}>No</label>
    </fieldset>
  );
};

export default Answers;

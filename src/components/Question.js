import { decode } from "html-entities";
import FormLabel from "@mui/material/FormLabel";
import Answers from "./Answers";

const styles = {
  box: {
    margin: "2em 0",
  },
};

const Question = ({ question, index }) => {
  return (
    <div key={index} style={styles.box}>
      <FormLabel>{decode(question)}</FormLabel>
      <Answers index={index} />
    </div>
  );
};

export default Question;
